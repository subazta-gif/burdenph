// BURDEN PH reddit thread discovery
// Uses scrapecreators REST API directly (MCP env key can be stale).
import fs from "node:fs";
import path from "node:path";

const ENV = fs.readFileSync(
  "C:/Users/User/Desktop/Games/seo-manager/.credentials/.env",
  "utf8"
);
const key = (ENV.match(/SCRAPECREATORS_API_KEY=([^\r\n]+)/) || [])[1]?.trim();
if (!key) { console.error("NO KEY"); process.exit(1); }

const queries = [
  "hardcore bands to check out",
  "Filipino hardcore bands",
  "Philippines hardcore scene",
  "Cebu hardcore",
  "bands like Madball",
  "bands like Terror hardcore",
  "modern hardcore bands",
  "best hardcore bands 2025",
  "new hardcore releases",
  "hardcore punk recommendations",
  "beatdown hardcore bands",
  "up and coming hardcore bands",
  "hardcore band from philippines",
  "metalcore bands recommendation",
  "southeast asia hardcore scene",
  "hardcore music recommendations reddit"
];

const out = [];
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

for (const q of queries) {
  const url = "https://api.scrapecreators.com/v1/reddit/search?query=" +
    encodeURIComponent(q) + "&filter=posts";
  try {
    const res = await fetch(url, { headers: { "x-api-key": key } });
    if (!res.ok) {
      console.log(`### ${q}\n  HTTP ${res.status} ${res.statusText}`);
      continue;
    }
    const j = await res.json();
    const posts = (j.posts || []).slice(0, 8);
    console.log(`### ${q}  (${posts.length} posts)`);
    for (const p of posts) {
      console.log(`  r/${p.subreddit} | ${(p.title || "").slice(0, 80)} | cmts=${p.num_comments ?? "?"} | ${p.url}`);
      out.push({
        query: q,
        subreddit: p.subreddit,
        title: p.title,
        url: p.url,
        num_comments: p.num_comments,
        selftext: (p.selftext || "").slice(0, 400),
        created: p.created
      });
    }
  } catch (e) {
    console.log(`### ${q}\n  ERR ${e.message}`);
  }
  await sleep(300);
}

fs.writeFileSync(
  "C:/Users/User/Desktop/Games/research/burdenph-reddit-raw.json",
  JSON.stringify(out, null, 2)
);
console.log(`\nTOTAL ${out.length} rows saved -> research/burdenph-reddit-raw.json`);
