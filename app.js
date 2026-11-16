"use strict";
const tools=[
{id:"flow",name:"Google Flow",category:"Video",symbol:"V3",tag:"DAILY",color:"#c0d7f9",offer:"Free daily credits",description:"Experiment with cinematic AI-generated video.",url:"https://labs.google/fx/tools/flow",free:true,steps:["Sign in and check the current free credit allowance.","Generate a short cinematic scene from a specific prompt.","Compare the result with your original idea."]},
{id:"runway",name:"Runway",category:"Video",symbol:"R",tag:"TRIAL",color:"#e7e0d2",offer:"Limited starter credits",description:"Explore AI video generation and creative editing.",url:"https://runwayml.com",free:true,steps:["Create an account and inspect free-plan limits.","Choose a supported generation model.","Animate a still image and check output restrictions."]},
{id:"meshy",name:"Meshy",category:"3D",symbol:"M✳",tag:"MONTHLY",color:"#d8c2f9",offer:"Free 3D generation allowance",description:"Generate game assets and 3D props from text.",url:"https://www.meshy.ai/pricing",free:true,steps:["Check monthly credits and the license.","Describe a simple low-poly prop.","Inspect the 3D model and available export formats."]},
{id:"tripo",name:"Tripo",category:"3D",symbol:"3D",tag:"MONTHLY",color:"#b3e3c6",offer:"Free 3D generation credits",description:"Turn images and text into textured 3D assets.",url:"https://www.tripo3d.ai",free:true,steps:["Upload an image of a simple object.","Generate a 3D model.","Compare shape and texture accuracy."]},
{id:"copilot",name:"GitHub Copilot",category:"Code",symbol:"</>",tag:"FREE TIER",color:"#c4c5ee",offer:"Limited free developer tier",description:"Try AI coding suggestions and chat in your editor.",url:"https://github.com/features/copilot/plans",free:true,steps:["Check your free-plan eligibility.","Install Copilot in your editor.","Ask for an explanation of a small Java function and verify the answer."]},
{id:"openrouter",name:"OpenRouter",category:"Code",symbol:"OR",tag:"FREE MODELS",color:"#c1e6e9",offer:"Free API model routes",description:"Compare many LLMs through a single API.",url:"https://openrouter.ai/collections/free-models",free:true,steps:["Select an available free model.","Use the playground or create an API key.","Try the same prompt on two models and compare."]},
{id:"elevenlabs",name:"ElevenLabs",category:"Voice",symbol:"11",tag:"MONTHLY",color:"#ffd1b5",offer:"Free voice generation quota",description:"Generate speech, sounds and narration.",url:"https://elevenlabs.io/pricing",free:true,steps:["Check current free credits.","Generate a 20-second sample narration.","Compare voices and the download license."]},
{id:"n8n",name:"n8n",category:"Automation",symbol:"n8n",tag:"SELF HOST",color:"#ffcabd",offer:"Self-hosted community edition",description:"Connect apps and APIs in automated workflows.",url:"https://n8n.io",free:true,steps:["Read n8n's self-hosting documentation.","Set up a manual-trigger workflow.","Connect it to an API and inspect its output."]},
{id:"azure",name:"Azure",category:"Cloud",symbol:"AZ",tag:"TRIAL",color:"#bcd6ff",offer:"New-customer trial credits",description:"Explore eligible cloud and AI services.",url:"https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account",free:true,steps:["Read eligibility and card requirements.","Check which services accept trial credit.","Create a budget alert before experimenting."]},
{id:"gcloud",name:"Google Cloud",category:"Cloud",symbol:"G·",tag:"TRIAL",color:"#eae5ab",offer:"New-customer trial credits",description:"Deploy experiments and try cloud APIs.",url:"https://cloud.google.com/free",free:true,steps:["Read free-trial eligibility conditions.","Select an inexpensive eligible service.","Set alerts and review usage carefully."]},
{id:"higgsfield",name:"Higgsfield",category:"Video",symbol:"HF",tag:"PAID DEAL",color:"#f4c0aa",offer:"Check current promotional pricing",description:"Experiment with cinematic generative video.",url:"https://higgsfield.ai",free:false,steps:["Compare current plans and promotions.","Check renewal price and cancellation terms.","Estimate how many clips the plan covers."]},
{id:"firefly",name:"Adobe Firefly",category:"Video",symbol:"F✳",tag:"PAID DEAL",color:"#e4c5fa",offer:"Check introductory offer",description:"Create and edit AI visuals and video.",url:"https://www.adobe.com/products/firefly.html",free:false,steps:["Check offers available in your country.","Review generative credit rules.","Compare the offer with free access."]}
];
const experiments=[
{title:"Build a €0 personal AI assistant",tools:"OpenRouter + n8n + Raspberry Pi",steps:["Install or host n8n on a computer or Pi.","Connect a free model endpoint from OpenRouter.","Add a simple trigger and test the answer.","Protect API keys and restrict external access."]},
{title:"Turn one sketch into a 3D object",tools:"Tripo + Blender",steps:["Draw a clear object silhouette.","Generate a model using available credits.","Import the asset into Blender.","Refine the shape and make a render."]},
{title:"Make a 15-second micro-movie",tools:"Google Flow + Runway + DaVinci Resolve",steps:["Outline three brief shots.","Generate source clips using free credits.","Edit the shots together.","Add titles and export."]},
{title:"Create an AI coding reviewer",tools:"OpenRouter + VS Code",steps:["Create a tiny Java project.","Ask two free models to review the same code.","Write tests for suggested improvements.","Keep only findings you can validate."]},
{title:"Narrate a short tutorial",tools:"ElevenLabs + video editor",steps:["Write a 30-second script.","Generate narration within your free quota.","Combine with simple visuals.","Export and review."]}
];
const state={category:"All",search:"",free:false,onlySaved:false};
const $=s=>document.querySelector(s);
let saved;try{saved=new Set(JSON.parse(localStorage.getItem("openlab.saved")||"[]"))}catch{saved=new Set()}
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function updateSaved(){try{localStorage.setItem("openlab.saved",JSON.stringify([...saved]))}catch{}$("#savedCount").textContent=saved.size}
function render(){
updateSaved();
const items=tools.filter(t=>(state.category==="All"||t.category===state.category)&&(!state.free||t.free)&&(!state.onlySaved||saved.has(t.id))&&[t.name,t.category,t.offer,t.description].join(" ").toLowerCase().includes(state.search));
$("#cards").innerHTML=items.length?items.map(t=>`<article class="card"><div class="cardArt" style="background:${t.color}"><span class="badge">${t.tag}</span><button class="bookmark" data-save="${t.id}" aria-label="Save ${escapeHtml(t.name)}">${saved.has(t.id)?"★":"☆"}</button><strong>${escapeHtml(t.symbol)}</strong></div><div class="cardBody"><h3>${escapeHtml(t.name)}</h3><div class="offer">${escapeHtml(t.offer)}</div><p>${escapeHtml(t.description)}</p><div class="cardBottom"><span>${t.category.toUpperCase()} / ${t.free?"FREE ENTRY":"PAID"}</span><button data-tool="${t.id}">DETAILS ↗</button></div></div></article>`).join(""):'<p>No matching tools. Try another category or search.</p>';
}
function showPage(page){for(const id of ["discover","workflows","guide"])$("#"+id).hidden=id!==page;document.querySelectorAll("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));window.scrollTo({top:0,behavior:"smooth"})}
function showModal(body){$("#modalRoot").hidden=false;$("#modalRoot").innerHTML=`<div class="dialog" role="dialog" aria-modal="true"><button class="close" data-close aria-label="Close">×</button>${body}</div>`;$("#modalRoot .close").focus()}
function closeModal(){$("#modalRoot").hidden=true;$("#modalRoot").innerHTML=""}
function toolDetails(id){const t=tools.find(x=>x.id===id);if(!t)return;showModal(`<div class="eyebrow">OPEN//LAB / TOOL FILE</div><h2>${escapeHtml(t.name)}</h2><p class="offer">${escapeHtml(t.offer)}</p><p>${escapeHtml(t.description)}</p><h3>10-MINUTE EXPERIMENT ↘</h3><ol>${t.steps.map(s=>`<li>${escapeHtml(s)}</li>`).join("")}</ol><p class="notice"><b>Before signing up:</b> Demo listing only. Check current availability, credit expiry, billing conditions, licensing and region restrictions on the official site.</p><a class="hot" href="${t.url}" target="_blank" rel="noopener noreferrer">OFFICIAL WEBSITE ↗</a>`)}
function workflowDetails(i){const w=experiments[i];if(!w)return;showModal(`<div class="eyebrow">OPEN//LAB / WORKFLOW RECIPE</div><h2>${escapeHtml(w.title)}</h2><p class="offer">${escapeHtml(w.tools)}</p><ol>${w.steps.map(s=>`<li>${escapeHtml(s)}</li>`).join("")}</ol><p class="notice">Workflow concept only. Tool plans and costs may change.</p>`)}
$("#toolCount").textContent=tools.length;
$("#recipes").innerHTML=experiments.map((w,i)=>`<div class="recipe" tabindex="0" role="button" data-recipe="${i}"><div><span class="eyebrow">EXPERIMENT 00${i+1}</span><h3>${escapeHtml(w.title)}</h3><p>${escapeHtml(w.tools)}</p></div><strong>↗</strong></div>`).join("");
document.addEventListener("click",e=>{
const tab=e.target.closest("[data-page]");if(tab){showPage(tab.dataset.page);return}
const cat=e.target.closest("[data-category]");if(cat){state.category=cat.dataset.category;document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("active",b===cat));render();return}
const book=e.target.closest("[data-save]");if(book){saved.has(book.dataset.save)?saved.delete(book.dataset.save):saved.add(book.dataset.save);render();return}
const detail=e.target.closest("[data-tool]");if(detail){toolDetails(detail.dataset.tool);return}
const recipe=e.target.closest("[data-recipe]");if(recipe){workflowDetails(Number(recipe.dataset.recipe));return}
if(e.target.closest("[data-close]")||e.target.id==="modalRoot"){closeModal();return}
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-recipe]")){e.preventDefault();workflowDetails(Number(e.target.dataset.recipe))}});
$("#searchInput").addEventListener("input",e=>{state.search=e.target.value.toLowerCase();render()});
$("#freeOnly").addEventListener("change",e=>{state.free=e.target.checked;render()});
$("#savedButton").addEventListener("click",()=>{state.onlySaved=!state.onlySaved;$("#savedButton").style.background=state.onlySaved?"#ff5830":"";showPage("discover");render()});
$("#exploreButton").addEventListener("click",()=>$("#discover").scrollIntoView({behavior:"smooth"}));
$("#workflowButton").addEventListener("click",()=>showPage("workflows"));
render();
