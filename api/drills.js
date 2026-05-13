const TOKEN = process.env.NOTION_TOKEN;
const DB_ID = process.env.NOTION_DRILLS_DB_ID;

async function queryAll() {
  const pages = [];
  let cursor;
  do {
    const body = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;
    const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Notion API ${res.status}`);
    const data = await res.json();
    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return pages;
}

function txt(prop) {
  if (!prop) return '';
  if (prop.type === 'title') return prop.title.map(t => t.plain_text).join('');
  if (prop.type === 'rich_text') return prop.rich_text.map(t => t.plain_text).join('');
  return '';
}

function shape(page) {
  const p = page.properties;
  return {
    id:       txt(p.Slug),
    name:     txt(p.Name),
    sport:    p.Sport?.select?.name || 'soccer',
    duration: p.Duration?.number || 3,
    setup:    txt(p.Setup),
    how:      txt(p.How),
    cue:      txt(p.Cue),
    success:  txt(p.Success),
    tags:     (p.Tags?.multi_select || []).map(o => o.name),
    fun:      p.Fun?.checkbox || false,
    ages:     (p.Ages?.multi_select || []).map(o => parseInt(o.name, 10)).sort(),
    priority: p.Priority?.number || 3,
    hasVideo: p['Has Video']?.checkbox || false,
    insights: [txt(p['Insight 1']), txt(p['Insight 2']), txt(p['Insight 3'])].filter(Boolean),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  try {
    if (!TOKEN || !DB_ID) throw new Error('Missing NOTION_TOKEN or NOTION_DRILLS_DB_ID env vars');
    const pages = await queryAll();
    const drills = pages
      .filter(p => !p.archived && txt(p.properties.Slug))
      .map(shape);
    return res.status(200).json(drills);
  } catch (err) {
    console.error('Drills API error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
