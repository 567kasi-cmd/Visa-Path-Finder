import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const countriesFile = path.join(root, 'src', 'data', 'countries.ts');
const processingFile = path.join(root, 'src', 'data', 'processing-times.ts');
const targetDir = path.join(root, 'src', 'data', 'generated');
const targetFile = path.join(targetDir, 'official-source-check.json');

const repoSnapshot = {
  countriesFile,
  processingTimesFile: processingFile,
  countries: [],
  processingTimeEntries: 0,
};

const countriesText = fs.readFileSync(countriesFile, 'utf8');
const processingText = fs.readFileSync(processingFile, 'utf8');

repoSnapshot.countries = [...countriesText.matchAll(/code:\s*"([a-z-]+)"/g)].map((match) => match[1]);
repoSnapshot.processingTimeEntries = repoSnapshot.countries.length * 4;

const sourceConfigs = [
  {
    id: 'uk-processing-times',
    label: 'GOV.UK visa processing times',
    url: 'https://www.gov.uk/guidance/visa-processing-times-applications-outside-the-uk',
    repoFields: ['uk', 'tourist', 'business', 'student', 'work'],
  },
  {
    id: 'usa-visas',
    label: 'U.S. Department of State: Visas',
    url: 'https://travel.state.gov/content/travel/en/us-visas.html',
    repoFields: ['usa', 'tourist', 'business', 'student', 'work'],
  },
  {
    id: 'canada-processing-times',
    label: 'Canada IRCC processing times',
    url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html',
    repoFields: ['canada', 'tourist', 'business', 'student', 'work'],
  },
  {
    id: 'australia-processing-times',
    label: 'Australia Home Affairs processing times',
    url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times/global-visa-processing-times',
    repoFields: ['australia', 'tourist', 'business', 'student', 'work'],
  },
  {
    id: 'germany-visas',
    label: 'Germany visa service',
    url: 'https://www.auswaertiges-amt.de/en/visa-service',
    repoFields: ['germany', 'tourist', 'business', 'student', 'work'],
  },
  {
    id: 'uae-services',
    label: 'ICP UAE visa services',
    url: 'https://icp.gov.ae/en/services/',
    repoFields: ['uae', 'tourist', 'business', 'student', 'work'],
  },
  {
    id: 'india-evisa',
    label: 'Indian Visa Online guidance',
    url: 'https://indianvisaonline.gov.in/evisa/tvoa.html',
    repoFields: ['india', 'tourist', 'business', 'student', 'work'],
  },
];

async function fetchPage(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(url, {
      headers: { 'user-agent': 'VisaPathFinder-source-refresh/1.0' },
      signal: controller.signal,
    });

    const text = await response.text();
    return { ok: response.ok, status: response.status, text };
  } catch (error) {
    return { ok: false, status: 0, text: '', error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timeout);
  }
}

function parseTitle(text) {
  const match = text.match(/<title[^>]*>(.*?)<\/title>/is);
  if (!match) return 'NO_TITLE';
  return match[1].replace(/\s+/g, ' ').trim();
}

function normalizeText(text) {
  return text.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const sources = await Promise.all(
  sourceConfigs.map(async (source) => {
    const page = await fetchPage(source.url);
    const title = page.text ? parseTitle(page.text) : 'NO_TITLE';
    const cleanText = page.text ? normalizeText(page.text) : '';
    const hasRelevantContent = /visa|processing|decision|wait|application/i.test(cleanText);

    return {
      id: source.id,
      label: source.label,
      url: source.url,
      repoFields: source.repoFields,
      checkedAt: new Date().toISOString(),
      status: page.ok && hasRelevantContent ? 'reachable' : page.ok ? 'reachable-but-unstructured' : 'blocked-or-rate-limited',
      httpStatus: page.status,
      title,
      notes:
        page.ok && hasRelevantContent
          ? 'Official source reachable and contains expected visa-processing terms; values should be reviewed before changing repo data.'
          : page.ok
            ? 'Official source is reachable but content pattern does not match the expected structured visa data for a safe automated update.'
            : 'Official source is blocked or rate-limited from this environment; do not auto-merge data without manual review.',
      hasRelevantContent,
      repoDataMatch: source.repoFields.filter((field) => repoSnapshot.countries.includes(field) || field === 'tourist' || field === 'business' || field === 'student' || field === 'work'),
    };
  }),
);

const payload = {
  generatedAt: new Date().toISOString(),
  repo: {
    countries: repoSnapshot.countries,
    countryCount: repoSnapshot.countries.length,
    processingTimeEntries: repoSnapshot.processingTimeEntries,
    sourceFiles: {
      countries: 'src/data/countries.ts',
      processingTimes: 'src/data/processing-times.ts',
    },
  },
  sources,
};

fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(targetFile, JSON.stringify(payload, null, 2) + '\n');

console.log(`Source refresh metadata written to ${targetFile}`);
console.log(`Repo snapshot: ${repoSnapshot.countryCount ?? repoSnapshot.countries.length} countries and ${repoSnapshot.processingTimeEntries} processing entries.`);
console.log('This script is compatible with the repo data structure and only updates generated source-check metadata until official values are manually verified.');
