// Browser-only storage adapter. No requests, accounts, or shared server data.
window.Cloud=(()=>{
 const key='travel-scratch-map:v1',copy=x=>JSON.parse(JSON.stringify(x));
 const empty=()=>({version:4,journals:{Alex:{version:3,m:[],v:[],notes:{}},Sam:{version:3,m:[],v:[],notes:{}}}});
 let journals=empty().journals,dirty=false;
 const snapshot=()=>({version:4,journals:copy(journals)});
 return {get journals(){return journals;},get person(){return 'Both';},get signedIn(){return false;},get dirty(){return dirty;},snapshot,
 replace(value){journals=copy(value);dirty=true;},
 aggregate(){return {version:3,m:[...new Set(Object.values(journals).flatMap(d=>d.m))],v:[...new Set(Object.values(journals).flatMap(d=>d.v))],notes:{}};},
 async read(){let raw;try{raw=localStorage.getItem(key);}catch(e){throw Error('Browser storage is unavailable. Allow site storage to use this map.');}if(raw){const data=JSON.parse(raw);if(data.version!==4||!data.journals?.Alex||!data.journals?.Sam)throw Error('This browser backup could not be loaded.');journals=copy(data.journals);}else journals=empty().journals;dirty=false;return snapshot();},
 async write(data){try{localStorage.setItem(key,JSON.stringify(data));}catch(e){throw Error('Could not save on this device. Storage may be full or blocked. Keep the page open and Export a backup.');}journals=copy(data.journals);dirty=false;},
 async logout(){} };
})();
// Display names for the two travelers, saved only in this browser. Storage keys stay Alex/Sam so maps and backups keep working.
window.TravelerNames=(()=>{
 const key='travel-scratch-map:names:v1',KEYS=['Alex','Sam'],MAX=24;
 const clean=v=>typeof v==='string'?v.replace(/\s+/g,' ').trim().slice(0,MAX):'';
 let names={};
 try{const raw=localStorage.getItem(key);const d=raw?JSON.parse(raw):{};for(const k of KEYS){const v=clean(d?.[k]);if(v)names[k]=v;}}catch(e){names={};}
 return {MAX,KEYS,
  label(k){return names[k]||k;},
  get(){return {...names};},
  validate(next){const a=clean(next?.Alex)||'Alex',b=clean(next?.Sam)||'Sam';if(a.toLocaleLowerCase()===b.toLocaleLowerCase())return 'Use two different names.';if([a,b].some(n=>n.toLocaleLowerCase()==='both'))return '“Both” is used for shared visits. Choose another name.';return '';},
  set(next){const err=this.validate(next);if(err)throw Error(err);const d={};for(const k of KEYS){const v=clean(next?.[k]);if(v&&v!==k)d[k]=v;}
   try{localStorage.setItem(key,JSON.stringify(d));}catch(e){throw Error('Could not save names on this device.');}names=d;return {...names};}
 };
})();
