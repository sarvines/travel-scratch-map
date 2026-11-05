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
