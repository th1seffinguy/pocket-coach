// One-time migration: seeds the Notion Drills database from drills.json
// Run: NOTION_TOKEN=secret_xxx NOTION_DRILLS_DB_ID=xxx node scripts/seed-notion.js

const drills = require('../drills.json');
const TOKEN = process.env.NOTION_TOKEN;
const DB_ID = process.env.NOTION_DRILLS_DB_ID;

if (!TOKEN || !DB_ID) {
  console.error('Set NOTION_TOKEN and NOTION_DRILLS_DB_ID before running.');
  process.exit(1);
}

async function seed(drill) {
  const body = {
    parent: { database_id: DB_ID },
    properties: {
      Name:        { title: [{ text: { content: drill.name } }] },
      Slug:        { rich_text: [{ text: { content: drill.id } }] },
      Sport:       { select: { name: drill.sport } },
      Duration:    { number: drill.duration },
      Setup:       { rich_text: [{ text: { content: drill.setup || '' } }] },
      How:         { rich_text: [{ text: { content: drill.how || '' } }] },
      Cue:         { rich_text: [{ text: { content: drill.cue || '' } }] },
      Success:     { rich_text: [{ text: { content: drill.success || '' } }] },
      Tags:        { multi_select: (drill.tags || []).map(t => ({ name: t })) },
      Fun:         { checkbox: !!drill.fun },
      Ages:        { multi_select: (drill.ages || []).map(a => ({ name: String(a) })) },
      Priority:    { number: drill.priority || 3 },
      'Has Video': { checkbox: !!drill.hasVideo },
      'Insight 1': { rich_text: [{ text: { content: (drill.insights || [])[0] || '' } }] },
      'Insight 2': { rich_text: [{ text: { content: (drill.insights || [])[1] || '' } }] },
      'Insight 3': { rich_text: [{ text: { content: (drill.insights || [])[2] || '' } }] },
    },
  };
  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${drill.id}: ${await res.text()}`);
  console.log(`✓ ${drill.name}`);
  await new Promise(r => setTimeout(r, 350)); // Notion rate limit: 3 req/s
}

(async () => {
  console.log(`Seeding ${drills.length} drills into Notion DB ${DB_ID}...`);
  for (const drill of drills) {
    await seed(drill);
  }
  console.log('Done.');
})();
