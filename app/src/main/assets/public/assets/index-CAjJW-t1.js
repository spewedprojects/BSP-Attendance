var Nt=Object.defineProperty;var Pt=(e,t,a)=>t in e?Nt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var dt=(e,t,a)=>Pt(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();function R(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function A(e){return new Promise(t=>{const{title:a="Notice",message:s,okText:n="OK"}=e,r=document.createElement("div");r.className="web-dialog-overlay",r.innerHTML=`
      <div class="web-dialog-card" role="dialog" aria-modal="true">
        <div class="web-dialog-header">
          <div class="web-dialog-title">${R(a)}</div>
        </div>
        <div class="web-dialog-body">
          <p class="web-dialog-message">${R(s)}</p>
        </div>
        <div class="web-dialog-actions">
          <button type="button" class="btn web-dialog-btn web-dialog-btn-primary" id="webDialogOkBtn">${R(n)}</button>
        </div>
      </div>
    `,document.body.appendChild(r);const d=()=>{document.removeEventListener("keydown",l),r.remove(),t()},c=r.querySelector("#webDialogOkBtn");c==null||c.focus(),c==null||c.addEventListener("click",d);const l=i=>{(i.key==="Escape"||i.key==="Enter")&&(i.preventDefault(),d())};document.addEventListener("keydown",l)})}function K(e){return new Promise(t=>{const{title:a="Confirm",message:s,confirmText:n="Confirm",cancelText:r="Cancel",danger:d=!1}=e,c=document.createElement("div");c.className="web-dialog-overlay",c.innerHTML=`
      <div class="web-dialog-card" role="dialog" aria-modal="true">
        <div class="web-dialog-header">
          <div class="web-dialog-title">${R(a)}</div>
        </div>
        <div class="web-dialog-body">
          <p class="web-dialog-message">${R(s)}</p>
        </div>
        <div class="web-dialog-actions">
          <button type="button" class="btn secondary web-dialog-btn" id="webDialogCancelBtn">${R(r)}</button>
          <button type="button" class="btn web-dialog-btn ${d?"web-dialog-btn-danger":"web-dialog-btn-primary"}" id="webDialogConfirmBtn">${R(n)}</button>
        </div>
      </div>
    `,document.body.appendChild(c);const l=p=>{document.removeEventListener("keydown",f),c.remove(),t(p)},i=c.querySelector("#webDialogConfirmBtn"),m=c.querySelector("#webDialogCancelBtn");d?m==null||m.focus():i==null||i.focus(),i==null||i.addEventListener("click",()=>l(!0)),m==null||m.addEventListener("click",()=>l(!1));const f=p=>{p.key==="Escape"&&(p.preventDefault(),l(!1))};document.addEventListener("keydown",f)})}function lt(e){return new Promise(t=>{const{title:a="Input",message:s="",initialValue:n="",placeholder:r="",confirmText:d="Save",cancelText:c="Cancel"}=e,l=document.createElement("div");l.className="web-dialog-overlay",l.innerHTML=`
      <div class="web-dialog-card" role="dialog" aria-modal="true">
        <div class="web-dialog-header">
          <div class="web-dialog-title">${R(a)}</div>
        </div>
        <div class="web-dialog-body">
          ${s?`<p class="web-dialog-message">${R(s)}</p>`:""}
          <div class="field" style="margin-bottom: 0;">
            <input
              type="text"
              id="webDialogPromptInput"
              class="web-dialog-input"
              value="${R(n)}"
              placeholder="${R(r)}"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="web-dialog-actions">
          <button type="button" class="btn secondary web-dialog-btn" id="webDialogPromptCancel">${R(c)}</button>
          <button type="button" class="btn web-dialog-btn web-dialog-btn-primary" id="webDialogPromptConfirm">${R(d)}</button>
        </div>
      </div>
    `,document.body.appendChild(l);const i=l.querySelector("#webDialogPromptInput"),m=l.querySelector("#webDialogPromptConfirm"),f=l.querySelector("#webDialogPromptCancel");i&&(i.focus(),i.select());const p=w=>{document.removeEventListener("keydown",I),l.remove(),t(w)};m==null||m.addEventListener("click",()=>{const w=i?i.value.trim():"";p(w)}),f==null||f.addEventListener("click",()=>p(null));const I=w=>{if(w.key==="Enter"){w.preventDefault();const b=i?i.value.trim():"";p(b)}else w.key==="Escape"&&(w.preventDefault(),p(null))};document.addEventListener("keydown",I)})}const xt="modulepreload",Lt=function(e){return"/"+e},ht={},bt=function(t,a,s){let n=Promise.resolve();if(a&&a.length>0){let d=function(i){return Promise.all(i.map(m=>Promise.resolve(m).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),l=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));n=d(a.map(i=>{if(i=Lt(i),i in ht)return;ht[i]=!0;const m=i.endsWith(".css"),f=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${f}`))return;const p=document.createElement("link");if(p.rel=m?"stylesheet":xt,m||(p.as="script"),p.crossOrigin="",p.href=i,l&&p.setAttribute("nonce",l),document.head.appendChild(p),m)return new Promise((I,w)=>{p.addEventListener("load",I),p.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${i}`)))})}))}function r(d){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=d,window.dispatchEvent(c),!c.defaultPrevented)throw d}return n.then(d=>{for(const c of d||[])c.status==="rejected"&&r(c.reason);return t().catch(r)})};/*! Capacitor: https://capacitorjs.com/ - MIT License */var F;(function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"})(F||(F={}));class ut extends Error{constructor(t,a,s){super(t),this.message=t,this.code=a,this.data=s}}const Ot=e=>{var t,a;return e!=null&&e.androidBridge?"android":!((a=(t=e==null?void 0:e.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||a===void 0)&&a.bridge?"ios":"web"},Ut=e=>{const t=e.CapacitorCustomPlatform||null,a=e.Capacitor||{},s=a.Plugins=a.Plugins||{},n=()=>t!==null?t.name:Ot(e),r=()=>n()!=="web",d=f=>{const p=i.get(f);return!!(p!=null&&p.platforms.has(n())||c(f))},c=f=>{var p;return(p=a.PluginHeaders)===null||p===void 0?void 0:p.find(I=>I.name===f)},l=f=>e.console.error(f),i=new Map,m=(f,p={})=>{const I=i.get(f);if(I)return console.warn(`Capacitor plugin "${f}" already registered. Cannot register plugins twice.`),I.proxy;const w=n(),b=c(f);let h;const D=async()=>(!h&&w in p?h=typeof p[w]=="function"?h=await p[w]():h=p[w]:t!==null&&!h&&"web"in p&&(h=typeof p.web=="function"?h=await p.web():h=p.web),h),E=($,C)=>{var _,o;if(b){const u=b==null?void 0:b.methods.find(y=>C===y.name);if(u)return u.rtype==="promise"?y=>a.nativePromise(f,C.toString(),y):(y,S)=>a.nativeCallback(f,C.toString(),y,S);if($)return(_=$[C])===null||_===void 0?void 0:_.bind($)}else{if($)return(o=$[C])===null||o===void 0?void 0:o.bind($);throw new ut(`"${f}" plugin is not implemented on ${w}`,F.Unimplemented)}},x=$=>{let C;const _=(...o)=>{const u=D().then(y=>{const S=E(y,$);if(S){const L=S(...o);return C=L==null?void 0:L.remove,L}else throw new ut(`"${f}.${$}()" is not implemented on ${w}`,F.Unimplemented)});return $==="addListener"&&(u.remove=async()=>C()),u};return _.toString=()=>`${$.toString()}() { [capacitor code] }`,Object.defineProperty(_,"name",{value:$,writable:!1,configurable:!1}),_},M=x("addListener"),B=x("removeListener"),H=($,C)=>{const _=M({eventName:$},C),o=async()=>{const y=await _;B({eventName:$,callbackId:y},C)},u=new Promise(y=>_.then(()=>y({remove:o})));return u.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await o()},u},U=new Proxy({},{get($,C){switch(C){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return b?H:M;case"removeListener":return B;default:return x(C)}}});return s[f]=U,i.set(f,{name:f,proxy:U,platforms:new Set([...Object.keys(p),...b?[w]:[]])}),U};return a.convertFileSrc||(a.convertFileSrc=f=>f),a.getPlatform=n,a.handleError=l,a.isNativePlatform=r,a.isPluginAvailable=d,a.registerPlugin=m,a.Exception=ut,a.DEBUG=!!a.DEBUG,a.isLoggingEnabled=!!a.isLoggingEnabled,a},Mt=e=>e.Capacitor=Ut(e),pt=Mt(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),V=pt.registerPlugin;class gt{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(t,a){let s=!1;this.listeners[t]||(this.listeners[t]=[],s=!0),this.listeners[t].push(a);const r=this.windowListeners[t];r&&!r.registered&&this.addWindowListener(r),s&&this.sendRetainedArgumentsForEvent(t);const d=async()=>this.removeListener(t,a);return Promise.resolve({remove:d})}async removeAllListeners(){this.listeners={};for(const t in this.windowListeners)this.removeWindowListener(this.windowListeners[t]);this.windowListeners={}}notifyListeners(t,a,s){const n=this.listeners[t];if(!n){if(s){let r=this.retainedEventArguments[t];r||(r=[]),r.push(a),this.retainedEventArguments[t]=r}return}n.forEach(r=>r(a))}hasListeners(t){var a;return!!(!((a=this.listeners[t])===null||a===void 0)&&a.length)}registerWindowListener(t,a){this.windowListeners[a]={registered:!1,windowEventName:t,pluginEventName:a,handler:s=>{this.notifyListeners(a,s)}}}unimplemented(t="not implemented"){return new pt.Exception(t,F.Unimplemented)}unavailable(t="not available"){return new pt.Exception(t,F.Unavailable)}async removeListener(t,a){const s=this.listeners[t];if(!s)return;const n=s.indexOf(a);n!==-1&&this.listeners[t].splice(n,1),this.listeners[t].length||this.removeWindowListener(this.windowListeners[t])}addWindowListener(t){window.addEventListener(t.windowEventName,t.handler),t.registered=!0}removeWindowListener(t){t&&(window.removeEventListener(t.windowEventName,t.handler),t.registered=!1)}sendRetainedArgumentsForEvent(t){const a=this.retainedEventArguments[t];a&&(delete this.retainedEventArguments[t],a.forEach(s=>{this.notifyListeners(t,s)}))}}const wt=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),It=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Bt extends gt{async getCookies(){const t=document.cookie,a={};return t.split(";").forEach(s=>{if(s.length<=0)return;let[n,r]=s.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=It(n).trim(),r=It(r).trim(),a[n]=r}),a}async setCookie(t){try{const a=wt(t.key),s=wt(t.value),n=t.expires?`; expires=${t.expires.replace("expires=","")}`:"",r=(t.path||"/").replace("path=",""),d=t.url!=null&&t.url.length>0?`domain=${t.url}`:"";document.cookie=`${a}=${s||""}${n}; path=${r}; ${d};`}catch(a){return Promise.reject(a)}}async deleteCookie(t){try{document.cookie=`${t.key}=; Max-Age=0`}catch(a){return Promise.reject(a)}}async clearCookies(){try{const t=document.cookie.split(";")||[];for(const a of t)document.cookie=a.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(t){return Promise.reject(t)}}async clearAllCookies(){try{await this.clearCookies()}catch(t){return Promise.reject(t)}}}V("CapacitorCookies",{web:()=>new Bt});const Wt=async e=>new Promise((t,a)=>{const s=new FileReader;s.onload=()=>{const n=s.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},s.onerror=n=>a(n),s.readAsDataURL(e)}),jt=(e={})=>{const t=Object.keys(e);return Object.keys(e).map(n=>n.toLocaleLowerCase()).reduce((n,r,d)=>(n[r]=e[t[d]],n),{})},Ht=(e,t=!0)=>e?Object.entries(e).reduce((s,n)=>{const[r,d]=n;let c,l;return Array.isArray(d)?(l="",d.forEach(i=>{c=t?encodeURIComponent(i):i,l+=`${r}=${c}&`}),l.slice(0,-1)):(c=t?encodeURIComponent(d):d,l=`${r}=${c}`),`${s}&${l}`},"").substr(1):null,Ft=(e,t={})=>{const a=Object.assign({method:e.method||"GET",headers:e.headers},t),n=jt(e.headers)["content-type"]||"";if(typeof e.data=="string")a.body=e.data;else if(n.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[d,c]of Object.entries(e.data||{}))r.set(d,c);a.body=r.toString()}else if(n.includes("multipart/form-data")||e.data instanceof FormData){const r=new FormData;if(e.data instanceof FormData)e.data.forEach((c,l)=>{r.append(l,c)});else for(const c of Object.keys(e.data))r.append(c,e.data[c]);a.body=r;const d=new Headers(a.headers);d.delete("content-type"),a.headers=d}else(n.includes("application/json")||typeof e.data=="object")&&(a.body=JSON.stringify(e.data));return a};class qt extends gt{async request(t){const a=Ft(t,t.webFetchExtra),s=Ht(t.params,t.shouldEncodeUrlParams),n=s?`${t.url}?${s}`:t.url,r=await fetch(n,a),d=r.headers.get("content-type")||"";let{responseType:c="text"}=r.ok?t:{};d.includes("application/json")&&(c="json");let l,i;switch(c){case"arraybuffer":case"blob":i=await r.blob(),l=await Wt(i);break;case"json":l=await r.json();break;case"document":case"text":default:l=await r.text()}const m={};return r.headers.forEach((f,p)=>{m[p]=f}),{data:l,headers:m,status:r.status,url:r.url}}async get(t){return this.request(Object.assign(Object.assign({},t),{method:"GET"}))}async post(t){return this.request(Object.assign(Object.assign({},t),{method:"POST"}))}async put(t){return this.request(Object.assign(Object.assign({},t),{method:"PUT"}))}async patch(t){return this.request(Object.assign(Object.assign({},t),{method:"PATCH"}))}async delete(t){return this.request(Object.assign(Object.assign({},t),{method:"DELETE"}))}}V("CapacitorHttp",{web:()=>new qt});var kt;(function(e){e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT"})(kt||(kt={}));var St;(function(e){e.StatusBar="StatusBar",e.NavigationBar="NavigationBar"})(St||(St={}));class Vt extends gt{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}V("SystemBars",{web:()=>new Vt});function Gt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return new Proxy({},{get(s,n){return(r,d,c)=>{const l=e.Capacitor.Plugins[a];if(l===void 0){c(new Error(`Capacitor plugin ${a} not found`));return}if(typeof l[n]!="function"){c(new Error(`Method ${n} not found in Capacitor plugin ${a}`));return}(async()=>{try{const i=await l[n](r);d(i)}catch(i){c(i)}})()}}})}})}function Jt(e){e.CapacitorUtils.Synapse=new Proxy({},{get(t,a){return e.cordova.plugins[a]}})}function Qt(e=!1){typeof window>"u"||(window.CapacitorUtils=window.CapacitorUtils||{},window.Capacitor!==void 0&&!e?Gt(window):window.cordova!==void 0&&Jt(window))}var ot;(function(e){e.Documents="DOCUMENTS",e.Data="DATA",e.Library="LIBRARY",e.Cache="CACHE",e.External="EXTERNAL",e.ExternalStorage="EXTERNAL_STORAGE",e.ExternalCache="EXTERNAL_CACHE",e.LibraryNoCloud="LIBRARY_NO_CLOUD",e.Temporary="TEMPORARY"})(ot||(ot={}));var mt;(function(e){e.UTF8="utf8",e.ASCII="ascii",e.UTF16="utf16"})(mt||(mt={}));const Dt=V("Filesystem",{web:()=>bt(()=>import("./web-BttX7bvy.js"),[]).then(e=>new e.FilesystemWeb)});Qt();const $t=V("Share",{web:()=>bt(()=>import("./web-CD6e35vQ.js"),[]).then(e=>new e.ShareWeb)});async function X(e,t,a="text/csv"){const s="BSP_Attendance",n=`${s}/${e}`;let r=null;try{try{await Dt.mkdir({path:s,directory:ot.Documents,recursive:!0})}catch{}r=(await Dt.writeFile({path:n,data:t,directory:ot.Documents,encoding:mt.UTF8,recursive:!0})).uri}catch(d){console.warn("Native filesystem write failed, using browser fallback:",d)}try{const d=new Blob([t],{type:`${a};charset=utf-8;`}),c=URL.createObjectURL(d),l=document.createElement("a");l.href=c,l.download=e,document.body.appendChild(l),l.click(),setTimeout(()=>{document.body.removeChild(l),URL.revokeObjectURL(c)},400)}catch(d){console.error("Blob download trigger error:",d)}return r?{success:!0,path:r,message:`Saved to Documents/BSP_Attendance/${e}`}:{success:!0,message:`Downloaded ${e}`}}async function Kt(e,t){try{if((await $t.canShare()).value)return await $t.share({title:e,text:t,dialogTitle:"Share Manpower Report"}),!0}catch(a){console.warn("Capacitor Share unavailable, falling back to navigator.share:",a)}if(navigator.share)try{return await navigator.share({title:e,text:t}),!0}catch{return!1}return!1}let j=null;function Ct(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function k(e){const{title:t,message:a,type:s="success",duration:n=3200}=e;let r=document.getElementById("inAppNotification");r||(r=document.createElement("div"),r.id="inAppNotification",r.className="in-app-notification-container",document.body.appendChild(r)),j&&(clearTimeout(j),j=null);const c={success:"✓",info:"ℹ",warning:"⚠",error:"✕"}[s]||"✓";r.innerHTML=`
    <div class="in-app-toast toast-${s}">
      <div class="toast-icon-wrap">${c}</div>
      <div class="toast-text-wrap">
        <div class="toast-title">${Ct(t)}</div>
        ${a?`<div class="toast-message">${Ct(a)}</div>`:""}
      </div>
      <button type="button" class="toast-close-btn" aria-label="Dismiss">&times;</button>
    </div>
  `,r.classList.add("visible");const l=r.querySelector(".toast-close-btn");l==null||l.addEventListener("click",()=>{At()}),j=setTimeout(()=>{At()},n)}function At(){const e=document.getElementById("inAppNotification");e&&e.classList.remove("visible"),j&&(clearTimeout(j),j=null)}const yt=["UNIT I","UNIT II","UNIT III"],Yt=["Helper","Operator","Welder","Housekeeping"],st=["Welding","Laser","Bending","Painting","Fitting","Fabrication","Assembly","Quality","Maintenance","Store","HR & Admin","Accounts"],rt=["HOD / Department Head","Senior Engineer","Floor Supervisor","Quality Inspector","Shift Incharge","Maintenance Engineer","Production Engineer","Store Incharge","HR & Admin Officer","Accounts Officer"],nt=["Shree Ganesh Manpower","Om Sai Enterprises","Balaji Industrial Services","TechnoFab Labor Supply"],G="BSP Metatech LLP — Chakan",N={ROSTER:"roster",CONTRACTORS:"bsp_contractors",DEPARTMENTS:"bsp_departments",DESIGNATIONS:"bsp_designations",DAILY_PREFIX:"attendance:",COLLAPSED_SECTIONS:"bsp_collapsed_sections"};function T(){const e=new Date,t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function Y(e){return new Date(e+"T00:00:00").toLocaleDateString("en-IN",{weekday:"short",day:"2-digit",month:"short",year:"numeric"})}function Xt(e,t){const a=new Date(e+"T00:00:00");a.setDate(a.getDate()+t);const s=a.getFullYear(),n=String(a.getMonth()+1).padStart(2,"0"),r=String(a.getDate()).padStart(2,"0");return`${s}-${n}-${r}`}function zt(e=new Date){return e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})}function z(){return"w"+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}function g(e){return e?e.replace(/[&<>"']/g,t=>{switch(t){case"&":return"&amp;";case"<":return"&lt;";case">":return"&gt;";case'"':return"&quot;";case"'":return"&#39;";default:return t}}):""}function q(e,t){const a=new Map;for(const s of e){const n=t(s);let r=a.get(n);r||(r=[],a.set(n,r)),r.push(s)}return a}function vt(e,t){const a=n=>{const r=String(n??"").replace(/"/g,'""');return/[",\n\r]/.test(r)?`"${r}"`:r};return[e.map(a).join(","),...t.map(n=>n.map(a).join(","))].join(`\r
`)}function Zt(e){return e.split(/\r?\n/).map(a=>a.trim()).filter(Boolean).map(a=>{const s=[];let n="",r=!1;for(let d=0;d<a.length;d++){const c=a[d];c==='"'?r&&a[d+1]==='"'?(n+='"',d++):r=!r:c===","&&!r?(s.push(n.trim()),n=""):n+=c}return s.push(n.trim()),s})}async function Tt(e){try{if(navigator.clipboard&&window.isSecureContext)return await navigator.clipboard.writeText(e),!0}catch{}try{const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.left="-999999px",t.style.top="-999999px",document.body.appendChild(t),t.focus(),t.select();const a=document.execCommand("copy");return document.body.removeChild(t),a}catch(t){return console.error("Failed to copy to clipboard",t),!1}}const te=["Shree Ganesh Manpower","Om Sai Enterprises","Balaji Industrial Services","TechnoFab Labor Supply"],ee=["Welding","Laser","Bending","Painting","Fitting","Fabrication","Assembly","Quality","Maintenance","Store","HR & Admin","Accounts"],ae=["HOD / Department Head","Senior Engineer","Floor Supervisor","Quality Inspector","Shift Incharge","Maintenance Engineer","Production Engineer","Store Incharge","HR & Admin Officer","Accounts Officer"];function se(){const e=T(),t=[{id:"st_1",name:"Rajesh Deshmukh",category:"staff",department:"Welding",designation:"HOD / Department Head",unit:"UNIT I",status:"active",createdAt:e},{id:"st_2",name:"Amit Patil",category:"staff",department:"Laser",designation:"Senior Engineer",unit:"UNIT I",status:"active",createdAt:e},{id:"st_3",name:"Pooja Kulkarni",category:"staff",department:"Quality",designation:"Quality Inspector",unit:"UNIT I",status:"active",createdAt:e},{id:"st_4",name:"Vikas Sharma",category:"staff",department:"Fabrication",designation:"Floor Supervisor",unit:"UNIT II",status:"active",createdAt:e},{id:"st_5",name:"Sunil Jagtap",category:"staff",department:"Bending",designation:"Shift Incharge",unit:"UNIT II",status:"active",createdAt:e},{id:"st_6",name:"Deepak Shinde",category:"staff",department:"Maintenance",designation:"Maintenance Engineer",unit:"UNIT I",status:"active",createdAt:e},{id:"st_7",name:"Neha Gaikwad",category:"staff",department:"HR & Admin",designation:"HR & Admin Officer",unit:"UNIT I",status:"active",createdAt:e},{id:"st_8",name:"Pravin More",category:"staff",department:"Store",designation:"Store Incharge",unit:"UNIT III",status:"active",createdAt:e}],a=[{id:"lb_sg_1",name:"Santosh Gaikwad",category:"labor",contractor:"Shree Ganesh Manpower",department:"Welding",subCategory:"Welder",unit:"UNIT I",status:"active",createdAt:e},{id:"lb_sg_2",name:"Datta Kale",category:"labor",contractor:"Shree Ganesh Manpower",department:"Welding",subCategory:"Welder",unit:"UNIT I",status:"active",createdAt:e},{id:"lb_sg_3",name:"Sachin Jadhav",category:"labor",contractor:"Shree Ganesh Manpower",department:"Welding",subCategory:"Helper",unit:"UNIT I",status:"active",createdAt:e},{id:"lb_sg_4",name:"Rahul Kamble",category:"labor",contractor:"Shree Ganesh Manpower",department:"Laser",subCategory:"Operator",unit:"UNIT I",status:"active",createdAt:e},{id:"lb_sg_5",name:"Balu Thite",category:"labor",contractor:"Shree Ganesh Manpower",department:"Fabrication",subCategory:"Helper",unit:"UNIT II",status:"active",createdAt:e},{id:"lb_sg_6",name:"Popat Shinde",category:"labor",contractor:"Shree Ganesh Manpower",department:"Welding",subCategory:"Welder",unit:"UNIT I",status:"debarred",createdAt:e},{id:"lb_os_1",name:"Nitin Chavan",category:"labor",contractor:"Om Sai Enterprises",department:"Laser",subCategory:"Operator",unit:"UNIT I",status:"active",createdAt:e},{id:"lb_os_2",name:"Vishal Gorde",category:"labor",contractor:"Om Sai Enterprises",department:"Laser",subCategory:"Helper",unit:"UNIT I",status:"active",createdAt:e},{id:"lb_os_3",name:"Ganesh Waghmare",category:"labor",contractor:"Om Sai Enterprises",department:"Bending",subCategory:"Operator",unit:"UNIT II",status:"active",createdAt:e},{id:"lb_os_4",name:"Akash Bhosale",category:"labor",contractor:"Om Sai Enterprises",department:"Bending",subCategory:"Helper",unit:"UNIT II",status:"active",createdAt:e},{id:"lb_os_5",name:"Kishor Mane",category:"labor",contractor:"Om Sai Enterprises",department:"Painting",subCategory:"Operator",unit:"UNIT I",status:"inactive",createdAt:e},{id:"lb_bi_1",name:"Somnath Giram",category:"labor",contractor:"Balaji Industrial Services",department:"Painting",subCategory:"Operator",unit:"UNIT I",status:"active",createdAt:e},{id:"lb_bi_2",name:"Pandurang Lande",category:"labor",contractor:"Balaji Industrial Services",department:"Painting",subCategory:"Helper",unit:"UNIT I",status:"active",createdAt:e},{id:"lb_bi_3",name:"Mahesh Thorat",category:"labor",contractor:"Balaji Industrial Services",department:"Fitting",subCategory:"Welder",unit:"UNIT II",status:"active",createdAt:e},{id:"lb_bi_4",name:"Tukaram Pawar",category:"labor",contractor:"Balaji Industrial Services",department:"Fitting",subCategory:"Helper",unit:"UNIT II",status:"active",createdAt:e},{id:"lb_bi_5",name:"Sandip Salve",category:"labor",contractor:"Balaji Industrial Services",department:"Housekeeping",subCategory:"Housekeeping",unit:"UNIT III",status:"active",createdAt:e},{id:"lb_tf_1",name:"Anil Sonawane",category:"labor",contractor:"TechnoFab Labor Supply",department:"Assembly",subCategory:"Operator",unit:"UNIT III",status:"active",createdAt:e},{id:"lb_tf_2",name:"Ajay Kadam",category:"labor",contractor:"TechnoFab Labor Supply",department:"Assembly",subCategory:"Helper",unit:"UNIT III",status:"active",createdAt:e},{id:"lb_tf_3",name:"Sambhaji Shinde",category:"labor",contractor:"TechnoFab Labor Supply",department:"Fabrication",subCategory:"Welder",unit:"UNIT II",status:"active",createdAt:e},{id:"lb_tf_4",name:"Rohan Gaikwad",category:"labor",contractor:"TechnoFab Labor Supply",department:"Maintenance",subCategory:"Helper",unit:"UNIT I",status:"active",createdAt:e}];return[...t,...a]}function re(){return{st_1:{present:!0,department:"Welding",unit:"UNIT I",shift:"Day",supervisor:"Self (HOD)",checkInTime:"08:15 AM",remarks:"Morning shift head"},st_2:{present:!0,department:"Laser",unit:"UNIT I",shift:"Day",supervisor:"Rajesh Deshmukh",checkInTime:"08:24 AM"},st_3:{present:!0,department:"Quality",unit:"UNIT I",shift:"Day",supervisor:"Rajesh Deshmukh",checkInTime:"08:28 AM"},st_4:{present:!0,department:"Fabrication",unit:"UNIT II",shift:"Day",supervisor:"Rajesh Deshmukh",checkInTime:"08:35 AM"},st_5:{present:!0,department:"Bending",unit:"UNIT II",shift:"Day",supervisor:"Rajesh Deshmukh",checkInTime:"08:40 AM"},st_6:{present:!0,department:"Maintenance",unit:"UNIT I",shift:"Day",supervisor:"Rajesh Deshmukh",checkInTime:"08:10 AM",remarks:"Machine 4 preventative maintenance"},st_7:{present:!0,department:"HR & Admin",unit:"UNIT I",shift:"Day",supervisor:"Management",checkInTime:"08:45 AM"},st_8:{present:!1,department:"Store",unit:"UNIT III",shift:"Day",supervisor:"Rajesh Deshmukh",remarks:"Planned casual leave"},lb_sg_1:{present:!0,department:"Welding",unit:"UNIT I",subCategory:"Welder",shift:"Day",supervisor:"Rajesh Deshmukh"},lb_sg_2:{present:!0,department:"Welding",unit:"UNIT I",subCategory:"Welder",shift:"Day",supervisor:"Rajesh Deshmukh"},lb_sg_3:{present:!0,department:"Welding",unit:"UNIT I",subCategory:"Helper",shift:"Day",supervisor:"Rajesh Deshmukh"},lb_sg_4:{present:!0,department:"Laser",unit:"UNIT I",subCategory:"Operator",shift:"Night",supervisor:"Amit Patil",remarks:"Night shift roster"},lb_sg_5:{present:!1,department:"Fabrication",unit:"UNIT II",subCategory:"Helper",shift:"Day",supervisor:"Vikas Sharma"},lb_os_1:{present:!0,department:"Laser",unit:"UNIT I",subCategory:"Operator",shift:"Day",supervisor:"Amit Patil"},lb_os_2:{present:!0,department:"Laser",unit:"UNIT I",subCategory:"Helper",shift:"Day",supervisor:"Amit Patil"},lb_os_3:{present:!0,department:"Bending",unit:"UNIT II",subCategory:"Operator",shift:"Day",supervisor:"Sunil Jagtap"},lb_os_4:{present:!0,department:"Bending",unit:"UNIT II",subCategory:"Helper",shift:"Day",supervisor:"Sunil Jagtap"},lb_bi_1:{present:!0,department:"Painting",unit:"UNIT I",subCategory:"Operator",shift:"Day",supervisor:"Rajesh Deshmukh"},lb_bi_2:{present:!0,department:"Painting",unit:"UNIT I",subCategory:"Helper",shift:"Day",supervisor:"Rajesh Deshmukh"},lb_bi_3:{present:!0,department:"Fitting",unit:"UNIT II",subCategory:"Welder",shift:"Day",supervisor:"Vikas Sharma"},lb_bi_4:{present:!1,department:"Fitting",unit:"UNIT II",subCategory:"Helper",shift:"Day",supervisor:"Vikas Sharma"},lb_bi_5:{present:!0,department:"Housekeeping",unit:"UNIT III",subCategory:"Housekeeping",shift:"Day",supervisor:"Rajesh Deshmukh"},lb_tf_1:{present:!0,department:"Assembly",unit:"UNIT III",subCategory:"Operator",shift:"Day",supervisor:"Pravin More"},lb_tf_2:{present:!0,department:"Assembly",unit:"UNIT III",subCategory:"Helper",shift:"Day",supervisor:"Pravin More"},lb_tf_3:{present:!0,department:"Fabrication",unit:"UNIT II",subCategory:"Welder",shift:"Night",supervisor:"Vikas Sharma"},lb_tf_4:{present:!0,department:"Maintenance",unit:"UNIT I",subCategory:"Helper",shift:"Day",supervisor:"Deepak Shinde"}}}const P=V("Preferences",{web:()=>bt(()=>import("./web-CJdTtiqC.js"),[]).then(e=>new e.PreferencesWeb)});async function ne(){try{const{value:e}=await P.get({key:N.ROSTER});return e?JSON.parse(e).map(a=>({id:a.id,name:a.name,category:a.category||"labor",contractor:a.contractor,department:a.department||(a.category==="staff"?"Production":void 0),designation:a.designation||(a.category==="staff"?"Staff Member":void 0),subCategory:a.subCategory||(a.category==="labor"?"Helper":void 0),unit:a.unit||"UNIT I",status:a.status||"active",createdAt:a.createdAt||T()})):[]}catch(e){return console.error("Failed to load roster from preferences",e),[]}}async function O(e){try{await P.set({key:N.ROSTER,value:JSON.stringify(e)})}catch(t){console.error("Failed to save roster to preferences",t)}}async function ie(){try{const{value:e}=await P.get({key:N.CONTRACTORS});if(!e)return[...nt];const t=JSON.parse(e);return Array.isArray(t)&&t.length>0?t:[...nt]}catch{return[...nt]}}async function Z(e){try{await P.set({key:N.CONTRACTORS,value:JSON.stringify(e)})}catch(t){console.error("Failed to save contractors",t)}}async function oe(){try{const{value:e}=await P.get({key:N.DEPARTMENTS});if(!e)return[...st];const t=JSON.parse(e);return Array.isArray(t)&&t.length>0?t:[...st]}catch{return[...st]}}async function tt(e){try{await P.set({key:N.DEPARTMENTS,value:JSON.stringify(e)})}catch(t){console.error("Failed to save departments",t)}}async function ce(){try{const{value:e}=await P.get({key:N.DESIGNATIONS});if(!e)return[...rt];const t=JSON.parse(e);return Array.isArray(t)&&t.length>0?t:[...rt]}catch{return[...rt]}}async function et(e){try{await P.set({key:N.DESIGNATIONS,value:JSON.stringify(e)})}catch(t){console.error("Failed to save designations",t)}}async function Et(e){try{const{value:t}=await P.get({key:`${N.DAILY_PREFIX}${e}`});if(!t)return{date:e,allocations:{},verifiedBy:{}};const a=JSON.parse(t);if(Array.isArray(a)){const s={};for(const n of a)s[n]={present:!0,shift:"Day",unit:"UNIT I",supervisor:""};return{date:e,allocations:s,verifiedBy:{}}}return{date:e,allocations:a.allocations||{},verifiedBy:a.verifiedBy||{}}}catch(t){return console.error(`Failed to load daily record for ${e}`,t),{date:e,allocations:{},verifiedBy:{}}}}async function W(e,t){try{await P.set({key:`${N.DAILY_PREFIX}${e}`,value:JSON.stringify(t)})}catch(a){console.error(`Failed to save daily record for ${e}`,a)}}async function de(){try{const{value:e}=await P.get({key:N.COLLAPSED_SECTIONS});return e?JSON.parse(e):{}}catch{return{}}}async function le(e){try{await P.set({key:N.COLLAPSED_SECTIONS,value:JSON.stringify(e)})}catch(t){console.error("Failed to save collapsed sections",t)}}class ue{constructor(){dt(this,"state",{roster:[],contractors:[...nt],departments:[...st],designations:[...rt],currentDate:T(),tab:"today",searchQuery:"",collapsedSections:{},rosterStatusFilter:"active",dailyRecord:{date:T(),allocations:{},verifiedBy:{}},editingWorker:null,quickAdjustWorkerId:null,activeModal:null});dt(this,"listeners",new Set)}getState(){return this.state}subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}notify(){for(const t of this.listeners)t()}async init(){const t=T();this.state.currentDate=t;const[a,s,n,r,d,c]=await Promise.all([ne(),ie(),oe(),ce(),de(),Et(t)]);if(a.length===0){await this.loadDemoData();return}this.state.roster=a,this.state.contractors=s,this.state.departments=n,this.state.designations=r,this.state.collapsedSections=d,this.state.dailyRecord=c,this.notify()}async loadDemoData(){const t=se(),a=re(),s=this.state.currentDate||T();this.state.roster=t,this.state.contractors=[...te],this.state.departments=[...ee],this.state.designations=[...ae],this.state.dailyRecord={date:s,allocations:a,verifiedBy:{Quality:"Pooja Kulkarni",Welding:"Rajesh Deshmukh"}},await Promise.all([O(this.state.roster),Z(this.state.contractors),tt(this.state.departments),et(this.state.designations),W(s,this.state.dailyRecord)]),this.notify()}setTab(t){this.state.tab=t,this.state.editingWorker=null,this.state.quickAdjustWorkerId=null,this.state.activeModal=null,this.notify()}setSearchQuery(t){this.state.searchQuery=t,this.notify()}async changeDate(t){const a=Xt(this.state.currentDate,t);await this.setDate(a)}async setDate(t){this.state.currentDate=t,this.state.quickAdjustWorkerId=null;const a=await Et(t);this.state.dailyRecord=a,this.notify()}async toggleSectionCollapse(t){const a=!!this.state.collapsedSections[t];this.state.collapsedSections[t]=!a,this.notify(),await le(this.state.collapsedSections)}setRosterStatusFilter(t){this.state.rosterStatusFilter=t,this.notify()}async togglePresent(t){const a=this.state.roster.find(r=>r.id===t);if(!a)return{allowed:!1,message:"Worker not found"};if(a.status==="debarred")return{allowed:!1,message:`${a.name} is DEBARRED and barred from factory floor!`};const s=this.state.dailyRecord.allocations[t],n=s?s.present:!1;return s?s.present=!n:this.state.dailyRecord.allocations[t]={present:!0,unit:a.unit||"UNIT I",department:a.department||"Welding",subCategory:a.subCategory||(a.category==="labor"?"Helper":void 0),shift:"Day",supervisor:""},this.notify(),await W(this.state.currentDate,this.state.dailyRecord),{allowed:!0}}openQuickAdjust(t){const a=this.state.roster.find(s=>s.id===t);a&&(this.state.dailyRecord.allocations[t]||(this.state.dailyRecord.allocations[t]={present:!1,unit:a.unit||"UNIT I",department:a.department||"Welding",subCategory:a.subCategory||"Helper",shift:"Day",supervisor:""}),this.state.quickAdjustWorkerId=t,this.notify())}closeQuickAdjust(){this.state.quickAdjustWorkerId=null,this.notify()}async saveQuickAdjust(t,a){const s=this.state.dailyRecord.allocations[t];s&&(Object.assign(s,a),this.state.quickAdjustWorkerId=null,this.notify(),await W(this.state.currentDate,this.state.dailyRecord))}async verifyDepartment(t,a){this.state.dailyRecord.verifiedBy||(this.state.dailyRecord.verifiedBy={}),this.state.dailyRecord.verifiedBy[t]=a,this.notify(),await W(this.state.currentDate,this.state.dailyRecord)}async unverifyDepartment(t){this.state.dailyRecord.verifiedBy&&(delete this.state.dailyRecord.verifiedBy[t],this.notify(),await W(this.state.currentDate,this.state.dailyRecord))}openModal(t){this.state.activeModal=t,this.notify()}closeModal(){this.state.activeModal=null,this.notify()}async addContractor(t){const a=t.trim();return a?this.state.contractors.includes(a)?{success:!1,error:`Contractor "${a}" already exists`}:(this.state.contractors.push(a),this.notify(),await Z(this.state.contractors),{success:!0}):{success:!1,error:"Contractor name cannot be empty"}}async editContractor(t,a){const s=a.trim();if(!s)return{success:!1,error:"Contractor name cannot be empty"};if(s===t)return{success:!0};if(this.state.contractors.includes(s))return{success:!1,error:`Contractor "${s}" already exists`};const n=this.state.contractors.indexOf(t);if(n<0)return{success:!1,error:`Contractor "${t}" not found`};this.state.contractors[n]=s;for(const r of this.state.roster)r.contractor===t&&(r.contractor=s);return this.notify(),await Promise.all([Z(this.state.contractors),O(this.state.roster)]),{success:!0}}async deleteContractor(t){const a=this.state.roster.filter(s=>s.contractor===t).length;return a>0?{success:!1,inUseCount:a}:(this.state.contractors=this.state.contractors.filter(s=>s!==t),this.notify(),await Z(this.state.contractors),{success:!0,inUseCount:0})}async addDepartment(t){const a=t.trim();return a?this.state.departments.includes(a)?{success:!1,error:`Department "${a}" already exists`}:(this.state.departments.push(a),this.notify(),await tt(this.state.departments),{success:!0}):{success:!1,error:"Department name cannot be empty"}}async editDepartment(t,a){const s=a.trim();if(!s)return{success:!1,error:"Department name cannot be empty"};if(s===t)return{success:!0};if(this.state.departments.includes(s))return{success:!1,error:`Department "${s}" already exists`};const n=this.state.departments.indexOf(t);if(n<0)return{success:!1,error:`Department "${t}" not found`};this.state.departments[n]=s;for(const r of this.state.roster)r.department===t&&(r.department=s);for(const r of Object.values(this.state.dailyRecord.allocations))r.department===t&&(r.department=s),r.work===t&&(r.work=s);return this.state.dailyRecord.verifiedBy&&this.state.dailyRecord.verifiedBy[t]&&(this.state.dailyRecord.verifiedBy[s]=this.state.dailyRecord.verifiedBy[t],delete this.state.dailyRecord.verifiedBy[t]),this.notify(),await Promise.all([tt(this.state.departments),O(this.state.roster),W(this.state.currentDate,this.state.dailyRecord)]),{success:!0}}async deleteDepartment(t){const a=this.state.roster.filter(s=>s.department===t).length;return a>0?{success:!1,inUseCount:a}:(this.state.departments=this.state.departments.filter(s=>s!==t),this.notify(),await tt(this.state.departments),{success:!0,inUseCount:0})}async addDesignation(t){const a=t.trim();return a?this.state.designations.includes(a)?{success:!1,error:`Designation "${a}" already exists`}:(this.state.designations.push(a),this.notify(),await et(this.state.designations),{success:!0}):{success:!1,error:"Designation name cannot be empty"}}async editDesignation(t,a){const s=a.trim();if(!s)return{success:!1,error:"Designation name cannot be empty"};if(s===t)return{success:!0};if(this.state.designations.includes(s))return{success:!1,error:`Designation "${s}" already exists`};const n=this.state.designations.indexOf(t);if(n<0)return{success:!1,error:`Designation "${t}" not found`};this.state.designations[n]=s;for(const r of this.state.roster)r.designation===t&&(r.designation=s);return this.notify(),await Promise.all([et(this.state.designations),O(this.state.roster)]),{success:!0}}async deleteDesignation(t){const a=this.state.roster.filter(s=>s.designation===t).length;return a>0?{success:!1,inUseCount:a}:(this.state.designations=this.state.designations.filter(s=>s!==t),this.notify(),await et(this.state.designations),{success:!0,inUseCount:0})}startAddWorker(t){this.state.editingWorker={name:"",category:t,contractor:t==="labor"?this.state.contractors[0]||"Default Contractor":void 0,department:this.state.departments[0]||"Welding",designation:t==="staff"?this.state.designations[0]||"Staff Member":void 0,subCategory:t==="labor"?"Helper":void 0,unit:"UNIT I",status:"active",createdAt:T()},this.notify()}startEditWorker(t){this.state.editingWorker={...t},this.notify()}cancelWorkerForm(){this.state.editingWorker=null,this.notify()}async saveWorkerForm(t){var r;const a=this.state.editingWorker;if(!a)return{success:!1,error:"No draft"};const s=(r=t.name!==void 0?t.name:a.name)==null?void 0:r.trim();if(!s)return{success:!1,error:"Name is required"};const n={id:a.id||z(),name:s,category:a.category||"labor",contractor:a.category==="labor"?t.contractor||a.contractor||this.state.contractors[0]:void 0,department:t.department||a.department||"Welding",designation:a.category==="staff"?t.designation||a.designation||"Staff Member":void 0,subCategory:a.category==="labor"?t.subCategory||a.subCategory||"Helper":void 0,unit:t.unit||a.unit||"UNIT I",status:t.status||a.status||"active",createdAt:a.createdAt||T()};if(a.id){const d=this.state.roster.findIndex(c=>c.id===a.id);d>=0&&(this.state.roster[d]=n)}else this.state.roster.push(n);return this.state.editingWorker=null,this.notify(),await O(this.state.roster),{success:!0}}async deleteWorker(t){this.state.roster=this.state.roster.filter(a=>a.id!==t),this.state.dailyRecord.allocations[t]&&(delete this.state.dailyRecord.allocations[t],await W(this.state.currentDate,this.state.dailyRecord)),this.notify(),await O(this.state.roster)}async bulkImportNames(t,a,s,n="UNIT I",r="Helper",d="Welding"){const c=t.split(/\r?\n/).map(m=>m.trim()).filter(m=>m.length>0);let l=0;const i=T();for(const m of c){const f={id:z(),name:m,category:a,contractor:a==="labor"?s||this.state.contractors[0]:void 0,department:d,designation:a==="staff"?"Staff Member":void 0,subCategory:a==="labor"?r:void 0,unit:n,status:"active",createdAt:i};this.state.roster.push(f),l++}return l>0&&(this.notify(),await O(this.state.roster)),l}exportRosterCsv(){const t=["ID","Name","Category","Contractor","Department","Designation","SubCategory","Unit","Status","CreatedAt"],a=this.state.roster.map(s=>[s.id,s.name,s.category,s.contractor||"",s.department||"",s.designation||"",s.subCategory||"",s.unit,s.status,s.createdAt]);return vt(t,a)}exportRosterJson(){return JSON.stringify(this.state.roster,null,2)}async importRosterJson(t){try{const a=JSON.parse(t);if(!Array.isArray(a))return{success:!1,count:0,error:"JSON is not an array"};let s=0;for(const n of a){if(!n.name)continue;const r=this.state.roster.findIndex(c=>c.id===n.id),d={id:n.id||z(),name:n.name,category:n.category||"labor",contractor:n.contractor,department:n.department||"Welding",designation:n.designation,subCategory:n.subCategory||"Helper",unit:n.unit||"UNIT I",status:n.status||"active",createdAt:n.createdAt||T()};r>=0?this.state.roster[r]=d:this.state.roster.push(d),s++}return this.notify(),await O(this.state.roster),{success:!0,count:s}}catch(a){return{success:!1,count:0,error:a.message}}}async importRosterCsv(t){var a,s;try{const n=Zt(t);if(n.length<2)return{success:!1,count:0,error:"CSV has no data rows"};const r=n[0].map(b=>b.toLowerCase()),d=r.indexOf("name");if(d<0)return{success:!1,count:0,error:'Missing "Name" column in CSV'};const c=r.indexOf("category"),l=r.indexOf("contractor"),i=r.indexOf("department"),m=r.indexOf("designation"),f=r.indexOf("subcategory"),p=r.indexOf("unit"),I=r.indexOf("status");let w=0;for(let b=1;b<n.length;b++){const h=n[b],D=h[d];if(!D)continue;const E=c>=0&&((a=h[c])==null?void 0:a.toLowerCase())==="staff"?"staff":"labor",x=l>=0?h[l]:void 0,M=i>=0?h[i]:"Welding",B=m>=0?h[m]:void 0,H=f>=0?h[f]:"Helper",U=p>=0&&yt.includes(h[p])?h[p]:"UNIT I",$=I>=0&&["active","inactive","debarred"].includes((s=h[I])==null?void 0:s.toLowerCase())?h[I].toLowerCase():"active",C={id:z(),name:D,category:E,contractor:E==="labor"?x||this.state.contractors[0]:void 0,department:M,designation:B,subCategory:E==="labor"?H:void 0,unit:U,status:$,createdAt:T()};this.state.roster.push(C),w++}return this.notify(),await O(this.state.roster),{success:!0,count:w}}catch(n){return{success:!1,count:0,error:n.message}}}}const v=new ue;function ft(e){const t=e.roster.filter(b=>b.category==="staff"&&b.status!=="inactive"),a=e.roster.filter(b=>b.category==="labor"&&b.status!=="inactive"),s=t.filter(b=>{var h;return(h=e.dailyRecord.allocations[b.id])==null?void 0:h.present}),n=a.filter(b=>{var h;return(h=e.dailyRecord.allocations[b.id])==null?void 0:h.present}),r=s.length+n.length,d=[];d.push(G),d.push(`Morning Manpower Report — ${Y(e.currentDate)}`),d.push(""),d.push(`Staff present: ${s.length} / ${t.length}`),d.push(`Labor present: ${n.length} / ${a.length}`),d.push(`Total on floor: ${r}`),d.push(""),d.push("--- By Unit ---");for(const b of yt){const h=[...s,...n].filter(D=>{const E=e.dailyRecord.allocations[D.id];return((E==null?void 0:E.unit)||D.unit)===b});d.push(`${b}: ${h.length}`)}d.push(""),d.push("--- By Contractor ---");const c=q(a,b=>b.contractor||"Other");for(const[b,h]of c.entries()){const D=h.filter(E=>{var x;return(x=e.dailyRecord.allocations[E.id])==null?void 0:x.present}).length;d.push(`${b}: ${D} / ${h.length}`)}if(d.push(""),d.push("--- By Work / Department (Labor Present) ---"),n.length===0)d.push("None present");else{const b=q(n,h=>{const D=e.dailyRecord.allocations[h.id];return(D==null?void 0:D.department)||(D==null?void 0:D.work)||h.department||"General"});for(const[h,D]of b.entries())d.push(`${h}: ${D.length}`)}d.push(""),d.push("--- Shift Split (Present) ---");const l=[...s,...n],i=l.filter(b=>{var h;return(((h=e.dailyRecord.allocations[b.id])==null?void 0:h.shift)||"Day")==="Day"}).length,m=l.filter(b=>{var h;return((h=e.dailyRecord.allocations[b.id])==null?void 0:h.shift)==="Night"}).length;d.push(`Day Shift: ${i}   Night Shift: ${m}`),d.push("");const f=e.dailyRecord.verifiedBy||{},p=Object.entries(f);if(p.length>0){d.push("--- HOD Verification ---");for(const[b,h]of p)d.push(`${b}: Verified by ${h}`);d.push("")}d.push("--- Absent List ---");const I=t.filter(b=>{var h;return!((h=e.dailyRecord.allocations[b.id])!=null&&h.present)}),w=a.filter(b=>{var h;return!((h=e.dailyRecord.allocations[b.id])!=null&&h.present)});return I.length===0&&w.length===0?d.push("None (100% attendance)"):(I.forEach(b=>{d.push(`Staff: ${b.name} (${b.designation||"Staff"})`)}),w.forEach(b=>{d.push(`${b.contractor||"Labor"}: ${b.name} (${b.subCategory||"Helper"})`)})),d.join(`
`)}function pe(e){const t=e.roster.filter(l=>l.category==="staff"&&l.status!=="inactive"),a=e.roster.filter(l=>l.category==="labor"&&l.status!=="inactive"),s=t.filter(l=>{var i;return(i=e.dailyRecord.allocations[l.id])==null?void 0:i.present}).length,n=a.filter(l=>{var i;return(i=e.dailyRecord.allocations[l.id])==null?void 0:i.present}).length,r=["Metric","Present","Total Roster"],d=[["Date",e.currentDate,""],["Staff Attendance",s,t.length],["Contract Labor Attendance",n,a.length],["Total Floor Count",s+n,t.length+a.length]],c=q(a,l=>l.contractor||"Other");for(const[l,i]of c.entries()){const m=i.filter(f=>{var p;return(p=e.dailyRecord.allocations[f.id])==null?void 0:p.present}).length;d.push([`Contractor: ${l}`,m,i.length])}return vt(r,d)}function me(e){const t=e.roster.filter(n=>n.status!=="inactive"),a=["Date","Worker ID","Name","Category","Contractor","Present","Department","Unit","Role / Designation","Shift","Supervisor","Check-in Time","Remarks"],s=t.map(n=>{const r=e.dailyRecord.allocations[n.id];return[e.currentDate,n.id,n.name,n.category,n.contractor||"",r!=null&&r.present?"YES":"NO",(r==null?void 0:r.department)||(r==null?void 0:r.work)||n.department||"",(r==null?void 0:r.unit)||n.unit||"UNIT I",(r==null?void 0:r.subCategory)||n.subCategory||n.designation||"",(r==null?void 0:r.shift)||"Day",(r==null?void 0:r.supervisor)||"",(r==null?void 0:r.checkInTime)||"",(r==null?void 0:r.remarks)||""]});return vt(a,s)}function fe(e){const t=ft(e);return`
    <header class="top">
      <div class="co">${G}</div>
      <div class="date title-mode">Manpower Report — ${Y(e.currentDate)}</div>
    </header>
    <main>
      <div class="reportBox" id="reportText">${g(t)}</div>

      <div class="report-actions-grid">
        <button type="button" class="btn" data-action="copy-report">
          Copy Report Text
        </button>
        <button type="button" class="btn btn-share" data-action="share-report">
          Share (WhatsApp / Email)
        </button>
        <button type="button" class="btn secondary" data-action="export-summary-csv">
          Export Summary CSV
        </button>
        <button type="button" class="btn secondary" data-action="export-detailed-csv">
          Export Detailed CSV
        </button>
      </div>
    </main>
  `}function be(e){const t=e.editingWorker;if(!t)return"";const a=!!t.id,s=t.category==="labor",n=Array.from(new Set([...e.designations,...t.designation?[t.designation]:[]])),r=Array.from(new Set([...e.departments,...t.department?[t.department]:[]])),d=Array.from(new Set([...e.contractors,...t.contractor?[t.contractor]:[]]));return`
    <header class="top">
      <div class="co">${G}</div>
      <div class="date title-mode">${a?"Edit Worker Profile":"Add to Employee Library"}</div>
    </header>
    <main>
      <div class="field">
        <label for="f_name">Full Name</label>
        <input id="f_name" type="text" value="${g(t.name||"")}" placeholder="Full name" autocomplete="off" />
      </div>

      <div class="field">
        <label>Category</label>
        <div class="segmented">
          <button type="button" class="${t.category==="staff"?"on":""}" data-action="form-set-category" data-val="staff">Staff</button>
          <button type="button" class="${t.category==="labor"?"on":""}" data-action="form-set-category" data-val="labor">Labor</button>
        </div>
      </div>

      ${s?`
        <div class="field">
          <div class="field-label-row">
            <label for="f_contractor">Contractor</label>
            <button type="button" class="form-link-btn" data-action="open-contractors">&#9881; Manage Contractors</button>
          </div>
          <select id="f_contractor">
            ${d.map(c=>`<option value="${g(c)}" ${t.contractor===c?"selected":""}>${g(c)}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <label for="f_subcategory">Role / Skill</label>
          <select id="f_subcategory">
            ${Yt.map(c=>`<option value="${g(c)}" ${t.subCategory===c?"selected":""}>${g(c)}</option>`).join("")}
          </select>
        </div>
      `:`
        <div class="field">
          <div class="field-label-row">
            <label for="f_designation">Staff Designation</label>
            <button type="button" class="form-link-btn" data-action="open-designations">&#9881; Manage Designations</button>
          </div>
          <select id="f_designation">
            ${n.map(c=>`<option value="${g(c)}" ${t.designation===c?"selected":""}>${g(c)}</option>`).join("")}
          </select>
        </div>
      `}

      <div class="row2">
        <div class="field">
          <label for="f_unit">Default Unit</label>
          <select id="f_unit">
            ${yt.map(c=>`<option value="${g(c)}" ${t.unit===c?"selected":""}>${g(c)}</option>`).join("")}
          </select>
        </div>

        <div class="field">
          <div class="field-label-row">
            <label for="f_department">Department</label>
            <button type="button" class="form-link-btn" data-action="open-departments">&#9881; Manage</button>
          </div>
          <select id="f_department">
            ${r.map(c=>`<option value="${g(c)}" ${t.department===c?"selected":""}>${g(c)}</option>`).join("")}
          </select>
        </div>
      </div>

      <div class="field">
        <label for="f_status">Employment Status</label>
        <select id="f_status">
          <option value="active" ${t.status==="active"?"selected":""}>Active (Normal Duty)</option>
          <option value="debarred" ${t.status==="debarred"?"selected":""}>Debarred (Barred from Entry)</option>
          <option value="inactive" ${t.status==="inactive"?"selected":""}>Left Company (Archive)</option>
        </select>
      </div>

      ${t.createdAt?`
        <div class="field-static-info">
          <span>Added to Library on: <b>${g(t.createdAt)}</b></span>
        </div>
      `:""}

      <div style="margin-top: 24px;">
        <button type="button" class="btn" data-action="save-worker-form">Save Worker</button>
        <div style="height: 10px;"></div>
        <button type="button" class="btn secondary" data-action="cancel-worker-form">Cancel</button>
      </div>
    </main>
  `}function ge(e){return`
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-title">Manage Contractors</div>
          <button type="button" class="modal-close-btn" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="add-master-row">
            <input type="text" id="newContractorInput" placeholder="New Contractor Name" />
            <button type="button" class="btn btn-add-master" data-action="add-contractor-submit">Add</button>
          </div>

          <div class="master-list">
            ${e.contractors.map(t=>{const a=e.roster.filter(s=>s.contractor===t).length;return`
                <div class="master-item">
                  <div class="master-item-info">
                    <span class="master-item-name">${g(t)}</span>
                    <span class="master-count">(${a} workers)</span>
                  </div>
                  <div class="master-actions">
                    <button type="button" class="btn-icon-edit" data-action="edit-contractor" data-name="${g(t)}" title="Edit contractor name">&#9998; Edit</button>
                    <button type="button" class="del" data-action="delete-contractor" data-name="${g(t)}" title="Delete contractor">&times;</button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    </div>
  `}function ye(e){return`
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-title">Manage Departments</div>
          <button type="button" class="modal-close-btn" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="add-master-row">
            <input type="text" id="newDepartmentInput" placeholder="New Department Name" />
            <button type="button" class="btn btn-add-master" data-action="add-department-submit">Add</button>
          </div>

          <div class="master-list">
            ${e.departments.map(t=>{const a=e.roster.filter(s=>s.department===t).length;return`
                <div class="master-item">
                  <div class="master-item-info">
                    <span class="master-item-name">${g(t)}</span>
                    <span class="master-count">(${a} assigned)</span>
                  </div>
                  <div class="master-actions">
                    <button type="button" class="btn-icon-edit" data-action="edit-department" data-name="${g(t)}" title="Edit department name">&#9998; Edit</button>
                    <button type="button" class="del" data-action="delete-department" data-name="${g(t)}" title="Delete department">&times;</button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    </div>
  `}function ve(e){return`
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-title">Manage Staff Designations</div>
          <button type="button" class="modal-close-btn" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="add-master-row">
            <input type="text" id="newDesignationInput" placeholder="New Designation Name" />
            <button type="button" class="btn btn-add-master" data-action="add-designation-submit">Add</button>
          </div>

          <div class="master-list">
            ${e.designations.map(t=>{const a=e.roster.filter(s=>s.designation===t).length;return`
                <div class="master-item">
                  <div class="master-item-info">
                    <span class="master-item-name">${g(t)}</span>
                    <span class="master-count">(${a} staff)</span>
                  </div>
                  <div class="master-actions">
                    <button type="button" class="btn-icon-edit" data-action="edit-designation" data-name="${g(t)}" title="Edit designation name">&#9998; Edit</button>
                    <button type="button" class="del" data-action="delete-designation" data-name="${g(t)}" title="Delete designation">&times;</button>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    </div>
  `}function he(e){return`
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-title">Bulk Import Workers</div>
          <button type="button" class="modal-close-btn" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <p class="modal-desc">Paste a list of names (one per line) from WhatsApp or Excel:</p>

          <div class="field">
            <label for="bulk_names">Worker Names (One name per line)</label>
            <textarea id="bulk_names" rows="6" placeholder="Ramesh Kumar&#10;Suresh Patil&#10;Ganesh Shinde"></textarea>
          </div>

          <div class="field">
            <label for="bulk_category">Assign To</label>
            <select id="bulk_category">
              <option value="labor">Contract Labor</option>
              <option value="staff">Company Staff</option>
            </select>
          </div>

          <div class="field" id="bulk_contractor_wrap">
            <label for="bulk_contractor">Contractor</label>
            <select id="bulk_contractor">
              ${e.contractors.map(t=>`<option value="${g(t)}">${g(t)}</option>`).join("")}
            </select>
          </div>

          <div class="row2">
            <div class="field">
              <label for="bulk_unit">Unit</label>
              <select id="bulk_unit">
                <option value="UNIT I">UNIT I</option>
                <option value="UNIT II">UNIT II</option>
                <option value="UNIT III">UNIT III</option>
              </select>
            </div>

            <div class="field">
              <label for="bulk_dept">Department</label>
              <select id="bulk_dept">
                ${e.departments.map(t=>`<option value="${g(t)}">${g(t)}</option>`).join("")}
              </select>
            </div>
          </div>

          <button type="button" class="btn" data-action="bulk-import-submit">Import Workers</button>
        </div>
      </div>
    </div>
  `}function we(){return`
    <div class="modal-overlay" data-action="close-modal">
      <div class="modal-card" onclick="event.stopPropagation()">
        <div class="modal-header">
          <div class="modal-title">Backup & Restore Library</div>
          <button type="button" class="modal-close-btn" data-action="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="sectionTitle">Export Library</div>
          <p class="modal-desc">Save employee library backup to <b>Downloads/BSP_Attendance/</b>:</p>
          <div class="row2">
            <button type="button" class="btn" data-action="export-roster-json">Export JSON</button>
            <button type="button" class="btn secondary" data-action="export-roster-csv">Export CSV</button>
          </div>

          <div class="sectionTitle" style="margin-top: 24px;">Import / Restore Library</div>
          <p class="modal-desc">Paste JSON or CSV data to restore or merge into library:</p>
          <textarea id="import_data_text" rows="5" placeholder="Paste JSON or CSV data here..."></textarea>
          <div class="row2" style="margin-top: 10px;">
            <button type="button" class="btn" data-action="import-roster-json-submit">Import JSON</button>
            <button type="button" class="btn secondary" data-action="import-roster-csv-submit">Import CSV</button>
          </div>

          <div class="sectionTitle" style="margin-top: 24px;">Factory Demo Data</div>
          <p class="modal-desc">Reload realistic Chakan manufacturing plant roster (4 contractors, 12 depts, 28 workers, daily check-ins):</p>
          <button type="button" class="btn secondary btn-demo-reset" data-action="load-demo-data">↺ Load Plant Demo Data</button>
        </div>
      </div>
    </div>
  `}function Ie(e){if(e.editingWorker)return be(e);const t=e.rosterStatusFilter,a=e.roster.filter(i=>i.status==="active").length,s=e.roster.filter(i=>i.status==="debarred").length,n=e.roster.filter(i=>i.status==="inactive").length,r=e.roster.filter(i=>i.status===t),d=r.filter(i=>i.category==="staff"),c=r.filter(i=>i.category==="labor");let l=`
    <header class="top">
      <div class="co">${G}</div>
      <div class="date title-mode">Employee Library (${e.roster.length})</div>
    </header>
    <main>
      <!-- Status Filter Tabs -->
      <div class="roster-status-tabs">
        <button
          type="button"
          class="status-tab ${t==="active"?"active":""}"
          data-action="set-roster-filter"
          data-status="active"
        >
          Active (${a})
        </button>
        <button
          type="button"
          class="status-tab ${t==="debarred"?"active tab-debarred":""}"
          data-action="set-roster-filter"
          data-status="debarred"
        >
          Debarred (${s})
        </button>
        <button
          type="button"
          class="status-tab ${t==="inactive"?"active":""}"
          data-action="set-roster-filter"
          data-status="inactive"
        >
          Left (${n})
        </button>
      </div>

      <!-- Action Toolbar -->
      <div class="toolbar">
        <button type="button" class="btn" data-action="add-staff">+ Staff</button>
        <button type="button" class="btn" data-action="add-labor">+ Laborer</button>
      </div>

      <!-- Masters & Management Secondary Bar -->
      <div class="master-toolbar-scroll">
        <button type="button" class="btn-pill" data-action="open-contractors">Contractors (${e.contractors.length})</button>
        <button type="button" class="btn-pill" data-action="open-departments">Departments (${e.departments.length})</button>
        <button type="button" class="btn-pill" data-action="open-designations">Designations (${e.designations.length})</button>
        <button type="button" class="btn-pill" data-action="open-bulk-import">Bulk Paste</button>
        <button type="button" class="btn-pill" data-action="open-export-import">Backup / Sync</button>
      </div>
  `;return d.length>0&&(l+=`<div class="sectionTitle">Staff (${d.length})</div>`,d.forEach(i=>{l+=`
        <div class="rosterRow ${i.status==="debarred"?"row-debarred":""}">
          <div class="info" data-action="edit-worker" data-id="${i.id}">
            <div class="name-row">
              <span class="name">${g(i.name)}</span>
              ${i.status==="debarred"?'<span class="badge badge-debarred">DEBARRED</span>':""}
              <span class="badge badge-unit">${g(i.unit)}</span>
            </div>
            <div class="meta">${g(i.department||"Staff")} · ${g(i.designation||"Staff Member")} · Added: ${g(i.createdAt)}</div>
          </div>
          <button type="button" class="del" data-action="delete-worker" data-id="${i.id}" title="Delete worker">&times;</button>
        </div>
      `})),c.length>0&&(l+=`<div class="sectionTitle" style="margin-top: 20px;">Contract Labourers (${c.length})</div>`,q(c,m=>m.contractor||"Other").forEach((m,f)=>{l+=`<div class="contractor-label">${g(f)} (${m.length})</div>`,m.forEach(p=>{l+=`
          <div class="rosterRow ${p.status==="debarred"?"row-debarred":""}">
            <div class="info" data-action="edit-worker" data-id="${p.id}">
              <div class="name-row">
                <span class="name">${g(p.name)}</span>
                ${p.status==="debarred"?'<span class="badge badge-debarred">DEBARRED</span>':""}
                <span class="badge badge-unit">${g(p.unit)}</span>
              </div>
              <div class="meta">${g(p.subCategory||"Helper")} · ${g(p.department||"Welding")} · Added: ${g(p.createdAt)}</div>
            </div>
            <button type="button" class="del" data-action="delete-worker" data-id="${p.id}" title="Delete laborer">&times;</button>
          </div>
        `})})),r.length===0&&(l+=`
      <div class="empty">
        <p>No workers in <b>${g(t.toUpperCase())}</b> list.</p>
        ${t==="active"?"<p>Tap <b>+ Staff</b>, <b>+ Laborer</b>, or <b>Bulk Paste</b> above to add employees.</p>":""}
      </div>
    `),l+="</main>",e.activeModal==="contractors"?l+=ge(e):e.activeModal==="departments"?l+=ye(e):e.activeModal==="designations"?l+=ve(e):e.activeModal==="bulk-import"?l+=he(e):e.activeModal==="roster-export-import"&&(l+=we()),l}function ke(e){return`
    <nav class="tabs">
      <button
        type="button"
        class="${e==="today"?"active":""}"
        data-action="switch-tab"
        data-tab="today"
      >
        <span class="tab-icon">&#10003;</span>
        <span class="tab-label">TODAY</span>
      </button>

      <button
        type="button"
        class="${e==="verify"?"active":""}"
        data-action="switch-tab"
        data-tab="verify"
      >
        <span class="tab-icon">&#9745;</span>
        <span class="tab-label">VERIFY</span>
      </button>

      <button
        type="button"
        class="${e==="report"?"active":""}"
        data-action="switch-tab"
        data-tab="report"
      >
        <span class="tab-icon">&#128202;</span>
        <span class="tab-label">REPORT</span>
      </button>

      <button
        type="button"
        class="${e==="roster"?"active":""}"
        data-action="switch-tab"
        data-tab="roster"
      >
        <span class="tab-icon">&#128101;</span>
        <span class="tab-label">ROSTER</span>
      </button>
    </nav>
  `}function Se(e){var c,l;const t=e.roster.filter(i=>i.category==="staff"&&i.status!=="inactive"),a=e.roster.filter(i=>i.category==="labor"&&i.status!=="inactive");let s=0,n=0;for(const i of t)(c=e.dailyRecord.allocations[i.id])!=null&&c.present&&s++;for(const i of a)(l=e.dailyRecord.allocations[i.id])!=null&&l.present&&n++;const r=s+n,d=e.currentDate===T();return`
    <header class="top">
      <div class="top-row">
        <div class="co">${G}</div>
        ${d?"":'<button type="button" class="btn-today-jump" data-action="jump-today">Jump to Today</button>'}
      </div>

      <div class="date-navigator">
        <button type="button" class="date-nav-btn" data-action="prev-date" title="Previous Day">
          &#9664;
        </button>
        <div class="date-display" data-action="trigger-date-picker">
          <span class="date-text">${Y(e.currentDate)}</span>
          <span class="calendar-icon">&#128197;</span>
          <input
            type="date"
            id="hiddenDatePicker"
            class="hidden-date-input"
            value="${e.currentDate}"
          />
        </div>
        <button type="button" class="date-nav-btn" data-action="next-date" title="Next Day">
          &#9654;
        </button>
      </div>
    </header>

    <div class="tallybar">
      <div class="cell">
        <div class="num">${s}<span class="denom">/${t.length}</span></div>
        <div class="lbl">STAFF</div>
      </div>
      <div class="cell">
        <div class="num">${n}<span class="denom">/${a.length}</span></div>
        <div class="lbl">LABOR</div>
      </div>
      <div class="cell">
        <div class="num">${r}</div>
        <div class="lbl">TOTAL</div>
      </div>
    </div>
  `}function _t(e,t,a){const s=!!(t!=null&&t.present),n=e.status==="debarred",r=(t==null?void 0:t.work)||(t==null?void 0:t.department)||e.department||(e.category==="labor"?"Welding":"Staff"),d=(t==null?void 0:t.unit)||e.unit||"UNIT I",c=(t==null?void 0:t.shift)||"Day",l=(t==null?void 0:t.supervisor)||"",i=(t==null?void 0:t.subCategory)||e.subCategory||(e.category==="staff"?e.designation||"Staff":"Helper"),m=t==null?void 0:t.checkInTime,f=t==null?void 0:t.remarks;let p=[];e.category==="labor"?(p.push(e.contractor||"Contractor"),p.push(r),p.push(i),l&&p.push(`Sup: ${l}`)):(p.push(r),e.designation&&p.push(e.designation),m&&p.push(`In: ${m}`),l&&p.push(`Sup: ${l}`));const I=p.join(" · ");return`
    <div class="worker ${s?"present":"absent"} ${n?"worker-debarred":""}">
      <div
        class="box ${n?"box-debarred":""}"
        ${`data-action="toggle-present" data-id="${e.id}"`}
        title="${n?"Debarred from floor":"Toggle Attendance"}"
      >
        ${s?"✓":n?"✕":""}
      </div>

      <div class="info" ${`data-action="toggle-present" data-id="${e.id}"`}>
        <div class="name-row">
          <span class="name">${g(e.name)}</span>
          ${n?'<span class="badge badge-debarred">DEBARRED</span>':""}
          <span class="badge badge-unit">${g(d)}</span>
        </div>
        <div class="meta">${g(I)}</div>
        ${f?`<div class="worker-remark">Note: ${g(f)}</div>`:""}
      </div>

      <div class="worker-actions">
        <div class="shift ${c==="Night"?"shift-night":"shift-day"}">
          ${c==="Night"?"NIGHT":"DAY"}
        </div>
        <button
          type="button"
          class="btn-quick-adjust"
          data-action="open-quick-adjust"
          data-id="${e.id}"
          title="Daily Adjustments"
        >
          &#9881;
        </button>
      </div>
    </div>
  `}function De(e){const t=e.quickAdjustWorkerId;if(!t)return"";const a=e.roster.find(r=>r.id===t);if(!a)return"";const s=e.dailyRecord.allocations[t]||{unit:a.unit||"UNIT I",department:a.department||"Welding",subCategory:a.subCategory||"Helper",shift:"Day",supervisor:""},n=a.category==="staff";return`
    <div class="modal-overlay" data-action="close-quick-adjust">
      <div class="modal-card drawer-card" onclick="event.stopPropagation()">
        <div class="drawer-header">
          <div class="drawer-title">Daily Adjustments: ${g(a.name)}</div>
          <button type="button" class="modal-close-btn" data-action="close-quick-adjust">&times;</button>
        </div>

        <div class="drawer-body">
          <input type="hidden" id="qa_worker_id" value="${a.id}" />

          <div class="field">
            <label for="qa_department">Assigned Work / Department</label>
            <select id="qa_department">
              ${Array.from(new Set([...e.departments,...s.department?[s.department]:[],...s.work?[s.work]:[]])).map(r=>`<option value="${g(r)}" ${(s.department||s.work)===r?"selected":""}>${g(r)}</option>`).join("")}
            </select>
          </div>


          <div class="row2">
            <div class="field">
              <label for="qa_unit">Unit</label>
              <select id="qa_unit">
                <option value="UNIT I" ${s.unit==="UNIT I"?"selected":""}>UNIT I</option>
                <option value="UNIT II" ${s.unit==="UNIT II"?"selected":""}>UNIT II</option>
                <option value="UNIT III" ${s.unit==="UNIT III"?"selected":""}>UNIT III</option>
              </select>
            </div>

            <div class="field">
              <label>Shift</label>
              <div class="segmented">
                <button type="button" id="qa_shift_day" class="${s.shift==="Day"?"on":""}" data-action="qa-set-shift" data-val="Day">Day</button>
                <button type="button" id="qa_shift_night" class="${s.shift==="Night"?"on":""}" data-action="qa-set-shift" data-val="Night">Night</button>
              </div>
            </div>
          </div>

          ${n?`
            <div class="field">
              <label for="qa_check_in">Staff Check-in Time</label>
              <div class="time-input-row">
                <input id="qa_check_in" type="text" value="${g(s.checkInTime||"")}" placeholder="e.g. 08:30 AM" />
                <button type="button" class="btn secondary btn-now" data-action="qa-stamp-time">Now</button>
              </div>
            </div>
          `:`
            <div class="field">
              <label for="qa_subcategory">Role / Skill</label>
              <select id="qa_subcategory">
                <option value="Helper" ${s.subCategory==="Helper"?"selected":""}>Helper</option>
                <option value="Operator" ${s.subCategory==="Operator"?"selected":""}>Operator</option>
                <option value="Welder" ${s.subCategory==="Welder"?"selected":""}>Welder</option>
                <option value="Housekeeping" ${s.subCategory==="Housekeeping"?"selected":""}>Housekeeping</option>
              </select>
            </div>
          `}

          <div class="field">
            <label for="qa_supervisor">Reporting Supervisor</label>
            <input id="qa_supervisor" type="text" value="${g(s.supervisor||"")}" placeholder="Supervisor on duty" />
          </div>

          <div class="field">
            <label for="qa_remarks">Daily Remark</label>
            <input id="qa_remarks" type="text" value="${g(s.remarks||"")}" placeholder="e.g. Half-day, Gate pass, Overtime" />
          </div>

          <button type="button" class="btn" data-action="qa-save">Save Adjustments</button>
        </div>
      </div>
    </div>
  `}function Rt(e){const t=e.roster.filter(i=>i.status!=="inactive"),a=e.searchQuery.toLowerCase().trim(),s=a?t.filter(i=>{const m=e.dailyRecord.allocations[i.id],f=i.name.toLowerCase().includes(a),p=(i.contractor||"").toLowerCase().includes(a),I=((m==null?void 0:m.department)||i.department||"").toLowerCase().includes(a),w=((m==null?void 0:m.supervisor)||"").toLowerCase().includes(a),b=((m==null?void 0:m.unit)||i.unit||"").toLowerCase().includes(a);return f||p||I||w||b}):t,n=s.filter(i=>i.category==="staff"),r=s.filter(i=>i.category==="labor"),d=q(r,i=>i.contractor||"Other Contractor");let c=Se(e);if(c+="<main>",c+=`
    <div class="search-bar-wrap">
      <input
        type="text"
        id="todaySearchInput"
        class="search-input"
        placeholder="Search worker, contractor, unit, department..."
        value="${g(e.searchQuery)}"
      />
      ${e.searchQuery?'<button type="button" class="search-clear-btn" data-action="clear-search">&times;</button>':""}
    </div>
  `,e.roster.length===0)return c+=`
      <div class="empty">
        <p><b>Employee library is empty.</b></p>
        <p>Go to the <b>ROSTER</b> tab to add staff or bulk import contract labourers.</p>
      </div>
    `,c+="</main>",c;if(s.length===0)return c+=`
      <div class="empty">
        <p>No workers matching "${g(e.searchQuery)}"</p>
        <button type="button" class="btn secondary" data-action="clear-search" style="margin-top: 10px;">Clear Search</button>
      </div>
    `,c+="</main>",c;if(n.length>0){const i=!!e.collapsedSections.Staff,m=n.filter(f=>{var p;return(p=e.dailyRecord.allocations[f.id])==null?void 0:p.present}).length;c+=`
      <div class="group">
        <h3 class="group-header" data-action="toggle-section" data-key="Staff">
          <span>Staff <span class="accordion-arrow">${i?"&#9654;":"&#9660;"}</span></span>
          <span class="count">${m}/${n.length}</span>
        </h3>
        <div class="group-content ${i?"collapsed":""}">
          ${n.map(f=>_t(f,e.dailyRecord.allocations[f.id])).join("")}
        </div>
      </div>
    `}const l=Array.from(new Set([...e.contractors,...Array.from(d.keys())]));for(const i of l){const m=d.get(i)||[];if(!m.length)continue;const f=!!e.collapsedSections[i],p=m.filter(I=>{var w;return(w=e.dailyRecord.allocations[I.id])==null?void 0:w.present}).length;c+=`
      <div class="group">
        <h3 class="group-header" data-action="toggle-section" data-key="${g(i)}">
          <span>${g(i)} <span class="accordion-arrow">${f?"&#9654;":"&#9660;"}</span></span>
          <span class="count">${p}/${m.length}</span>
        </h3>
        <div class="group-content ${f?"collapsed":""}">
          ${m.map(I=>_t(I,e.dailyRecord.allocations[I.id])).join("")}
        </div>
      </div>
    `}return c+="</main>",c+=De(e),c}function $e(e){const t=e.roster.filter(i=>i.category==="staff"&&i.status!=="inactive"),a=[];for(const i of e.roster){if(i.status==="inactive")continue;const m=e.dailyRecord.allocations[i.id];if(m!=null&&m.present){const f=m.department||i.department||"Welding";a.push({worker:i,dept:f})}}const s=q(a,i=>i.dept),n=Array.from(new Set([...Array.from(s.keys()),...e.departments.slice(0,7)])).filter(i=>(s.get(i)||[]).length>0),r=e.dailyRecord.verifiedBy||{},d=n.length,c=n.filter(i=>!!r[i]).length;let l=`
    <header class="top">
      <div class="co">${G}</div>
      <div class="date title-mode">HOD Verification — ${Y(e.currentDate)}</div>
    </header>
    <main>
      <div class="verify-progress-card">
        <div class="progress-title">Department Sign-Off Progress</div>
        <div class="progress-bar-bg">
          <div
            class="progress-bar-fill"
            style="width: ${d?c/d*100:0}%"
          ></div>
        </div>
        <div class="progress-stats">
          <span>${c} of ${d} departments verified</span>
          <span class="progress-percent">${d?Math.round(c/d*100):0}%</span>
        </div>
      </div>
  `;if(n.length===0)return l+=`
      <div class="empty">
        <p>No workers have been marked present for ${Y(e.currentDate)} yet.</p>
        <p>Mark attendance in the <b>TODAY</b> tab first, then come back here for HOD verification.</p>
      </div>
    `,l+="</main>",l;for(const i of n){const m=s.get(i)||[],f=m.filter(b=>b.worker.category==="staff").length,p=m.filter(b=>b.worker.category==="labor").length,I=!!r[i],w=r[i]||"";l+=`
      <div class="verify-card ${I?"verified-card":""}">
        <div class="verify-card-header">
          <div>
            <div class="dept-title">${g(i)}</div>
            <div class="dept-counts">
              <span>Staff: <b>${f}</b></span> · 
              <span>Labor: <b>${p}</b></span> · 
              <span>Total: <b>${f+p}</b></span>
            </div>
          </div>
          <div>
            ${I?'<span class="badge badge-verified">VERIFIED</span>':'<span class="badge badge-pending">PENDING</span>'}
          </div>
        </div>

        <div class="verify-card-action">
          <label class="verify-label">Verified by Department Head:</label>
          <div class="verify-select-row">
            <select class="verify-select" data-dept="${g(i)}" id="sel_verify_${g(i)}">
              <option value="">-- Select Verifying HOD / Staff --</option>
              ${t.map(b=>`<option value="${g(b.name)}" ${w===b.name?"selected":""}>${g(b.name)} (${g(b.designation||"Staff")})</option>`).join("")}
            </select>
            ${I?`
              <button type="button" class="btn secondary btn-unverify" data-action="unverify-dept" data-dept="${g(i)}">Clear</button>
            `:`
              <button type="button" class="btn btn-verify-submit" data-action="confirm-verify-dept" data-dept="${g(i)}">Sign Off</button>
            `}
          </div>
          ${I?`<div class="verified-timestamp">Signed off by: <b>${g(w)}</b></div>`:""}
        </div>
      </div>
    `}return l+="</main>",l}const it=document.getElementById("app"),at=document.getElementById("copiedToast");function Ce(e,t=1800){at&&(at.textContent=e,at.classList.add("show"),setTimeout(()=>{at.classList.remove("show")},t))}function Ae(){const e=v.getState();let t="";switch(e.tab){case"today":t=Rt(e);break;case"verify":t=$e(e);break;case"report":t=fe(e);break;case"roster":t=Ie(e);break;default:t=Rt(e)}it.innerHTML=t+ke(e.tab)}function Te(){it.addEventListener("input",e=>{const t=e.target;if(t&&t.id==="todaySearchInput"){const a=t;v.setSearchQuery(a.value)}}),it.addEventListener("change",async e=>{const t=e.target;if(t&&t.id==="hiddenDatePicker"){const a=t;a.value&&await v.setDate(a.value)}}),it.addEventListener("click",async e=>{var r,d,c,l,i,m,f,p,I,w,b,h,D,E,x,M,B,H,U,$,C,_;const t=e.target;if(!t)return;const a=t.closest("[data-action]");if(!a)return;const s=a.getAttribute("data-action"),n=a.getAttribute("data-id");switch(s){case"switch-tab":{const o=a.getAttribute("data-tab");o&&v.setTab(o);break}case"prev-date":{await v.changeDate(-1);break}case"next-date":{await v.changeDate(1);break}case"jump-today":{await v.setDate(T());break}case"trigger-date-picker":{const o=document.getElementById("hiddenDatePicker");o&&typeof o.showPicker=="function"?o.showPicker():o&&o.focus();break}case"clear-search":{v.setSearchQuery("");break}case"toggle-section":{const o=a.getAttribute("data-key");o&&await v.toggleSectionCollapse(o);break}case"toggle-present":{if(n){const o=await v.togglePresent(n);!o.allowed&&o.message&&await A({title:"Entry Restricted",message:o.message})}break}case"open-quick-adjust":{n&&(e.stopPropagation(),v.openQuickAdjust(n));break}case"close-quick-adjust":{v.closeQuickAdjust();break}case"qa-set-shift":{const o=a.getAttribute("data-val"),u=document.getElementById("qa_shift_day"),y=document.getElementById("qa_shift_night");o==="Day"?(u==null||u.classList.add("on"),y==null||y.classList.remove("on")):(y==null||y.classList.add("on"),u==null||u.classList.remove("on"));break}case"qa-stamp-time":{const o=document.getElementById("qa_check_in");o&&(o.value=zt());break}case"qa-save":{const o=(r=document.getElementById("qa_worker_id"))==null?void 0:r.value,u=(d=document.getElementById("qa_department"))==null?void 0:d.value,y=(c=document.getElementById("qa_unit"))==null?void 0:c.value,S=(l=document.getElementById("qa_shift_night"))!=null&&l.classList.contains("on")?"Night":"Day",L=(i=document.getElementById("qa_subcategory"))==null?void 0:i.value,J=(m=document.getElementById("qa_supervisor"))==null?void 0:m.value,ct=(f=document.getElementById("qa_check_in"))==null?void 0:f.value,Q=(p=document.getElementById("qa_remarks"))==null?void 0:p.value;o&&(await v.saveQuickAdjust(o,{department:u,work:u,unit:y,shift:S,subCategory:L,supervisor:J,checkInTime:ct,remarks:Q}),k({title:"Adjustments Saved",message:"Daily allocation updated for this worker",type:"success",duration:2e3}));break}case"confirm-verify-dept":{const o=a.getAttribute("data-dept");if(o){const u=document.getElementById(`sel_verify_${o}`),y=u?u.value.trim():"";if(!y){await A({title:"Verification Incomplete",message:"Please select a verifying staff member or HOD before signing off."});return}await v.verifyDepartment(o,y),k({title:"Department Verified",message:`${o} signed off by ${y}`,type:"success"})}break}case"unverify-dept":{const o=a.getAttribute("data-dept");o&&(await v.unverifyDepartment(o),k({title:"Verification Cleared",message:`${o} verification status reset to pending`,type:"info"}));break}case"copy-report":{const o=v.getState(),u=ft(o);await Tt(u)?k({title:"Report Copied",message:"Formatted manpower report copied to clipboard. Ready to paste.",type:"success",duration:2800}):Ce("Copy failed");break}case"share-report":{const o=v.getState(),u=ft(o);await Kt(`BSP Metatech Attendance ${o.currentDate}`,u)||(await Tt(u),k({title:"Report Copied",message:"Direct share unavailable; text copied to clipboard instead.",type:"info",duration:2800}));break}case"export-summary-csv":{const o=v.getState(),u=pe(o),y=`BSP_Summary_${o.currentDate}.csv`,S=await X(y,u,"text/csv");k({title:"Export Successful",message:S.message,type:"success",duration:3500});break}case"export-detailed-csv":{const o=v.getState(),u=me(o),y=`BSP_Detailed_${o.currentDate}.csv`,S=await X(y,u,"text/csv");k({title:"Export Successful",message:S.message,type:"success",duration:3500});break}case"set-roster-filter":{const o=a.getAttribute("data-status");o&&v.setRosterStatusFilter(o);break}case"add-staff":{v.startAddWorker("staff");break}case"add-labor":{v.startAddWorker("labor");break}case"edit-worker":{if(n){const o=v.getState().roster.find(u=>u.id===n);o&&v.startEditWorker(o)}break}case"delete-worker":{if(n){e.stopPropagation();const o=v.getState().roster.find(S=>S.id===n),u=(o==null?void 0:o.name)||"this worker";await K({title:"Delete Worker",message:`Permanently delete "${u}" from the employee library?`,confirmText:"Delete Worker",cancelText:"Cancel",danger:!0})&&(await v.deleteWorker(n),k({title:"Worker Removed",message:`Deleted "${u}" from employee library`,type:"info"}))}break}case"form-set-category":{const o=a.getAttribute("data-val");o&&(v.getState().editingWorker.category=o,v.notify());break}case"save-worker-form":{const o=(I=document.getElementById("f_name"))==null?void 0:I.value,u=(w=document.getElementById("f_contractor"))==null?void 0:w.value,y=(b=document.getElementById("f_subcategory"))==null?void 0:b.value,S=(h=document.getElementById("f_designation"))==null?void 0:h.value,L=(D=document.getElementById("f_unit"))==null?void 0:D.value,J=(E=document.getElementById("f_department"))==null?void 0:E.value,ct=(x=document.getElementById("f_status"))==null?void 0:x.value,Q=await v.saveWorkerForm({name:o,contractor:u,subCategory:y,designation:S,unit:L,department:J,status:ct});!Q.success&&Q.error?await A({title:"Missing Required Field",message:Q.error}):k({title:"Worker Saved",message:`Profile for "${o==null?void 0:o.trim()}" saved to library`,type:"success"});break}case"cancel-worker-form":{v.cancelWorkerForm();break}case"open-contractors":{v.openModal("contractors");break}case"open-departments":{v.openModal("departments");break}case"open-designations":{v.openModal("designations");break}case"open-bulk-import":{v.openModal("bulk-import");break}case"open-export-import":{v.openModal("roster-export-import");break}case"close-modal":{v.closeModal();break}case"add-contractor-submit":{const o=document.getElementById("newContractorInput");if(o&&o.value.trim()){const u=o.value.trim(),y=await v.addContractor(u);y.success?(k({title:"Contractor Added",message:`Added "${u}" to master list`,type:"success"}),o.value=""):await A({title:"Cannot Add Contractor",message:y.error||"Contractor name already exists"})}break}case"edit-contractor":{const o=a.getAttribute("data-name");if(o){const u=await lt({title:"Edit Contractor Name",message:`Enter new name for contractor "${o}". All assigned workers in the library will automatically be updated.`,initialValue:o,placeholder:"Contractor Name",confirmText:"Save Name",cancelText:"Cancel"});if(u&&u!==o){const y=await v.editContractor(o,u);y.success?k({title:"Contractor Updated",message:`Renamed "${o}" to "${u}" and updated assigned workers`,type:"success"}):await A({title:"Cannot Rename Contractor",message:y.error||"Name already exists"})}}break}case"delete-contractor":{const o=a.getAttribute("data-name");if(o){const u=v.getState().roster.filter(S=>S.contractor===o).length;if(u>0){await A({title:"Contractor In Use",message:`Cannot delete "${o}" because ${u} worker(s) in the library are currently assigned to this contractor. Please reassign them first.`});return}await K({title:"Delete Contractor",message:`Permanently delete "${o}" from the contractor list?`,confirmText:"Delete",cancelText:"Cancel",danger:!0})&&(await v.deleteContractor(o),k({title:"Contractor Removed",message:`Removed "${o}" from master list`,type:"info"}))}break}case"add-department-submit":{const o=document.getElementById("newDepartmentInput");if(o&&o.value.trim()){const u=o.value.trim(),y=await v.addDepartment(u);y.success?(k({title:"Department Added",message:`Added "${u}" to department list`,type:"success"}),o.value=""):await A({title:"Cannot Add Department",message:y.error||"Department already exists"})}break}case"edit-department":{const o=a.getAttribute("data-name");if(o){const u=await lt({title:"Edit Department Name",message:`Enter new name for department "${o}". All workers and daily allocations assigned to this department will be updated automatically.`,initialValue:o,placeholder:"Department Name",confirmText:"Save Name",cancelText:"Cancel"});if(u&&u!==o){const y=await v.editDepartment(o,u);y.success?k({title:"Department Updated",message:`Renamed "${o}" to "${u}" across roster and attendance`,type:"success"}):await A({title:"Cannot Rename Department",message:y.error||"Name already exists"})}}break}case"delete-department":{const o=a.getAttribute("data-name");if(o){const u=v.getState().roster.filter(S=>S.department===o).length;if(u>0){await A({title:"Department In Use",message:`Cannot delete "${o}" because ${u} worker(s) are currently assigned to this department. Please reassign them first.`});return}await K({title:"Delete Department",message:`Permanently delete "${o}" from departments?`,confirmText:"Delete",cancelText:"Cancel",danger:!0})&&(await v.deleteDepartment(o),k({title:"Department Removed",message:`Removed "${o}" from department list`,type:"info"}))}break}case"add-designation-submit":{const o=document.getElementById("newDesignationInput");if(o&&o.value.trim()){const u=o.value.trim(),y=await v.addDesignation(u);y.success?(k({title:"Designation Added",message:`Added "${u}" to designation list`,type:"success"}),o.value=""):await A({title:"Cannot Add Designation",message:y.error||"Designation already exists"})}break}case"edit-designation":{const o=a.getAttribute("data-name");if(o){const u=await lt({title:"Edit Staff Designation",message:`Enter new name for designation "${o}". All staff members with this designation will be updated automatically.`,initialValue:o,placeholder:"Designation Name",confirmText:"Save Name",cancelText:"Cancel"});if(u&&u!==o){const y=await v.editDesignation(o,u);y.success?k({title:"Designation Updated",message:`Renamed "${o}" to "${u}" across staff library`,type:"success"}):await A({title:"Cannot Rename Designation",message:y.error||"Name already exists"})}}break}case"delete-designation":{const o=a.getAttribute("data-name");if(o){const u=v.getState().roster.filter(S=>S.designation===o).length;if(u>0){await A({title:"Designation In Use",message:`Cannot delete "${o}" because ${u} staff member(s) currently hold this designation. Please reassign them first.`});return}await K({title:"Delete Designation",message:`Permanently delete designation "${o}"?`,confirmText:"Delete",cancelText:"Cancel",danger:!0})&&(await v.deleteDesignation(o),k({title:"Designation Removed",message:`Removed "${o}" from designation list`,type:"info"}))}break}case"bulk-import-submit":{const o=((M=document.getElementById("bulk_names"))==null?void 0:M.value)||"",u=((B=document.getElementById("bulk_category"))==null?void 0:B.value)||"labor",y=(H=document.getElementById("bulk_contractor"))==null?void 0:H.value,S=((U=document.getElementById("bulk_unit"))==null?void 0:U.value)||"UNIT I",L=(($=document.getElementById("bulk_dept"))==null?void 0:$.value)||"Welding";if(!o.trim()){await A({title:"Empty Input",message:"Please enter or paste at least one worker name (one per line)."});return}const J=await v.bulkImportNames(o,u,y,S,"Helper",L);v.closeModal(),k({title:"Import Successful",message:`Successfully imported ${J} workers into employee library!`,type:"success",duration:3500});break}case"export-roster-json":{const o=v.exportRosterJson(),u=`BSP_Roster_${T()}.json`,y=await X(u,o,"application/json");k({title:"Export Successful",message:y.message,type:"success",duration:3500});break}case"export-roster-csv":{const o=v.exportRosterCsv(),u=`BSP_Roster_${T()}.csv`,y=await X(u,o,"text/csv");k({title:"Export Successful",message:y.message,type:"success",duration:3500});break}case"import-roster-json-submit":{const o=((C=document.getElementById("import_data_text"))==null?void 0:C.value)||"";if(!o.trim()){await A({title:"Empty JSON Data",message:"Please paste JSON data into the text box to import."});return}const u=await v.importRosterJson(o);u.success?(v.closeModal(),k({title:"Import Successful",message:`Restored and merged ${u.count} workers into library!`,type:"success",duration:3500})):await A({title:"Import Failed",message:u.error||"Invalid JSON format"});break}case"import-roster-csv-submit":{const o=((_=document.getElementById("import_data_text"))==null?void 0:_.value)||"";if(!o.trim()){await A({title:"Empty CSV Data",message:"Please paste CSV data into the text box to import."});return}const u=await v.importRosterCsv(o);u.success?(v.closeModal(),k({title:"Import Successful",message:`Imported ${u.count} workers from CSV!`,type:"success",duration:3500})):await A({title:"Import Failed",message:u.error||"Invalid CSV format"});break}case"load-demo-data":{await K({title:"Load Plant Demo Data",message:"This will reset library and floor data with the realistic Chakan manufacturing plant demo dataset (4 contractors, 12 departments, 10 designations, 28 workers, and daily check-ins). Proceed?",confirmText:"Load Demo Data",cancelText:"Cancel",danger:!1})&&(await v.loadDemoData(),v.closeModal(),k({title:"Demo Data Loaded",message:"Populated 28 workers, 4 contractors, and today’s floor allocations",type:"success",duration:3500}));break}}})}v.subscribe(Ae);Te();v.init().catch(e=>{console.error("Initialization error:",e)});export{mt as E,gt as W,Ft as b};
