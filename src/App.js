import React, { useState, useRef } from "react";

const PLATFORMS = ["Instagram","TikTok","Facebook","YouTube"];
const PLATFORM_COLORS = { Instagram:"#E1306C", TikTok:"#00f2ea", Facebook:"#1877F2", YouTube:"#FF0000" };
const GOALS = [
  { id:"followers", label:"Increase Followers", icon:"👥" },
  { id:"likes",     label:"More Likes",         icon:"❤️" },
  { id:"comments",  label:"Comments",           icon:"💬" },
  { id:"shares",    label:"Shares",             icon:"🔁" },
  { id:"visits",    label:"Profile Visits",     icon:"👁️" },
];
const CONTENT_PILLARS = [
  { id:"education", label:"Edukasi",            icon:"📚" },
  { id:"bts",       label:"Behind the Scenes",  icon:"🎬" },
  { id:"promo",     label:"Promosi Produk",      icon:"🛍️" },
  { id:"ugc",       label:"User Generated",      icon:"🤝" },
  { id:"lifestyle", label:"Lifestyle",           icon:"✨" },
  { id:"viral",     label:"Trending/Viral",      icon:"🔥" },
];

const COUNTRY_MOMENTS = {
  ID: {
    label:"🇮🇩 Indonesia",
    moments:[
      { month:1,  name:"Tahun Baru",            tags:["#TahunBaru","#NewYear","#HappyNewYear","#Resolusi2025"] },
      { month:2,  name:"Hari Valentine",         tags:["#Valentine","#HariKasihSayang","#LoveSeason"] },
      { month:3,  name:"Hari Perempuan",         tags:["#HariPerempuan","#WomensDay","#PerempuanHebat"] },
      { month:4,  name:"Hari Kartini",           tags:["#HariKartini","#KartiniDay","#PerempuanIndonesia"] },
      { month:5,  name:"Lebaran / Hari Buruh",   tags:["#Lebaran","#IdulFitri","#MudikLebaran","#HariBuruh"] },
      { month:6,  name:"Hari Anak",              tags:["#HariAnak","#HariAnakNasional","#AnakIndonesia"] },
      { month:7,  name:"Hari Koperasi",          tags:["#HariKoperasi","#UMKM","#BanggaLokal"] },
      { month:8,  name:"HUT RI / Kemerdekaan",   tags:["#HUTRIke80","#DirgahayuRI","#17Agustus","#Indonesia"] },
      { month:9,  name:"Harbolnas 9.9",          tags:["#Harbolnas99","#Sale99","#BelanjaSeru"] },
      { month:10, name:"Hari Batik",             tags:["#HariBatik","#BatikIndonesia","#BanggaBatik"] },
      { month:11, name:"Harbolnas 11.11",        tags:["#Harbolnas1111","#SinglesDay","#BigSale"] },
      { month:12, name:"Natal & Tahun Baru",     tags:["#Natal2025","#MerryChristmas","#TahunBaru2026"] },
    ]
  },
  US: {
    label:"🇺🇸 United States",
    moments:[
      { month:1,  name:"New Year's Day",         tags:["#NewYear2025","#NewYearsResolution","#HappyNewYear"] },
      { month:2,  name:"Valentine's Day",        tags:["#ValentinesDay","#LoveIsInTheAir","#BeMyValentine"] },
      { month:3,  name:"St. Patrick's Day",      tags:["#StPatricksDay","#Shamrock","#LuckyDay","#GoGreen"] },
      { month:4,  name:"Easter",                 tags:["#Easter","#EasterSunday","#HappyEaster","#SpringVibes"] },
      { month:5,  name:"Mother's Day",           tags:["#MothersDay","#HappyMothersDay","#MomLife"] },
      { month:6,  name:"Pride Month",            tags:["#PrideMonth","#Pride2025","#LoveIsLove","#Rainbow"] },
      { month:7,  name:"Independence Day (4th)", tags:["#4thOfJuly","#IndependenceDay","#AmericaStrong"] },
      { month:9,  name:"Labor Day",              tags:["#LaborDay","#LaborDaySale","#LongWeekend"] },
      { month:10, name:"Halloween",              tags:["#Halloween","#SpookySeason","#TrickOrTreat"] },
      { month:11, name:"Thanksgiving / Black Friday", tags:["#Thanksgiving","#BlackFriday","#BlackFridayDeals"] },
      { month:12, name:"Christmas & New Year",   tags:["#Christmas2025","#MerryChristmas","#HolidaySeason"] },
    ]
  },
  MY: {
    label:"🇲🇾 Malaysia",
    moments:[
      { month:1,  name:"Tahun Baru / CNY",       tags:["#TahunBaru","#ChineseNewYear","#GongXiFaCai"] },
      { month:2,  name:"Hari Valentine",          tags:["#ValentinesDay","#CintaMalaysia"] },
      { month:3,  name:"Hari Wanita",             tags:["#HariWanita","#WomensDay","#WanitaMalaysia"] },
      { month:5,  name:"Hari Pekerja / Hari Raya",tags:["#HariRaya","#SelamatHariRaya","#HariPekerja"] },
      { month:8,  name:"Hari Kemerdekaan",        tags:["#HariMerdeka","#Malaysia68","#MalaysiaHebat"] },
      { month:9,  name:"Malaysia Day",            tags:["#MalaysiaDay","#HariMalaysia","#1Malaysia"] },
      { month:10, name:"Hari Raya Deepavali",     tags:["#Deepavali","#Diwali","#FestivalOfLights"] },
      { month:11, name:"Harbolnas 11.11",         tags:["#1111Sale","#OnlineShopping","#BigSale"] },
      { month:12, name:"Krismas & Tahun Baru",    tags:["#Krismas","#MerryChristmas","#TahunBaru2026"] },
    ]
  },
  SG: {
    label:"🇸🇬 Singapore",
    moments:[
      { month:1,  name:"New Year / CNY",          tags:["#NewYear","#ChineseNewYear","#GongXiFaCai","#Singapore"] },
      { month:2,  name:"Valentine's Day",         tags:["#ValentinesDay","#LoveSG","#SGCouples"] },
      { month:4,  name:"Good Friday / Easter",    tags:["#GoodFriday","#Easter","#SGHoliday"] },
      { month:5,  name:"Vesak Day",               tags:["#VesakDay","#Buddhism","#SGFestival"] },
      { month:6,  name:"Hari Raya",               tags:["#HariRaya","#EidMubarak","#SGCelebration"] },
      { month:8,  name:"National Day (9 Aug)",    tags:["#NationalDay","#SGNationalDay","#Singapore60","#ProudlySG"] },
      { month:10, name:"Deepavali",               tags:["#Deepavali","#FestivalOfLights","#SGDiwali"] },
      { month:11, name:"11.11 Sale",              tags:["#1111Sale","#SGSale","#ShoppingSG"] },
      { month:12, name:"Christmas",               tags:["#ChristmasSG","#OrcheardRoad","#SGChristmas"] },
    ]
  },
  GB: {
    label:"🇬🇧 United Kingdom",
    moments:[
      { month:1,  name:"New Year",                tags:["#NewYear2025","#HappyNewYear","#NYE"] },
      { month:2,  name:"Valentine's Day",         tags:["#ValentinesDay","#LoveUK","#BeMyValentine"] },
      { month:3,  name:"Mother's Day",            tags:["#MothersDay","#Mothering Sunday","#MumLife"] },
      { month:4,  name:"Easter",                  tags:["#Easter","#BankHoliday","#EasterWeekend"] },
      { month:6,  name:"King's Birthday",         tags:["#KingsBirthday","#RoyalFamily","#God SaveTheKing"] },
      { month:7,  name:"Wimbledon",               tags:["#Wimbledon","#Tennis","#Wimbledon2025"] },
      { month:10, name:"Halloween",               tags:["#Halloween","#SpookySeason","#TrickOrTreat"] },
      { month:11, name:"Bonfire Night / Black Friday", tags:["#BonfireNight","#BlackFriday","#GuyFawkes"] },
      { month:12, name:"Christmas",               tags:["#ChristmasUK","#MerryChristmas","#BoxingDay"] },
    ]
  },
  AU: {
    label:"🇦🇺 Australia",
    moments:[
      { month:1,  name:"Australia Day",           tags:["#AustraliaDay","#HappyAustraliaDay","#AussieDay"] },
      { month:2,  name:"Valentine's Day",         tags:["#ValentinesDay","#LoveAustralia"] },
      { month:3,  name:"International Women's Day",tags:["#IWD2025","#WomensDay","#ChooseToChallenge"] },
      { month:4,  name:"Easter / ANZAC Day",      tags:["#Easter","#ANZACDay","#LestWeForget"] },
      { month:5,  name:"Mother's Day",            tags:["#MothersDay","#MumLife","#AusMums"] },
      { month:6,  name:"EOFY Sale",               tags:["#EOFYSale","#EndOfFinancialYear","#TaxTime"] },
      { month:9,  name:"AFL Grand Final",         tags:["#AFLGrandFinal","#AFL","#GoFooty"] },
      { month:11, name:"Melbourne Cup / Black Friday", tags:["#MelbourneCup","#BlackFriday","#CupDay"] },
      { month:12, name:"Christmas / Boxing Day",  tags:["#ChristmasAustralia","#BoxingDaySale","#SummerChristmas"] },
    ]
  },
  JP: {
    label:"🇯🇵 Japan",
    moments:[
      { month:1,  name:"お正月 New Year",          tags:["#お正月","#HappyNewYear","#初詣","#NewYear"] },
      { month:2,  name:"バレンタイン Valentine",    tags:["#バレンタイン","#ValentinesDay","#チョコレート"] },
      { month:3,  name:"ひなまつり / 桜 Sakura",   tags:["#ひなまつり","#桜","#Sakura","#CherryBlossom"] },
      { month:4,  name:"Golden Week",              tags:["#GoldenWeek","#ゴールデンウィーク","#Japan"] },
      { month:5,  name:"こどもの日 Children's Day",tags:["#こどもの日","#ChildrensDay","#KoiNobori"] },
      { month:7,  name:"七夕 Tanabata",            tags:["#七夕","#Tanabata","#星に願いを"] },
      { month:8,  name:"お盆 Obon",                tags:["#お盆","#Obon","#夏祭り","#花火"] },
      { month:10, name:"ハロウィン Halloween",      tags:["#ハロウィン","#Halloween","#仮装"] },
      { month:11, name:"七五三 Shichi-Go-San",      tags:["#七五三","#ShichiGoSan","#お祝い"] },
      { month:12, name:"クリスマス Christmas",      tags:["#クリスマス","#MerryChristmas","#年末"] },
    ]
  },
  IN: {
    label:"🇮🇳 India",
    moments:[
      { month:1,  name:"Republic Day / Pongal",   tags:["#RepublicDay","#Pongal","#JaiHind","#India"] },
      { month:2,  name:"Valentine's Day",         tags:["#ValentinesDay","#LoveIndia","#PyaarKaDin"] },
      { month:3,  name:"Holi",                    tags:["#Holi","#HappyHoli","#FestivalOfColors","#Rangoli"] },
      { month:4,  name:"Baisakhi / IPL",          tags:["#Baisakhi","#IPL2025","#Cricket","#India"] },
      { month:5,  name:"Mother's Day",            tags:["#MothersDay","#MaaKaPyaar","#MomLife"] },
      { month:8,  name:"Independence Day",        tags:["#IndependenceDay","#JaiHind","#India78","#Azaadi"] },
      { month:9,  name:"Ganesh Chaturthi",        tags:["#GaneshChaturthi","#GanpatiiBappaMorya","#Festival"] },
      { month:10, name:"Dussehra / Navratri",     tags:["#Navratri","#Dussehra","#Garba","#FestiveSeason"] },
      { month:11, name:"Diwali",                  tags:["#Diwali","#HappyDiwali","#FestivalOfLights","#Deepavali"] },
      { month:12, name:"Christmas & New Year",    tags:["#Christmas","#MerryChristmas","#NewYear2026"] },
    ]
  },
};

