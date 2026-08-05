import type { RelatedPageItem } from "@/components/layout/RelatedPagesSection";
import { getComparePairBrief } from "@/data/compare-pair-briefs";
import { getPrimaryEmbassyForCountry } from "@/data/embassies";
import { getCompareCountryProfile } from "@/data/compare-country-profiles";
import { getChecklist } from "@/data/document-checklists";
import type { Country, ProcessingTime, VisaCategory, VisaType } from "@/types/visa";
import { formatDays, formatMoney, formatMonths } from "@/utils/format";

export type ComparisonRow = {
  category: VisaCategory;
  label: string;
  icon: string;
  aVisa: VisaType;
  bVisa: VisaType;
  aTime: ProcessingTime;
  bTime: ProcessingTime;
};

export type ComparisonFaq = {
  question: string;
  answer: string;
};

export type CompareCard = {
  title: string;
  body: string;
  bullets: string[];
};

export type CompareCountryProsCons = {
  country: Country;
  pros: string[];
  cons: string[];
};

export type ComparePageContent = {
  heroIntro: string[];
  pairMemo: string[];
  strategyCards: CompareCard[];
  summaryCards: CompareCard[];
  feeIntro: string[];
  feeCards: CompareCard[];
  processingIntro: string[];
  processingCards: CompareCard[];
  stayIntro: string[];
  stayCards: CompareCard[];
  studentIntro: string[];
  studentCards: CompareCard[];
  workIntro: string[];
  workCards: CompareCard[];
  decisionSummary: { title: string; body: string; bullets: string[] }[];
  prosCons: CompareCountryProsCons[];
  faqs: ComparisonFaq[];
  internalLinks: RelatedPageItem[];
  relatedPages: RelatedPageItem[];
};

