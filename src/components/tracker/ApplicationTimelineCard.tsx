import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarClock, Link2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/visa-types";
import {
  formatTrackerDate,
  getApplicationTimeline,
  trackerStatusLabels,
  trackerStatusOrder,
  type TrackerApplication,
  type TrackerStatus,
} from "@/lib/tracker";
import { cn } from "@/lib/utils";

export function ApplicationTimelineCard({
  application,
  readOnly = false,
  onStatusChange,
  onDelete,
  onShare,
}: {
  application: TrackerApplication;
  readOnly?: boolean;
  onStatusChange?: (id: string, status: TrackerStatus) => void;
  onDelete?: (id: string) => void;
  onShare?: (application: TrackerApplication) => void;
}) {
  const timeline = getApplicationTimeline(application);

  if (!timeline) {
    return null;
  }

  const category = categories.find((item) => item.id === application.visaCategory);
  const timelineSteps: TrackerStatus[] =
    application.status === "rejected"
      ? ["submitted", "biometrics", "decision", "rejected"]
      : ["submitted", "biometrics", "decision", "approved"];
  const currentStepIndex = timelineSteps.indexOf(application.status);

  return (
    <Card className="overflow-hidden border-border/70 shadow-soft">
      <CardHeader className="gap-4 border-b border-border/60 bg-muted/20">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden>
                {timeline.country.flag}
              </span>
              <div>
                <CardTitle className="font-display text-xl">
                  {timeline.country.name} {category?.label ?? application.visaCategory}
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Applied {formatTrackerDate(timeline.appliedDate)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                application.status === "approved"
                  ? "default"
                  : application.status === "rejected"
                    ? "destructive"
                    : "secondary"
              }
            >
              {trackerStatusLabels[application.status]}
            </Badge>
            {onShare ? (
              <Button size="sm" type="button" variant="outline" onClick={() => onShare(application)}>
                <Link2 aria-hidden />
                Share this application
              </Button>
            ) : null}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="Days elapsed" value={`${timeline.elapsedDays}`} />
          <Stat label="Estimated decision" value={formatTrackerDate(timeline.estimatedDecisionDate)} />
          <Stat
            label="Processing window"
            value={`${timeline.processingTime.minDays}-${timeline.processingTime.maxDays} days`}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarClock className="h-4 w-4" aria-hidden />
              <span>
                Expected between {formatTrackerDate(timeline.earliestDecisionDate)} and{" "}
                {formatTrackerDate(timeline.latestDecisionDate)}
              </span>
            </div>
            <span className="font-medium text-foreground">{timeline.progressPercent}% of window used</span>
          </div>
          <Progress value={timeline.progressPercent} />
          {timeline.isActive ? (
            <p className="text-sm text-muted-foreground">
              About {timeline.estimatedDaysRemaining} days until the midpoint estimate based on your current data.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              This application is marked complete. Processing estimate retained for reference.
            </p>
          )}
        </div>

        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="space-y-4">
            <div className="space-y-4">
              {timelineSteps.map((status, index) => {
                const isReached = index <= currentStepIndex;
                const isCurrent = status === application.status;

                return (
                  <div key={status} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                          isReached
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-muted-foreground",
                        )}
                      >
                        {index + 1}
                      </div>
                      {index < timelineSteps.length - 1 ? (
                        <div className={cn("mt-2 h-10 w-px", isReached ? "bg-primary/40" : "bg-border")} />
                      ) : null}
                    </div>
                    <div className="pb-2">
                      <p className={cn("text-sm font-medium", isCurrent ? "text-foreground" : "text-muted-foreground")}>
                        {trackerStatusLabels[status]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {getStatusDescription(status)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-border/70 bg-muted/20 p-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Current status</p>
              {readOnly ? (
                <p className="mt-2 text-sm font-medium text-foreground">{trackerStatusLabels[application.status]}</p>
              ) : (
                <Select
                  onValueChange={(value) => onStatusChange?.(application.id, value as TrackerStatus)}
                  value={application.status}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {trackerStatusOrder.map((status) => (
                      <SelectItem key={status} value={status}>
                        {trackerStatusLabels[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Visa page</p>
              <Link
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                params={{ country: application.countryCode, type: application.visaCategory }}
                to="/visa/$country/$type"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden />
                Open visa details
              </Link>
            </div>

            {!readOnly && onDelete ? (
              <Button
                className="w-full"
                size="sm"
                type="button"
                variant="outline"
                onClick={() => onDelete(application.id)}
              >
                <Trash2 aria-hidden />
                Remove application
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-background p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold">{value}</p>
    </div>
  );
}

function getStatusDescription(status: TrackerStatus) {
  switch (status) {
    case "submitted":
      return "Application lodged and waiting for the next processing step.";
    case "biometrics":
      return "Biometrics requested or completed before full review continues.";
    case "decision":
      return "Case is in decision queue or under final review.";
    case "approved":
      return "Visa approved. Keep this timeline as a reference point for future trips.";
    case "rejected":
      return "Application refused or rejected. Review the destination guidance before reapplying.";
  }
}