const SIZE_COLORS = { small:"#34d399", medium:"#fbbf24", large:"#f87171", viral:"#a78bfa", niche:"#60a5fa", meta:"#f472b6" };
const SIZE_LABELS = { small:"<100K", medium:"100K-500K", large:">500K", viral:"Viral/FYP", niche:"Niche", meta:"SEO Meta" };
const PLATFORM_TIPS = {
  Instagram:"Mix hashtag kecil+menengah untuk follower growth maksimal.",
  TikTok:"Kombinasi 40% viral FYP + 60% niche spesifik.",
  YouTube:"Menghasilkan #Hashtag publik + Tags metadata SEO terpisah.",
  Facebook:"Fokus hashtag komunitas & shareable yang natural di feed.",
};
const TABS = [
  { id:"generator", label:"Generator",      icon:"⚡" },
  { id:"sets",      label:"Multi-Set A/B",  icon:"🔄" },
  { id:"calendar",  label:"Kalender Momen", icon:"📅" },
  { id:"pillars",   label:"Content Pillars",icon:"🎯" },
  { id:"history",   label:"History",        icon:"🗂️" },
];

// ─── PROMPT ───────────────────────────────────────────────────────────────────
function buildPrompt({ topic, platform, goalLabels, count, language, pillar, setLabel, momentTags }) {
  const isYT = platform==="YouTube";
  const isTT = platform==="TikTok";
  const isIG = platform==="Instagram";
  const hasFollowers = goalLabels.includes("Increase Followers");
  const langRule = language==="bilingual" ? "Mix 60% Bahasa Indonesia + 40% English."
    : language==="id" ? "ONLY Bahasa Indonesia." : "ONLY English.";
  const platformRule = isYT
    ? `YouTube: return TWO arrays — "hashtags" (${Math.ceil(count/2)} items with #) and "tags" (${Math.floor(count/2)} plain SEO keywords, no #).`
    : isTT ? "TikTok: 40% viral FYP tags + 60% hyper-specific niche tags."
    : isIG && hasFollowers ? "Instagram: 40% small niche (<100K) + 40% medium (100K-500K) + 20% broad."
    : `${platform}: platform-native relevant hashtags.`;
  const goalStrategy = goalLabels.map(g=>({
    "Increase Followers":"community-building niche tags",
    "More Likes":"high-volume trending tags",
    "Comments":"conversational CTA tags",
    "Shares":"viral emotionally resonant tags",
    "Profile Visits":"authoritative brand-identity tags",
  }[g]||g)).join(" + ");
  const extras = [
    pillar?`Content Pillar: "${pillar}" — focus hashtags specifically for this content type.`:"",
    setLabel?`This is Set ${setLabel} — make it DISTINCTLY DIFFERENT from other sets.`:"",
    (momentTags||[]).length?`Blend these moment-specific tags naturally: ${momentTags.join(", ")}`:"",
  ].filter(Boolean).join("\n");
  const fmt = isYT
    ? `{"strategy":"one sentence","hashtags":[{"tag":"#example","size":"large","estimatedReach":"~2M posts"}],"tags":["keyword1","keyword2"]}`
    : `{"strategy":"one sentence","hashtags":[{"tag":"#example","size":"small","estimatedReach":"~50K posts"}]}`;
  return `You are an expert Social Media Strategist for ${language==="id"?"the Indonesian market":"global social media"}.
Topic: ${topic}
Platform: ${platform}
Goals: ${goalLabels.join(", ")}
Total hashtags needed: ${count}
Language rule: ${langRule}
Platform strategy: ${platformRule}
Goal strategy: ${goalStrategy}.
${extras}
For each hashtag object include "size" (small/medium/large for IG; viral/niche for TT; large for FB/YT hashtags; meta for YT tags) and "estimatedReach" (e.g. "~50K posts", "~2M posts", "FYP potential").
Respond ONLY with valid JSON, no markdown:
${fmt}`;
}

