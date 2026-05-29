import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange, Clock3, Layers3, Share2, UserRoundCheck } from "lucide-react";
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
import { buildBreadcrumbSchema, createSeo } from "@/lib/seo";

export const Route = createFileRoute("/tracker")({
  head: () =>
    createSeo({
      title: "Visa application tracker | VisaPath",
      description:
        "Track personal visa applications with local-only storage, timeline estimates, and shareable progress links.",
      path: "/tracker",
      noindex: true,
      keywords: "visa tracker, visa processing timeline, personal visa dashboard",
      jsonLd: buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Tracker", path: "/tracker" },
      ]),
    }),
  component: TrackerPage,
});

function TrackerPage() {
  const [isHydrated, setIsHydrated] = React.useState(false);
  const [applications, setApplications] = React.useState<TrackerApplication[]>([]);
  const [sharedApplications, setSharedApplications] = React.useState<TrackerApplication[] | null>(null);

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
    .filter((entry): entry is { application: TrackerApplication; timeline: NonNullable<ReturnType<typeof getApplicationTimeline>> } => Boolean(entry.timeline));
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
                Save applications in your browser, watch the processing window move, and share a timeline snapshot with one link.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant="outline" onClick={() => handleShareApplications(visibleApplications)}>
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
            value={nextEstimatedDecision ? formatTrackerDate(nextEstimatedDecision.timeline.estimatedDecisionDate) : "No active case"}
            detail={
              nextEstimatedDecision
                ? `${nextEstimatedDecision.timeline.country.name} ${nextEstimatedDecision.timeline.visa.category}`
                : "Add an active application"
            }
          />
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
                    Current timelines based on your submission date and the destination processing window.
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
                    Retained for reference so you can compare future applications against past timing.
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