export function buildComparePageContent(
  a: Country,
  b: Country,
  rows: ComparisonRow[],
): ComparePageContent {
  const tourist = getRow(rows, "tourist");
  const business = getRow(rows, "business");
  const student = getRow(rows, "student");
  const work = getRow(rows, "work");
  const aProfile = getCompareCountryProfile(a.code);
  const bProfile = getCompareCountryProfile(b.code);
  const pairBrief = getComparePairBrief(a.code, b.code);
  const aTouristChecklist = getChecklist(a.code, "tourist");
  const bTouristChecklist = getChecklist(b.code, "tourist");
  const aStudentChecklist = getChecklist(a.code, "student");
  const bStudentChecklist = getChecklist(b.code, "student");
  const aWorkChecklist = getChecklist(a.code, "work");
  const bWorkChecklist = getChecklist(b.code, "work");

  const feeLeaderTourist = compareLeader(a, b, tourist.aVisa.feeUsd, tourist.bVisa.feeUsd, "lower");
  const speedLeaderTourist = compareLeader(
    a,
    b,
    tourist.aTime.maxDays,
    tourist.bTime.maxDays,
    "lower",
  );
  const stayLeaderTourist = compareLeader(
    a,
    b,
    tourist.aVisa.stayDays,
    tourist.bVisa.stayDays,
    "higher",
  );
  const workLeader = compareLeader(a, b, work.aTime.maxDays, work.bTime.maxDays, "lower");
  const studentLeader = compareLeader(a, b, student.aTime.maxDays, student.bTime.maxDays, "lower");

  const heroIntro = [
    pairBrief.angle,
    `${a.name} and ${b.name} should not resolve to the same ranking because the pair breaks in different directions once you separate fee, operational delay, stay pattern, and sponsor pressure. ${feeLeaderTourist.winner.name === a.name || feeLeaderTourist.winner.name === b.name ? `${feeLeaderTourist.winner.name} is the lower-fee tourist side,` : "The tourist fee is effectively tied,"} ${speedLeaderTourist.winner.name === a.name || speedLeaderTourist.winner.name === b.name ? `${speedLeaderTourist.winner.name} has the shorter published tourist window,` : "the tourist timeline is effectively tied,"} and ${stayLeaderTourist.winner.name === a.name || stayLeaderTourist.winner.name === b.name ? `${stayLeaderTourist.winner.name} gives the longer visitor stay.` : "visitor stay length is effectively tied."}`,
    `${aProfile.filingStyle} ${bProfile.filingStyle} That difference alone makes this pair useful for route selection rather than simple price shopping.`,
    `${aProfile.visitorPositioning} ${bProfile.visitorPositioning} ${pairBrief.decisionFocus}`,
  ];

  const pairMemo = [
    `In practical planning terms, ${a.name} vs ${b.name} is a choice between ${pairBrief.angle.toLowerCase()} A traveler who only compares government fees will miss where the route actually becomes fragile.`,
    `${a.name} becomes the stronger option when the applicant can absorb ${aProfile.hiddenCosts.tourist[0].toLowerCase()} and still benefits from ${aProfile.stayPositioning.tourist.toLowerCase()} ${b.name} becomes stronger when the applicant prefers ${bProfile.stayPositioning.tourist.toLowerCase()} even if that means accepting ${bProfile.hiddenCosts.tourist[0].toLowerCase()}.`,
    `The same split appears on long-stay routes. ${a.name} handles student and work planning through ${aProfile.student.complexity.toLowerCase()} and ${aProfile.work.sponsorship.toLowerCase()} ${b.name} handles them through ${bProfile.student.complexity.toLowerCase()} and ${bProfile.work.sponsorship.toLowerCase()} That is why this pair needs route-level commentary instead of a generic visa-comparison template.`,
  ];

  const strategyCards: CompareCard[] = [
    {
      title: `${a.name} vs ${b.name}: visitor route lens`,
      body: `${pairBrief.feeFocus} ${pairBrief.stayFocus}`,
      bullets: [
        `${a.name}: ${aProfile.visitorPositioning}`,
        `${b.name}: ${bProfile.visitorPositioning}`,
        `${a.name} tourist route posture: ${aProfile.stayPositioning.tourist}`,
        `${b.name} tourist route posture: ${bProfile.stayPositioning.tourist}`,
      ],
    },
    {
      title: `${a.name} vs ${b.name}: processing and control lens`,
      body: `${pairBrief.processingFocus} The important comparison is not just who is faster, but where the applicant loses control of the calendar.`,
      bullets: [
        `${a.name}: ${aProfile.delayDrivers.tourist[0]} ${aProfile.delayDrivers.work[0]}`,
        `${b.name}: ${bProfile.delayDrivers.tourist[0]} ${bProfile.delayDrivers.work[0]}`,
        `${a.name} filing culture: ${aProfile.filingStyle}`,
        `${b.name} filing culture: ${bProfile.filingStyle}`,
      ],
    },
    {
      title: `${a.name} vs ${b.name}: study and work path lens`,
      body: `${pairBrief.studentFocus} ${pairBrief.workFocus}`,
      bullets: [
        `${a.name} student posture: ${aProfile.student.postStudy}`,
        `${b.name} student posture: ${bProfile.student.postStudy}`,
        `${a.name} work posture: ${aProfile.work.applicantProfile}`,
        `${b.name} work posture: ${bProfile.work.applicantProfile}`,
      ],
    },
  ];

  const summaryCards: CompareCard[] = [
    {
      title: "Visitor route snapshot",
      body: `${formatMoney(tourist.aVisa.feeUsd)} and ${formatMoney(tourist.bVisa.feeUsd)} are only the starting numbers. ${speedLeaderTourist.winner.name} is the faster tourist-side option on the published outer window, while ${stayLeaderTourist.winner.name} is stronger for time-on-ground once approved.`,
      bullets: [
        `${a.name}: ${tourist.aTime.minDays}-${tourist.aTime.maxDays} days, stay up to ${formatDays(tourist.aVisa.stayDays)}, validity ${formatMonths(tourist.aVisa.validityMonths)}.`,
        `${b.name}: ${tourist.bTime.minDays}-${tourist.bTime.maxDays} days, stay up to ${formatDays(tourist.bVisa.stayDays)}, validity ${formatMonths(tourist.bVisa.validityMonths)}.`,
      ],
    },
    {
      title: "Student route pressure",
      body: `${studentLeader.winner.name} has the quicker published student window, but this pair separates more clearly on work-rights culture, post-study runway, and how much proof the route expects before classes even start.`,
      bullets: [
        `${a.name}: ${aProfile.student.complexity}`,
        `${b.name}: ${bProfile.student.complexity}`,
      ],
    },
    {
      title: "Work-route control point",
      body: `${workLeader.winner.name} is faster on the listed work timeline, yet employer dependency can matter more than the raw day count because work entry is only as smooth as the sponsor-side preparation behind it.`,
      bullets: [
        `${a.name}: ${aProfile.work.employerDependency}`,
        `${b.name}: ${bProfile.work.employerDependency}`,
      ],
    },
  ];

  const feeCards = rows.map((row) => buildFeeCard(a, b, row));
  const feeIntro = [
    pairBrief.feeFocus,
    `A fee gap matters only when the rest of the route behaves similarly. In this pair, the government charge can be undercut or amplified by biometrics, interview travel, sponsor handling, translations, medicals, or school-start risk.`,
    `${a.name} carries these hidden-cost patterns: ${aProfile.hiddenCosts.tourist[0]} ${aProfile.hiddenCosts.student[0]} ${b.name} behaves differently: ${bProfile.hiddenCosts.tourist[0]} ${bProfile.hiddenCosts.student[0]}`,
  ];

  const processingCards: CompareCard[] = [
    buildProcessingCard(a, b, tourist, "Tourist and business delays"),
    buildProcessingCard(a, b, student, "Student-route delay map"),
    buildProcessingCard(a, b, work, "Work-route delay map"),
    {
      title: `Why this pair produces different calendars`,
      body: `${a.name} delay risk is driven by ${joinList(aProfile.delayDrivers.tourist)}. ${b.name} delay risk is driven by ${joinList(bProfile.delayDrivers.tourist)}. That means two pages can show similar published ranges and still behave very differently once an applicant starts filing.`,
      bullets: [
        `${a.name}: ${tourist.aTime.notes}`,
        `${a.name}: ${tourist.aTime.seasonalityNote}`,
        `${b.name}: ${tourist.bTime.notes}`,
        `${b.name}: ${tourist.bTime.seasonalityNote}`,
      ],
    },
  ];
  const processingIntro = [
    pairBrief.processingFocus,
    `Processing-time comparison is only useful when it explains where the delay actually happens. ${a.name} and ${b.name} slow down for different reasons, so this section focuses on bottlenecks rather than on the table alone.`,
    `${a.name} typically slows through ${joinList(aProfile.delayDrivers.work)} ${b.name} typically slows through ${joinList(bProfile.delayDrivers.work)}`,
  ];

  const stayCards: CompareCard[] = rows.map((row) => buildStayCard(a, b, row));
  stayCards.push({
    title: "Traveler fit by stay pattern",
    body: `${a.name} is the better fit when the traveler values ${aProfile.stayPositioning.tourist.toLowerCase()} ${b.name} is the better fit when the traveler values ${bProfile.stayPositioning.tourist.toLowerCase()}`,
    bullets: [
      `${a.name}: ${aProfile.stayPositioning.business}`,
      `${a.name}: ${aProfile.stayPositioning.work}`,
      `${b.name}: ${bProfile.stayPositioning.business}`,
      `${b.name}: ${bProfile.stayPositioning.work}`,
    ],
  });
  const stayIntro = [
    pairBrief.stayFocus,
    `Stay length and visa validity affect trip design more than many search users expect. A cheap visa with a short stay can still be the wrong pick if the traveler needs repeat access, a slower study move, or more breathing room on the ground.`,
    `${a.name} tourist status allows ${formatDays(tourist.aVisa.stayDays)} with ${formatMonths(tourist.aVisa.validityMonths)} validity, while ${b.name} allows ${formatDays(tourist.bVisa.stayDays)} with ${formatMonths(tourist.bVisa.validityMonths)} validity. That difference is large enough to change who should file where.`,
  ];

  const studentCards: CompareCard[] = [
    {
      title: `${a.name} student route`,
      body: `${aProfile.student.complexity} ${aProfile.student.workRights} ${aProfile.student.postStudy}`,
      bullets: [
        `Fee: ${formatMoney(student.aVisa.feeUsd)}. Processing: ${student.aTime.minDays}-${student.aTime.maxDays} days.`,
        `Checklist load: ${countRequired(aStudentChecklist)} required items before optional evidence.`,
        `Funding pressure: ${aProfile.student.financingPressure}`,
      ],
    },
    {
      title: `${b.name} student route`,
      body: `${bProfile.student.complexity} ${bProfile.student.workRights} ${bProfile.student.postStudy}`,
      bullets: [
        `Fee: ${formatMoney(student.bVisa.feeUsd)}. Processing: ${student.bTime.minDays}-${student.bTime.maxDays} days.`,
        `Checklist load: ${countRequired(bStudentChecklist)} required items before optional evidence.`,
        `Funding pressure: ${bProfile.student.financingPressure}`,
      ],
    },
    {
      title: "Student route verdict for this exact pair",
      body: `${studentLeader.winner.name} has the easier timing headline, but the more strategic choice depends on whether the applicant needs stronger day-to-day work flexibility during study, a clearer post-study runway, or simply a route with less document formality. ${a.name} and ${b.name} do not optimize the same student profile.`,
      bullets: [
        `${a.name} fits: ${aProfile.stayPositioning.student}`,
        `${b.name} fits: ${bProfile.stayPositioning.student}`,
        `${a.name} hidden friction: ${aProfile.hiddenCosts.student[1]}`,
        `${b.name} hidden friction: ${bProfile.hiddenCosts.student[1]}`,
      ],
    },
  ];
  const studentIntro = [
    pairBrief.studentFocus,
    `This student comparison is intentionally route-specific. The meaningful differences are work-rights culture during study, the quality of post-study continuation, and how punishing the route is when funds or admission documents are not perfectly aligned.`,
    `${a.name} approaches study as ${aProfile.student.complexity.toLowerCase()} ${b.name} approaches study as ${bProfile.student.complexity.toLowerCase()}`,
  ];

  const workCards: CompareCard[] = [
    {
      title: `${a.name} work route`,
      body: `${aProfile.work.sponsorship} ${aProfile.work.approvalComplexity} ${aProfile.work.applicantProfile}`,
      bullets: [
        `Fee: ${formatMoney(work.aVisa.feeUsd)}. Processing: ${work.aTime.minDays}-${work.aTime.maxDays} days.`,
        `Checklist load: ${countRequired(aWorkChecklist)} required items before optional evidence.`,
        `Employer dependency: ${aProfile.work.employerDependency}`,
      ],
    },
    {
      title: `${b.name} work route`,
      body: `${bProfile.work.sponsorship} ${bProfile.work.approvalComplexity} ${bProfile.work.applicantProfile}`,
      bullets: [
        `Fee: ${formatMoney(work.bVisa.feeUsd)}. Processing: ${work.bTime.minDays}-${work.bTime.maxDays} days.`,
        `Checklist load: ${countRequired(bWorkChecklist)} required items before optional evidence.`,
        `Employer dependency: ${bProfile.work.employerDependency}`,
      ],
    },
    {
      title: "Work-route verdict for this exact pair",
      body: `${a.name} and ${b.name} differ less on whether sponsorship matters and more on where the sponsor pressure lands. In one route, the friction is petition or employer readiness; in the other, it may be subclass choice, credential proof, or residency administration. That distinction changes how much control the applicant has over the result.`,
      bullets: [
        `${a.name} hidden friction: ${aProfile.hiddenCosts.work[0]}`,
        `${b.name} hidden friction: ${bProfile.hiddenCosts.work[0]}`,
        `${a.name} delay pattern: ${joinList(aProfile.delayDrivers.work)}`,
        `${b.name} delay pattern: ${joinList(bProfile.delayDrivers.work)}`,
      ],
    },
  ];
  const workIntro = [
    pairBrief.workFocus,
    `Work visas in this pair are not interchangeable. The most important differences are how formal sponsorship is, whether the employer or the applicant controls the calendar, and how many moving parts sit outside the visa fee itself.`,
    `${a.name} frames work entry through ${aProfile.work.sponsorship.toLowerCase()} ${b.name} frames work entry through ${bProfile.work.sponsorship.toLowerCase()}`,
  ];

  const decisionSummary = [
    {
      title: `Choose ${a.name} if...`,
      body: `${a.name} is the smarter pick when the traveler profile lines up with ${aProfile.visitorPositioning.toLowerCase()} It becomes stronger when the applicant can tolerate ${aProfile.filingStyle.toLowerCase()}`,
      bullets: buildDecisionBullets(a, b, rows, "a"),
    },
    {
      title: `Choose ${b.name} if...`,
      body: `${b.name} is the smarter pick when the traveler profile lines up with ${bProfile.visitorPositioning.toLowerCase()} It becomes stronger when the applicant can tolerate ${bProfile.filingStyle.toLowerCase()}`,
      bullets: buildDecisionBullets(a, b, rows, "b"),
    },
    {
      title: "Bottom-line decision",
      body: `${pairBrief.decisionFocus} ${a.name} wins different user intents than ${b.name}. The correct choice depends on whether the user is optimizing for pre-trip speed, low filing cost, long stay length, academic flexibility, or a work route with less employer-controlled uncertainty.`,
      bullets: [
        `Fast discretionary trip: ${speedLeaderTourist.winner.name}.`,
        `Longer visitor stay: ${stayLeaderTourist.winner.name}.`,
        `Student route with easier headline timing: ${studentLeader.winner.name}.`,
        `Work route with easier headline timing: ${workLeader.winner.name}.`,
      ],
    },
  ];

  const prosCons = buildProsCons(a, b, rows);
  const faqs = buildPairFaqs(a, b, rows);
  const internalLinks = buildInternalLinks(a, b);
  const relatedPages = buildRelatedPages(a, b);

  return {
    heroIntro,
    pairMemo,
    strategyCards,
    summaryCards,
    feeIntro,
    feeCards,
    processingIntro,
    processingCards,
    stayIntro,
    stayCards,
    studentIntro,
    studentCards,
    workIntro,
    workCards,
    decisionSummary,
    prosCons,
    faqs,
    internalLinks,
    relatedPages,
  };
}