// ─── UTILS ────────────────────────────────────────────────────────────────────
const PIcon = ({ p, size=18 }) => {
  const s={width:size,height:size};
  if(p==="Instagram") return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={s}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>;
  if(p==="TikTok")    return <svg viewBox="0 0 24 24" fill="currentColor" style={s}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.68a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z"/></svg>;
  if(p==="Facebook")  return <svg viewBox="0 0 24 24" fill="currentColor" style={s}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
  return <svg viewBox="0 0 24 24" fill="currentColor" style={s}><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
};

const Lbl = ({ children, right }) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
    <span style={{fontSize:10,fontWeight:800,letterSpacing:"0.14em",color:"#4a4a6a",textTransform:"uppercase"}}>{children}</span>
    {right}
  </div>
);

const Spin = () => (
  <span style={{width:13,height:13,border:"2px solid rgba(255,255,255,.2)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin .6s linear infinite",flexShrink:0}}/>
);

// ─── TAG CHIP ─────────────────────────────────────────────────────────────────
function TagChip({ item, pc }) {
  const [flash, setFlash] = useState(false);
  const tag = typeof item==="string" ? item : (item.tag||"");
  const sz  = typeof item==="object" ? (item.size||"medium") : "medium";
  const er  = typeof item==="object" ? item.estimatedReach : null;
  const handleClick = () => {
    if(!tag) return;
    navigator.clipboard.writeText(tag).catch(()=>{});
    setFlash(true);
    setTimeout(()=>setFlash(false), 900);
  };
  return (
    <div onClick={handleClick} title={`${er||""} · Klik untuk copy`} style={{
      display:"inline-flex",alignItems:"center",gap:5,
      background:flash?`${pc}40`:"rgba(255,255,255,.06)",
      border:`1px solid ${flash?pc:"rgba(255,255,255,.1)"}`,
      borderRadius:8,padding:"5px 10px",cursor:"pointer",
      transition:"all .15s",transform:flash?"scale(1.04)":"scale(1)",marginBottom:4,
    }}>
      <span style={{width:6,height:6,borderRadius:"50%",background:SIZE_COLORS[sz]||"#888",flexShrink:0}}/>
      <span style={{fontSize:12,fontWeight:600,color:flash?"#fff":pc}}>{flash?"✓ copied":tag}</span>
      {er&&!flash&&<span style={{fontSize:10,color:"#444",borderLeft:"1px solid #2a2a3a",paddingLeft:5}}>{er}</span>}
    </div>
  );
}

// ─── FALLBACK COPY ────────────────────────────────────────────────────────────
function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0;";
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try { document.execCommand("copy"); } catch(e) {}
  document.body.removeChild(ta);
}

// ─── COPY BUTTON (self-contained state) ───────────────────────────────────────
function CopyBtn({ getItems, label, style={} }) {
  const [copied, setCopied] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    try {
      const items = getItems();
      if (!items || items.length === 0) return;
      const text = items.map(i => typeof i === "string" ? i : (i.tag || "")).filter(Boolean).join(" ");
      if (!text) return;
      const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => { fallbackCopy(text); done(); });
      } else {
        fallbackCopy(text); done();
      }
    } catch(err) {}
  };
  return (
    <button onClick={handleClick} style={{
      padding:"9px 14px",
      background: copied ? "rgba(80,220,80,.15)" : "rgba(255,255,255,.07)",
      border: `1px solid ${copied ? "rgba(80,220,80,.4)" : "rgba(255,255,255,.12)"}`,
      borderRadius:9, color: copied ? "#72e672" : "#aaa", fontSize:11, fontWeight:700,
      cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:5,
      transition:"all .25s", ...style
    }}>
      {copied ? "✓ Copied!" : `⎘ ${label}`}
    </button>
  );
}

