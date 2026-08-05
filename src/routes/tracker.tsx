import * as React from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarRange, Clock3, Layers3, Share2, UserRoundCheck } from "lucide-react";
import { FaqSection } from "@/components/seo/FaqSection";
import { toast } from "sonner";
import { ApplicationTimelineCard } from "@/components/tracker/ApplicationTimelineCard";
import { TrackerForm } from "@/components/tracker/TrackerForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatTrackerDate,
  getApplicationTimeline,
  getTrackerShareUrl,
  loadTrackerApplications,
  parseSharedTrackerApplications,
  saveTrackerApplications,
  sortTrackerApplications,
  type TrackerApplication,
  type TrackerStatus,
} from "@/lib/tracker";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema, createSeo } from "@/lib/seo";

export const Route = createFileRoute("/tracker")({
  head: () =>
    createSeo({
      title: "Visa application tracker | VisaPath",
      description:
        "Track personal visa applications with local-only storage, timeline estimates, and shareable progress links.",
      path: "/tracker",
      keywords: "visa tracker, visa processing timeline, personal visa dashboard",
      jsonLd: [
        buildArticleSchema({
          headline: "Visa application tracker",
          description:
            "Track personal visa applications with local-only storage, timeline estimates, and shareable progress links.",
          path: "/tracker",
          keywords: ["visa tracker", "visa processing timeline", "application tracker"],
        }),
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tracker", path: "/tracker" },
        ]),
        buildFaqSchema(trackerFaqs),
      ],
    }),
  component: TrackerPage,
});

const trackerFaqs = [
  {
    question: "Does the VisaPath tracker store my application data on the server?",
    answer:
      "No. The tracker stores application entries in your browser so you can manage personal visa timelines without creating an account. Share links are generated only when you choose to create them.",
  },
  {
    question: "Can I use the tracker after comparing visa routes?",
    answer:
      "Yes. The intended flow is to research a processing page or visa guide first, then add the country and route to the tracker so your estimated decision window lines up with the route you are actually planning to file.",
  },
  {
    question: "What should I track in a visa application timeline?",
    answer:
      "Track the destination, visa category, submission date, and current status. That gives you a simple way to compare the elapsed days against the published processing range on the country and visa pages.",
  },
];

