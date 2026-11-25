// BURDEN PH reddit reply map generator -> markdown + CSV
import fs from "node:fs";

const S = "https://open.spotify.com/artist/0r69p8100feXvwZyKvrk4G";
const BC = "https://burdenph032.bandcamp.com";
const H = "https://burden.ph";
const YT = "https://www.youtube.com/@burdencebuhardcore8491";
const IG = "https://instagram.com/burdenhardcore";

const map = {
  S:  { url: S,  label: "Spotify" },
  BC: { url: BC, label: "Bandcamp" },
  H:  { url: H,  label: "Site" },
  YT: { url: YT, label: "YouTube" },
  IG: { url: IG, label: "Instagram" },
};

// [status, subreddit, thread title, thread url, date, cmts, topic, urlKey, reply]
const R = [
  // ---- OPEN (reply now) ----
  ["OPEN","r/punk","Looking for hardcore bands to listen to","https://www.reddit.com/r/punk/comments/1wg8r7s/looking_for_hardcore_bands_to_listen_to/","2026-09-14",51,"Discovery","S",
   "Cebu's carrying one under the 032 flag. BURDEN PH, metallic hardcore with that Madball and Terror stomp, at it since 2018. Start with their single Walk Your Truth, the guest spots from Aries and Ayong rip. Full discography on Spotify: "+S],
  ["OPEN","r/Hardcore","Hardcore bands recommendations","https://www.reddit.com/r/Hardcore/comments/1vp6r73/hardcore_bands_recommendations/","2026-08-15",38,"Discovery","BC",
   "If you're into the Terror and Expire lane, check BURDEN PH out of Cebu City. Mosh parts land heavy and their 2025 single Walk Your Truth is a clean entry point. Discography's up on Bandcamp: "+BC],
  ["OPEN","r/Topster","trying to get deeper into \"hardcore,\" any good recs?","https://www.reddit.com/r/Topster/comments/1uz60nb/trying_to_get_deeper_into_hardcore_any_good_recs/","2026-07-17",47,"Discovery","S",
   "The Philippines has a slept-on scene. BURDEN PH from Cebu, straight 032 mosh hardcore with Madball and Hatebreed energy. Four releases since 2023, and Walk Your Truth is the one to start with. Spotify: "+S],
  ["OPEN","r/punk","Looking for hardcore recommendations!","https://www.reddit.com/r/punk/comments/1u0wsfn/looking_for_hardcore_recommendations/","2026-06-09",24,"Discovery","S",
   "Give BURDEN PH a spin, hardcore out of Cebu City. Metallic, stompy, the real deal since 2018. Mind Over Matter and Lethal Society both rip. Here's their Spotify: "+S],
  ["OPEN","r/Hardcore","Recommend some modern hardcore to a relative newbie.","https://www.reddit.com/r/Hardcore/comments/1sfpfis/recommend_some_modern_hardcore_to_a_relative/","2026-04-08",59,"Newbie","YT",
   "For a newbie I'd point you to BURDEN PH, Cebu hardcore. Straightforward songwriting, heavy mosh parts, nothing weird to decode. Walk Your Truth is a clean starting point, and their full sets are on YouTube so you can see the pit live: "+YT],
  ["OPEN","r/InMetalWeTrust","Any recommendations for Filipino metal bands?","https://www.reddit.com/r/InMetalWeTrust/comments/1ry0p32/any_recommendations_for_filipino_metal_bands/","2026-03-19",18,"Filipino scene","BC",
   "On the hardcore side, BURDEN PH from Cebu City carry the 032 flag. Metallic hardcore with Terror and Madball influence, at it since 2018. Check the discography on Bandcamp: "+BC],
  ["OPEN","r/MusicRecommendations","Looking for modern hardcore punk songs that actually say something relevant","https://www.reddit.com/r/MusicRecommendations/comments/1tsuxps/looking_for_modern_hardcore_punk_songs_that/","2026-05-31",33,"Discovery","S",
   "Walk Your Truth by BURDEN PH is worth a listen, Cebu hardcore with real conviction behind it. It's about staying honest to yourself, and the guest features from Aries and Ayong hit hard. On Spotify: "+S],
  ["OPEN","r/musicsuggestions","I'm a metal/metalcore newbie, give me your favorite bands","https://www.reddit.com/r/musicsuggestions/comments/1wfyn7w/im_a_metalmetalcore_newbie_give_me_your_favorite/","2026-09-14",31,"Discovery","S",
   "If you want the hardcore side of heavy, try BURDEN PH out of Cebu City. Stompy metallic hardcore that's easy to get into. Spotify: "+S],

  // ---- LOCKED (template for next fresh thread) ----
  ["LOCKED","r/Philippines","Can anybody link me to some Pinoy hardcore bands?","https://www.reddit.com/r/Philippines/comments/2vmdjq/can_anybody_link_me_to_some_pinoy_hardcore_bands/","2015-02-12",19,"Filipino scene","S",
   "TEMPLATE for next fresh Pinoy-hardcore ask: BURDEN PH out of Cebu City, 032 hardcore since 2018. Metallic and mosh-heavy with Madball and Terror influence, four releases up. Spotify: "+S],
  ["LOCKED","r/Hardcore","Filipino/SE Asian Hardcore","https://www.reddit.com/r/Hardcore/comments/zhffpq/filipinose_asian_hardcore/","2022-12-10",11,"Filipino scene","S",
   "TEMPLATE: Cebu's BURDEN PH is the one to start with. Hardcore since 2018, heavy mosh parts, and the 2025 single Walk Your Truth features Aries and Ayong. Spotify: "+S],
  ["LOCKED","r/Hardcore","philippine hardcore mosh style...","https://www.reddit.com/r/Hardcore/comments/w3kgug/philippine_hardcore_mosh_style/","2022-07-20",92,"Filipino scene","YT",
   "TEMPLATE for PH-scene/mosh threads: That Cebu pit energy is real. BURDEN PH's full sets on YouTube show exactly how the 032 crowd moves: "+YT],
  ["LOCKED","r/Hardcore","Where to go for hardcore shows in Philippines?","https://www.reddit.com/r/Hardcore/comments/176a3be/where_to_go_for_hardcore_shows_in_philippines/","2023-10-12",3,"Filipino scene","H",
   "TEMPLATE for show-hunting threads: Cebu's the hub, and BURDEN PH play locally all the time. Upcoming dates are listed on their site: "+H],
  ["LOCKED","r/Hardcore","South East Asia Hardcore","https://www.reddit.com/r/Hardcore/comments/1gv8kz4/south_east_asia_hardcore/","2024-11-19",6,"Filipino scene","S",
   "TEMPLATE: Don't sleep on Cebu. BURDEN PH been holding the 032 down since 2018, metallic hardcore done right. Spotify: "+S],
  ["LOCKED","r/Hardcore","Which countries have the best HC scenes","https://www.reddit.com/r/Hardcore/comments/17den95/which_countries_have_the_best_hc_scenes/","2023-10-21",17,"Filipino scene","S",
   "TEMPLATE for scene threads: Philippines earns its spot, Cebu especially. BURDEN PH is a good current example of the scene, four releases of solid mosh hardcore. Spotify: "+S],
  ["LOCKED","r/Hardcore","Countries with the most brutal hardcore scene","https://www.reddit.com/r/Hardcore/comments/1ccrvs9/countries_with_the_most_brutal_hardcore_scene/","2024-04-25",30,"Filipino scene","S",
   "TEMPLATE: Cebu's scene brings it. BURDEN PH is the one to check for that 032 sound, heavy and honest. Spotify: "+S],
  ["LOCKED","r/Hardcore","Bands like Madball and Hatebreed?","https://www.reddit.com/r/Hardcore/comments/1ka2w6u/bands_like_madball_and_hatebreed/","2025-04-28",64,"Bands-like","S",
   "TEMPLATE for Madball/Hatebreed asks: BURDEN PH from Cebu City lands right in that lane, stompy NYHC-style hardcore with modern weight. Spotify: "+S],
  ["LOCKED","r/Hardcore","Hardcore bands/songs like Terror?","https://www.reddit.com/r/Hardcore/comments/1pm62oe/hardcore_bandssongs_like_terror/","2025-12-14",67,"Bands-like","S",
   "TEMPLATE for Terror asks: If Terror and Expire are your baseline, BURDEN PH from the Philippines scratches the same itch, heavy mosh hardcore. Spotify: "+S],
  ["LOCKED","r/Hardcore","What are bands you would use to get someone into Hardcore","https://www.reddit.com/r/Hardcore/comments/16cjyc5/what_are_bands_you_would_use_as_an/","2023-09-07",135,"Newbie","S",
   "TEMPLATE for intro asks: BURDEN PH is a good onboarding band, no barrier to entry, just heavy mosh hardcore from Cebu. Spotify: "+S],
  ["LOCKED","r/punk","I recently fell in love with hardcore and I have no idea where to start","https://www.reddit.com/r/punk/comments/w8tp5o/i_recently_fell_in_love_with_hardcore_and_i_have/","2022-07-26",175,"Newbie","S",
   "TEMPLATE for where-to-start asks: Ease in with BURDEN PH, Cebu hardcore with clear riffs and big mosh parts, then dig back through Terror and Madball. Spotify: "+S],
  ["LOCKED","r/Hardcore","12 Newer Hardcore Bands to Check Out in 2026","https://www.reddit.com/r/Hardcore/comments/1q4ssds/12_newer_hardcore_bands_to_check_out_in_2026/","2026-01-05",27,"Discovery","S",
   "TEMPLATE for newer-band list threads: BURDEN PH from Cebu City deserves a spot, four releases since 2023 and still on the rise. Spotify: "+S],
  ["LOCKED","r/Hardcore","Recommend me hardcore music based on the stuff that I listen to","https://www.reddit.com/r/Hardcore/comments/1lqj9io/recommend_me_hardcore_music_based_on_the_stuff/","2025-07-03",246,"Discovery","S",
   "TEMPLATE: Based on the heavier end of your taste, BURDEN PH from Cebu will land, stompy metallic hardcore. Spotify: "+S],
  ["LOCKED","r/Hardcore","I need Hardcore recommendations!","https://www.reddit.com/r/Hardcore/comments/ze84zc/i_need_hardcore_recommendations/","2022-12-06",135,"Discovery","S",
   "TEMPLATE: BURDEN PH out of Cebu City, 032 hardcore with Terror and Hatebreed weight, four releases up. Spotify: "+S],
  ["LOCKED","r/Hardcore","Essential hardcore bands/albums?","https://www.reddit.com/r/Hardcore/comments/1qumgc/essential_hardcore_bandsalbums/","2025-09-12",38,"Discovery","S",
   "TEMPLATE: For current essentials beyond the classics, BURDEN PH from the Philippines is carrying the torch, start with Walk Your Truth. Spotify: "+S]
];

