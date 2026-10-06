import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { getCountry } from "./data/countries";
import {
  getComparePath,
  shouldRedirectToCanonicalHost,
  shouldRedirectToHttps,
  siteConfig,
} from "./lib/site";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return withSecurityHeaders(
    new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    }),
  );
}

function getCanonicalCompareRedirect(url: URL) {
  const match = /^\/compare\/([^/]+)\/([^/]+)\/?$/.exec(url.pathname);
  if (!match) return null;

  const [, countryAParam, countryBParam] = match;
  const countryA = getCountry(countryAParam);
  const countryB = getCountry(countryBParam);

  if (!countryA || !countryB) return null;

  const canonicalPath = getComparePath(countryA.code, countryB.code);
  const currentPath = `/compare/${countryA.code}/${countryB.code}`;

  if (canonicalPath === currentPath && url.pathname === currentPath) return null;

  url.pathname = canonicalPath;
  return url.toString();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const needsHttpsRedirect = shouldRedirectToHttps(url.protocol, url.hostname);
      const needsCanonicalHostRedirect = shouldRedirectToCanonicalHost(url.hostname);

      if (needsHttpsRedirect || needsCanonicalHostRedirect) {
        url.protocol = "https:";
        url.hostname = siteConfig.canonicalHost;
        return withSecurityHeaders(Response.redirect(url.toString(), 301));
      }

      const canonicalCompareRedirect = getCanonicalCompareRedirect(url);
      if (canonicalCompareRedirect) {
        return withSecurityHeaders(Response.redirect(canonicalCompareRedirect, 301));
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withSecurityHeaders(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