export function flattenCompareContent(content: ComparePageContent) {
  return [
    ...content.heroIntro,
    ...content.pairMemo,
    ...flattenCards(content.strategyCards),
    ...flattenCards(content.summaryCards),
    ...content.feeIntro,
    ...flattenCards(content.feeCards),
    ...content.processingIntro,
    ...flattenCards(content.processingCards),
    ...content.stayIntro,
    ...flattenCards(content.stayCards),
    ...content.studentIntro,
    ...flattenCards(content.studentCards),
    ...content.workIntro,
    ...flattenCards(content.workCards),
    ...content.decisionSummary.flatMap((item) => [item.title, item.body, ...item.bullets]),
    ...content.prosCons.flatMap((item) => [item.country.name, ...item.pros, ...item.cons]),
    ...content.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ...content.internalLinks.map((link) => link.label),
    ...content.internalLinks.map((link) => link.description),
    ...content.relatedPages.map((link) => link.label),
    ...content.relatedPages.map((link) => link.description),
  ].join(" ");
}

function flattenCards(cards: CompareCard[]) {
  return cards.flatMap((card) => [card.title, card.body, ...card.bullets]);
}

function buildFeeCard(a: Country, b: Country, row: ComparisonRow): CompareCard {
  const aProfile = getCompareCountryProfile(a.code);
  const bProfile = getCompareCountryProfile(b.code);
  const cheaper = compareLeader(a, b, row.aVisa.feeUsd, row.bVisa.feeUsd, "lower");
  const stayLead = compareLeader(a, b, row.aVisa.stayDays, row.bVisa.stayDays, "higher");
  const processingLead = compareLeader(a, b, row.aTime.maxDays, row.bTime.maxDays, "lower");
  const feeGap = Math.abs(row.aVisa.feeUsd - row.bVisa.feeUsd);

  return {
    title: `${row.label} fee comparison`,
    body: `${a.name} lists ${formatMoney(row.aVisa.feeUsd)} and ${b.name} lists ${formatMoney(row.bVisa.feeUsd)} for the ${row.label.toLowerCase()} route. ${cheaper.tie ? "The base fee is effectively tied, so the real distinction comes from hidden cost and route friction." : `${cheaper.winner.name} is cheaper by ${formatMoney(feeGap)}, but that advantage only matters if the traveler can also live with that country's extra filing burden.`} ${processingLead.winner.name} is faster on the published outer window, while ${stayLead.winner.name} gives the longer stay once issued.`,
    bullets: [
      `${a.name} hidden cost: ${aProfile.hiddenCosts[row.category][0]}`,
      `${a.name} hidden cost: ${aProfile.hiddenCosts[row.category][1]}`,
      `${b.name} hidden cost: ${bProfile.hiddenCosts[row.category][0]}`,
      `${b.name} hidden cost: ${bProfile.hiddenCosts[row.category][1]}`,
    ],
  };
}