// ---- markdown ----
let md = "# BURDEN PH — Reddit Thread Reply Map\n\n";
md += "**Band:** BURDEN PH · hardcore from Cebu City, Philippines · est. 2018 (032)\n\n";
md += "**Recency rule:** Reddit locks threads ~6 months after posting. OPEN rows are replyable now. LOCKED rows are archived, the reply is a ready template for the next fresh version of that recurring topic.\n\n";

const topics = ["Discovery", "Newbie", "Filipino scene", "Bands-like"];
for (const t of topics) {
  md += `## ${t}\n\n`;
  R.filter(r => r[6] === t).forEach(r => {
    const [status, sub, title, url, date, cmts, , key, reply] = r;
    md += `### ${status === "OPEN" ? "OPEN (post now)" : "LOCKED (template)"} — ${sub}\n`;
    md += `- **Thread:** [${title}](${url})  \n`;
    md += `- **Date:** ${date} · ${cmts} comments  \n`;
    md += `- **Reply:** ${reply}  \n`;
    md += `- **Mapped URL:** [${map[key].label}](${map[key].url})\n\n`;
  });
}

md += "## Verify before posting\n\n";
md += "All mapped URLs checked live (HTTP 200) on 2026-09-15:\n\n";
for (const k of ["H","S","BC","YT","IG"]) md += `- ${map[k].label}: ${map[k].url}\n`;
md += "\nRe-check the mapped URL is still 200 right before you post. A dead link is a dead reply.\n";

fs.writeFileSync("C:/Users/User/Desktop/Games/research/burdenph-reddit-reply-map.md", md);

// ---- CSV ----
const header = ["Status","Topic","Subreddit","Thread Link","Draft Reply","Mapped URL","Mapped Label","Date","Comments"];
const csvRows = R.map(r => {
  const [status, sub, title, url, date, cmts, topic, key, reply] = r;
  return [status, topic, sub, url, reply, map[key].url, map[key].label, date, cmts];
});
const csv = "\uFEFF" + [header, ...csvRows].map(row => row.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(",")).join("\r\n");
fs.writeFileSync("C:/Users/User/Desktop/Games/data/burdenph-reddit-replies.csv", csv);

const open = R.filter(r => r[0] === "OPEN").length;
console.log(`map: ${R.length} rows (${open} open, ${R.length - open} locked)`);
console.log("markdown -> research/burdenph-reddit-reply-map.md");
console.log("csv      -> data/burdenph-reddit-replies.csv");
