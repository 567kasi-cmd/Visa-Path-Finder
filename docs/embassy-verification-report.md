# Embassy Verification Report

Last reviewed: 2026-08-05

Scope reviewed: all embassy records currently present in [src/data/embassies.ts](/C:/Users/07kas/IdeaProjects/Visa-Path-Finder/src/data/embassies.ts)

## Notes on scope and data-model limits

The current `Embassy` interface supports these fields only:

- `id`
- `city`
- `country`
- `represents`
- `address`
- `phone`
- `email`
- `website`
- `hours`
- `jurisdiction`
- `services`
- `appointmentUrl`
- `officialSources`
- `updatedAt`
- `reviewedAt`

The following requested fields are not separately representable without changing the existing TypeScript interface:

- embassy/consulate name as a dedicated field
- postal code as a dedicated field
- emergency contact numbers as a dedicated field
- working days as a separate field
- visa section timings as a separate field
- Google Maps location
- notes/special instructions as a dedicated field

Where possible, verifiable details were folded into existing string fields such as `address`, `phone`, `hours`, `jurisdiction`, or `services` without changing the data model.

## Updated Embassies

All current embassy records required at least one source-backed update.

### `washington-dc` (`usa`)

Updated:
- phone updated to the State Department main public number
- website updated to the official U.S. visa contact page
- appointment URL updated to the official A/G/NATO visa renewal guidance page
- hours, jurisdiction, services, and official sources refreshed
- `updatedAt` and `reviewedAt` set to `2026-08-05`

### `ottawa` (`canada`)

Updated:
- address expanded to include official office reference
- website updated to IRCC contact page
- appointment URL updated to IRCC web form
- hours, jurisdiction, services, and official sources refreshed
- `updatedAt` and `reviewedAt` set to `2026-08-05`

### `london` (`uk`)

Updated:
- phone updated to official Home Office public enquiries number
- email updated to official Home Office public enquiries email
- website updated to official UKVI contact page
- hours changed to service-specific-contact guidance because no single UKVI public desk schedule was verified
- jurisdiction, services, and official sources refreshed
- `updatedAt` and `reviewedAt` set to `2026-08-05`

### `canberra` (`australia`)

Updated:
- phone expanded to include in-Australia and outside-Australia contact numbers
- website updated to official telephone contact page
- appointment URL updated to official immigration enquiry form
- hours, jurisdiction, services, and official sources refreshed
- `updatedAt` and `reviewedAt` set to `2026-08-05`

### `berlin` (`germany`)

Updated:
- address corrected and standardized
- phone updated
- email updated
- website updated to official visa service page
- hours updated
- appointment URL updated to official Consular Services Portal
- jurisdiction, services, and official sources refreshed
- `updatedAt` and `reviewedAt` set to `2026-08-05`

### `abu-dhabi` (`uae`)

Updated:
- address updated and standardized
- phone updated to include domestic and international format
- website updated to official contact page
- hours updated to the current published weekly schedule
- appointment URL updated to official Smart Services platform
- jurisdiction, services, and official sources refreshed
- `updatedAt` and `reviewedAt` set to `2026-08-05`

### `new-delhi` (`india`)

Updated:
- address updated to CPV Division contact location
- phone updated
- email updated
- website updated to CPV Division page
- hours rewritten to reflect that public service timings were not published on the verified sources
- jurisdiction, services, and official sources refreshed
- `updatedAt` and `reviewedAt` set to `2026-08-05`

### `new-york` (`usa`)

Updated:
- address updated to official OFM New York regional office address
- phone updated
- email updated
- website updated
- hours updated to the published in-person A/G/NATO service window referenced by Travel.State.Gov
- jurisdiction, services, appointment URL, and official sources refreshed
- `updatedAt` and `reviewedAt` set to `2026-08-05`

## Unchanged Embassies

None.

Every current record required at least one source-backed update.

## Missing Information

### Not verified from current official sources

These fields could not be independently verified from the current official source pages reviewed during this update:

- `washington-dc.email`
- `ottawa.email`
- `canberra.email`

These values were retained unchanged because the current data model requires a string and the reviewed official pages did not publish a clear replacement email address for the same role/context.

### Not available as separate fields in the current data model

For all records, the repository does not currently support dedicated storage for:

- postal code as a distinct field
- emergency contact numbers
- Google Maps links
- working days separate from hours
- visa section timings separate from hours
- notes/special instructions
- dedicated embassy/consulate name field

### Not published in the reviewed official pages

- Public visa/consular contact hours for `new-delhi` were not clearly published on the cited source pages.
- A single universal UKVI public desk operating-hours field was not clearly published on the cited source pages.

## Verification Sources

### `washington-dc`

- U.S. Visas Contact Us  
  `https://travel.state.gov/content/travel/en/contact-us/us-visas.html`
- Renewing A, G, and NATO Visas in the United States  
  `https://travel.state.gov/content/travel/en/us-visas/other-visa-categories/visa-employees-nato/renewing-a-g-nato.html`
- U.S. Department of State - Visas  
  `https://www.state.gov/visas/`

### `ottawa`

- IRCC Contact Us  
  `https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc.html`
- IRCC Web Form  
  `https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc/web-form.html`
- IRCC Offices - Appointment Required  
  `https://www.canada.ca/en/immigration-refugees-citizenship/corporate/contact-ircc/offices.html`

### `london`

- Contact UK Visas and Immigration  
  `https://www.gov.uk/contact-ukvi-inside-outside-uk`
- UK Visas and Immigration  
  `https://www.gov.uk/government/organisations/uk-visas-and-immigration`
- Contact the Home Office  
  `https://www.gov.uk/government/organisations/home-office/about/access-and-opening`

### `canberra`

- Department of Home Affairs Telephone Contacts  
  `https://immi.homeaffairs.gov.au/help-support/contact-us/telephone`
- Australian Immigration Enquiry Form  
  `https://immi.homeaffairs.gov.au/help-support/departmental-forms/online-forms/australian-immigration-enquiry-form`
- Department of Home Affairs Offices in Australia  
  `https://immi.homeaffairs.gov.au/help-support/contact-us/offices-and-locations/offices-in-australia`

### `berlin`

- Federal Foreign Office Contact  
  `https://www.auswaertiges-amt.de/en/about-us/contact`
- Federal Foreign Office Visa Service  
  `https://www.auswaertiges-amt.de/en/visa-service`
- Consular Services Portal  
  `https://digital.diplo.de/visa`

### `abu-dhabi`

- ICP Contact Us  
  `https://icp.gov.ae/en/contact-us/`
- Customer Happiness Centers  
  `https://icp.gov.ae/en/customer-happiness-centers/`
- ICP Smart Services  
  `https://smartservices.icp.gov.ae`

### `new-delhi`

- CPV Division - Ministry of External Affairs  
  `https://www.mea.gov.in/cpv.htm`
- MEA Contact Us  
  `https://www.mea.gov.in/contact-us.htm`
- Indian Visa Online Information Centre  
  `https://indianvisaonline.gov.in/infoCentre/contents.html`

### `new-york`

- Office of Foreign Missions Contact Us  
  `https://www.state.gov/contact-us-office-of-foreign-missions/`
- OFM New York Regional Office  
  `https://www.state.gov/ofm-new-york-regional-office/`
- Renewing A, G, and NATO Visas in the United States  
  `https://travel.state.gov/content/travel/en/us-visas/other-visa-categories/visa-employees-nato/renewing-a-g-nato.html`

## Review confirmation

All embassy records currently present for supported countries in the repository were reviewed and updated only where the repository's current data model and the cited official/public sources allowed a source-backed change.
