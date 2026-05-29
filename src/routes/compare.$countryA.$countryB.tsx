import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdUnit } from "@/components/visa/AdUnit";
import { getCountry } from "@/data/countries";
import { getProcessingTimesForCountry } from "@/data/processing-times";
import { categories, getVisaTypesForCountry } from "@/data/visa-types";
import { createSeo } from "@/lib/seo";
import { formatDays, formatMoney, formatMonths } from "@/utils/format";

export const Route = createFileRoute("/compare/$countryA/$countryB")({
  loader: ({ params }) => {
    const a = getCountry(params.countryA);
    const b = getCountry(params.countryB);
    if (!a || !b) throw notFound();
    return {
      a,
      b,
      aTypes: getVisaTypesForCountry(a.code),
      bTypes: getVisaTypesForCountry(b.code),
      aTimes: getProcessingTimesForCountry(a.code),
      bTimes: getProcessingTimesForCountry(b.code),
    };
  },
  head: ({ params, loaderData }) => {
    const a = loaderData?.a;
    const b = loaderData?.b;
    if (!a || !b) return createSeo({ title: "Visa comparison | VisaPath", path: `/compare/${params.countryA}/${params.countryB}` });

    return createSeo({
      title: `${a.name} vs ${b.name}: visa fees, processing times and rules`,
      description: `Side-by-side visa comparison of ${a.name} and ${b.name}: tourist, business, student, and work visas with fees, validity, and processing windows.`,
      path: `/compare/${params.countryA}/${params.countryB}`,
      type: "article",
    });
  },
  component: ComparePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Comparison unavailable</h1>
      <p className="mt-2 text-muted-foreground">One of those countries is not in our database yet.</p>
      <Link to="/" className="mt-6 inline-block text-primary hover:underline">Back to home</Link>
    </div>
  ),
});

function ComparePage() {
  const { a, b, aTypes, bTypes, aTimes, bTimes } = Route.useLoaderData();

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link> <span aria-hidden>/</span> Compare
          </nav>
          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
            {a.flag} {a.name} <span className="text-muted-foreground">vs</span> {b.flag} {b.name}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Side-by-side visa comparison across all four major categories.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-4 py-3">Category</th>
                <th scope="col" className="px-4 py-3">{a.flag} {a.name}</th>
                <th scope="col" className="px-4 py-3">{b.flag} {b.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map((cat) => {
                const av = aTypes.find((t: typeof aTypes[number]) => t.category === cat.id)!;
                const bv = bTypes.find((t: typeof bTypes[number]) => t.category === cat.id)!;
                const at = aTimes.find((t: typeof aTimes[number]) => t.category === cat.id)!;
                const bt = bTimes.find((t: typeof bTimes[number]) => t.category === cat.id)!;
                return (
                  <tr key={cat.id} className="align-top">
                    <td className="px-4 py-4 font-medium">
                      <div className="font-display text-base">{cat.icon} {cat.label}</div>
                    </td>
                    <td className="px-4 py-4">
                      <ul className="space-y-1 text-muted-foreground">
                        <li>Fee: <span className="text-foreground">{formatMoney(av.feeUsd)}</span></li>
                        <li>Validity: <span className="text-foreground">{formatMonths(av.validityMonths)}</span></li>
                        <li>Max stay: <span className="text-foreground">{formatDays(av.stayDays)}</span></li>
                        <li>Processing: <span className="text-foreground">{at.minDays} to {at.maxDays} days</span></li>
                      </ul>
                    </td>
                    <td className="px-4 py-4">
                      <ul className="space-y-1 text-muted-foreground">
                        <li>Fee: <span className="text-foreground">{formatMoney(bv.feeUsd)}</span></li>
                        <li>Validity: <span className="text-foreground">{formatMonths(bv.validityMonths)}</span></li>
                        <li>Max stay: <span className="text-foreground">{formatDays(bv.stayDays)}</span></li>
                        <li>Processing: <span className="text-foreground">{bt.minDays} to {bt.maxDays} days</span></li>
                      </ul>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <AdUnit slot="5566778899" format="horizontal" />
      </section>
    </>
  );
}