function buildProcessingCard(
  a: Country,
  b: Country,
  row: ComparisonRow,
  title: string,
): CompareCard {
  const aProfile = getCompareCountryProfile(a.code);
  const bProfile = getCompareCountryProfile(b.code);
  return {
    title,
    body: `${a.name} publishes ${row.aTime.minDays}-${row.aTime.maxDays} days for ${row.label.toLowerCase()} cases, while ${b.name} publishes ${row.bTime.minDays}-${row.bTime.maxDays} days. The practical difference is that ${a.name} tends to slow through ${joinList(aProfile.delayDrivers[row.category])} ${b.name} tends to slow through ${joinList(bProfile.delayDrivers[row.category])}`,
    bullets: [
      `${a.name}: ${row.aTime.notes}`,
      `${a.name}: ${row.aTime.seasonalityNote}`,
      `${b.name}: ${row.bTime.notes}`,
      `${b.name}: ${row.bTime.seasonalityNote}`,
    ],
  };
}

function buildStayCard(a: Country, b: Country, row: ComparisonRow): CompareCard {
  const aProfile = getCompareCountryProfile(a.code);
  const bProfile = getCompareCountryProfile(b.code);
  const stayLead = compareLeader(a, b, row.aVisa.stayDays, row.bVisa.stayDays, "higher");
  const validityLead = compareLeader(
    a,
    b,
    row.aVisa.validityMonths,
    row.bVisa.validityMonths,
    "higher",
  );

  return {
    title: `${row.label} stay and validity`,
    body: `${a.name} allows ${formatDays(row.aVisa.stayDays)} with ${formatMonths(row.aVisa.validityMonths)} validity, while ${b.name} allows ${formatDays(row.bVisa.stayDays)} with ${formatMonths(row.bVisa.validityMonths)} validity. ${stayLead.tie ? "The stay allowance is close enough that route structure matters more than duration." : `${stayLead.winner.name} is stronger on raw stay length.`} ${validityLead.tie ? "Validity is also broadly aligned." : `${validityLead.winner.name} keeps the document usable for longer after issuance.`}`,
    bullets: [
      `${a.name}: ${aProfile.stayPositioning[row.category]}`,
      `${b.name}: ${bProfile.stayPositioning[row.category]}`,
    ],
  };
}

