import type { VisaCategory } from "@/types/visa";

export interface CompareCountryProfile {
  filingStyle: string;
  visitorPositioning: string;
  hiddenCosts: Record<VisaCategory, string[]>;
  delayDrivers: {
    tourist: string[];
    business: string[];
    student: string[];
    work: string[];
  };
  stayPositioning: Record<VisaCategory, string>;
  student: {
    workRights: string;
    postStudy: string;
    complexity: string;
    financingPressure: string;
  };
  work: {
    sponsorship: string;
    employerDependency: string;
    approvalComplexity: string;
    applicantProfile: string;
  };
}

export const compareCountryProfiles: Record<string, CompareCountryProfile> = {
  usa: {
    filingStyle:
      "The United States is interview-led and consistency-heavy. Small mismatches between form answers, funding, and interview framing create more friction here than in most digital-first systems.",
    visitorPositioning:
      "The U.S. visitor route suits applicants who can tolerate a formal interview stage in exchange for long validity once approved.",
    hiddenCosts: {
      tourist: [
        "Interview-travel costs can matter if the nearest consular post is not local.",
        "A refused or rescheduled interview can force new transport and lodging spend before the trip even starts.",
      ],
      business: [
        "Employer letters and invitation packages need to line up tightly, which can add admin time before filing.",
        "Short-notice meetings are risky when interview availability is thinner than the posted processing window.",
      ],
      student: [
        "School-side timing, financial proof preparation, and interview readiness create more pre-filing effort than the fee alone suggests.",
        "Late visa clearance can disrupt housing and tuition deposit planning if the academic intake is near.",
      ],
      work: [
        "Employer-side petition sequencing can start the calendar well before the applicant files the visa case.",
        "Document gathering often expands into police, credential, and scheduling costs around the consular stage.",
      ],
    },
    delayDrivers: {
      tourist: [
        "Interview slot availability moves independently from adjudication time.",
        "Peak summer and holiday demand can push discretionary travel into a longer planning cycle.",
      ],
      business: [
        "Urgent commercial travel still depends on document consistency and interview scheduling.",
        "Borderline business-purpose cases attract closer review when productive work could be inferred.",
      ],
      student: [
        "Academic-intake surges compress interview capacity.",
        "Funding explanations and course-intent clarity affect how predictable the case feels.",
      ],
      work: [
        "Employer petitions and visa issuance are separate moving parts.",
        "Security, credential, and role-specific checks can outlast the advertised visa window.",
      ],
    },
    stayPositioning: {
      tourist:
        "Long validity and long visitor stays make the U.S. attractive for repeat travel planning once the initial hurdle is cleared.",
      business:
        "The route works well for repeated meetings if the traveler can justify the purpose cleanly at every step.",
      student:
        "The student route is built for committed academic moves rather than casual trial study.",
      work: "The work route fits employer-backed relocation more than flexible self-directed mobility.",
    },
    student: {
      workRights:
        "Student work rights are more structured and compliance-sensitive than in countries where off-campus work is normalized from day one.",
      postStudy:
        "Post-study planning is possible, but it depends heavily on employer timing and the graduate's ability to convert academic status into a compliant work route.",
      complexity:
        "This is a high-control student route: admission, funding, timing, and interview narrative all need to support the same story.",
      financingPressure:
        "Applicants are expected to show a credible funding plan rather than a loose intention to pay later.",
    },
    work: {
      sponsorship:
        "Sponsorship is formal and front-loaded. Employer action usually determines whether the route exists at all.",
      employerDependency:
        "Employer dependency is high because role eligibility, petition timing, and filing strategy sit largely with the sponsor.",
      approvalComplexity:
        "Approval complexity is elevated by dual-track review: employer-side processing first, applicant-side issuance after that.",
      applicantProfile:
        "Best for applicants with a clear employer-backed role and tolerance for a more procedural route.",
    },
  },
  canada: {
    filingStyle:
      "Canada is portal-driven but evidence-heavy. The system is usually easier to start than interview-first routes, yet biometrics, medicals, and residence-based processing logic create their own friction.",
    visitorPositioning:
      "Canada suits travelers who want a structured digital process and are comfortable with biometrics-driven documentation.",
    hiddenCosts: {
      tourist: [
        "Biometrics appointments can add cost and time outside the headline visitor fee.",
        "Residence-country processing means the true calendar may be shaped by local application volume rather than destination demand alone.",
      ],
      business: [
        "Short meetings can become expensive if biometrics or supporting employer paperwork is still outstanding.",
        "Business travelers often spend more time coordinating proof of commercial purpose than the base fee suggests.",
      ],
      student: [
        "Medicals, biometrics, and proof-of-funds packaging can widen total filing cost.",
        "Academic-intake timing can force earlier deposits or housing commitments before approval lands.",
      ],
      work: [
        "Employer-side approvals or compliance steps may drive timeline and documentation cost before the visa stage becomes active.",
        "Medical and biometrics steps can turn a moderate filing fee into a heavier total application cost.",
      ],
    },
    delayDrivers: {
      tourist: [
        "Biometrics availability is often a practical bottleneck.",
        "Published timing varies with the applicant's country of residence, not just with Canada itself.",
      ],
      business: [
        "Commercial trips can slow down when supporting letters do not explain the business purpose precisely.",
        "Last-minute business travel is vulnerable if biometrics are still pending.",
      ],
      student: [
        "Intake-season surges and document completeness matter more than a small advertised timing gap.",
        "Funding and medical review can extend the real calendar beyond a simple portal estimate.",
      ],
      work: [
        "Employer-side approvals and occupation fit influence the entire route.",
        "Work cases become slower when medical, biometrics, and employer documents do not arrive in sequence.",
      ],
    },
    stayPositioning: {
      tourist:
        "Canada's long visitor stay allowance helps travelers who want more time on the ground without chasing constant renewals.",
      business:
        "The route works for travelers who value predictable digital steps over instant turnarounds.",
      student:
        "Canada is a strong fit for applicants who treat study as a longer pathway decision, not just a classroom entry permit.",
      work: "The work route fits applicants who can handle both employer compliance and applicant-side documentation with discipline.",
    },
    student: {
      workRights:
        "Student status is often paired with practical work planning, so the route appeals to applicants who want study and limited employment to coexist in one plan.",
      postStudy:
        "Canada is usually stronger when the graduate cares about what comes after school, because study is often framed as part of a wider temporary-to-longer-term path.",
      complexity:
        "Complexity sits in proof of funds, biometrics, and completeness rather than in a high-pressure interview narrative.",
      financingPressure:
        "Funding evidence still carries weight because the route expects tuition and living-cost planning to be credible from the start.",
    },
    work: {
      sponsorship:
        "Sponsorship is structured but more operations-driven than interview-driven. Employer readiness and occupation fit do most of the heavy lifting.",
      employerDependency:
        "Dependency is high, but the friction often comes from employer compliance and supporting approvals rather than from personal interviewing.",
      approvalComplexity:
        "Approval complexity rises when biometrics, medicals, and employer-side approvals do not line up cleanly.",
      applicantProfile:
        "Best for applicants who want a rules-based filing path and can assemble a complete evidence package early.",
    },
  },
  uk: {
    filingStyle:
      "The UK sits between a classic consular route and a modern service route. It can reward premium processing access, but documentation quality still matters because the system is strict about the route matching the trip purpose.",
    visitorPositioning:
      "The UK suits travelers who value a familiar route structure and can pay for speed when premium options are available.",
    hiddenCosts: {
      tourist: [
        "Priority services can materially change the total cost if timing matters.",
        "Financial-document formatting issues often trigger rework even when the base visa fee looks manageable.",
      ],
      business: [
        "Business travelers may spend extra on premium handling when meetings are date-bound.",
        "Employer and host documentation needs to describe permitted activities carefully to avoid route mismatch.",
      ],
      student: [
        "Financial proof, health-related charges, and intake timing can push total cost far above the headline visa fee.",
        "Late document fixes are expensive because accommodation and course-start deadlines keep moving.",
      ],
      work: [
        "Sponsor-side readiness and route-specific charges can outweigh the visa fee itself.",
        "Applicants often incur added cost when the employer timeline and the worker's document timeline are not synchronized.",
      ],
    },
    delayDrivers: {
      tourist: [
        "Priority capacity changes by season and location.",
        "Financial evidence quality is a common source of preventable delay.",
      ],
      business: [
        "Trip-purpose wording matters when business activity sits close to productive work.",
        "Premium-service availability can create a two-speed system for otherwise similar cases.",
      ],
      student: [
        "Academic deadlines compress the filing calendar even when standard processing looks reasonable.",
        "Students with weak financial packaging usually feel more friction than the raw timing table suggests.",
      ],
      work: [
        "Sponsor readiness and route-specific documentation are the main delay drivers.",
        "The application becomes less predictable when employer documentation arrives late or changes mid-process.",
      ],
    },
    stayPositioning: {
      tourist:
        "Long tourist stays make the UK practical for extended visits, especially when the traveler values English-language route clarity.",
      business:
        "The route is strong for conference and meeting travel when the activity stays clearly within visitor rules.",
      student:
        "The student route fits applicants who can manage formal financial evidence and a time-sensitive intake cycle.",
      work: "The work route is best for applicants who already have a sponsor-ready employer and want a clearly defined permission set.",
    },
    student: {
      workRights:
        "Student work rights are present, but the route expects the applicant to stay disciplined about the conditions attached to study-led status.",
      postStudy:
        "The UK is appealing when the graduate wants a visible bridge between study and early-career work planning, even if the route still depends on later employer alignment.",
      complexity:
        "The route is document-sensitive rather than portal-light. Financial proof and category fit carry real weight.",
      financingPressure:
        "Financial evidence format is a meaningful pressure point, not just a box-ticking step.",
    },
    work: {
      sponsorship:
        "Work entry is sponsor-led and compliance-conscious. The route behaves well when the employer is already organized.",
      employerDependency:
        "Employer dependency is high because the sponsor controls much of the case architecture.",
      approvalComplexity:
        "Approval complexity is moderate to high: the route is clear on paper, but unforgiving when sponsor or applicant paperwork is weak.",
      applicantProfile:
        "Best for applicants who already have a route-ready employer and want a relatively explicit work permission framework.",
    },
  },
  australia: {
    filingStyle:
      "Australia is digital-first but subclass-sensitive. The portal experience is modern, yet the real friction comes from picking the right route and supporting it with the evidence expected for that subclass.",
    visitorPositioning:
      "Australia suits travelers who prefer a digital application flow and can navigate subclass choice carefully.",
    hiddenCosts: {
      tourist: [
        "Using the wrong visitor subclass can create rework even when the base filing fee looks clear.",
        "Health, character, or supporting-evidence requests can expand total prep time and cost.",
      ],
      business: [
        "Business visitors may spend more time than expected on route selection and evidence packaging because subclass fit matters.",
        "Late changes to trip purpose can trigger rework if the filing started under the wrong route assumptions.",
      ],
      student: [
        "Financial proof, health checks, and school-start timing can push the total commitment above the listed fee.",
        "A weak explanation of study purpose creates downstream cost through delay, not just through paperwork.",
      ],
      work: [
        "Employer sponsorship and subclass selection can expand legal and document-prep costs before a visa decision is even in view.",
        "Skills, health, and background requirements often create a broader prep budget than applicants expect.",
      ],
    },
    delayDrivers: {
      tourist: [
        "Subclass misalignment is a recurring source of slower review.",
        "Health or character checks can push a digital-first route into a longer holding pattern.",
      ],
      business: [
        "Route-fit questions slow cases when business activity is not described sharply.",
        "Digital filing helps, but evidence quality still controls how smooth the process feels.",
      ],
      student: [
        "Intake timing and proof-of-purpose issues can dominate the decision window.",
        "The route becomes slower when the case invites deeper review of study intent or finances.",
      ],
      work: [
        "Subclass logic and employer readiness are the central timing variables.",
        "Skills, health, and supporting checks can stack rather than run in a neat single sequence.",
      ],
    },
    stayPositioning: {
      tourist:
        "Australia works for travelers who want a digital visitor route and are comfortable with subclass-specific logic.",
      business:
        "The business side suits applicants who can explain a narrow and legitimate temporary purpose without ambiguity.",
      student:
        "The student route fits applicants with a serious education plan and enough time to prepare a clean narrative.",
      work: "The work route is strongest for applicants entering with a defined employer or skill pathway rather than open-ended exploration.",
    },
    student: {
      workRights:
        "Student work is part of the planning conversation, but compliance still matters because the route is fundamentally study-led.",
      postStudy:
        "Australia is attractive when the applicant sees study as one stage in a broader migration or professional progression story.",
      complexity:
        "Complexity sits in subclass fit, study-purpose coherence, and supporting checks rather than in a classic embassy interview dynamic.",
      financingPressure:
        "Funding proof and the explanation of why the course makes sense are both meaningful review points.",
    },
    work: {
      sponsorship:
        "Sponsorship and subclass fit define the route. Filing discipline matters because the employer pathway is not interchangeable with a simple visitor plan.",
      employerDependency:
        "Employer dependency is high when the route is sponsorship-led, but subclass selection also shapes how exposed the applicant is to rework.",
      approvalComplexity:
        "Approval complexity is moderate to high because skills, health, employer, and subclass requirements can all interact.",
      applicantProfile:
        "Best for applicants who are comfortable with a digital system and a more classification-heavy route structure.",
    },
  },
  germany: {
    filingStyle:
      "Germany combines relatively clear route logic with old-world friction around appointments, translations, and document formalities. The rule set may look orderly, but the operational queue can still dominate the calendar.",
    visitorPositioning:
      "Germany suits travelers who can work within Schengen-style documentation and are prepared for appointment-led friction.",
    hiddenCosts: {
      tourist: [
        "Translations, insurance, and appointment logistics can matter more than the base Schengen fee.",
        "If the nearest mission has a backlog, the real cost includes calendar risk rather than only money.",
      ],
      business: [
        "Business filings can pick up extra prep cost through invitation formatting, insurance, and supporting paperwork.",
        "Appointment scarcity can make a low fee less meaningful for fixed-date travel.",
      ],
      student: [
        "Blocked-funds style preparation, translations, and legalization can widen the practical cost of study filing.",
        "Housing and enrollment planning often move ahead while the visa process is still catching up.",
      ],
      work: [
        "Credential recognition, translations, and legalization can create a heavier pre-filing workload than the fee suggests.",
        "Appointment timing sometimes matters more than formal adjudication speed.",
      ],
    },
    delayDrivers: {
      tourist: [
        "Appointment backlogs are often the real bottleneck.",
        "Mission-specific document expectations can trigger avoidable rework.",
      ],
      business: [
        "Time-sensitive meetings are vulnerable when appointment access is tight.",
        "Insurance and supporting-document mismatches slow otherwise simple cases.",
      ],
      student: [
        "Document formality, translations, and funding proof make the route preparation-heavy.",
        "University timing and local registration needs can compress the calendar around the visa stage.",
      ],
      work: [
        "Qualifications, contract structure, and mission availability all influence the route.",
        "Work cases become slower when the applicant underestimates paperwork formality.",
      ],
    },
    stayPositioning: {
      tourist:
        "Germany's short-stay model fits precise Schengen trips better than open-ended visitor travel.",
      business:
        "The route works for tightly defined business visits where the travel calendar is known in advance.",
      student:
        "Germany suits students willing to trade more front-loaded preparation for a structured long-stay academic route.",
      work: "The work route fits applicants comfortable with formal documentation and a more administrative style of migration planning.",
    },
    student: {
      workRights:
        "Students often view Germany as compatible with practical work planning, but the route remains formal and document-heavy.",
      postStudy:
        "Germany is attractive to applicants who see study as a bridge into a labor market that values credentials and orderly status transitions.",
      complexity:
        "The complexity is administrative: translations, funding proof, and appointment handling do more damage than flashy interview pressure.",
      financingPressure:
        "Financial readiness is judged through a structured proof model, so applicants need funding clarity early.",
    },
    work: {
      sponsorship:
        "The route is employer-anchored, but the practical burden often sits in proving qualifications and document formality.",
      employerDependency:
        "Employer dependency is high for contract-backed entry, yet applicant-side paperwork quality can still become the main bottleneck.",
      approvalComplexity:
        "Approval complexity is moderate to high because recognition, translations, and appointment timing can all become gating issues.",
      applicantProfile:
        "Best for applicants who prefer a rule-structured system and can tolerate a more administrative filing culture.",
    },
  },
  uae: {
    filingStyle:
      "The UAE is fast and operationally digital on short-stay routes, but sponsor-backed categories create a different experience once the traveler moves from visit planning into work or residency logic.",
    visitorPositioning:
      "The UAE suits travelers who prioritize speed and a relatively direct digital visitor process.",
    hiddenCosts: {
      tourist: [
        "Sponsor or service-provider handling can affect the real cost even on simple visitor routes.",
        "Corrections to passport or photo files can create delay that feels operational rather than legal.",
      ],
      business: [
        "Short-stay commercial visits may still involve sponsor-side coordination that adds practical friction beyond the fee.",
        "Fast filing is valuable, but urgency often shifts cost into service handling rather than into the government charge alone.",
      ],
      student: [
        "Education-linked sponsorship structure can affect the total cost picture beyond the base visa line item.",
        "Residency-related admin steps can matter more than the filing fee itself.",
      ],
      work: [
        "Work entry often expands into labor and residency processing steps beyond the first permit stage.",
        "Employer-admin dependency can create downstream cost when records or sponsor-side actions are delayed.",
      ],
    },
    delayDrivers: {
      tourist: [
        "File quality, especially passport and photo accuracy, is a practical delay driver.",
        "Sponsor or service-channel responsiveness influences the real timeline.",
      ],
      business: [
        "Commercial travel is usually fast, but sponsor-side coordination still matters.",
        "Cases slow down when the traveler expects a simple visitor path but the planned activity requires something more structured.",
      ],
      student: [
        "Institution and sponsor coordination shape the route more than classic embassy bottlenecks.",
        "Residency-linked admin steps can stretch the calendar beyond the initial visa issuance stage.",
      ],
      work: [
        "Work and residency approvals sit on more than one operational track.",
        "Employer readiness drives the speed difference between a smooth case and a frustrating one.",
      ],
    },
    stayPositioning: {
      tourist:
        "The UAE is strong for short, fast-planned trips where digital speed matters more than long visitor duration.",
      business:
        "The route fits travelers whose meeting schedule is fixed and who need a fast pre-trip decision.",
      student:
        "The student side is narrower and more institution-linked than study systems built around long-run migration planning.",
      work: "The work route suits applicants who already have a sponsor-ready employer and care more about operational speed than independence.",
    },
    student: {
      workRights:
        "Student work planning is more constrained by sponsor and institution structure than in countries where part-time work is a core selling point of the route.",
      postStudy:
        "Post-study continuity exists mainly when the graduate can move quickly into an employer-backed status rather than relying on a broad graduate transition ecosystem.",
      complexity:
        "Complexity is moderate: the route is not usually interview-heavy, but it is sensitive to sponsor, institution, and residency administration.",
      financingPressure:
        "Funding still matters, though the route conversation is often more operational than academic-policy driven.",
    },
    work: {
      sponsorship:
        "Sponsorship is central. The route effectively runs on employer and residency-system coordination.",
      employerDependency:
        "Employer dependency is very high because the sponsor often controls both entry and in-country status progression.",
      approvalComplexity:
        "Approval complexity is concentrated in sponsor execution rather than in long narrative review.",
      applicantProfile:
        "Best for applicants who already have a committed employer and value speed over autonomy.",
    },
  },
  india: {
    filingStyle:
      "India is a split system: short-stay e-visa routes can feel fast and lightweight, while longer-stay sticker or mission-led routes behave more traditionally and become more documentation-sensitive.",
    visitorPositioning:
      "India suits travelers who want a low-fee digital short-stay option and can meet file-quality requirements cleanly.",
    hiddenCosts: {
      tourist: [
        "Photo and passport-scan mistakes can create repeat work that is cheap in fee terms but expensive in travel certainty.",
        "Restricted-area planning can add permits or extra coordination beyond the base tourist visa process.",
      ],
      business: [
        "A low fee does not remove the need for clean invitation and business-purpose evidence.",
        "Where e-visa is not the right fit, the process can become more traditional and less friction-free than the headline price suggests.",
      ],
      student: [
        "Institution documents, funding proof, and route selection can turn a moderate filing fee into a more involved academic move.",
        "Applicants who need long-stay certainty may face more planning overhead than the quick tourist route implies.",
      ],
      work: [
        "Employer documents and long-stay review create a different cost profile from the fast e-visa categories.",
        "Administrative fixes after filing can be cheap financially but costly in calendar risk if employment start dates are fixed.",
      ],
    },
    delayDrivers: {
      tourist: [
        "Most avoidable delay comes from image quality, passport upload issues, or route mismatch.",
        "Fast e-visa expectations can lead applicants to underestimate preparation quality.",
      ],
      business: [
        "Business cases slow when the route chosen does not match the real activity pattern.",
        "Invitation quality still matters even where the fee is low.",
      ],
      student: [
        "Long-stay student routes are slower and more documentation-led than tourist expectations would suggest.",
        "Institution timing and completeness matter more than the applicant usually expects from looking at e-visa messaging.",
      ],
      work: [
        "Work cases involve deeper manual review than short-stay categories.",
        "Employer documentation and route correctness are the main stability factors.",
      ],
    },
    stayPositioning: {
      tourist:
        "India works best for short, low-cost trips where the traveler values e-visa speed more than long stay length.",
      business:
        "The route is strong for clear short commercial visits when the chosen filing path matches the trip purpose.",
      student:
        "The student side fits applicants committed to the institution and comfortable with a more traditional long-stay review process.",
      work: "The work route suits applicants with a real employer-backed move rather than anyone trying to stretch a visit route into a work plan.",
    },
    student: {
      workRights:
        "Student work planning is not the main selling point of the route, so applicants usually prioritize admission and compliance over flexible in-study employment.",
      postStudy:
        "Post-study continuity depends more on finding a separate compliant route than on a broad built-in graduate transition model.",
      complexity:
        "Complexity is moderate to high because the system feels very different once the applicant leaves e-visa-style expectations and enters long-stay review.",
      financingPressure:
        "Funding and institution alignment still matter, especially because the route is less forgiving when the academic purpose is weakly explained.",
    },
    work: {
      sponsorship:
        "Sponsorship is central for genuine work entry, even though India is often perceived through its quick short-stay digital routes.",
      employerDependency:
        "Employer dependency is high because the work route is meaningfully different from the tourist and business experience.",
      approvalComplexity:
        "Approval complexity rises when applicants assume long-stay work review will behave like short-stay e-visa processing.",
      applicantProfile:
        "Best for applicants with a real employer-backed move who can separate work planning from the country's faster short-stay reputation.",
    },
  },
};

export const getCompareCountryProfile = (countryCode: string) =>
  compareCountryProfiles[countryCode.toLowerCase()];