// ─── EXPORT HELPERS ───────────────────────────────────────────────────────────
function doExportTXT(items, filename) {
  try {
    const text = (items||[]).map(i => typeof i==="string" ? i : (i.tag||"")).filter(Boolean).join(" ");
    const blob = new Blob([text], {type:"text/plain"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href=url; a.download=filename||"hashtags.txt"; a.style.display="none";
    document.body.appendChild(a); a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 300);
  } catch(e) { console.error("TXT export failed", e); }
}
function doExportCSV(items, filename) {
  try {
    const rows = ["Tag,Size,EstimatedReach",
      ...(items||[]).map(i=>`"${i.tag||i}","${i.size||""}","${i.estimatedReach||""}"`)];
    const blob = new Blob([rows.join("\n")], {type:"text/csv"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href=url; a.download=filename||"hashtags.csv"; a.style.display="none";
    document.body.appendChild(a); a.click();
    setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 300);
  } catch(e) { console.error("CSV export failed", e); }
}

function ExportBtn({ items, filename, label }) {
  const [clicked, setClicked] = useState(false);
  const handle = (e) => {
    e.stopPropagation();
    doExportTXT(items, filename);
    setClicked(true); setTimeout(() => setClicked(false), 1500);
  };
  return (
    <button onClick={handle} style={{
      padding:"9px 14px",
      background: clicked ? "rgba(80,180,255,.12)" : "rgba(255,255,255,.06)",
      border: `1px solid ${clicked ? "rgba(80,180,255,.4)" : "rgba(255,255,255,.11)"}`,
      borderRadius:9, color: clicked ? "#60b4ff" : "#999", fontSize:11, fontWeight:700,
      cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4, transition:"all .2s"
    }}>{clicked ? "✓ Downloaded!" : label}</button>
  );
}

function ExportCSVBtn({ items, filename }) {
  const [clicked, setClicked] = useState(false);
  const handle = (e) => {
    e.stopPropagation();
    doExportCSV(items, filename);
    setClicked(true); setTimeout(() => setClicked(false), 1500);
  };
  return (
    <button onClick={handle} style={{
      padding:"9px 14px",
      background: clicked ? "rgba(80,180,255,.12)" : "rgba(255,255,255,.06)",
      border: `1px solid ${clicked ? "rgba(80,180,255,.4)" : "rgba(255,255,255,.11)"}`,
      borderRadius:9, color: clicked ? "#60b4ff" : "#999", fontSize:11, fontWeight:700,
      cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:4, transition:"all .2s"
    }}>{clicked ? "✓ Downloaded!" : "📊 Export CSV"}</button>
  );
}

// ─── SAVE + ACTIONS (self-contained save state) ──────────────────────────────
function SaveAndActions({ hashtags, topic, pc, onSave }) {
  const [saved, setSaved] = useState(false);
  const handleSave = (e) => {
    e.stopPropagation();
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <div style={{display:"flex",gap:7,flexWrap:"wrap",marginTop:8}}>
      <CopyBtn getItems={()=>hashtags} label="Copy All Hashtags"/>
      <ExportBtn items={hashtags} filename={`hashtags-${topic||"export"}.txt`} label="📄 TXT"/>
      <ExportCSVBtn items={hashtags} filename={`hashtags-${topic||"export"}.csv`}/>
      <button onClick={handleSave} style={{
        padding:"9px 14px",
        background: saved ? `${pc}28` : `${pc}12`,
        border: `1px solid ${saved ? pc : `${pc}30`}`,
        borderRadius:9, color:pc, fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
        display:"flex", alignItems:"center", gap:5, transition:"all .25s"
      }}>{saved ? "★ Tersimpan!" : "☆ Simpan"}</button>
    </div>
  );
}

// ─── RESULT BLOCK ─────────────────────────────────────────────────────────────
function ResultBlock({ result, platform, pc, onSave, topic }) {
  const isYT = platform==="YouTube";
  const hashtags = result.hashtags || [];
  const tags = result.tags || [];

  const grouped = {};
  hashtags.forEach(h=>{ const k=h.size||"other"; if(!grouped[k])grouped[k]=[]; grouped[k].push(h); });

  return (
    <div style={{background:"rgba(255,255,255,.03)",border:`1px solid ${pc}28`,borderRadius:16,overflow:"hidden"}}>
      {/* Strategy */}
      <div style={{background:`${pc}0e`,borderBottom:`1px solid ${pc}18`,padding:"11px 16px",display:"flex",gap:10,alignItems:"flex-start"}}>
        <span style={{fontSize:14,flexShrink:0}}>💡</span>
        <p style={{margin:0,fontSize:12,color:"#888",lineHeight:1.6}}>
          <strong style={{color:pc}}>Strategy: </strong>{result.strategy}
        </p>
      </div>

      <div style={{padding:16}}>
        {/* Legend */}
        {Object.keys(grouped).length>0 && (
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
            {Object.keys(grouped).map(k=>(
              <span key={k} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:"#555",fontWeight:600}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:SIZE_COLORS[k]||"#888"}}/>
                {SIZE_LABELS[k]||k} ({grouped[k].length})
              </span>
            ))}
          </div>
        )}

        {/* Hashtag chips */}
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
          {hashtags.map((item,i)=><TagChip key={i} item={item} pc={pc}/>)}
        </div>

        {/* YouTube meta tags */}
        {isYT && tags.length>0 && (
          <div style={{borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:12,marginBottom:12}}>
            <Lbl>🔍 Metadata Tags (YouTube Studio — tanpa #)</Lbl>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
              {tags.map((t,i)=><TagChip key={i} item={{tag:t,size:"meta",estimatedReach:"SEO keyword"}} pc="#f472b6"/>)}
            </div>
            <CopyBtn getItems={()=>tags.map(t=>({tag:t}))} label="Copy Meta Tags"/>
          </div>
        )}

        {/* Action row */}
        <SaveAndActions hashtags={hashtags} topic={topic} pc={pc} onSave={onSave}/>
        <p style={{margin:"8px 0 0",fontSize:10,color:"#333"}}>Klik tag untuk copy satu per satu</p>
      </div>
    </div>
  );
}