function buildDecisionBullets(a: Country, b: Country, rows: ComparisonRow[], side: "a" | "b") {
  const country = side === "a" ? a : b;
  const other = side === "a" ? b : a;
  const tourist = getRow(rows, "tourist");
  const student = getRow(rows, "student");
  const work = getRow(rows, "work");
  const touristFee = side === "a" ? tourist.aVisa.feeUsd : tourist.bVisa.feeUsd;
  const touristTime = side === "a" ? tourist.aTime : tourist.bTime;
  const touristStay = side === "a" ? tourist.aVisa.stayDays : tourist.bVisa.stayDays;
  const studentTime = side === "a" ? student.aTime : student.bTime;
  const workTime = side === "a" ? work.aTime : work.bTime;
  const profile = getCompareCountryProfile(country.code);

  return [
    `${country.name} works for travelers who accept ${formatMoney(touristFee)} on the tourist side in exchange for ${touristTime.minDays}-${touristTime.maxDays} day processing and a stay of up to ${formatDays(touristStay)}.`,
    `${country.name} makes more sense than ${other.name} when the student plan needs ${profile.student.postStudy.toLowerCase()}`,
    `${country.name} is the better work-side choice when ${profile.work.applicantProfile.toLowerCase()} and the applicant can work within a ${workTime.minDays}-${workTime.maxDays} day listed work window.`,
    `${country.name} is weaker if the traveler cannot tolerate ${profile.hiddenCosts.tourist[0].toLowerCase()}`,
    `${country.name} is also weaker if the student or worker cannot absorb ${profile.hiddenCosts.student[0].toLowerCase()} or ${profile.hiddenCosts.work[0].toLowerCase()}`,
  ];
}