function TrackerPage() {
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [applications, setApplications] = React.useState<TrackerApplication[]>([]);
  const [sharedApplications, setSharedApplications] = React.useState<TrackerApplication[] | null>(
    null,
  );

  React.useEffect(() => {
    setIsHydrated(true);

    const localApplications = sortTrackerApplications(loadTrackerApplications());
    setApplications(localApplications);

    const shareParam = new URLSearchParams(window.location.search).get("share");
    if (!shareParam) return;

    const parsedShare = parseSharedTrackerApplications(shareParam);
    if (!parsedShare) {
      toast.error("That shared timeline link is invalid.");
      return;
    }

    setSharedApplications(sortTrackerApplications(parsedShare));
  }, []);

  React.useEffect(() => {
    if (!isHydrated) return;
    saveTrackerApplications(applications);
  }, [applications, isHydrated]);

  const visibleApplications = sharedApplications ?? applications;
  const timelineEntries = visibleApplications
    .map((application) => ({
      application,
      timeline: getApplicationTimeline(application),
    }))
    .filter(
      (
        entry,
      ): entry is {
        application: TrackerApplication;
        timeline: NonNullable<ReturnType<typeof getApplicationTimeline>>;
      } => Boolean(entry.timeline),
    );
  const activeEntries = timelineEntries.filter((entry) => entry.timeline.isActive);
  const completedEntries = timelineEntries.filter((entry) => entry.timeline.isComplete);
  const nextEstimatedDecision = [...activeEntries].sort(
    (a, b) =>
      a.timeline.estimatedDecisionDate.getTime() - b.timeline.estimatedDecisionDate.getTime(),
  )[0];

  const handleAddApplication = (application: TrackerApplication) => {
    setApplications((current) => sortTrackerApplications([application, ...current]));
    toast.success("Application added to your tracker.");
  };

  const handleStatusChange = (id: string, status: TrackerStatus) => {
    setApplications((current) =>
      sortTrackerApplications(
        current.map((application) =>
          application.id === id ? { ...application, status } : application,
        ),
      ),
    );
    toast.success("Application status updated.");
  };

  const handleDeleteApplication = (id: string) => {
    setApplications((current) => current.filter((application) => application.id !== id));
    toast.success("Application removed.");
  };

  const handleShareApplications = async (apps: TrackerApplication[]) => {
    if (!apps.length) {
      toast.error("Add an application before sharing a timeline.");
      return;
    }

    const shareUrl = getTrackerShareUrl(apps);
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied.");
    } catch {
      toast.error("Clipboard access failed. Copy the URL from your address bar instead.");
      window.history.replaceState({}, "", shareUrl);
    }
  };

  const handleExitSharedView = () => {
    window.history.replaceState({}, "", "/tracker");
    setSharedApplications(null);
  };

  const handleImportSharedView = () => {
    if (!sharedApplications) return;
    setApplications(sortTrackerApplications(sharedApplications));
    window.history.replaceState({}, "", "/tracker");
    setSharedApplications(null);
    toast.success("Shared timeline imported into your tracker.");
  };

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Tracker</p>
          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl font-semibold sm:text-5xl">
                Personal visa application tracker
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Save applications in your browser, watch the processing window move, and share a
                timeline snapshot with one link.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleShareApplications(visibleApplications)}
              >
                <Share2 aria-hidden />
                Share my timeline
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {sharedApplications ? (
          <div className="mb-8 flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-primary">Viewing a shared timeline</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This snapshot is read-only until you import it into your own local tracker.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" onClick={handleExitSharedView}>
                Exit shared view
              </Button>
              <Button type="button" onClick={handleImportSharedView}>
                Import to my tracker
              </Button>
            </div>
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <OverviewCard
            icon={Layers3}
            label="Tracked applications"
            value={`${timelineEntries.length}`}
            detail="Saved in this browser"
          />
          <OverviewCard
            icon={Clock3}
            label="Active cases"
            value={`${activeEntries.length}`}
            detail="Submitted, biometrics, or pending decision"
          />
          <OverviewCard
            icon={UserRoundCheck}
            label="Completed"
            value={`${completedEntries.length}`}
            detail="Approved or rejected"
          />
          <OverviewCard
            icon={CalendarRange}
            label="Next estimate"
            value={
              nextEstimatedDecision
                ? formatTrackerDate(nextEstimatedDecision.timeline.estimatedDecisionDate)
                : "No active case"
            }
            detail={
              nextEstimatedDecision
                ? `${nextEstimatedDecision.timeline.country.name} ${nextEstimatedDecision.timeline.visa.category}`
                : "Add an active application"
            }
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">
              How to use this visa tracker well
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                This tracker works best after you have already chosen the destination and visa
                category from the research pages on VisaPath. A tourist route, a student route, and
                a work route can all move on very different calendars, so the value here comes from
                recording the exact route you are following rather than treating every visa as the
                same process.
              </p>
              <p>
                Once an application is saved, the dashboard gives you a simple operational view of
                elapsed time, active cases, completed cases, and the next expected decision date.
                That is useful when you are managing more than one filing window, coordinating
                travel around appointment availability, or comparing your real case timeline against
                the planning range published on the relevant country page.
              </p>
              <p>
                The tracker is also designed to stay practical rather than heavy. There is no
                account requirement, no payment flow, and no need to move into a separate planning
                system just to watch a visa timeline. If you want to share progress with a
                colleague, partner, or client, the share feature creates a URL snapshot so the
                receiving person can see the same sequence of applications without needing direct
                access to your browser storage.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-2xl font-semibold">
              Where this fits in the research flow
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                The tracker is not a replacement for the visa detail and processing pages. Use the
                country processing page when you need the published timeline by category, the visa
                page when you need the checklist and filing context, and the compare pages when you
                are still deciding between destinations. The tracker comes after that research step
                and turns it into a live personal timeline.
              </p>
              <p>
                That matters for SEO as well as usability because this page now acts as a complete
                resource instead of a thin utility screen. It explains how the tool works, what kind
                of information belongs in the tracker, and how it connects back to the rest of the
                site. Search users landing here should be able to understand whether they need a
                planning dashboard, a processing guide, or a side-by-side comparison before they
                move deeper into the site.
              </p>
              <p>
                If you are starting from zero, open a processing page first, choose the correct
                tourist, business, student, or work route, and then come back to track the
                submission. That sequence gives you a cleaner internal-link path and a more accurate
                planning record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {!sharedApplications ? (
        <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <Card className="border-border/70 shadow-soft">
            <CardHeader>
              <CardTitle className="font-display text-2xl">Add an application</CardTitle>
            </CardHeader>
            <CardContent>
              <TrackerForm onAdd={handleAddApplication} />
            </CardContent>
          </Card>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        {!isHydrated ? (
          <div className="rounded-xl border border-border/70 bg-card p-8 text-sm text-muted-foreground shadow-soft">
            Loading your tracker...
          </div>
        ) : timelineEntries.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-soft">
            <h2 className="font-display text-2xl font-semibold">No applications yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add a visa application to start tracking elapsed days and the estimated decision date.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {activeEntries.length > 0 ? (
              <section>
                <div className="mb-4">
                  <h2 className="font-display text-2xl font-semibold">Active applications</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Current timelines based on your submission date and the destination processing
                    window.
                  </p>
                </div>
                <div className="space-y-6">
                  {activeEntries.map(({ application }) => (
                    <ApplicationTimelineCard
                      key={application.id}
                      application={application}
                      onDelete={sharedApplications ? undefined : handleDeleteApplication}
                      onShare={(item) => handleShareApplications([item])}
                      onStatusChange={sharedApplications ? undefined : handleStatusChange}
                      readOnly={Boolean(sharedApplications)}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {completedEntries.length > 0 ? (
              <section>
                <div className="mb-4">
                  <h2 className="font-display text-2xl font-semibold">Completed applications</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Retained for reference so you can compare future applications against past
                    timing.
                  </p>
                </div>
                <div className="space-y-6">
                  {completedEntries.map(({ application }) => (
                    <ApplicationTimelineCard
                      key={application.id}
                      application={application}
                      onDelete={sharedApplications ? undefined : handleDeleteApplication}
                      onShare={(item) => handleShareApplications([item])}
                      onStatusChange={sharedApplications ? undefined : handleStatusChange}
                      readOnly={Boolean(sharedApplications)}
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </section>

      <FaqSection items={trackerFaqs} title="Visa tracker FAQ" />

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-2xl font-semibold">Continue with visa research</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/processing-times/$country"
              params={{ country: "usa" }}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground"
            >
              Open USA processing times
            </Link>
            <Link
              to="/compare/$countryA/$countryB"
              params={{ countryA: "canada", countryB: "usa" }}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground"
            >
              Compare Canada vs USA
            </Link>
            <Link
              to="/visa/$country/$type"
              params={{ country: "uk", type: "tourist" }}
              className="rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
            >
              View UK tourist visa guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function OverviewCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-5 shadow-soft">
      <Icon className="h-5 w-5 text-primary" aria-hidden />
      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}
