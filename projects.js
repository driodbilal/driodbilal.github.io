/* All portfolio projects. To add one, copy an entry and edit it.
   type: "webflow" or "automation". flow: steps; prefix "*" for an AI step, the last step is the result. */
var PROJECTS = [
  { type:"automation", featured:true, case:"case-blog-pipeline.html", name:"AI blog pipeline", tag:"n8n · E-commerce",
    flow:["Keyword","*Research","*AI draft","*Self-check","*AI image","Review","WordPress"],
    text:"Writes SEO blogs for an appliance brand, fixes its own mistakes, then drafts in WordPress for approval.",
    result:"~2 hrs saved per post" },
  { type:"webflow", featured:true, case:"case-nonprofit-website.html", name:"Nonprofit donation website", tag:"Webflow + Automation · Nonprofit", tint:"#d98a2b",
    url:"https://africarelief.org/",
    text:"Clear donor flows, filterable campaign pages and donor data synced to Klaviyo." },
  { type:"automation", featured:true, case:"case-fundraising-reports.html", name:"Fundraising reports", tag:"Make.com · 2 nonprofits",
    flow:["Form","Make.com","5 platforms","Google Sheet"],
    text:"One form submission pulls donation, email and ad results into a single sheet for the weekly report.",
    result:"30–60 min → ~10 min" },
  { type:"webflow", featured:true, case:"case-home-care-website.html", name:"Rosie Nightingale Homecare", tag:"Webflow · Freelance", tint:"#1b6b9e",
    url:"https://www.rosienightingale.co.uk/",
    text:"Took over a messy build, cleaned it up, and added CMS for services, jobs and blogs." },
  { type:"webflow", case:"case-ai-software-website.html", name:"AI software website", tag:"Webflow · SaaS", tint:"#6d4cff",
    url:"https://www.maestrolabs.com/",
    text:"Homepage and services rebuilt to a new Figma design, with intense CMS work." },
  { type:"webflow", name:"Design agency website", tag:"Webflow · Agency", tint:"#e2475b",
    url:"https://wisual.co/",
    text:"Template revamped to the agency's needs, with subtle Jitter videos that play on hover through custom code." },
  { type:"webflow", case:"case-tech-consultancy-website.html", name:"Tech consultancy website", tag:"Webflow · Tech services", tint:"#0f8a8a",
    url:"https://www.whizzbridge.com/",
    text:"Cleanup, new pages, Finsweet filters, multi-step forms, personalized CTAs and full tracking." },
  { type:"webflow", featured:false, case:"case-figma-to-webflow.html", name:"Bolton Timber Supplies", tag:"Webflow · Freelance", tint:"#8a5a2b",
    url:"https://boltontimbersupplies.co.uk/",
    text:"Figma to Webflow in about an hour with Claude and MCP, design system and animations included." },
  { type:"automation", case:"case-lead-qualification.html", name:"Lead qualification for Aeon Digital", tag:"Make.com · Agency",
    flow:["Website form","Make.com","Budget check","Calendly or thank-you"],
    text:"Every inquiry is checked by budget. Good-fit leads get a booking link, others a polite reply.",
    result:"Good-fit leads book calls themselves" },
  { type:"automation", case:"case-scrum-digest.html", name:"Daily scrum digest", tag:"Claude · Task management",
    flow:["ClickUp","*Find stuck tasks","Daily digest","Dashboard"],
    text:"Flags tasks with no update in 7 days, stuck in one status, or waiting too long in review.",
    result:"Stuck work shows up every morning" },
  { type:"automation", case:"case-donor-retention.html", name:"Donor retention flows", tag:"Zapier · Nonprofit",
    flow:["Donation or drop-off","Zapier","Klaviyo list","Email flow"],
    text:"Donors get thanked, abandoned donations get a reminder, and $5k+ gifts alert the team for a personal note.",
    result:"Abandoned donations get a second chance" }
];

function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

function cardHTML(p){
  var visual;
  if (p.type === "automation") {
    var steps = p.flow.map(function(s, i){
      var ai = s.charAt(0) === "*", label = ai ? s.slice(1) : s;
      var cls = i === p.flow.length - 1 ? "node end" : (ai ? "node ai" : "node");
      return (i ? '<span class="arrow" aria-hidden="true">→</span>' : "") + '<span class="' + cls + '">' + esc(label) + "</span>";
    }).join("");
    visual = '<div class="flow" aria-label="' + esc(p.flow.map(function(s){return s.replace("*","");}).join(", then ")) + '">' + steps + "</div>";
  } else {
    visual = '<div class="browser" aria-hidden="true" style="--tint:' + esc(p.tint || "") + '"><div class="bar"><i></i><i></i><i></i>' +
      '</div><div class="page"><b class="h"></b><b></b><b class="s"></b><div class="blocks"><b></b><b></b><b></b></div></div></div>';
  }
  var foot = p.type === "automation"
    ? '<p class="result">' + esc(p.result) + "</p>"
    : '<a class="live" href="' + esc(p.url) + '" target="_blank" rel="noopener">View live site ↗</a>';
  if (p.case) foot += '<a class="case-link" href="' + esc(p.case) + '">Read case study →</a>';
  foot = '<div class="card-foot">' + foot + '</div>';
  return '<article class="card" data-type="' + p.type + '"><div class="visual">' + visual + '</div><div class="body"><span class="tag">' +
    esc(p.tag) + "</span><h3>" + esc(p.name) + "</h3><p>" + esc(p.text) + "</p>" + foot + "</div></article>";
}

function renderProjects(el, filter){
  var list = PROJECTS.filter(filter || function(){ return true; });
  el.innerHTML = list.map(cardHTML).join("");
}