function buildProsCons(a: Country, b: Country, rows: ComparisonRow[]): CompareCountryProsCons[] {
  return [buildCountryProsCons(a, b, rows, "a"), buildCountryProsCons(a, b, rows, "b")];
}

function buildCountryProsCons(
  a: Country,
  b: Country,
  rows: ComparisonRow[],
  side: "a" | "b",
): CompareCountryProsCons {
  const country = side === "a" ? a : b;
  const other = side === "a" ? b : a;
  const tourist = getRow(rows, "tourist");
  const student = getRow(rows, "student");
  const work = getRow(rows, "work");
  const touristFee = side === "a" ? tourist.aVisa.feeUsd : tourist.bVisa.feeUsd;
  const touristTime = side === "a" ? tourist.aTime : tourist.bTime;
  const touristStay = side === "a" ? tourist.aVisa.stayDays : tourist.bVisa.stayDays;
  const studentTime = side === "a" ? student.aTime : student.bTime;
  const workTime = side === "a" ? work.aTime : work.bTime;
  const profile = getCompareCountryProfile(country.code);

  return {
    country,
    pros: [
      `Tourist fee and route structure are clear enough to benchmark against ${other.name}: ${formatMoney(touristFee)}, ${touristTime.minDays}-${touristTime.maxDays} days, and up to ${formatDays(touristStay)} on the ground.`,
      profile.stayPositioning.tourist,
      profile.student.postStudy,
      profile.work.applicantProfile,
    ],
    cons: [
      profile.hiddenCosts.tourist[0],
      profile.student.complexity,
      profile.work.employerDependency,
      `Compared with ${other.name}, the listed student timeline is ${studentTime.minDays}-${studentTime.maxDays} days and the listed work timeline is ${workTime.minDays}-${workTime.maxDays} days, so the page still needs route-by-route judgment rather than a blanket yes.`,
    ],
  };
}

