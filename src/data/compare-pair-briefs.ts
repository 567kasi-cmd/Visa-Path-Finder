export interface ComparePairBrief {
  angle: string;
  feeFocus: string;
  processingFocus: string;
  stayFocus: string;
  studentFocus: string;
  workFocus: string;
  decisionFocus: string;
}

const briefs: Record<string, ComparePairBrief> = {
  "australia-germany": {
    angle:
      "Australia vs Germany is a contrast between a digital subclass system and a formality-heavy Schengen plus national-visa environment. The pair only looks similar when you stop at headline processing numbers.",
    feeFocus:
      "The fee story is really about what sits around the fee: Australia adds subclass and supporting-check risk, while Germany adds translations, insurance, and appointment drag.",
    processingFocus:
      "Australia slows when route fit or supporting checks become complex; Germany slows when document formalities and appointment access take over the calendar.",
    stayFocus:
      "This pair separates travelers who want a digitally managed long-haul filing from travelers who are comfortable with a shorter-stay European logic and heavier formality.",
    studentFocus:
      "For students, Australia is about pathway design and study narrative, while Germany is about funding proof, administrative discipline, and living with a more formal long-stay setup.",
    workFocus:
      "For work routes, Australia feels classification-heavy and Germany feels paperwork-heavy; the deciding factor is whether the applicant fears subclass complexity or document formalities more.",
    decisionFocus:
      "Choose Australia for a digital pathway mindset and Germany for a rule-structured European route if the paperwork burden is acceptable.",
  },
  "australia-india": {
    angle:
      "Australia vs India is not a simple digital-versus-digital comparison. Australia uses a modern but classification-heavy system, while India splits between very fast short-stay e-visa logic and a more traditional long-stay process.",
    feeFocus:
      "India can look dramatically cheaper on short-stay categories, but that advantage narrows when the traveler needs a cleaner long-stay plan rather than a low-cost quick entry.",
    processingFocus:
      "Australia's delays come from subclass fit and supporting checks; India's delays come from route mismatch and the jump from e-visa expectations into manual long-stay review.",
    stayFocus:
      "This pair separates low-cost short-stay visitors from travelers who need a more stable long-haul permission structure with clearer validity planning.",
    studentFocus:
      "Australia is stronger for applicants thinking in pathways and progression, while India is stronger for institution-led study decisions where post-study mobility is not the main goal.",
    workFocus:
      "Australia rewards applicants who can navigate subclass and sponsorship logic; India rewards applicants who can keep short-stay assumptions completely separate from genuine work-visa planning.",
    decisionFocus:
      "Choose India for low-cost short visits and choose Australia for route clarity when the move is education- or work-led.",
  },
  "australia-uae": {
    angle:
      "Australia vs the UAE compares two operational systems that solve different traveler problems. Australia is route-architecture heavy; the UAE is speed-first on short stays and sponsor-first on long stays.",
    feeFocus:
      "The UAE can win on fast visitor access even when total sponsor handling changes the real cost, while Australia can justify a higher fee when the applicant wants a more stable long-range route design.",
    processingFocus:
      "Australia gets slower when subclass or supporting checks widen; the UAE gets slower when sponsor execution and residency administration take over after the initial fast start.",
    stayFocus:
      "This pair separates short-trip efficiency from structured long-haul planning. The better destination depends on whether the user values immediate entry speed or route depth.",
    studentFocus:
      "Australia offers a fuller study-and-progression conversation, while the UAE is more institution- and sponsor-linked for students who are not using education as a migration platform.",
    workFocus:
      "Australia is about sponsorship plus subclass logic; the UAE is about employer control plus residency execution. Both need sponsorship, but the operational feel is very different.",
    decisionFocus:
      "Choose the UAE for fast business or visitor decisions and Australia for applicants who need a more developed study or work pathway.",
  },
  "canada-australia": {
    angle:
      "Canada vs Australia is one of the most useful digital-route comparisons in the site because both countries feel modern on the surface but diverge sharply underneath: Canada leans on biometrics and residence-based processing, while Australia leans on subclass fit.",
    feeFocus:
      "The fee gap only matters after you account for biometrics, health checks, subclass mistakes, and how much pre-filing evidence each system expects.",
    processingFocus:
      "Canada slows through biometrics and completeness; Australia slows through route choice and supporting checks. Similar timelines can still produce very different applicant stress.",
    stayFocus:
      "This pair separates travelers who value long visitor stays and pathway-oriented planning from travelers who prefer a digital system built around route classification.",
    studentFocus:
      "Canada is stronger when post-study planning is central. Australia is stronger when the applicant wants a study route that can fit a broader progression story but can also handle more classification logic.",
    workFocus:
      "Canada makes more sense for rules-based employer compliance planning; Australia makes more sense when the applicant can absorb subclass complexity in exchange for a clearer route structure.",
    decisionFocus:
      "Choose Canada for pathway-minded study or work planning and Australia for applicants comfortable with a more classification-driven digital system.",
  },
  "canada-germany": {
    angle:
      "Canada vs Germany compares a biometrics-led digital system with a formal appointment-and-document system. They solve the same trip goals through very different administrative cultures.",
    feeFocus:
      "Germany can look cheaper on paper, but translations, insurance, and appointment drag often matter as much as the fee. Canada can look more expensive, but biometrics and digital completeness create a different type of overhead.",
    processingFocus:
      "Canada's timing risk sits in biometrics and residence-country queues. Germany's timing risk sits in appointments and document formalities before adjudication even starts.",
    stayFocus:
      "This pair separates long visitor-stay planning from short-stay Schengen logic and helps travelers decide whether they prefer digital submission or administrative formality.",
    studentFocus:
      "Canada favors students who want a fuller post-study story. Germany favors students who are prepared for stricter funding proof and a more administrative academic move.",
    workFocus:
      "Canada fits employer-compliance and biometrics-driven planning; Germany fits applicants who can tolerate credential and paperwork formalities for a structured European work route.",
    decisionFocus:
      "Choose Canada when digital process and pathway planning matter more; choose Germany when the applicant wants a more formal but structured European route.",
  },
  "canada-india": {
    angle:
      "Canada vs India compares a residence-based digital filing system with a split ecosystem where short-stay e-visas and longer-stay manual routes behave almost like different products.",
    feeFocus:
      "India can win on fee very quickly for visitors, but Canada can be better value when the traveler needs more stable long-stay planning and is willing to pay for it.",
    processingFocus:
      "Canada slows through biometrics, medicals, and completeness; India slows when applicants mistake quick e-visa expectations for how student or work routes really behave.",
    stayFocus:
      "This pair separates low-fee short-stay travel from longer-form academic and work planning with more predictable route architecture.",
    studentFocus:
      "Canada is stronger for students planning beyond graduation. India is stronger when the decision is institution-first and long-term migration flexibility is not the core objective.",
    workFocus:
      "Canada rewards employer-compliance planning; India rewards applicants who keep genuine work entry separate from the country's faster short-stay reputation.",
    decisionFocus:
      "Choose India for efficient short visits and Canada for applicants who need a more developed long-stay framework.",
  },
  "canada-uae": {
    angle:
      "Canada vs the UAE is a classic contrast between a fuller compliance-heavy system and a fast operational system. They can both serve business and visitor travel, but they do so with completely different risk profiles.",
    feeFocus:
      "The UAE can look cheaper in effort because of speed, while Canada can justify higher total cost when the traveler needs longer stays or a route with stronger longer-term scaffolding.",
    processingFocus:
      "Canada's delays come from biometrics and residence-based queues; UAE delays come from sponsor execution and residency administration once the route goes beyond a simple visit.",
    stayFocus:
      "This pair separates fast short-stay access from long visitor-stay planning and helps users decide whether immediate speed or broader flexibility matters more.",
    studentFocus:
      "Canada is much stronger when study is part of a broader life plan. The UAE is better when the route is institution-anchored and the applicant is not relying on a broad graduate transition ecosystem.",
    workFocus:
      "Canada offers a more rules-based employer path; the UAE offers a more sponsor-controlled operational path. Both need preparation, but the type of dependency is different.",
    decisionFocus:
      "Choose the UAE for urgent short-stay or commercial use and Canada for longer-term study or work planning.",
  },
  "canada-uk": {
    angle:
      "Canada vs the UK compares two English-language systems that often appear on the same shortlist but diverge on what creates friction: Canada leans on biometrics and residence-based processing; the UK leans on financial-document quality and premium-service dynamics.",
    feeFocus:
      "The fee comparison is less important than the surrounding spend. Canada adds biometrics and medical pressure; the UK adds priority-service temptation and route-sensitive documentation risk.",
    processingFocus:
      "Canada delays through completeness and biometrics. The UK delays through document quality and whether premium capacity is available when timing is tight.",
    stayFocus:
      "This pair separates long visitor-stay planning with a digital workflow from a route that can be attractive for extended English-language visits if the applicant can manage the supporting evidence cleanly.",
    studentFocus:
      "Canada is stronger for pathway-driven students. The UK is stronger for applicants who want an English-language route with clearer sponsor structure and are comfortable with formal financial evidence.",
    workFocus:
      "Canada is more operations-driven on the employer side; the UK is more sponsor-structured and can be very clean when the employer is already route-ready.",
    decisionFocus:
      "Choose Canada for broader pathway planning and the UK for applicants who value route clarity and can manage a stricter document standard.",
  },
  "germany-india": {
    angle:
      "Germany vs India is one of the clearest examples of why compare pages need editorial depth. Germany is formal, appointment-led, and documentation-heavy; India can be extremely quick and cheap for short stays but behaves very differently once the route becomes long-stay and manual.",
    feeFocus:
      "India can dominate on short-stay price, but Germany can still be the better value when the traveler needs a more structured long-stay European route and accepts the admin burden.",
    processingFocus:
      "Germany slows through appointments and document formalities; India slows when an applicant underestimates the gap between fast e-visa routes and slower long-stay categories.",
    stayFocus:
      "This pair separates Schengen-style administrative discipline from low-cost digital short-stay access and is especially useful for travelers deciding whether they need Europe or simply a fast visa result.",
    studentFocus:
      "Germany is stronger for students prepared for funding proof and administrative rigor. India is stronger for applicants whose decision is driven by the institution rather than by broad post-study mobility.",
    workFocus:
      "Germany's work route is formal and credential-heavy; India's work route is more about keeping genuine employer entry separate from the country's quick-visit reputation.",
    decisionFocus:
      "Choose India for low-cost short visits and choose Germany when the real goal is a more structured European study or work move.",
  },
  "germany-uae": {
    angle:
      "Germany vs the UAE compares two almost opposite filing cultures: one is documentation-formal and appointment-shaped, the other is speed-oriented on visits but sponsor-dominated on work and residency.",
    feeFocus:
      "Germany can look cheap but become expensive in admin time; the UAE can look operationally easy on short stays but more dependent on sponsor handling once the route deepens.",
    processingFocus:
      "Germany's real delay sits before or around submission. The UAE's real delay often sits after the initial fast promise, when sponsor execution and residency steps begin.",
    stayFocus:
      "This pair separates European formalism from Gulf operational speed and helps travelers choose between structured administration and fast short-stay movement.",
    studentFocus:
      "Germany is stronger for applicants who care about an academic route with formal long-stay structure. The UAE is stronger for students whose plans remain institution- and sponsor-linked rather than pathway-driven.",
    workFocus:
      "Germany is document-formal and qualification-focused; the UAE is sponsor-controlled and operational. The right choice depends on which type of dependence feels safer to the applicant.",
    decisionFocus:
      "Choose the UAE for speed-sensitive short stays and Germany for applicants willing to trade speed for a more formal European route structure.",
  },
  "uk-australia": {
    angle:
      "UK vs Australia is a useful English-language comparison because both can look accessible at first glance while hiding very different types of friction. The UK is document- and premium-service sensitive; Australia is subclass- and narrative-sensitive.",
    feeFocus:
      "The fee difference matters less than the kind of rework each system can force. UK applicants pay for urgency and financial-document precision; Australia applicants pay for subclass mistakes and supporting-check drag.",
    processingFocus:
      "UK timing swings with premium-service access and evidence quality. Australia timing swings with route selection and supporting checks.",
    stayFocus:
      "This pair separates long visitor-stay comfort in a familiar route structure from a more classification-led digital system that can still be attractive for long-haul planning.",
    studentFocus:
      "The UK suits students comfortable with financial-proof scrutiny and a visible graduate bridge. Australia suits students who want a broader pathway story and can defend course choice convincingly.",
    workFocus:
      "The UK is sponsor-explicit; Australia is subclass-explicit. Both can work well, but they demand different kinds of discipline from the applicant and employer.",
    decisionFocus:
      "Choose the UK for route clarity and premium-service logic; choose Australia for digital filing and a broader progression story.",
  },
  "uk-germany": {
    angle:
      "UK vs Germany compares a long-stay-friendly visitor culture with a shorter Schengen-style stay culture. The pair becomes especially useful when the traveler needs Europe but is unsure whether speed, duration, or document style matters most.",
    feeFocus:
      "Germany can undercut the UK on fee, but the UK can justify higher spend if the traveler values longer visitor stays or premium processing options when timing is tight.",
    processingFocus:
      "The UK slows through document quality and premium capacity; Germany slows through appointments and formal paperwork. Similar timelines hide very different operational risks.",
    stayFocus:
      "This pair is about long visitor access versus shorter-stay European logic as much as it is about price or timing.",
    studentFocus:
      "The UK is stronger for students who want a clearer bridge from study into early-career planning. Germany is stronger for students willing to trade administrative rigor for a more formal European academic route.",
    workFocus:
      "The UK is sponsor-led with explicit route structure; Germany is employer-led with stronger weight on qualifications and administrative paperwork.",
    decisionFocus:
      "Choose the UK for longer-stay comfort and choose Germany for a more formal European route if the shorter-stay logic is acceptable.",
  },
  "uk-india": {
    angle:
      "UK vs India is not just a price comparison. The UK is a higher-friction but more stable long-visit and long-stay framework; India is a lower-cost and faster short-stay system that changes character once the route becomes student or work-led.",
    feeFocus:
      "India can win decisively on visitor cost, but the UK can be better value when the traveler needs longer stays, cleaner route separation, or a more predictable long-stay framework.",
    processingFocus:
      "The UK slows through document quality and premium-service dynamics; India slows when applicants rely on e-visa expectations for routes that are no longer truly e-visa-like.",
    stayFocus:
      "This pair separates low-cost short visits from higher-control long-visit planning and is especially useful for travelers deciding between affordability and route stability.",
    studentFocus:
      "The UK is stronger when post-study planning matters. India is stronger when the institution itself drives the choice and the student is not using the route as a migration strategy.",
    workFocus:
      "The UK offers a more explicit sponsor route; India requires applicants to keep genuine work planning separate from the country's quick digital visitor reputation.",
    decisionFocus:
      "Choose India for inexpensive short travel and the UK for applicants who need longer visitor comfort or a more explicit long-stay route structure.",
  },
  "uk-uae": {
    angle:
      "UK vs the UAE compares two very different ways to solve urgent travel. The UK can be fast when premium capacity is available; the UAE is fast by default on many short-stay routes but becomes sponsor-dominated on deeper categories.",
    feeFocus:
      "The UK can become expensive when speed is purchased through premium handling, while the UAE can become operationally expensive when sponsor or residency handling shapes the real route cost.",
    processingFocus:
      "UK delays reflect document quality and service-tier access. UAE delays reflect sponsor execution, file quality, and residency admin after the initial quick decision stage.",
    stayFocus:
      "This pair separates longer visitor access under a formal route from very fast short-stay access under a more operational Gulf system.",
    studentFocus:
      "The UK is clearly stronger for pathway-minded students. The UAE is more suitable when study remains institution-linked rather than part of a broader graduate mobility plan.",
    workFocus:
      "The UK is sponsor-structured; the UAE is sponsor-controlled. Both need an employer, but the applicant's independence inside the route differs sharply.",
    decisionFocus:
      "Choose the UAE for fast short-stay commercial use and the UK for longer-stay or pathway-conscious education and work planning.",
  },
  "usa-australia": {
    angle:
      "United States vs Australia compares two popular long-haul destinations that feel very different to file for. The U.S. is interview-driven and narrative-sensitive; Australia is digital-first and subclass-sensitive.",
    feeFocus:
      "Australia's visitor fee can be easier to justify when the traveler wants a digital flow, while the U.S. fee can still make sense for repeat travelers who value long validity after surviving the initial interview burden.",
    processingFocus:
      "U.S. delay risk sits in interview access and consular sequencing. Australian delay risk sits in route choice, supporting checks, and subclass fit.",
    stayFocus:
      "This pair separates long-validity interview-heavy planning from digital long-haul filing and is especially useful for travelers deciding whether they fear interviews or route classification more.",
    studentFocus:
      "The U.S. student route is tight and compliance-led. Australia is more pathway-oriented for students who can justify course choice and absorb more classification logic.",
    workFocus:
      "The U.S. is petition- and employer-sequenced; Australia is sponsorship- and subclass-sequenced. The right destination depends on where the applicant wants the complexity to sit.",
    decisionFocus:
      "Choose the U.S. for repeat-travel validity and a strong employer-backed plan; choose Australia for digital filing and broader route architecture.",
  },
  "usa-canada": {
    angle:
      "United States vs Canada is one of the most commercially relevant pairs in the site because it looks like a regional comparison but behaves like a comparison between two very different control systems: interview-led U.S. filing versus biometrics-led Canadian filing.",
    feeFocus:
      "Canada can look cheaper and more predictable on the visitor side, but the U.S. can justify higher cost when long validity and repeat travel are more valuable than simple first-trip efficiency.",
    processingFocus:
      "U.S. delays center on interview access and consular load. Canadian delays center on biometrics, completeness, and residence-based processing swings.",
    stayFocus:
      "This pair separates long-validity repeat travel from long-stay visitor comfort and is useful for applicants deciding whether they want interview risk or biometrics friction.",
    studentFocus:
      "Canada is usually stronger for pathway-minded students. The U.S. is stronger for applicants whose institution choice is fixed and who can tolerate a more controlled student compliance environment.",
    workFocus:
      "The U.S. work route is petition-heavy and employer-led; Canada's is employer-compliance and evidence-led. Both can work, but they hand control to different parts of the system.",
    decisionFocus:
      "Choose Canada for smoother digital planning and choose the U.S. for repeat-travel value or a tightly defined employer-backed move.",
  },
  "usa-germany": {
    angle:
      "United States vs Germany is a contrast between long-validity interview culture and shorter-stay Schengen formality. The pair is especially useful for travelers balancing repeat travel value against European paperwork discipline.",
    feeFocus:
      "Germany can win on base visitor fee, but the U.S. can still be better value for repeat travelers who benefit from long validity once approved. Germany adds translation, insurance, and appointment risk around that lower price point.",
    processingFocus:
      "U.S. cases slow through interview access. German cases slow through appointments and document formality. Both can feel bureaucratic, but the bureaucracy lands in different places.",
    stayFocus:
      "This pair separates long-validity visitor planning from shorter-stay European access and often changes answer depending on whether the traveler cares about one long trip or repeated future trips.",
    studentFocus:
      "The U.S. suits students committed to a specific institution and ready for a tightly controlled route. Germany suits students ready for more paperwork in exchange for a structured European academic pathway.",
    workFocus:
      "The U.S. is petition-heavy and sponsor-sequenced; Germany is qualification- and administration-heavy. The deciding factor is whether the applicant fears employer process or document formality more.",
    decisionFocus:
      "Choose Germany for a more formal European route and the U.S. for repeat-travel validity or a highly defined employer-backed plan.",
  },
  "usa-india": {
    angle:
      "United States vs India compares one of the site's most interview-heavy visitor experiences with one of its cheapest and fastest short-stay digital experiences. That makes the pair highly sensitive to the exact trip purpose.",
    feeFocus:
      "India can dominate on tourist and business fees, but the U.S. can still be the better value if the traveler benefits from long validity or needs a more stable long-stay route framework later.",
    processingFocus:
      "U.S. delays revolve around interviews and consular sequencing. Indian delays revolve around file quality, route mismatch, and the jump from quick e-visa expectations into manual long-stay review.",
    stayFocus:
      "This pair separates low-cost short visits from high-control long-validity travel planning and is useful for users deciding whether affordability or repeat-travel utility matters more.",
    studentFocus:
      "The U.S. is stronger for institution-fixed students who can tolerate route control. India is stronger where the academic destination itself matters more than post-study migration logic.",
    workFocus:
      "The U.S. work route is employer-petition heavy; India's work route requires applicants to keep genuine long-stay work planning completely separate from the country's quick-visit reputation.",
    decisionFocus:
      "Choose India for efficient short visits and the U.S. for repeat-travel value or more structured long-stay planning.",
  },
  "usa-uae": {
    angle:
      "United States vs the UAE is one of the sharpest contrast pairs on the site. The U.S. is high-control and interview-driven; the UAE is speed-first on short stays and employer-controlled on deeper statuses.",
    feeFocus:
      "The UAE can look operationally cheaper because speed reduces planning risk, while the U.S. fee can still be rational when long validity and repeat travel matter more than first-trip convenience.",
    processingFocus:
      "U.S. delays come from interviews, consular queues, and sequencing. UAE delays come from sponsor execution and residency administration after the initial quick response.",
    stayFocus:
      "This pair separates ultra-fast short-stay access from long-validity visitor planning and is useful for travelers deciding whether they need speed or repeat-entry durability.",
    studentFocus:
      "The U.S. is far stronger for pathway-conscious study, though it is also more controlled. The UAE is narrower for students and works better when the route remains institution- and sponsor-linked.",
    workFocus:
      "Both work routes depend heavily on an employer, but the U.S. hands complexity to petition logic while the UAE hands complexity to sponsor execution and residency operations.",
    decisionFocus:
      "Choose the UAE for fast short-stay or commercial mobility and the U.S. for repeat-travel validity or more developed study and work frameworks.",
  },
  "usa-uk": {
    angle:
      "United States vs the UK compares two familiar English-language systems that create friction in different ways: the U.S. is interview-led and long-validity oriented; the UK is document-led and service-tier sensitive.",
    feeFocus:
      "The U.S. can cost more upfront but pay back in repeat-travel value. The UK can cost less at base level but become more expensive when premium handling or document fixes are needed.",
    processingFocus:
      "U.S. delays are driven by interview access. UK delays are driven by evidence quality and whether priority services are available when timing is tight.",
    stayFocus:
      "This pair separates long-validity repeat travel from long visitor stays under a more classic route structure and is useful for travelers who care about both English-language familiarity and practical filing style.",
    studentFocus:
      "The U.S. student route is more controlled and interview-shaped. The UK student route is more document-shaped and more attractive when a graduate-stage bridge matters.",
    workFocus:
      "The U.S. is petition-led; the UK is sponsor-led. Both rely on employers, but the system logic behind the sponsorship is different enough to change who feels comfortable filing where.",
    decisionFocus:
      "Choose the U.S. for repeat-travel value and choose the UK for applicants who prefer document management over interview risk.",
  },
  "uae-india": {
    angle:
      "UAE vs India compares two systems that can both feel fast on short stays, but for completely different reasons. The UAE is fast because the operational machinery is built for rapid visitor movement; India is fast because the short-stay e-visa path is cheap and digitally accessible when file quality is clean.",
    feeFocus:
      "India can win on raw fee while the UAE can win on operational convenience. The value answer depends on whether low cost or cleaner short-notice execution matters more.",
    processingFocus:
      "UAE delays usually come from sponsor handling and residency operations; India delays usually come from file-quality mistakes and route mismatch when applicants go beyond short-stay digital categories.",
    stayFocus:
      "This pair separates low-cost short tourism from fast Gulf mobility and is especially useful for business travelers who care about calendar certainty more than fee alone.",
    studentFocus:
      "Neither country is as pathway-driven for students as Canada, the UK, Australia, or Germany, but the UAE is more sponsor-linked while India is more institution-linked. That distinction matters if the student is not planning a broad graduate transition.",
    workFocus:
      "Both routes are employer-dependent, but the UAE feels sponsor-operational while India feels route-splitting: quick short stays on one side, much more traditional work review on the other.",
    decisionFocus:
      "Choose India for low-cost short visits and the UAE for faster operational execution when sponsor support is already in place.",
  },
};

export function getComparePairBrief(countryA: string, countryB: string) {
  const directKey = `${countryA.toLowerCase()}-${countryB.toLowerCase()}`;
  const reverseKey = `${countryB.toLowerCase()}-${countryA.toLowerCase()}`;
  const canonicalKey = [countryA.toLowerCase(), countryB.toLowerCase()].sort().join("-");
  return briefs[directKey] ?? briefs[reverseKey] ?? briefs[canonicalKey];
}
