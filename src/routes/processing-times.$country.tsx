import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdUnit } from "@/components/visa/AdUnit";
import { ProcessingTimeTable } from "@/components/visa/ProcessingTimeTable";
import { getCountry } from "@/data/countries";
import { embassies } from "@/data/embassies";
import { getProcessingTimesForCountry } from "@/data/processing-times";
import { getVisaTypesForCountry } from "@/data/visa-types";
import { createSeo } from "@/lib/seo";
import type { Embassy, VisaType } from "@/types/visa";
import { formatDays, formatMoney, formatMonths } from "@/utils/format";

export const Route = createFileRoute("/processing-times/$country")({
  loader: ({ params }) => {
    const country = getCountry(params.country);
    if (!country) throw notFound();
    return {
      country,
      times: getProcessingTimesForCountry(country.code),
      types: getVisaTypesForCountry(country.code),
      embassies: embassies.filter((e) => e.represents === country.code),
    };
  },
  head: ({ params, loaderData }) => {
    const name = loaderData?.country.name ?? params.country;
    return createSeo({
      title: `${name} visa processing times | VisaPath`,
      description: `Current ${name} visa processing times for tourist, business, student, and work visas. Includes expedited options and embassy contacts.`,
      path: `/processing-times/${params.country}`,
      type: "article",
    });
  },
  component: ProcessingTimesPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Country not found</h1>
      <p className="mt-2 text-muted-foreground">We do not have data for that country yet.</p>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">Back to home</Link>
    </div>
  ),
});

function ProcessingTimesPage() {
  const { country, times, types, embassies: emb } = Route.useLoaderData();

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link> <span aria-hidden>/</span>{" "}
            Processing times <span aria-hidden>/</span> <span className="text-foreground">{country.name}</span>
          </nav>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-5xl" aria-hidden>{country.flag}</span>
            <div>
              <h1 className="font-display text-3xl font-semibold sm:text-4xl">
                {country.name} visa processing times
              </h1>
              <p className="mt-1 text-muted-foreground">{country.region} - Capital: {country.capital} - {country.currency}</p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-muted-foreground">{country.summary}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">Processing times by category</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Estimated business-day windows from submission to decision. Expedited service is offered only where indicated.
        </p>
        <div className="mt-6">
          <ProcessingTimeTable rows={times} />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{times[0]?.notes}</p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
        <AdUnit slot="2233445566" format="horizontal" />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">Visa categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {types.map((v: VisaType) => (
            <Link
              key={v.category}
              to="/visa/$country/$type"
              params={{ country: country.code, type: v.category }}
              className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold capitalize">{v.category}</h3>
                <span className="text-sm font-medium text-primary">{formatMoney(v.feeUsd)}</span>
              </div>
              <p className="text-sm text-muted-foreground">{v.description}</p>
              <dl className="mt-2 grid grid-cols-2 gap-y-1 text-xs text-muted-foreground">
                <dt>Validity</dt><dd className="text-foreground">{formatMonths(v.validityMonths)}</dd>
                <dt>Max stay</dt><dd className="text-foreground">{formatDays(v.stayDays)}</dd>
                <dt>Entries</dt><dd className="text-foreground">{v.multipleEntry ? "Multiple" : "Single"}</dd>
              </dl>
              <span className="mt-2 text-sm font-medium text-primary group-hover:underline">
                View checklist
              </span>
            </Link>
          ))}
        </div>
      </section>

      {emb.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
          <h2 className="font-display text-2xl font-semibold">Embassies and consulates</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {emb.map((e: Embassy) => (
              <Link
                key={e.id}
                to="/embassy/$city"
                params={{ city: e.id }}
                className="rounded-xl border border-border bg-card p-5 shadow-soft hover:border-primary/40"
              >
                <h3 className="font-display text-base font-semibold">{e.city}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.address}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