function buildPairFaqs(a: Country, b: Country, rows: ComparisonRow[]): ComparisonFaq[] {
  const tourist = getRow(rows, "tourist");
  const student = getRow(rows, "student");
  const work = getRow(rows, "work");
  const aProfile = getCompareCountryProfile(a.code);
  const bProfile = getCompareCountryProfile(b.code);
  const fasterTourist = compareLeader(a, b, tourist.aTime.maxDays, tourist.bTime.maxDays, "lower");
  const longerTourist = compareLeader(
    a,
    b,
    tourist.aVisa.stayDays,
    tourist.bVisa.stayDays,
    "higher",
  );
  const cheaperTourist = compareLeader(a, b, tourist.aVisa.feeUsd, tourist.bVisa.feeUsd, "lower");
  const fasterStudent = compareLeader(a, b, student.aTime.maxDays, student.bTime.maxDays, "lower");

  return [
    {
      question: `For a short-notice trip, is ${a.name} or ${b.name} less likely to collapse under timing pressure?`,
      answer: `${fasterTourist.winner.name} has the shorter published tourist window, but the better short-notice choice also depends on whether you can tolerate ${getCompareCountryProfile(fasterTourist.winner.code).hiddenCosts.tourist[0].toLowerCase()} In this pair, speed and operational smoothness are not exactly the same thing.`,
    },
    {
      question: `If I want to stay longer once approved, does ${a.name} or ${b.name} fit better?`,
      answer: `${longerTourist.winner.name} gives the longer tourist stay on the current table. ${a.name} offers ${formatDays(tourist.aVisa.stayDays)} and ${b.name} offers ${formatDays(tourist.bVisa.stayDays)}. The right answer still depends on whether that longer stay is worth the extra friction attached to that route.`,
    },
    {
      question: `For this exact pair, which student route is better for someone thinking beyond graduation?`,
      answer: `${a.name} is framed as ${aProfile.student.postStudy.toLowerCase()} ${b.name} is framed as ${bProfile.student.postStudy.toLowerCase()} If post-study continuity is the main decision factor, these two countries should not be treated as interchangeable even when tuition planning looks similar.`,
    },
    {
      question: `Where is employer dependency heavier between ${a.name} and ${b.name} work visas?`,
      answer: `${a.name}: ${aProfile.work.employerDependency} ${b.name}: ${bProfile.work.employerDependency} That difference matters more than the raw fee when the applicant wants control over the filing calendar.`,
    },
    {
      question: `Which side punishes weak paperwork more harshly in a ${a.name} vs ${b.name} comparison?`,
      answer: `${a.name} tends to punish weak paperwork through ${joinList(aProfile.delayDrivers.student)} ${b.name} tends to punish weak paperwork through ${joinList(bProfile.delayDrivers.student)} ${fasterStudent.winner.name} may look faster on paper, but a cleaner evidence package can reverse the practical experience.`,
    },
    {
      question: `Is the cheaper tourist fee in ${a.name} vs ${b.name} actually the better value?`,
      answer: `${cheaperTourist.winner.name} has the lower base tourist fee, but value depends on what happens after payment. In this pair, hidden costs include ${aProfile.hiddenCosts.tourist[1].toLowerCase()} on the ${a.name} side and ${bProfile.hiddenCosts.tourist[1].toLowerCase()} on the ${b.name} side.`,
    },
  ];
}

