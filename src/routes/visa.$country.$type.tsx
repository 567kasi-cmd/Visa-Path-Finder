import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdUnit } from "@/components/visa/AdUnit";
import { DocumentChecklist } from "@/components/visa/DocumentChecklist";
import { getCountry } from "@/data/countries";
import { getChecklist } from "@/data/document-checklists";
import { getProcessingTime } from "@/data/processing-times";
import { getVisaType } from "@/data/visa-types";
import { createSeo } from "@/lib/seo";
import { formatDays, formatMoney, formatMonths } from "@/utils/format";

export const Route = createFileRoute("/visa/$country/$type")({
  loader: ({ params }) => {
    const country = getCountry(params.country);
    const visa = getVisaType(params.country, params.type);
    const time = getProcessingTime(params.country, params.type);
    const checklist = getChecklist(params.country, params.type);
    if (!country || !visa || !time || !checklist) throw notFound();
    return { country, visa, time, checklist };
  },
  head: ({ params, loaderData }) => {
    const country = loaderData?.country;
    const visa = loaderData?.visa;
    if (!country || !visa) return createSeo({ title: "Visa details | VisaPath", path: `/visa/${params.country}/${params.type}` });

    const title = `${country.name} ${visa.category} visa: requirements, fee and processing time`;
    const description = `Complete ${country.name} ${visa.category} visa guide - fee ${formatMoney(visa.feeUsd)}, validity ${formatMonths(visa.validityMonths)}, stay up to ${formatDays(visa.stayDays)}. Document checklist included.`;

    return createSeo({
      title,
      description,
      path: `/visa/${params.country}/${params.type}`,
      type: "article",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to apply for a ${country.name} ${visa.category} visa`,
        description,
        estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: visa.feeUsd },
        totalTime: `P${loaderData?.time.maxDays ?? 30}D`,
        step: loaderData?.checklist.documents.map((d, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: d.name,
          text: d.details,
        })),
      },
    });
  },
  component: VisaDetailPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Visa not found</h1>
      <p className="mt-2 text-muted-foreground">We do not have data for that visa yet.</p>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">Back to home</Link>
    </div>
  ),
});

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-xl font-semibold">{value}</dd>
    </div>
  );
}

function VisaDetailPage() {
  const { country, visa, time, checklist } = Route.useLoaderData();

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link> <span aria-hidden>/</span>{" "}
            <Link to="/processing-times/$country" params={{ country: country.code }} className="hover:text-foreground">
              {country.name}
            </Link>{" "}
            <span aria-hidden>/</span> <span className="text-foreground capitalize">{visa.category} visa</span>
          </nav>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-5xl" aria-hidden>{country.flag}</span>
            <div>
              <h1 className="font-display text-3xl font-semibold sm:text-4xl">{visa.title}</h1>
              <p className="mt-1 text-muted-foreground">{visa.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Fee" value={formatMoney(visa.feeUsd)} />
          <Stat label="Validity" value={formatMonths(visa.validityMonths)} />
          <Stat label="Max stay" value={formatDays(visa.stayDays)} />
          <Stat label="Processing" value={`${time.minDays} to ${time.maxDays} days`} />
        </dl>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
        <AdUnit slot="3344556677" format="horizontal" />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">Document checklist</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Prepare these before booking your appointment. Required items must be present at submission; optional items strengthen your application.
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
          <DocumentChecklist checklist={checklist} />
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <h3 className="font-display text-base font-semibold">Quick facts</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Entries: <span className="text-foreground">{visa.multipleEntry ? "Multiple" : "Single"}</span></li>
                <li>Appointment: <span className="text-foreground">{visa.appointmentRequired ? "Required" : "Not required"}</span></li>
                {time.expedited && time.expeditedDays && (
                  <li>Expedited: <span className="text-foreground">from {formatDays(time.expeditedDays)}</span></li>
                )}
              </ul>
            </div>
            <AdUnit slot="4455667788" format="rectangle" />
          </div>
        </div>
      </section>
    </>
  );
}
