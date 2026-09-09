var ct=Object.defineProperty;var lt=(e,t,r)=>t in e?ct(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var W=(e,t,r)=>lt(e,typeof t!="symbol"?t+"":t,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();const q=["Welding","Laser","Bending","Painting","Fitting","Fabrication","Assembly","Other"],S=["Contractor A","Contractor B","Contractor C","Contractor D"],A="BSP Metatech LLP — Chakan",_={ROSTER:"roster",ATTENDANCE_PREFIX:"attendance:"},dt="modulepreload",ut=function(e){return"/"+e},Y={},ft=function(t,r,o){let n=Promise.resolve();if(r&&r.length>0){let i=function(l){return Promise.all(l.map(g=>Promise.resolve(g).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),f=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));n=i(r.map(l=>{if(l=ut(l),l in Y)return;Y[l]=!0;const g=l.endsWith(".css"),u=g?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=g?"stylesheet":dt,g||(d.as="script"),d.crossOrigin="",d.href=l,f&&d.setAttribute("nonce",f),document.head.appendChild(d),g)return new Promise((E,y)=>{d.addEventListener("load",E),d.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return n.then(i=>{for(const a of i||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})};/*! Capacitor: https://capacitorjs.com/ - MIT License */var C;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(C||(C={}));class H extends Error{constructor(t,r,o){super(t),this.message=t,this.code=r,this.data=o}}const ht=e=>{var t,r;return e!=null&&e.androidBridge?"android":!((r=(t=e==null?void 0:e.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||r===void 0)&&r.bridge?"ios":"web"},pt=e=>{const t=e.CapacitorCustomPlatform||null,r=e.Capacitor||{},o=r.Plugins=r.Plugins||{},n=()=>t!==null?t.name:ht(e),s=()=>n()!=="web",i=u=>{const d=l.get(u);return!!(d!=null&&d.platforms.has(n())||a(u))},a=u=>{var d;return(d=r.PluginHeaders)===null||d===void 0?void 0:d.find(E=>E.name===u)},f=u=>e.console.error(u),l=new Map,g=(u,d={})=>{const E=l.get(u);if(E)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),E.proxy;const y=n(),c=a(u);let b;const L=async()=>(!b&&y in d?b=typeof d[y]=="function"?b=await d[y]():b=d[y]:t!==null&&!b&&"web"in d&&(b=typeof d.web=="function"?b=await d.web():b=d.web),b),D=(v,m)=>{var $,k;if(c){const P=c==null?void 0:c.methods.find(w=>m===w.name);if(P)return P.rtype==="promise"?w=>r.nativePromise(u,m.toString(),w):(w,O)=>r.nativeCallback(u,m.toString(),w,O);if(v)return($=v[m])===null||$===void 0?void 0:$.bind(v)}else{if(v)return(k=v[m])===null||k===void 0?void 0:k.bind(v);throw new H(`"${u}" plugin is not implemented on ${y}`,C.Unimplemented)}},j=v=>{let m;const $=(...k)=>{const P=L().then(w=>{const O=D(w,v);if(O){const T=O(...k);return m=T==null?void 0:T.remove,T}else throw new H(`"${u}.${v}()" is not implemented on ${y}`,C.Unimplemented)});return v==="addListener"&&(P.remove=async()=>m()),P};return $.toString=()=>`${v.toString()}() { [capacitor code] }`,Object.defineProperty($,"name",{value:v,writable:!1,configurable:!1}),$},J=j("addListener"),V=j("removeListener"),it=(v,m)=>{const $=J({eventName:v},m),k=async()=>{const w=await $;V({eventName:v,callbackId:w},m)},P=new Promise(w=>$.then(()=>w({remove:k})));return P.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await k()},P},U=new Proxy({},{get(v,m){switch(m){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return c?it:J;case"removeListener":return V;default:return j(m)}}});return o[u]=U,l.set(u,{name:u,proxy:U,platforms:new Set([...Object.keys(d),...c?[y]:[]])}),U};return r.convertFileSrc||(r.convertFileSrc=u=>u),r.getPlatform=n,r.handleError=f,r.isNativePlatform=s,r.isPluginAvailable=i,r.registerPlugin=g,r.Exception=H,r.DEBUG=!!r.DEBUG,r.isLoggingEnabled=!!r.isLoggingEnabled,r},bt=e=>e.Capacitor=pt(e),K=bt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),B=K.registerPlugin;class G{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,r){let o=!1;this.listeners[t]||(this.listeners[t]=[],o=!0),this.listeners[t].push(r);const s=this.windowListeners[t];s&&!s.registered&&this.addWindowListener(s),o&&this.sendRetainedArgumentsForEvent(t);const i=async()=>this.removeListener(t,r);return Promise.resolve({remove:i})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,r,o){const n=this.listeners[t];if(!n){if(o){let s=this.retainedEventArguments[t];s||(s=[]),s.push(r),this.retainedEventArguments[t]=s}return}n.forEach(s=>s(r))}hasListeners(t){var r;return!!(!((r=this.listeners[t])===null||r===void 0)&&r.length)}registerWindowListener(t,r){this.windowListeners[r]={registered:!1,windowEventName:t,pluginEventName:r,handler:o=>{this.notifyListeners(r,o)}}}unimplemented(t="not implemented"){return new K.Exception(t,C.Unimplemented)}unavailable(t="not available"){return new K.Exception(t,C.Unavailable)}async removeListener(t,r){const o=this.listeners[t];if(!o)return;const n=o.indexOf(r);n!==-1&&this.listeners[t].splice(n,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const r=this.retainedEventArguments[t];r&&(delete this.retainedEventArguments[t],r.forEach(o=>{this.notifyListeners(t,o)}))}}const z=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),X=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class vt extends G{async getCookies(){const t=document.cookie,r={};return t.split(";").forEach(o=>{if(o.length<=0)return;let[n,s]=o.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=X(n).trim(),s=X(s).trim(),r[n]=s}),r}async setCookie(t){try{const r=z(t.key),o=z(t.value),n=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",s=(t.path||"/").replace("path=",""),i=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${r}=${o||""}${n}; path=${s}; ${i};`}catch(r){return Promise.reject(r)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(r){return Promise.reject(r)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const r of t)document.cookie=r.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}B("CapacitorCookies",{web:()=>new vt});const gt=async e=>new Promise((t,r)=>{const o=new FileReader;o.onload=()=>{const n=o.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},o.onerror=n=>r(n),o.readAsDataURL(e)}),mt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(n=>n.toLocaleLowerCase()).reduce((n,s,i)=>(n[s]=e[t[i]],n),{})},yt=(e,t=!0)=>e?Object.entries(e).reduce((o,n)=>{const[s,i]=n;let a,f;return Array.isArray(i)?(f="",i.forEach(l=>{a=t?encodeURIComponent(l):l,f+=`${s}=${a}&`}),f.slice(0,-1)):(a=t?encodeURIComponent(i):i,f=`${s}=${a}`),`${o}&${f}`},"").substr(1):null,wt=(e,t={})=>{const r=Object.assign({method:e.method||"GET",headers:e.headers},t),n=mt(e.headers)["content-type"]||"";if(typeof e.data=="string")r.body=e.data;else if(n.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[i,a]of Object.entries(e.data||{}))s.set(i,a);r.body=s.toString()}else if(n.includes("multipart/form-data")||e.data instanceof FormData){const s=new FormData;if(e.data instanceof FormData)e.data.forEach((a,f)=>{s.append(f,a)});else for(const a of Object.keys(e.data))s.append(a,e.data[a]);r.body=s;const i=new Headers(r.headers);i.delete("content-type"),r.headers=i}else(n.includes("application/json")||typeof e.data=="object")&&(r.body=JSON.stringify(e.data));return r};class $t extends G{async request(t){const r=wt(t,t.webFetchExtra),o=yt(t.params,t.shouldEncodeUrlParams),n=o?`${t.url}?${o}`:t.url,s=await fetch(n,r),i=s.headers.get("content-type")||"";let{responseType:a="text"}=s.ok?t:{};i.includes("application/json")&&(a="json");let f,l;switch(a){case"arraybuffer":case"blob":l=await s.blob(),f=await gt(l);break;case"json":f=await s.json();break;case"document":case"text":default:f=await s.text()}const g={};return s.headers.forEach((u,d)=>{g[d]=u}),{data:f,headers:g,status:s.status,url:s.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}B("CapacitorHttp",{web:()=>new $t});var Q;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(Q||(Q={}));var Z;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(Z||(Z={}));class Et extends G{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}B("SystemBars",{web:()=>new Et});const I=B("Preferences",{web:()=>ft(()=>import("./web-B5UA516y.js"),[]).then(e=>new e.PreferencesWeb)});async function kt(){try{const{value:e}=await I.get({key:_.ROSTER});return e?JSON.parse(e):[]}catch(e){return console.error("Failed to load roster from preferences",e),[]}}async function tt(e){try{await I.set({key:_.ROSTER,value:JSON.stringify(e)})}catch(t){console.error("Failed to save roster to preferences",t)}}async function Pt(e){try{const{value:t}=await I.get({key:`${_.ATTENDANCE_PREFIX}${e}`});return t?JSON.parse(t):[]}catch(t){return console.error(`Failed to load attendance for ${e}`,t),[]}}async function et(e,t){try{await I.set({key:`${_.ATTENDANCE_PREFIX}${e}`,value:JSON.stringify(t)})}catch(r){console.error(`Failed to save attendance for ${e}`,r)}}function rt(){const e=new Date,t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),o=String(e.getDate()).padStart(2,"0");return`${t}-${r}-${o}`}function nt(e){return new Date(e+"T00:00:00").toLocaleDateString("en-IN",{weekday:"short",day:"2-digit",month:"short",year:"numeric"})}function St(){return"w"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function p(e){return e?e.replace(/[&<>"']/g,t=>{switch(t){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#39;";default:return t}}):""}function F(e,t){const r=new Map;for(const o of e){const n=t(o);let s=r.get(n);s||(s=[],r.set(n,s)),s.push(o)}return r}async function Ct(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.left="-999999px",t.style.top="-999999px",document.body.appendChild(t),t.focus(),t.select();const r=document.execCommand("copy");return document.body.removeChild(t),r}catch(t){return console.error("Failed to copy to clipboard",t),!1}}class Lt{constructor(){W(this,"state",{roster:[],attendance:{},tab:"today",currentDate:rt(),editing:null,formDraft:null});W(this,"listeners",new Set)}getState(){return this.state}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)t()}async init(){const t=rt();this.state.currentDate=t;const[r,o]=await Promise.all([kt(),Pt(t)]);this.state.roster=r,this.state.attendance[t]=o,this.notify()}setTab(t){this.state.tab=t,this.state.editing=null,this.state.formDraft=null,this.notify()}async togglePresent(t){const r=this.state.currentDate,o=this.state.attendance[r]?[...this.state.attendance[r]]:[],n=o.indexOf(t);n>=0?o.splice(n,1):o.push(t),this.state.attendance[r]=o,this.notify(),await et(r,o)}startAdd(t){this.state.formDraft={name:"",category:t,contractor:S[0],work:q[0],shift:"Day",supervisor:""},this.state.editing="form",this.notify()}startEdit(t){this.state.formDraft={...t},this.state.editing="form",this.notify()}cancelForm(){this.state.editing=null,this.state.formDraft=null,this.notify()}setDraftField(t,r,o=!0){this.state.formDraft&&(this.state.formDraft[t]=r,o&&this.notify())}async saveFormWithValues(t){var i,a;const r=this.state.formDraft;if(!r)return{success:!1,error:"No draft found"};const o=((i=t.name!==void 0?t.name:r.name)==null?void 0:i.trim())||"",n=((a=t.supervisor!==void 0?t.supervisor:r.supervisor)==null?void 0:a.trim())||"";if(!o)return{success:!1,error:"Please enter a name"};if(!n)return{success:!1,error:"Please enter a reporting supervisor"};const s={id:r.id||St(),name:o,category:r.category||"labor",contractor:r.category==="labor"?t.contractor||r.contractor||S[0]:void 0,work:r.category==="labor"?t.work||r.work||q[0]:void 0,shift:r.shift||"Day",supervisor:n};if(r.id){const f=this.state.roster.findIndex(l=>l.id===r.id);f>=0&&(this.state.roster[f]=s)}else this.state.roster.push(s);return this.state.editing=null,this.state.formDraft=null,this.notify(),await tt(this.state.roster),{success:!0}}async deleteWorker(t){this.state.roster=this.state.roster.filter(o=>o.id!==t);const r=this.state.currentDate;this.state.attendance[r]&&(this.state.attendance[r]=this.state.attendance[r].filter(o=>o!==t),await et(r,this.state.attendance[r])),this.notify(),await tt(this.state.roster)}}const h=new Lt;function at(e){const t=e.roster.filter(c=>c.category==="staff"),r=e.roster.filter(c=>c.category==="labor"),o=new Set(e.attendance[e.currentDate]||[]),n=t.filter(c=>o.has(c.id)),s=r.filter(c=>o.has(c.id)),i=n.length+s.length,a=[];a.push(A),a.push(`Attendance Report — ${nt(e.currentDate)}`),a.push(""),a.push(`Staff present: ${n.length} / ${t.length}`),a.push(`Labor present: ${s.length} / ${r.length}`),a.push(`Total on floor: ${i}`),a.push(""),a.push("--- By contractor ---");const f=F(r,c=>c.contractor||"Other");for(const c of S){const b=f.get(c)||[];if(b.length>0){const L=b.filter(D=>o.has(D.id)).length;a.push(`${c}: ${L} / ${b.length}`)}}f.forEach((c,b)=>{if(S.includes(b))return;const L=c.filter(D=>o.has(D.id)).length;a.push(`${b}: ${L} / ${c.length}`)}),a.push(""),a.push("--- By work assigned (labor present) ---");const l=F(s,c=>c.work||"Other");s.length===0?a.push("None present"):l.forEach((c,b)=>{a.push(`${b}: ${c.length}`)}),a.push(""),a.push("--- Shift split (present) ---");const g=[...n,...s],u=g.filter(c=>c.shift==="Day").length,d=g.filter(c=>c.shift==="Night").length;a.push(`Day: ${u}   Night: ${d}`),a.push(""),a.push("--- Absent ---");const E=t.filter(c=>!o.has(c.id)),y=r.filter(c=>!o.has(c.id));return E.length===0&&y.length===0?a.push("None (100% attendance)"):(E.forEach(c=>{a.push(`Staff: ${c.name}`)}),y.forEach(c=>{a.push(`${c.contractor||"Labor"}: ${c.name} (${c.work||"General"})`)})),a.join(`
`)}function Dt(e){const t=at(e);return`
    <header class="top">
      <div class="co">${A}</div>
      <div class="date title-mode">Manpower Report</div>
    </header>
    <main>
      <div class="reportBox" id="reportText">${p(t)}</div>
      <button type="button" class="btn" data-action="copy-report">Copy Report Text</button>
    </main>
  `}function At(e){if(e.editing==="form"&&e.formDraft){const n=e.formDraft,s=!!n.id;let i=`
      <header class="top">
        <div class="co">${A}</div>
        <div class="date title-mode">${s?"Edit Person":"Add Person"}</div>
      </header>
      <main>
        <div class="field">
          <label for="f_name">Full Name</label>
          <input id="f_name" type="text" value="${p(n.name||"")}" placeholder="e.g. Ramesh Kumar" autocomplete="off" />
        </div>

        <div class="field">
          <label>Category</label>
          <div class="segmented">
            <button type="button" class="${n.category==="staff"?"on":""}" data-action="set-draft-category" data-val="staff">Staff</button>
            <button type="button" class="${n.category==="labor"?"on":""}" data-action="set-draft-category" data-val="labor">Labor</button>
          </div>
        </div>
    `;return n.category==="labor"&&(i+=`
        <div class="field">
          <label for="f_contractor">Contractor</label>
          <select id="f_contractor">
            ${S.map(a=>`<option value="${p(a)}" ${n.contractor===a?"selected":""}>${p(a)}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label for="f_work">Work Assigned / Department</label>
          <select id="f_work">
            ${q.map(a=>`<option value="${p(a)}" ${n.work===a?"selected":""}>${p(a)}</option>`).join("")}
          </select>
        </div>
      `),i+=`
        <div class="field">
          <label>Shift</label>
          <div class="segmented">
            <button type="button" class="${n.shift==="Day"?"on":""}" data-action="set-draft-shift" data-val="Day">Day</button>
            <button type="button" class="${n.shift==="Night"?"on":""}" data-action="set-draft-shift" data-val="Night">Night</button>
          </div>
        </div>

        <div class="field">
          <label for="f_supervisor">Reporting Supervisor</label>
          <input id="f_supervisor" type="text" value="${p(n.supervisor||"")}" placeholder="e.g. Supervisor Patil" autocomplete="off" />
        </div>

        <div style="margin-top: 20px;">
          <button type="button" class="btn" data-action="save-form">Save</button>
          <div style="height: 10px;"></div>
          <button type="button" class="btn secondary" data-action="cancel-form">Cancel</button>
        </div>
      </main>
    `,i}let t=`
    <header class="top">
      <div class="co">${A}</div>
      <div class="date title-mode">Roster</div>
    </header>
    <main>
      <div class="toolbar">
        <button type="button" class="btn" data-action="add-staff">+ Staff</button>
        <button type="button" class="btn" data-action="add-labor">+ Laborer</button>
      </div>
  `;const r=e.roster.filter(n=>n.category==="staff"),o=e.roster.filter(n=>n.category==="labor");return r.length>0&&(t+=`<div class="sectionTitle">Staff (${r.length})</div>`,r.forEach(n=>{t+=`
        <div class="rosterRow">
          <div class="info" data-action="edit-worker" data-id="${n.id}">
            <div class="name">${p(n.name)}</div>
            <div class="meta">Sup: ${p(n.supervisor)} · ${n.shift} Shift</div>
          </div>
          <button type="button" class="del" data-action="delete-worker" data-id="${n.id}" title="Delete worker">&times;</button>
        </div>
      `})),o.length>0&&(t+=`<div class="sectionTitle" style="margin-top: 18px;">Contract Laborers (${o.length})</div>`,F(o,s=>s.contractor||"Other").forEach((s,i)=>{t+=`<div class="contractor-label">${p(i)} (${s.length})</div>`,s.forEach(a=>{t+=`
          <div class="rosterRow">
            <div class="info" data-action="edit-worker" data-id="${a.id}">
              <div class="name">${p(a.name)}</div>
              <div class="meta">${p(a.work||"")} · Sup: ${p(a.supervisor)} · ${a.shift} Shift</div>
            </div>
            <button type="button" class="del" data-action="delete-worker" data-id="${a.id}" title="Delete laborer">&times;</button>
          </div>
        `})})),r.length===0&&o.length===0&&(t+=`
      <div class="empty">
        <p>Roster is currently empty.</p>
        <p>Add staff and laborers once beforehand. Each morning, you'll simply tick who is present.</p>
      </div>
    `),t+="</main>",t}function Ot(e){return`
    <nav class="tabs">
      <button type="button" class="${e==="today"?"active":""}" data-action="switch-tab" data-tab="today">
        TODAY
      </button>
      <button type="button" class="${e==="roster"?"active":""}" data-action="switch-tab" data-tab="roster">
        ROSTER
      </button>
      <button type="button" class="${e==="report"?"active":""}" data-action="switch-tab" data-tab="report">
        REPORT
      </button>
    </nav>
  `}function Tt(e){const t=e.roster.filter(a=>a.category==="staff"),r=e.roster.filter(a=>a.category==="labor"),o=new Set(e.attendance[e.currentDate]||[]),n=t.filter(a=>o.has(a.id)).length,s=r.filter(a=>o.has(a.id)).length,i=n+s;return`
    <header class="top">
      <div class="co">${A}</div>
      <div class="date">${nt(e.currentDate)}</div>
    </header>
    <div class="tallybar">
      <div class="cell">
        <div class="num">${n}<span class="denom">/${t.length}</span></div>
        <div class="lbl">STAFF</div>
      </div>
      <div class="cell">
        <div class="num">${s}<span class="denom">/${r.length}</span></div>
        <div class="lbl">LABOR</div>
      </div>
      <div class="cell">
        <div class="num">${i}</div>
        <div class="lbl">TOTAL</div>
      </div>
    </div>
  `}function N(e,t){const r=e.category==="labor"?`${p(e.contractor)} · ${p(e.work)} · Sup: ${p(e.supervisor)}`:`Sup: ${p(e.supervisor)}`;return`
    <div class="worker ${t?"present":"absent"}" data-action="toggle-present" data-id="${e.id}">
      <div class="box">${t?"✓":""}</div>
      <div class="info">
        <div class="name">${p(e.name)}</div>
        <div class="meta">${r}</div>
      </div>
      <div class="shift ${e.shift==="Night"?"shift-night":"shift-day"}">
        ${e.shift==="Night"?"NIGHT":"DAY"}
      </div>
    </div>
  `}function st(e){const t=e.roster.filter(i=>i.category==="staff"),r=e.roster.filter(i=>i.category==="labor"),o=new Set(e.attendance[e.currentDate]||[]),n=F(r,i=>i.contractor||"Other Contractor");let s=Tt(e);if(s+="<main>",e.roster.length===0)return s+=`
      <div class="empty">
        <p>No one on the roster yet.</p>
        <p>Go to <b>Roster</b> to add staff and contract laborers.</p>
      </div>
    `,s+="</main>",s;if(t.length>0){const i=t.filter(a=>o.has(a.id)).length;s+=`
      <div class="group">
        <h3>
          <span>Staff</span>
          <span class="count">${i}/${t.length}</span>
        </h3>
    `,t.forEach(a=>{s+=N(a,o.has(a.id))}),s+="</div>"}for(const i of S){const a=n.get(i)||[];if(!a.length)continue;const f=a.filter(l=>o.has(l.id)).length;s+=`
      <div class="group">
        <h3>
          <span>${p(i)}</span>
          <span class="count">${f}/${a.length}</span>
        </h3>
    `,a.forEach(l=>{s+=N(l,o.has(l.id))}),s+="</div>"}return n.forEach((i,a)=>{if(S.includes(a))return;const f=i.filter(l=>o.has(l.id)).length;s+=`
      <div class="group">
        <h3>
          <span>${p(a)}</span>
          <span class="count">${f}/${i.length}</span>
        </h3>
    `,i.forEach(l=>{s+=N(l,o.has(l.id))}),s+="</div>"}),s+="</main>",s}const ot=document.getElementById("app"),x=document.getElementById("copiedToast");function R(e="Copied to clipboard",t=1500){x&&(x.textContent=e,x.classList.add("show"),setTimeout(()=>{x.classList.remove("show")},t))}function xt(){const e=h.getState();let t="";switch(e.tab){case"today":t=st(e);break;case"roster":t=At(e);break;case"report":t=Dt(e);break;default:t=st(e)}ot.innerHTML=t+Ot(e.tab)}function M(){const e=document.getElementById("f_name"),t=document.getElementById("f_supervisor"),r=document.getElementById("f_contractor"),o=document.getElementById("f_work");return{name:e?e.value:void 0,supervisor:t?t.value:void 0,contractor:r?r.value:void 0,work:o?o.value:void 0}}function Rt(){ot.addEventListener("click",async e=>{const t=e.target;if(!t)return;const r=t.closest("[data-action]");if(!r)return;const o=r.getAttribute("data-action"),n=r.getAttribute("data-id");switch(o){case"toggle-present":{n&&await h.togglePresent(n);break}case"switch-tab":{const s=r.getAttribute("data-tab");s&&h.setTab(s);break}case"add-staff":{h.startAdd("staff");break}case"add-labor":{h.startAdd("labor");break}case"edit-worker":{if(n){const s=h.getState().roster.find(i=>i.id===n);s&&h.startEdit(s)}break}case"delete-worker":{if(n){e.stopPropagation();const s=h.getState().roster.find(a=>a.id===n),i=(s==null?void 0:s.name)||"this worker";window.confirm(`Remove ${i} from roster?`)&&(await h.deleteWorker(n),R(`Removed ${i}`))}break}case"set-draft-category":{const s=r.getAttribute("data-val");if(s){const i=M();h.setDraftField("name",i.name,!1),h.setDraftField("supervisor",i.supervisor,!1),i.contractor&&h.setDraftField("contractor",i.contractor,!1),i.work&&h.setDraftField("work",i.work,!1),h.setDraftField("category",s,!0)}break}case"set-draft-shift":{const s=r.getAttribute("data-val");if(s){const i=M();h.setDraftField("name",i.name,!1),h.setDraftField("supervisor",i.supervisor,!1),i.contractor&&h.setDraftField("contractor",i.contractor,!1),i.work&&h.setDraftField("work",i.work,!1),h.setDraftField("shift",s,!0)}break}case"save-form":{const s=M(),i=await h.saveFormWithValues(s);!i.success&&i.error&&R(i.error,2e3);break}case"cancel-form":{h.cancelForm();break}case"copy-report":{const s=h.getState(),i=at(s),a=await Ct(i);R(a?"Copied report text":"Failed to copy");break}}})}h.subscribe(xt);Rt();h.init().catch(e=>{console.error("Initialization error:",e)});export{G as W};
