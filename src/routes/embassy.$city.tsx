import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getEmbassy } from "@/data/embassies";
import { getCountry } from "@/data/countries";
import { Building2, Clock, Globe, Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/embassy/$city")({
  loader: ({ params }) => {
    const embassy = getEmbassy(params.city);
    if (!embassy) throw notFound();
    const country = getCountry(embassy.represents);
    return { embassy, country };
  },
  head: ({ params, loaderData }) => {
    const e = loaderData?.embassy;
    if (!e) return { meta: [{ title: "Embassy | VisaPath" }] };
    const title = `${e.country} embassy in ${e.city} — address & contact | VisaPath`;
    const desc = `Address, phone, email, hours, and website for the ${e.country} embassy / immigration authority in ${e.city}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/embassy/${params.city}` },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/embassy/${params.city}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GovernmentOffice",
            name: `${e.country} embassy — ${e.city}`,
            address: e.address,
            telephone: e.phone,
            email: e.email,
            url: e.website,
            openingHours: e.hours,
          }),
        },
      ],
    };
  },
  component: EmbassyPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Embassy not found</h1>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">Back to home</Link>
    </div>
  ),
});

function Row({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-b border-border py-4 last:border-b-0">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <div className="mt-0.5 text-sm text-foreground">{children}</div>
      </div>
    </div>
  );
}

function EmbassyPage() {
  const { embassy, country } = Route.useLoaderData();

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> <span aria-hidden>/</span> Embassy <span aria-hidden>/</span>{" "}
        <span className="text-foreground">{embassy.city}</span>
      </nav>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
        {country?.flag} {embassy.country} embassy — {embassy.city}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Official contact information for visa enquiries and applications.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card px-6 shadow-soft">
        <Row icon={Building2} label="Authority">{embassy.country}</Row>
        <Row icon={MapPin} label="Address">{embassy.address}</Row>
        <Row icon={Phone} label="Phone"><a href={`tel:${embassy.phone}`} className="hover:underline">{embassy.phone}</a></Row>
        <Row icon={Mail} label="Email"><a href={`mailto:${embassy.email}`} className="hover:underline">{embassy.email}</a></Row>
        <Row icon={Globe} label="Website"><a href={embassy.website} target="_blank" rel="noreferrer noopener" className="text-primary hover:underline">{embassy.website}</a></Row>
        <Row icon={Clock} label="Hours">{embassy.hours}</Row>
      </div>

      {country && (
        <div className="mt-8">
          <Link
            to="/processing-times/$country"
            params={{ country: country.code }}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            View {country.name} visa info →
          </Link>
        </div>
      )}
    </section>
  );
}