// ─── HISTORY CARD ─────────────────────────────────────────────────────────────
function HistoryCard({ entry, onDelete, onSave }) {
  const [open, setOpen] = useState(false);
  const pc = PLATFORM_COLORS[entry.platform]||"#888";
  const ts = new Date(entry.ts).toLocaleDateString("id-ID",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});
  const hashtags = entry.result?.hashtags || [];
  return (
    <div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,marginBottom:7,overflow:"hidden"}}>
      <div onClick={()=>setOpen(v=>!v)} style={{padding:"11px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:7,height:7,borderRadius:"50%",background:pc,flexShrink:0}}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:12,fontWeight:700,color:"#bbb",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{entry.topic}</div>
          <div style={{fontSize:10,color:"#444",marginTop:2}}>{entry.platform} · {entry.note||""} · {ts}</div>
        </div>
        <span style={{fontSize:10,color:"#444",fontWeight:600,flexShrink:0}}>{hashtags.length} tags {open?"▲":"▼"}</span>
      </div>
      {open&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.05)",padding:"10px 14px"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
            {hashtags.slice(0,12).map((h,i)=><TagChip key={i} item={h} pc={pc}/>)}
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {onSave&&<button onClick={onSave} style={{padding:"5px 10px",background:`${pc}12`,border:`1px solid ${pc}25`,borderRadius:7,color:pc,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>☆ Simpan</button>}
            <button onClick={()=>doExportTXT(hashtags,`history-${entry.topic}.txt`)} style={{padding:"5px 10px",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:7,color:"#777",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>📄 Export TXT</button>
            <button onClick={onDelete} style={{padding:"5px 10px",background:"rgba(255,70,70,.08)",border:"1px solid rgba(255,70,70,.15)",borderRadius:7,color:"#ff7070",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>🗑️ Hapus</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function HashtagPro() {
  const [activeTab,       setActiveTab]       = useState("generator");
  const [platform,        setPlatform]        = useState("Instagram");
  const [selectedGoals,   setSelectedGoals]   = useState(["followers"]);
  const [topic,           setTopic]           = useState("");
  const [count,           setCount]           = useState(10);
  const [language,        setLanguage]        = useState("bilingual");

  const [genLoading,      setGenLoading]      = useState(false);
  const [genResult,       setGenResult]       = useState(null);
  const [genError,        setGenError]        = useState(null);

  const [setsData,        setSetsData]        = useState([null,null,null]);
  const [setsItemLoading, setSetsItemLoading] = useState([false,false,false]);
  const [setsRunning,     setSetsRunning]     = useState(false);

  const [selectedPillars, setSelectedPillars] = useState(["education","promo"]);
  const [pillarResults,   setPillarResults]   = useState({});
  const [pillarBusy,      setPillarBusy]      = useState({});

  const [calCountry,      setCalCountry]      = useState("ID");
  const [selMoment,       setSelMoment]       = useState(null);
  const [momentResult,    setMomentResult]    = useState(null);
  const [momentBusy,      setMomentBusy]      = useState(false);

  const [historyArr,      setHistoryArr]      = useState([]);
  const [savedArr,        setSavedArr]        = useState([]);

  const resultRef = useRef(null);
  const pc = PLATFORM_COLORS[platform];
  const currentMonth = new Date().getMonth()+1;
  const goalLabels = selectedGoals.map(id=>GOALS.find(g=>g.id===id)?.label).filter(Boolean);

  const toggleGoal = (id) => setSelectedGoals(prev=>
    prev.includes(id)?(prev.length===1?prev:prev.filter(g=>g!==id)):[...prev,id]);
  const togglePillar = (id) => setSelectedPillars(prev=>
    prev.includes(id)?(prev.length===1?prev:prev.filter(p=>p!==id)):[...prev,id]);

  const callAI = async (prompt) => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({ error: "Server error" }));
      throw new Error(errData.error || "Request gagal");
    }
    return await res.json();
  };
  const pushHistory = (result, note) => {
    const entry={id:Date.now()+Math.random(),topic,platform,goals:goalLabels,result,note,ts:new Date().toISOString()};
    setHistoryArr(prev=>[entry,...prev].slice(0,50));
    return entry;
  };
  const saveEntry = (entry) => setSavedArr(prev=>[entry,...prev.filter(s=>s.id!==entry.id)]);

  // ── Generate main ──
  const generate = async () => {
    if(!topic.trim()) return;
    setGenLoading(true); setGenError(null); setGenResult(null);
    try {
      const parsed = await callAI(buildPrompt({topic,platform,goalLabels,count,language}));
      setGenResult(parsed);
      pushHistory(parsed,"Generator");
      setTimeout(()=>resultRef.current?.scrollIntoView({behavior:"smooth"}),100);
    } catch(e) { setGenError("Gagal generate. Pastikan topik sudah diisi lalu coba lagi."); }
    finally { setGenLoading(false); }
  };

  // ── Generate multi-set ──
  const generateSets = async () => {
    if(!topic.trim()) return;
    setSetsRunning(true); setSetsData([null,null,null]);
    const labels=["A","B","C"];
    for(let i=0;i<3;i++){
      setSetsItemLoading(prev=>{const n=[...prev];n[i]=true;return n;});
      try {
        const parsed=await callAI(buildPrompt({topic,platform,goalLabels,count,language,setLabel:labels[i]}));
        setSetsData(prev=>{const n=[...prev];n[i]=parsed;return n;});
        pushHistory(parsed,`Set ${labels[i]}`);
      } catch{}
      setSetsItemLoading(prev=>{const n=[...prev];n[i]=false;return n;});
    }
    setSetsRunning(false);
  };

  // ── Generate pillar ──
  const generatePillar = async (pillarId) => {
    if(!topic.trim()) return;
    const pillar=CONTENT_PILLARS.find(p=>p.id===pillarId)?.label||pillarId;
    setPillarBusy(prev=>({...prev,[pillarId]:true}));
    try {
      const parsed=await callAI(buildPrompt({topic,platform,goalLabels,count:8,language,pillar}));
      setPillarResults(prev=>({...prev,[pillarId]:parsed}));
      pushHistory(parsed,`Pillar: ${pillar}`);
    } catch{}
    setPillarBusy(prev=>({...prev,[pillarId]:false}));
  };
  const generateAllPillars = () => selectedPillars.forEach(id=>generatePillar(id));

  // ── Generate moment ──
  const generateMoment = async (moment) => {
    if(!topic.trim()) return;
    setMomentBusy(true); setMomentResult(null);
    try {
      const parsed=await callAI(buildPrompt({topic,platform,goalLabels,count,language,momentTags:moment.tags}));
      setMomentResult({...parsed,momentName:moment.name});
      pushHistory(parsed,`Momen: ${moment.name}`);
    } catch{}
    setMomentBusy(false);
  };

  const primaryBtn = (active) => ({
    width:"100%",padding:"13px",border:"none",borderRadius:12,
    background:active?`linear-gradient(135deg,${pc}cc,${pc})`:"rgba(255,255,255,.05)",
    color:active?"#fff":"#333",fontSize:14,fontWeight:800,
    cursor:active?"pointer":"not-allowed",transition:"all .3s",fontFamily:"inherit",
    letterSpacing:"0.02em",boxShadow:active?`0 8px 28px ${pc}40`:"none",marginBottom:14,
  });

  const calMoments = COUNTRY_MOMENTS[calCountry]?.moments || [];

  return (
    <div style={{minHeight:"100vh",background:"#07070f",fontFamily:"'DM Sans','Segoe UI',sans-serif",color:"#ddddf0",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,background:`radial-gradient(ellipse 65% 40% at 50% -5%,${pc}22 0%,transparent 65%)`,transition:"background .7s"}}/>
      <div style={{position:"fixed",bottom:"-10%",right:"-5%",width:"30%",height:"30%",background:`radial-gradient(circle,${pc}12 0%,transparent 70%)`,pointerEvents:"none",zIndex:0,transition:"background .7s"}}/>

      <div style={{position:"relative",zIndex:1,maxWidth:760,margin:"0 auto",padding:"36px 18px 80px"}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:30}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${pc}18`,border:`1px solid ${pc}35`,borderRadius:99,padding:"5px 16px",fontSize:10,fontWeight:800,letterSpacing:"0.16em",color:pc,marginBottom:14,textTransform:"uppercase",transition:"all .5s"}}>
            ✦ PRO · Hashtag Intelligence
          </div>
          <h1 style={{fontSize:"clamp(1.8rem,5vw,2.7rem)",fontWeight:900,margin:"0 0 8px",lineHeight:1.1,background:`linear-gradient(130deg,#fff 25%,${pc} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",transition:"background .6s"}}>
            Hashtag Generator Pro
          </h1>
          <p style={{color:"#484860",fontSize:12,margin:0}}>AI-powered · Bilingual · Multi-platform · Strategy-first</p>
        </div>

        {/* ─── Global Inputs ─── */}
        <div style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.07)",borderRadius:20,padding:"20px",marginBottom:14,backdropFilter:"blur(12px)"}}>

          <div style={{marginBottom:18}}>
            <Lbl>Topik / Keyword</Lbl>
            <input value={topic} onChange={e=>setTopic(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&activeTab==="generator"&&generate()}
              placeholder="e.g. kopi susu, UMKM makanan, morning routine, street photography..."
              style={{width:"100%",boxSizing:"border-box",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:10,padding:"11px 14px",fontSize:13,color:"#ddddf0",outline:"none",transition:"border-color .3s",fontFamily:"inherit"}}
              onFocus={e=>e.target.style.borderColor=pc}
              onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.09)"}/>
          </div>

          {/* Platform */}
          <div style={{marginBottom:16}}>
            <Lbl>Platform</Lbl>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,marginBottom:9}}>
              {PLATFORMS.map(p=>{
                const active=platform===p; const col=PLATFORM_COLORS[p];
                return (
                  <button key={p} onClick={()=>setPlatform(p)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"11px 4px",background:active?`${col}1e`:"rgba(255,255,255,.03)",border:`1px solid ${active?col:"rgba(255,255,255,.06)"}`,borderRadius:12,cursor:"pointer",color:active?col:"#484860",fontSize:10,fontWeight:800,letterSpacing:"0.04em",transition:"all .2s",fontFamily:"inherit",boxShadow:active?`0 0 18px ${col}20`:"none"}}>
                    <PIcon p={p} size={17}/>{p}
                  </button>
                );
              })}
            </div>
            <div style={{fontSize:11,color:"#484860",background:`${pc}0c`,border:`1px solid ${pc}18`,borderRadius:8,padding:"8px 12px",lineHeight:1.5,transition:"all .5s"}}>
              {PLATFORM_TIPS[platform]}
            </div>
          </div>

          {/* Goals */}
          <div style={{marginBottom:16}}>
            <Lbl right={<span style={{fontSize:10,color:pc,fontWeight:700,background:`${pc}16`,border:`1px solid ${pc}25`,borderRadius:99,padding:"2px 8px",transition:"all .5s"}}>{selectedGoals.length} dipilih · multi-select</span>}>
              Goals Kampanye
            </Lbl>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6}}>
              {GOALS.map(g=>{
                const active=selectedGoals.includes(g.id);
                return (
                  <button key={g.id} onClick={()=>toggleGoal(g.id)} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 11px",background:active?`${pc}16`:"rgba(255,255,255,.03)",border:`1px solid ${active?pc:"rgba(255,255,255,.06)"}`,borderRadius:10,cursor:"pointer",color:active?pc:"#484860",fontSize:12,fontWeight:active?700:500,textAlign:"left",transition:"all .2s",fontFamily:"inherit"}}>
                    <span style={{fontSize:14,flexShrink:0}}>{g.icon}</span>
                    <span style={{flex:1}}>{g.label}</span>
                    {active&&<span style={{width:13,height:13,borderRadius:"50%",background:pc,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:"#000",fontWeight:900,flexShrink:0}}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slider + Language */}
          <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:14,alignItems:"end"}}>
            <div>
              <Lbl right={<span style={{fontSize:20,fontWeight:900,color:pc,letterSpacing:"-0.03em",lineHeight:1,transition:"color .5s"}}>{count}</span>}>
                Jumlah Hashtag
              </Lbl>
              <input type="range" min={2} max={30} value={count}
                onChange={e=>setCount(Number(e.target.value))}
                style={{width:"100%",accentColor:pc,cursor:"pointer",display:"block"}}/>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
                <span style={{fontSize:9,color:"#333"}}>2</span>
                <span style={{fontSize:9,color:"#555"}}>10</span>
                <span style={{fontSize:9,color:"#555"}}>20</span>
                <span style={{fontSize:9,color:"#333"}}>30</span>
              </div>
            </div>
            <div>
              <Lbl>Bahasa</Lbl>
              <select value={language} onChange={e=>setLanguage(e.target.value)} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.09)",borderRadius:8,padding:"8px 10px",color:"#ccc",fontSize:11,fontFamily:"inherit",outline:"none",cursor:"pointer"}}>
                <option value="bilingual">🇮🇩🇺🇸 Bilingual</option>
                <option value="id">🇮🇩 Indonesia</option>
                <option value="en">🇺🇸 English</option>
              </select>
            </div>
          </div>
        </div>

        {/* ─── Tabs ─── */}
        <div style={{display:"flex",gap:4,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
          {TABS.map(t=>{
            const active=activeTab===t.id;
            return (
              <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{display:"flex",alignItems:"center",gap:5,padding:"7px 13px",background:active?`${pc}1e`:"rgba(255,255,255,.03)",border:`1px solid ${active?pc:"rgba(255,255,255,.06)"}`,borderRadius:99,cursor:"pointer",color:active?pc:"#484860",fontSize:11,fontWeight:active?700:500,whiteSpace:"nowrap",transition:"all .2s",fontFamily:"inherit",flexShrink:0}}>
                {t.icon} {t.label}
              </button>
            );
          })}
        </div>

        {/* ════ TAB: GENERATOR ════ */}
        {activeTab==="generator"&&(
          <div>
            <button onClick={generate} disabled={!topic.trim()||genLoading} style={primaryBtn(topic.trim()&&!genLoading)}>
              {genLoading
                ?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Spin/> Generating {count} hashtags...</span>
                :`⚡ Generate ${count} Hashtags`}
            </button>
            {genError&&<div style={{background:"rgba(255,70,70,.08)",border:"1px solid rgba(255,70,70,.2)",borderRadius:10,padding:"10px 14px",color:"#ff7070",fontSize:12,marginBottom:12}}>{genError}</div>}
            {genResult&&(
              <div ref={resultRef} style={{animation:"fadeUp .4s ease forwards"}}>
                <ResultBlock result={genResult} platform={platform} pc={pc} topic={topic}
                  onSave={()=>saveEntry(pushHistory(genResult,"Saved"))}/>
              </div>
            )}
          </div>
        )}

        {/* ════ TAB: MULTI-SET ════ */}
        {activeTab==="sets"&&(
          <div>
            <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,padding:"12px 14px",marginBottom:12,fontSize:12,color:"#555",lineHeight:1.6}}>
              🔄 <strong style={{color:"#888"}}>Rotasi Hashtag</strong> — Gunakan Set A, B, C bergantian agar tidak kena shadow-limit dari platform.
            </div>
            <button onClick={generateSets} disabled={!topic.trim()||setsRunning} style={primaryBtn(topic.trim()&&!setsRunning)}>
              {setsRunning?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Spin/> Generating 3 sets...</span>:"🔄 Generate 3 Set Rotasi (A, B, C)"}
            </button>
            {["A","B","C"].map((label,i)=>(
              <div key={label} style={{marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:`${pc}20`,border:`2px solid ${pc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:pc}}>{label}</div>
                  <span style={{fontSize:11,fontWeight:700,color:"#777"}}>Set {label} — {["Senin / Kamis","Selasa / Jumat","Rabu / Sabtu"][i]}</span>
                  {setsItemLoading[i]&&<Spin/>}
                </div>
                {setsData[i]
                  ?<ResultBlock result={setsData[i]} platform={platform} pc={pc} topic={topic}
                      onSave={()=>saveEntry(pushHistory(setsData[i],`Set ${label}`))}/>
                  :<div style={{background:"rgba(255,255,255,.02)",border:"1px dashed rgba(255,255,255,.06)",borderRadius:12,padding:20,textAlign:"center",color:"#333",fontSize:11}}>
                    {setsItemLoading[i]?"Generating...":"Set "+label+" akan muncul di sini"}
                  </div>
                }
              </div>
            ))}
          </div>
        )}

        {/* ════ TAB: KALENDER MOMEN ════ */}
        {activeTab==="calendar"&&(
          <div>
            {/* Country selector */}
            <div style={{marginBottom:14}}>
              <Lbl>Pilih Negara / Region</Lbl>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {Object.entries(COUNTRY_MOMENTS).map(([code,data])=>{
                  const active=calCountry===code;
                  return (
                    <button key={code} onClick={()=>{setCalCountry(code);setSelMoment(null);setMomentResult(null);}} style={{
                      padding:"7px 13px",
                      background:active?`${pc}1e`:"rgba(255,255,255,.04)",
                      border:`1px solid ${active?pc:"rgba(255,255,255,.08)"}`,
                      borderRadius:99,cursor:"pointer",color:active?pc:"#555",
                      fontSize:12,fontWeight:active?700:500,
                      transition:"all .2s",fontFamily:"inherit",
                      boxShadow:active?`0 0 14px ${pc}20`:"none",
                    }}>
                      {data.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,padding:"11px 14px",marginBottom:14,fontSize:12,color:"#555",lineHeight:1.5}}>
              📅 <strong style={{color:"#888"}}>Momen {COUNTRY_MOMENTS[calCountry]?.label}</strong> — Pilih momen lalu AI akan mix hashtag topikmu dengan hashtag momen tersebut.
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:7,marginBottom:16}}>
              {calMoments.map(m=>{
                const isNow=m.month===currentMonth;
                const active=selMoment?.month===m.month&&selMoment?.name===m.name;
                return (
                  <button key={`${m.month}-${m.name}`} onClick={()=>{setSelMoment(active?null:m);setMomentResult(null);}} style={{display:"flex",flexDirection:"column",gap:3,padding:"9px 11px",background:active?`${pc}18`:isNow?"rgba(255,220,50,.05)":"rgba(255,255,255,.03)",border:`1px solid ${active?pc:isNow?"rgba(255,220,50,.2)":"rgba(255,255,255,.06)"}`,borderRadius:10,cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all .2s"}}>
                    <span style={{fontSize:9,fontWeight:800,letterSpacing:"0.08em",color:isNow?"#fbbf24":"#444",textTransform:"uppercase"}}>{isNow?"⚡ Bulan ini · ":""}Bulan {m.month}</span>
                    <span style={{fontSize:12,fontWeight:700,color:active?pc:"#aaa"}}>{m.name}</span>
                    <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                      {m.tags.slice(0,2).map(t=><span key={t} style={{fontSize:9,color:"#444",background:"rgba(255,255,255,.04)",borderRadius:4,padding:"1px 5px"}}>{t}</span>)}
                      {m.tags.length>2&&<span style={{fontSize:9,color:"#333"}}>+{m.tags.length-2}</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {selMoment&&(
              <>
                <div style={{background:`${pc}0e`,border:`1px solid ${pc}18`,borderRadius:9,padding:"9px 13px",marginBottom:10,fontSize:12,color:"#888",lineHeight:1.5}}>
                  Generate untuk "<strong style={{color:pc}}>{topic||"(isi topik dulu)"}</strong>" + momen <strong style={{color:pc}}>{selMoment.name}</strong>
                </div>
                <button onClick={()=>generateMoment(selMoment)} disabled={!topic.trim()||momentBusy} style={primaryBtn(topic.trim()&&!momentBusy)}>
                  {momentBusy?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Spin/> Generating...</span>:`📅 Generate Hashtag Momen ${selMoment.name}`}
                </button>
              </>
            )}

            {momentResult&&(
              <div style={{animation:"fadeUp .4s ease forwards"}}>
                <div style={{fontSize:10,fontWeight:800,color:"#4a4a6a",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:7}}>Hasil · {momentResult.momentName}</div>
                <ResultBlock result={momentResult} platform={platform} pc={pc} topic={topic}
                  onSave={()=>saveEntry(pushHistory(momentResult,`Momen: ${momentResult.momentName}`))}/>
              </div>
            )}
          </div>
        )}

        {/* ════ TAB: PILLARS ════ */}
        {activeTab==="pillars"&&(
          <div>
            <div style={{background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.06)",borderRadius:12,padding:"12px 14px",marginBottom:14,fontSize:12,color:"#555",lineHeight:1.6}}>
              🎯 <strong style={{color:"#888"}}>Content Pillars</strong> — Setiap pilar konten butuh set hashtag berbeda. Pilih pilar yang relevan dengan brand kamu.
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:12}}>
              {CONTENT_PILLARS.map(p=>{
                const active=selectedPillars.includes(p.id);
                return (
                  <button key={p.id} onClick={()=>togglePillar(p.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,padding:"9px 5px",background:active?`${pc}16`:"rgba(255,255,255,.03)",border:`1px solid ${active?pc:"rgba(255,255,255,.06)"}`,borderRadius:10,cursor:"pointer",color:active?pc:"#484860",fontSize:10,fontWeight:active?700:500,transition:"all .2s",fontFamily:"inherit"}}>
                    <span style={{fontSize:18}}>{p.icon}</span>
                    {p.label}
                    {active&&<span style={{width:12,height:12,borderRadius:"50%",background:pc,display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:"#000",fontWeight:900}}>✓</span>}
                  </button>
                );
              })}
            </div>
            <button onClick={generateAllPillars} disabled={!topic.trim()||Object.values(pillarBusy).some(v=>v)} style={primaryBtn(topic.trim()&&!Object.values(pillarBusy).some(v=>v))}>
              🎯 Generate {selectedPillars.length} Content Pillar
            </button>
            {CONTENT_PILLARS.filter(p=>selectedPillars.includes(p.id)).map(p=>(
              <div key={p.id} style={{marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:7}}>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <span style={{fontSize:16}}>{p.icon}</span>
                    <span style={{fontSize:12,fontWeight:700,color:"#aaa"}}>{p.label}</span>
                    {pillarBusy[p.id]&&<Spin/>}
                  </div>
                  <button onClick={()=>generatePillar(p.id)} disabled={!topic.trim()||pillarBusy[p.id]} style={{padding:"4px 9px",background:`${pc}14`,border:`1px solid ${pc}28`,borderRadius:7,color:pc,fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>↺ Regenerate</button>
                </div>
                {pillarResults[p.id]
                  ?<ResultBlock result={pillarResults[p.id]} platform={platform} pc={pc} topic={topic}
                      onSave={()=>saveEntry(pushHistory(pillarResults[p.id],`Pillar: ${p.label}`))}/>
                  :<div style={{background:"rgba(255,255,255,.02)",border:"1px dashed rgba(255,255,255,.06)",borderRadius:12,padding:18,textAlign:"center",color:"#333",fontSize:11}}>
                    {pillarBusy[p.id]?"Generating...":"Klik Generate untuk "+p.label}
                  </div>
                }
              </div>
            ))}
          </div>
        )}

        {/* ════ TAB: HISTORY ════ */}
        {activeTab==="history"&&(
          <div>
            {savedArr.length>0&&(
              <>
                <div style={{fontSize:10,fontWeight:800,letterSpacing:"0.14em",color:"#4a4a6a",textTransform:"uppercase",marginBottom:8}}>★ Koleksi Tersimpan ({savedArr.length})</div>
                {savedArr.map((entry,i)=>(
                  <HistoryCard key={entry.id} entry={entry}
                    onDelete={()=>setSavedArr(prev=>prev.filter((_,j)=>j!==i))}/>
                ))}
                <div style={{height:14,borderBottom:"1px solid rgba(255,255,255,.06)",marginBottom:14}}/>
              </>
            )}
            <div style={{fontSize:10,fontWeight:800,letterSpacing:"0.14em",color:"#4a4a6a",textTransform:"uppercase",marginBottom:8}}>🕐 Riwayat ({historyArr.length})</div>
            {historyArr.length===0
              ?<div style={{textAlign:"center",padding:40,color:"#333",fontSize:13}}>Belum ada riwayat.<br/>Generate hashtag pertamamu!</div>
              :historyArr.map((entry,i)=>(
                <HistoryCard key={entry.id} entry={entry}
                  onSave={()=>saveEntry(entry)}
                  onDelete={()=>setHistoryArr(prev=>prev.filter((_,j)=>j!==i))}/>
              ))
            }
            {historyArr.length>0&&(
              <button onClick={()=>setHistoryArr([])} style={{marginTop:10,width:"100%",padding:"8px",background:"rgba(255,70,70,.07)",border:"1px solid rgba(255,70,70,.14)",borderRadius:8,color:"#ff7070",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                🗑️ Hapus Semua History
              </button>
            )}
          </div>
        )}

      </div>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        input[type=range]{-webkit-appearance:none;height:3px;border-radius:99px;background:rgba(255,255,255,.07);display:block;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;cursor:pointer;background:#fff;border:2.5px solid ${pc};box-shadow:0 0 8px ${pc}80;transition:border-color .4s;}
        input::placeholder{color:#252535;}
        select option{background:#111;}
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:99px;}
      `}</style>
    </div>
  );
}