function buildInternalLinks(a: Country, b: Country): RelatedPageItem[] {
  const aEmbassy = getPrimaryEmbassyForCountry(a.code);
  const bEmbassy = getPrimaryEmbassyForCountry(b.code);

  return [
    {
      href: `/processing-times/${a.code}`,
      label: `${a.name} processing-time page`,
      description: `Open all current ${a.name} timing windows, embassy references, and category pages.`,
    },
    {
      href: `/processing-times/${b.code}`,
      label: `${b.name} processing-time page`,
      description: `Open all current ${b.name} timing windows, embassy references, and category pages.`,
    },
    {
      href: `/visa/${a.code}/tourist`,
      label: `${a.name} tourist visa guide`,
      description: `Inspect the exact visitor route behind this comparison.`,
    },
    {
      href: `/visa/${b.code}/tourist`,
      label: `${b.name} tourist visa guide`,
      description: `Inspect the exact visitor route behind this comparison.`,
    },
    {
      href: `/visa/${a.code}/student`,
      label: `${a.name} student visa guide`,
      description: `Review the study route, checklist pressure, and timing assumptions for ${a.name}.`,
    },
    {
      href: `/visa/${b.code}/work`,
      label: `${b.name} work visa guide`,
      description: `Review the work route, sponsorship framing, and timing assumptions for ${b.name}.`,
    },
    {
      href: `/embassy/${aEmbassy?.id ?? "new-delhi"}`,
      label: `${a.name} embassy contact page`,
      description: `See the primary official contact page used for ${a.name} route research.`,
    },
    {
      href: `/embassy/${bEmbassy?.id ?? "new-delhi"}`,
      label: `${b.name} embassy contact page`,
      description: `See the primary official contact page used for ${b.name} route research.`,
    },
  ];
}

function buildRelatedPages(a: Country, b: Country): RelatedPageItem[] {
  return [
    {
      href: `/visa/${a.code}/business`,
      label: `${a.name} business visa`,
      description: `Review the business route if your travel is commercial rather than leisure-led.`,
    },
    {
      href: `/visa/${b.code}/business`,
      label: `${b.name} business visa`,
      description: `Review the business route if your travel is commercial rather than leisure-led.`,
    },
    {
      href: `/visa/${a.code}/work`,
      label: `${a.name} work visa`,
      description: `Check sponsor, fee, validity, and timing details for ${a.name}.`,
    },
    {
      href: `/visa/${b.code}/student`,
      label: `${b.name} student visa`,
      description: `Check fee, timing, and supporting-evidence expectations for ${b.name}.`,
    },
    {
      href: "/tracker",
      label: "Application tracker",
      description: "Track whichever destination you choose with a route-by-route filing calendar.",
    },
  ];
}

function getRow(rows: ComparisonRow[], category: VisaCategory) {
  const row = rows.find((item) => item.category === category);
  if (!row) {
    throw new Error(`Missing comparison row for ${category}`);
  }
  return row;
}

function compareLeader(
  a: Country,
  b: Country,
  aValue: number,
  bValue: number,
  mode: "lower" | "higher",
) {
  if (aValue === bValue) {
    return { winner: a, tie: true };
  }
  const winner = mode === "lower" ? (aValue < bValue ? a : b) : aValue > bValue ? a : b;
  return { winner, tie: false };
}

function joinList(values: string[]) {
  if (values.length === 0) {
    return "route-specific operational checks.";
  }
  if (values.length === 1) {
    return `${values[0]}.`;
  }
  return `${values.slice(0, -1).join(" ")} ${values[values.length - 1]}`;
}

function countRequired(checklist: ReturnType<typeof getChecklist>) {
  if (!checklist) {
    return 0;
  }
  return checklist.documents.filter((document) => document.required).length;
}
