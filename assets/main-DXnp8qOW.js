var e=function(exports){function t(e,t,n){if(typeof e==`function`?e===t:e.has(t))return arguments.length<3?t:n;throw TypeError(`Private element is not present on this object`)}function n(e,n,r){return e.set(t(e,n),r),r}function r(e){"@babel/helpers - typeof";return r=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},r(e)}function i(e,t){if(r(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||`default`);if(r(i)!=`object`)return i;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function a(e){var t=i(e,`string`);return r(t)==`symbol`?t:t+``}function o(e,t,n){return(t=a(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){if(t.has(e))throw TypeError(`Cannot initialize the same private elements twice on an object`)}function c(e,t,n){s(e,t),t.set(e,n)}function l(e,t){s(e,t),t.add(e)}function u(e,n){return e.get(t(e,n))}return exports.assertClassBrand=t,exports.classPrivateFieldGet2=u,exports.classPrivateFieldInitSpec=c,exports.classPrivateFieldSet2=n,exports.classPrivateMethodInitSpec=l,exports.defineProperty=o,exports}({}),t,n,r,i,a,o;(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const s=`modulepreload`,c=function(e){return`/front_7th_chapter2-1/`+e},l={},u=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},i=document.getElementsByTagName(`link`),a=document.querySelector(`meta[property=csp-nonce]`),o=a?.nonce||a?.getAttribute(`nonce`);r=e(t.map(e=>{if(e=c(e,n),e in l)return;l[e]=!0;let t=e.endsWith(`.css`),r=t?`[rel="stylesheet"]`:``,a=!!n;if(a)for(let n=i.length-1;n>=0;n--){let r=i[n];if(r.href===e&&(!t||r.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${e}"]${r}`))return;let u=document.createElement(`link`);if(u.rel=t?`stylesheet`:s,t||(u.as=`script`),u.crossOrigin=``,u.href=e,o&&u.setAttribute(`nonce`,o),document.head.appendChild(u),t)return new Promise((t,n)=>{u.addEventListener(`load`,t),u.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${e}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[]){if(e.status!==`rejected`)continue;i(e.reason)}return e().catch(i)})},d={},f=e=>{let t=d[e.type];if(t)for(let[n,r]of Object.entries(t)){let t=e.target.closest(n);if(t)try{r(e)}catch(e){console.error(`이벤트 핸들러 실행 오류 (${n}):`,e)}}},p=(()=>{let e=!1;return()=>{if(e){console.log(`⚠️ 전역 이벤트가 이미 등록되었습니다.`);return}console.log(`🔧 전역 이벤트 리스너 등록 중...`),Object.keys(d).forEach(e=>{document.body.addEventListener(e,f),console.log(`✅ ${e} 이벤트 리스너 등록됨`)}),e=!0,console.log(`✅ 전역 이벤트 리스너 등록 완료`)}})(),m=(e,t,n)=>{d[e]||(d[e]={}),d[e][t]=n,console.log(`📝 이벤트 등록: ${e} - ${t}`)},ee=(e=200)=>{let t=window.pageYOffset||document.documentElement.scrollTop,n=window.innerHeight,r=document.documentElement.scrollHeight;return t+n>=r-e},te=e=>{let t=!1;return(...n)=>{t||(t=!0,queueMicrotask(()=>{t=!1,e(...n)}))}},h={SET_PRODUCTS:`products/setProducts`,ADD_PRODUCTS:`products/addProducts`,SET_LOADING:`products/setLoading`,SET_ERROR:`products/setError`,SET_CATEGORIES:`products/setCategories`,SET_CURRENT_PRODUCT:`products/setCurrentProduct`,SET_RELATED_PRODUCTS:`products/setRelatedProducts`,RESET_FILTERS:`products/resetFilters`,SETUP:`products/setup`,SET_STATUS:`products/setStatus`},g={ADD_ITEM:`cart/addItem`,REMOVE_ITEM:`cart/removeItem`,UPDATE_QUANTITY:`cart/updateQuantity`,CLEAR_CART:`cart/clearCart`,TOGGLE_SELECT:`cart/toggleSelect`,SELECT_ALL:`cart/selectAll`,DESELECT_ALL:`cart/deselectAll`,REMOVE_SELECTED:`cart/removeSelected`,LOAD_FROM_STORAGE:`cart/loadFromStorage`,SYNC_TO_STORAGE:`cart/syncToStorage`},_={OPEN_CART_MODAL:`ui/openCartModal`,CLOSE_CART_MODAL:`ui/closeCartModal`,SET_GLOBAL_LOADING:`ui/setGlobalLoading`,SHOW_TOAST:`ui/showToast`,HIDE_TOAST:`ui/hideToast`},v=()=>{let e=new Set,t=t=>e.add(t),n=()=>e.forEach(e=>e());return{subscribe:t,notify:n}},y=(e,t)=>{let{subscribe:n,notify:r}=v(),i=t,a=()=>i,o=t=>{let n=e(i,t);n!==i&&(i=n,r())};return{getState:a,dispatch:o,subscribe:n}},ne=(e,t=window.localStorage)=>{let n=()=>{try{let n=t.getItem(e);return n?JSON.parse(n):null}catch(t){return console.error(`Error parsing storage item for key "${e}":`,t),null}},r=n=>{try{t.setItem(e,JSON.stringify(n))}catch(t){console.error(`Error setting storage item for key "${e}":`,t)}},i=()=>{try{t.removeItem(e)}catch(t){console.error(`Error removing storage item for key "${e}":`,t)}};return{get:n,set:r,reset:i}};var re=(n=new WeakMap,r=new WeakMap,i=new WeakMap,a=new WeakMap,o=new WeakSet,t=class t{constructor(t=``){e.classPrivateMethodInitSpec(this,o),e.classPrivateFieldInitSpec(this,n,void 0),e.classPrivateFieldInitSpec(this,r,void 0),e.classPrivateFieldInitSpec(this,i,v()),e.classPrivateFieldInitSpec(this,a,void 0),e.classPrivateFieldSet2(n,this,new Map),e.classPrivateFieldSet2(r,this,null),e.classPrivateFieldSet2(a,this,t.replace(/\/$/,``)),window.addEventListener(`popstate`,()=>{e.classPrivateFieldSet2(r,this,e.assertClassBrand(o,this,b).call(this)),e.classPrivateFieldGet2(i,this).notify()})}get baseUrl(){return e.classPrivateFieldGet2(a,this)}get query(){return t.parseQuery(window.location.search)}set query(n){let r=t.getUrl(n,e.classPrivateFieldGet2(a,this));this.push(r)}get params(){var t;return(t=e.classPrivateFieldGet2(r,this))?.params??{}}get route(){return e.classPrivateFieldGet2(r,this)}get target(){var t;return(t=e.classPrivateFieldGet2(r,this))?.handler}subscribe(t){e.classPrivateFieldGet2(i,this).subscribe(t)}addRoute(t,r){let i=[],o=t.replace(/:\w+/g,e=>(i.push(e.slice(1)),`([^/]+)`)).replace(/\//g,`\\/`),s=RegExp(`^${e.classPrivateFieldGet2(a,this)}${o}$`);e.classPrivateFieldGet2(n,this).set(t,{regex:s,paramNames:i,handler:r})}push(t){try{let n=t.startsWith(e.classPrivateFieldGet2(a,this))?t:e.classPrivateFieldGet2(a,this)+(t.startsWith(`/`)?t:`/`+t),s=`${window.location.pathname}${window.location.search}`;s!==n&&window.history.pushState(null,``,n),e.classPrivateFieldSet2(r,this,e.assertClassBrand(o,this,b).call(this,n)),e.classPrivateFieldGet2(i,this).notify()}catch(e){console.error(`라우터 네비게이션 오류:`,e)}}start(){e.classPrivateFieldSet2(r,this,e.assertClassBrand(o,this,b).call(this)),e.classPrivateFieldGet2(i,this).notify()}},e.defineProperty(t,`parseQuery`,(e=window.location.search)=>{let t=new URLSearchParams(e),n={};for(let[e,r]of t)n[e]=r;return n}),e.defineProperty(t,`stringifyQuery`,e=>{let t=new URLSearchParams;for(let[n,r]of Object.entries(e))r!=null&&r!==``&&t.set(n,String(r));return t.toString()}),e.defineProperty(t,`getUrl`,(e,n=``)=>{let r=t.parseQuery(),i={...r,...e};Object.keys(i).forEach(e=>{(i[e]===null||i[e]===void 0||i[e]===``)&&delete i[e]});let a=t.stringifyQuery(i);return`${n}${window.location.pathname.replace(n,``)}${a?`?${a}`:``}`}),t);function b(t=window.location.pathname){let{pathname:r}=new URL(t,window.location.origin);for(let[t,i]of e.classPrivateFieldGet2(n,this)){let e=r.match(i.regex);if(e){let n={};return i.paramNames.forEach((t,r)=>{n[t]=e[r+1]}),{...i,params:n,path:t}}}return null}const x={products:[],totalCount:0,currentProduct:null,relatedProducts:[],loading:!0,error:null,status:`idle`,categories:{}},ie=(e,t)=>{switch(t.type){case h.SET_STATUS:return{...e,status:t.payload};case h.SET_CATEGORIES:return{...e,categories:t.payload,loading:!1,error:null,status:`done`};case h.SET_PRODUCTS:return{...e,products:t.payload.products,totalCount:t.payload.totalCount,loading:!1,error:null,status:`done`};case h.ADD_PRODUCTS:return{...e,products:[...e.products,...t.payload.products],totalCount:t.payload.totalCount,loading:!1,error:null,status:`done`};case h.SET_LOADING:return{...e,loading:t.payload};case h.SET_ERROR:return{...e,error:t.payload,loading:!1,status:`done`};case h.SET_CURRENT_PRODUCT:return{...e,currentProduct:t.payload,loading:!1,error:null,status:`done`};case h.SET_RELATED_PRODUCTS:return{...e,relatedProducts:t.payload,status:`done`};case h.SETUP:return{...e,...t.payload};default:return e}},S=y(ie,x),C=ne(`shopping_cart`),w={items:[],selectedAll:!1},ae=(e,t)=>e.find(e=>e.id===t),oe=(e,t)=>{let n=C.get()??w;switch(t.type){case g.ADD_ITEM:{let{product:e,quantity:r=1}=t.payload,i=ae(n.items,e.productId);if(i)return{...n,items:n.items.map(t=>t.id===e.productId?{...t,quantity:t.quantity+r}:t)};{let t={id:e.productId,title:e.title,image:e.image,price:parseInt(e.lprice),quantity:r,selected:!1};return{...n,items:[...n.items,t]}}}case g.REMOVE_ITEM:return{...n,items:n.items.filter(e=>e.id!==t.payload)};case g.UPDATE_QUANTITY:{let{productId:e,quantity:r}=t.payload;return{...n,items:n.items.map(t=>t.id===e?{...t,quantity:Math.max(1,r)}:t)}}case g.CLEAR_CART:return{...n,items:[],selectedAll:!1};case g.TOGGLE_SELECT:{let e=t.payload,r=n.items.map(t=>t.id===e?{...t,selected:!t.selected}:t),i=r.length>0&&r.every(e=>e.selected);return{...n,items:r,selectedAll:i}}case g.SELECT_ALL:{let e=n.items.map(e=>({...e,selected:!0}));return{...n,items:e,selectedAll:!0}}case g.DESELECT_ALL:{let e=n.items.map(e=>({...e,selected:!1}));return{...n,items:e,selectedAll:!1}}case g.REMOVE_SELECTED:return{...n,items:n.items.filter(e=>!e.selected),selectedAll:!1};case g.LOAD_FROM_STORAGE:return{...n,...t.payload};default:return n}},T=y(oe,w),se={cartModal:{isOpen:!1},globalLoading:!1,toast:{isVisible:!1,message:``,type:`info`}},ce=(e,t)=>{switch(t.type){case _.OPEN_CART_MODAL:return{...e,cartModal:{isOpen:!0}};case _.CLOSE_CART_MODAL:return{...e,cartModal:{isOpen:!1}};case _.HIDE_TOAST:return{...e,toast:{...e.toast,isVisible:!1}};case _.SHOW_TOAST:return{...e,toast:{isVisible:!0,message:t.payload.message,type:t.payload.type||`info`}};default:return e}},E=y(ce,se),D=`/front_7th_chapter2-1/`,O=new re(D),k=new WeakMap,A={current:null,previous:null},le={mount:null,unmount:null,watches:[],deps:[],mounted:!1},j=e=>(k.has(e)||k.set(e,{...le}),k.get(e)),ue=(e,t)=>!Array.isArray(e)||!Array.isArray(t)?!1:e.length===t.length?e.some((e,n)=>e!==t[n]):!0,de=e=>{var t;let n=j(e);n.mounted||(console.log(`🚀 페이지 마운트:`,e.name),(t=n.mount)?.call(n),n.mounted=!0,n.deps=[])},fe=e=>{var t;let n=j(e);n.mounted&&(console.log(`🔻 페이지 언마운트:`,e.name),(t=n.unmount)?.call(n),n.mounted=!1)},M=({onMount:e,onUnmount:t,watches:n}={},r)=>{let i=j(r);return typeof e==`function`&&(i.mount=e),typeof t==`function`&&(i.unmount=t),Array.isArray(n)&&(i.watches=typeof n[0]==`function`?[n]:n),(...e)=>{let t=A.current!==r;return A.current&&t&&fe(A.current),A.previous=A.current,A.current=r,t?de(r):i.watches&&i.watches.forEach(([e,t],n)=>{let a=e();ue(a,i.deps[n])&&(console.log(`📊 의존성 변경 감지 (${r.name}):`,i.deps[n],`→`,a),t()),i.deps[n]=Array.isArray(a)?[...a]:[]}),r(...e)}};function pe(e){let{productId:t,title:n,image:r,lprice:i,brand:a}=e,o=Number(i);return`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card" 
         data-product-id="${t}">
      <!-- 상품 이미지 -->
      <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
        <img src="${r}" 
             alt="${n}" 
             class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
             loading="lazy">
      </div>
      
      <!-- 상품 정보 -->
      <div class="p-3">
        <div class="cursor-pointer product-info mb-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            ${n}
          </h3>
          <p class="text-xs text-gray-500 mb-2">${a}</p>
          <p class="text-lg font-bold text-gray-900">
            ${o.toLocaleString()}원
          </p>
        </div>
        
        <!-- 장바구니 버튼 -->
        <button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md 
                       hover:bg-blue-700 transition-colors add-to-cart-btn"
                data-product-id="${t}">
          장바구니 담기
        </button>
      </div>
    </div>
  `}function me(){return`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      <div class="aspect-square bg-gray-200"></div>
      <div class="p-3">
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div class="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  `}const he=[10,20,50,100];function ge({searchQuery:e=``,limit:t=20,sort:n=`price_asc`,category:r={},categories:i={}}){let a=Object.keys(i).length>0?Object.keys(i):[],o=he.map(e=>`
        <option value="${e}" ${Number(t)===e?`selected`:``}>
          ${e}개
        </option>
      `).join(``),s=a.map(e=>`
        <button 
          data-category1="${e}"
          class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          ${e}
        </button>
      `).join(``);return`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <!-- 검색창 -->
      <div class="mb-4">
        <div class="relative">
          <input type="text" 
                 id="search-input"
                 placeholder="상품명을 검색해보세요..." 
                 value="${e}"
                 class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- 필터 옵션 -->
      <div class="space-y-3">
        <!-- 카테고리 필터 -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">카테고리:</label>
            ${[`전체`,r.category1,r.category2].filter((e,t)=>t===0||!!e).map((e,t)=>{if(e===`전체`)return`<button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>`;if(t===1)return`<button data-breadcrumb="category1" data-category1="${e}" class="text-xs hover:text-blue-800 hover:underline">${e}</button>`;if(t===2)return`<span class="text-xs text-gray-600 cursor-default">${e}</span>`}).join(`<span class="text-xs text-gray-500">></span>`)}
          </div>
          
          <!-- 1depth 카테고리 -->
          ${r.category1?``:`
            <div class="flex flex-wrap gap-2">
              ${a.length>0?s:`<div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>`}
            </div>
          `}
          
          <!-- 2depth 카테고리 -->
          ${r.category1&&i[r.category1]?`
            <div class="space-y-2">
              <div class="flex flex-wrap gap-2">
                ${Object.keys(i[r.category1]).map(e=>{let t=r.category2===e;return`
                      <button 
                        data-category1="${r.category1}"
                        data-category2="${e}"
                        class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
                               ${t?`bg-blue-100 border-blue-300 text-blue-800`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`}"
                      >
                        ${e}
                      </button>
                    `}).join(``)}
              </div>
            </div>
          `:``}
        </div>
        
        <!-- 기존 필터들 -->
        <div class="flex gap-2 items-center justify-between">
          <!-- 페이지당 상품 수 -->
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">개수:</label>
            <select id="limit-select" class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
               ${o}
            </select>
          </div>
          
          <!-- 정렬 -->
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">정렬:</label>
            <select id="sort-select" 
                    class="text-sm border border-gray-300 rounded px-2 py-1 
                           focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <option value="price_asc" ${n===`price_asc`?`selected`:``}>가격 낮은순</option>
              <option value="price_desc" ${n===`price_desc`?`selected`:``}>가격 높은순</option>
              <option value="name_asc" ${n===`name_asc`?`selected`:``}>이름순</option>
              <option value="name_desc" ${n===`name_desc`?`selected`:``}>이름 역순</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `}const N=[,,,,,,].fill(0).map(me).join(``);function P({products:e=[],loading:t=!1,error:n=null,totalCount:r=0,hasMore:i=!0}){return n?`
      <div class="text-center py-12">
        <div class="text-red-500 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">오류가 발생했습니다</h3>
        <p class="text-gray-600 mb-4">${n}</p>
        <button id="retry-btn" 
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          다시 시도
        </button>
      </div>
    `:!t&&e.length===0?`
      <div class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">상품을 찾을 수 없습니다</h3>
        <p class="text-gray-600">다른 검색어를 시도해보세요.</p>
      </div>
    `:`
    <div>
      <!-- 상품 개수 정보 -->
      ${r>0?`
        <div class="mb-4 text-sm text-gray-600">
          총 <span class="font-medium text-gray-900">${r.toLocaleString()}개</span>의 상품
        </div>
      `:``}
      
      <!-- 상품 그리드 -->
      <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
        ${e.map(e=>pe(e)).join(``)}
        
        <!-- 로딩 스켈레톤 -->
        ${t?N:``}
      </div>
      
      <!-- 무한 스크롤 로딩 -->
      ${t&&e.length>0?`
        <div class="text-center py-4">
          <div class="inline-flex items-center">
            <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
          </div>
        </div>
      `:``}
      
      <!-- 더 이상 로드할 상품이 없음 -->
      ${!i&&e.length>0&&!t?`
        <div class="text-center py-4 text-sm text-gray-500">
          모든 상품을 확인했습니다
        </div>
      `:``}
      
      <!-- 무한 스크롤 트리거 -->
      <div id="scroll-trigger" class="h-4"></div>
    </div>
  `}function F({id:e,title:t,image:n,price:r,quantity:i,selected:a}){let o=r*i;return`
    <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="${e}">
      <!-- 선택 체크박스 -->
      <label class="flex items-center mr-3">
        <input type="checkbox" 
               ${a?`checked`:``}
               class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded 
                      focus:ring-blue-500"
               data-product-id="${e}">
      </label>
      
      <!-- 상품 이미지 -->
      <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
        <img src="${n}" 
             alt="${t}" 
             class="w-full h-full object-cover cursor-pointer cart-item-image"
             data-product-id="${e}">
      </div>
      
      <!-- 상품 정보 -->
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title"
            data-product-id="${e}">
          ${t}
        </h4>
        <p class="text-sm text-gray-600 mt-1">
          ${r.toLocaleString()}원
        </p>
        
        <!-- 수량 조절 -->
        <div class="flex items-center mt-2">
          <button class="quantity-decrease-btn w-7 h-7 flex items-center justify-center 
                         border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                  data-product-id="${e}">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
            </svg>
          </button>
          
          <input type="number" 
                 value="${i}" 
                 min="1"
                 class="quantity-input w-12 h-7 text-center text-sm border-t border-b 
                        border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                 disabled
                 data-product-id="${e}">
          
          <button class="quantity-increase-btn w-7 h-7 flex items-center justify-center 
                         border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                  data-product-id="${e}">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 가격 및 삭제 -->
      <div class="text-right ml-3">
        <p class="text-sm font-medium text-gray-900">
          ${o.toLocaleString()}원
        </p>
        <button class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800"
                data-product-id="${e}">
          삭제
        </button>
      </div>
    </div>
  `}function I({items:e=[],selectedAll:t=!1,isOpen:n=!1}){if(!n)return``;let r=e.filter(e=>e.selected),i=r.length,a=e.reduce((e,t)=>e+t.price*t.quantity,0),o=r.reduce((e,t)=>e+t.price*t.quantity,0);return`
    <div class="fixed inset-0 z-50 overflow-y-auto cart-modal">
      <!-- 배경 오버레이 -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay"></div>
      
      <!-- 모달 컨테이너 -->
      <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
        <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
          <!-- 헤더 -->
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"/>
              </svg>
              장바구니 
              ${e.length>0?`<span class="text-sm font-normal text-gray-600 ml-1">(${e.length})</span>`:``}
            </h2>
            
            <button id="cart-modal-close-btn" 
                    class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <!-- 컨텐츠 -->
          <div class="flex flex-col max-h-[calc(90vh-120px)]">
            ${e.length===0?`
                <!-- 빈 장바구니 -->
                <div class="flex-1 flex items-center justify-center p-8">
                  <div class="text-center">
                    <div class="text-gray-400 mb-4">
                      <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"/>
                      </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
                    <p class="text-gray-600">원하는 상품을 담아보세요!</p>
                  </div>
                </div>
              `:`
                <!-- 전체 선택 섹션 -->
                <div class="p-4 border-b border-gray-200 bg-gray-50">
                  <label class="flex items-center text-sm text-gray-700">
                    <input type="checkbox" 
                           id="cart-modal-select-all-checkbox"
                           ${t?`checked`:``}
                           class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2">
                    전체선택 (${e.length}개)
                  </label>
                </div>
                
                <!-- 아이템 목록 -->
                <div class="flex-1 overflow-y-auto">
                  <div class="p-4 space-y-4">
                    ${e.map(e=>F(e)).join(``)}
                  </div>
                </div>
              `}
          </div>
          
          ${e.length>0?`
              <!-- 하단 액션 -->
              <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                <!-- 선택된 아이템 정보 -->
                ${i>0?`
                  <div class="flex justify-between items-center mb-3 text-sm">
                    <span class="text-gray-600">선택한 상품 (${i}개)</span>
                    <span class="font-medium">${o.toLocaleString()}원</span>
                  </div>
                `:``}
                
                <!-- 총 금액 -->
                <div class="flex justify-between items-center mb-4">
                  <span class="text-lg font-bold text-gray-900">총 금액</span>
                  <span class="text-xl font-bold text-blue-600">${a.toLocaleString()}원</span>
                </div>
                
                <!-- 액션 버튼들 -->
                <div class="space-y-2">
                  ${i>0?`
                    <button id="cart-modal-remove-selected-btn" 
                            class="w-full bg-red-600 text-white py-2 px-4 rounded-md 
                                   hover:bg-red-700 transition-colors text-sm">
                      선택한 상품 삭제 (${i}개)
                    </button>
                  `:``}
                  
                  <div class="flex gap-2">
                    <button id="cart-modal-clear-cart-btn" 
                            class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md 
                                   hover:bg-gray-700 transition-colors text-sm">
                      전체 비우기
                    </button>
                    <button id="cart-modal-checkout-btn" 
                            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md 
                                   hover:bg-blue-700 transition-colors text-sm">
                      구매하기
                    </button>
                  </div>
                </div>
              </div>
            `:``}
        </div>
      </div>
    </div>
  `}function L({isVisible:e=!1,message:t=``,type:n=`info`}){if(!e)return``;let r=()=>{switch(n){case`success`:return{bg:`bg-green-600`,icon:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                 </svg>`};case`error`:return{bg:`bg-red-600`,icon:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                 </svg>`};case`warning`:return{bg:`bg-yellow-600`,icon:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                 </svg>`};default:return{bg:`bg-blue-600`,icon:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                 </svg>`}}},{bg:i,icon:a}=r();return`
    <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 toast-container">
      <div class="${i} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <div class="flex-shrink-0">
          ${a}
        </div>
        <p class="text-sm font-medium">${t}</p>
        <button id="toast-close-btn" 
                class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  `}function _e(){return`
    <h1 class="text-xl font-bold text-gray-900">
      <a href="/" data-link>쇼핑몰</a>
    </h1>
  `}function ve(){return`
    <footer class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-md mx-auto py-8 text-center text-gray-500">
        <p>&copy; ${new Date().getFullYear()} 항해플러스 프론트엔드 쇼핑몰</p>
      </div>
    </footer>
  `}async function R(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function ye(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function be(){let e=await fetch(`/api/categories`);return await e.json()}const xe=async()=>{O.query={current:void 0},S.dispatch({type:h.SETUP,payload:{...x,loading:!0,status:`pending`}});try{let[{products:e,pagination:{total:t}},n]=await Promise.all([R(O.query),be()]);S.dispatch({type:h.SETUP,payload:{products:e,categories:n,totalCount:t,loading:!1,status:`done`}})}catch(e){throw S.dispatch({type:h.SET_ERROR,payload:e.message}),e}},z=async(e=!0)=>{try{S.dispatch({type:h.SETUP,payload:{loading:!0,status:`pending`,error:null}});let{products:t,pagination:{total:n}}=await R(O.query),r={products:t,totalCount:n};if(e){S.dispatch({type:h.SET_PRODUCTS,payload:r});return}S.dispatch({type:h.ADD_PRODUCTS,payload:r})}catch(e){throw S.dispatch({type:h.SET_ERROR,payload:e.message}),e}},Se=async()=>{let e=S.getState(),t=e.products.length<e.totalCount;!t||e.loading||(O.query={current:Number(O.query.current??1)+1},await z(!1))},B=e=>{O.query={search:e,current:1}},V=e=>{O.query={...e,current:1}},Ce=e=>{O.query={sort:e,current:1}},we=e=>{O.query={limit:e,current:1}},H=async e=>{try{let t=S.getState().currentProduct;if(e===t?.productId){t.category2&&await U(t.category2,e);return}S.dispatch({type:h.SETUP,payload:{...x,currentProduct:null,loading:!0,status:`pending`}});let n=await ye(e);S.dispatch({type:h.SET_CURRENT_PRODUCT,payload:n}),n.category2&&await U(n.category2,e)}catch(e){throw console.error(`상품 상세 페이지 로드 실패:`,e),S.dispatch({type:h.SET_ERROR,payload:e.message}),e}},U=async(e,t)=>{try{let n={category2:e,limit:20,page:1},r=await R(n),i=r.products.filter(e=>e.productId!==t);S.dispatch({type:h.SET_RELATED_PRODUCTS,payload:i})}catch(e){console.error(`관련 상품 로드 실패:`,e),S.dispatch({type:h.SET_RELATED_PRODUCTS,payload:[]})}},Te=()=>{try{let e=C.get();e&&T.dispatch({type:g.LOAD_FROM_STORAGE,payload:e})}catch(e){console.error(`장바구니 로드 실패:`,e)}},W=()=>{try{let e=T.getState();C.set(e)}catch(e){console.error(`장바구니 저장 실패:`,e)}},G=(e,t=1)=>{T.dispatch({type:g.ADD_ITEM,payload:{product:e,quantity:t}}),W(),E.dispatch({type:_.SHOW_TOAST,payload:{message:`장바구니에 추가되었습니다`,type:`success`}}),setTimeout(()=>{E.dispatch({type:_.HIDE_TOAST})},3e3)},Ee=e=>{T.dispatch({type:g.REMOVE_ITEM,payload:e}),W()},K=(e,t)=>{T.dispatch({type:g.UPDATE_QUANTITY,payload:{productId:e,quantity:t}}),W()},De=e=>{T.dispatch({type:g.TOGGLE_SELECT,payload:e}),W()},q=()=>{T.dispatch({type:g.SELECT_ALL}),W()},J=()=>{T.dispatch({type:g.DESELECT_ALL}),W()},Y=()=>{T.dispatch({type:g.REMOVE_SELECTED}),W(),E.dispatch({type:_.SHOW_TOAST,payload:{message:`선택된 상품들이 삭제되었습니다`,type:`info`}}),setTimeout(()=>{E.dispatch({type:_.HIDE_TOAST})},3e3)},X=()=>{T.dispatch({type:g.CLEAR_CART}),W(),E.dispatch({type:_.SHOW_TOAST,payload:{message:`장바구니가 비워졌습니다`,type:`info`}}),setTimeout(()=>{E.dispatch({type:_.HIDE_TOAST})},3e3)},Z=({headerLeft:e,children:t})=>{let n=T.getState(),{cartModal:r,toast:i}=E.getState(),a=n.items.length,o=`
    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      ${a>99?`99+`:a}
    </span>
  `;return`
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            ${e}
            <div class="flex items-center space-x-2">
              <!-- 장바구니 아이콘 -->
              <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"/>
                </svg>
                ${a>0?o:``}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main class="max-w-md mx-auto px-4 py-4">
        ${t}
      </main>
      
      ${I({...n,isOpen:r.isOpen})}
      
      ${L(i)}
      
      ${ve()}
    </div>
  `},Oe=M({onMount:()=>{xe()},watches:[()=>{let{search:e,limit:t,sort:n,category1:r,category2:i}=O.query;return[e,t,n,r,i]},()=>z(!0)]},()=>{console.log(`🏠 홈 페이지 로드`);let e=S.getState(),{search:t,limit:n,sort:r,category1:i,category2:a}=O.query,{products:o,loading:s,error:c,totalCount:l,categories:u}=e,d={category1:i,category2:a},f=o.length<l;return Z({headerLeft:`<h1 class="text-xl font-bold text-gray-900">
          <a href="/" data-link>쇼핑몰</a>
        </h1>`,children:`
        <!-- 검색 및 필터 -->
        ${ge({searchQuery:t,limit:n,sort:r,category:d,categories:u})}
        
        <!-- 상품 목록 -->
        <div class="mb-6">
          ${P({products:o,loading:s,error:c,totalCount:l,hasMore:f})}
        </div>
      `.trim()})}),ke=`
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">상품 정보를 불러오는 중...</p>
    </div>
  </div>
`,Ae=({error:e})=>`
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="text-red-500 mb-4">
        <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
        </svg>
      </div>
      <h1 class="text-xl font-bold text-gray-900 mb-2">상품을 찾을 수 없습니다</h1>
      <p class="text-gray-600 mb-4">${e||`요청하신 상품이 존재하지 않습니다.`}</p>
      <button onclick="window.history.back()" 
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mr-2">
        이전 페이지
      </button>
      <a href="/" data-link class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
        홈으로
      </a>
    </div>
  </div>
`;function je({product:e,relatedProducts:t=[]}){let{productId:n,title:r,image:i,lprice:a,brand:o,description:s=``,rating:c=0,reviewCount:l=0,stock:u=100,category1:d,category2:f}=e,p=Number(a),m=[];return d&&m.push({name:d,category:`category1`,value:d}),f&&m.push({name:f,category:`category2`,value:f}),`
    <!-- 브레드크럼 -->
    ${m.length>0?`
      <nav class="mb-4">
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" data-link class="hover:text-blue-600 transition-colors">홈</a>
          ${m.map(e=>`
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
            <button class="breadcrumb-link" data-${e.category}="${e.value}">
              ${e.name}
            </button>
          `).join(``)}
        </div>
      </nav>
    `:``}

    <!-- 상품 상세 정보 -->
    <div class="bg-white rounded-lg shadow-sm mb-6">
      <!-- 상품 이미지 -->
      <div class="p-4">
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img src="${i}" 
               alt="${r}" 
               class="w-full h-full object-cover product-detail-image">
        </div>
        
        <!-- 상품 정보 -->
        <div>
          <p class="text-sm text-gray-600 mb-1">${o}</p>
          <h1 class="text-xl font-bold text-gray-900 mb-3">${r}</h1>
          
          <!-- 평점 및 리뷰 -->
          ${c>0?`
            <div class="flex items-center mb-3">
              <div class="flex items-center">
                ${[,,,,,].fill(0).map((e,t)=>`
                  <svg class="w-4 h-4 ${t<c?`text-yellow-400`:`text-gray-300`}" 
                       fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                `).join(``)}
              </div>
              <span class="ml-2 text-sm text-gray-600">${c}.0 (${l.toLocaleString()}개 리뷰)</span>
            </div>
          `:``}
          
          <!-- 가격 -->
          <div class="mb-4">
            <span class="text-2xl font-bold text-blue-600">${p.toLocaleString()}원</span>
          </div>
          
          <!-- 재고 -->
          <div class="text-sm text-gray-600 mb-4">
            재고 ${u.toLocaleString()}개
          </div>
          
          <!-- 설명 -->
          ${s?`
            <div class="text-sm text-gray-700 leading-relaxed mb-6">
              ${s}
            </div>
          `:``}
        </div>
      </div>
      
      <!-- 수량 선택 및 액션 -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-medium text-gray-900">수량</span>
          <div class="flex items-center">
            <button id="quantity-decrease" 
                    class="w-8 h-8 flex items-center justify-center border border-gray-300 
                           rounded-l-md bg-gray-50 hover:bg-gray-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
              </svg>
            </button>
            
            <input type="number" 
                   id="quantity-input"
                   value="1" 
                   min="1" 
                   max="${u}"
                   class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 
                          focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            
            <button id="quantity-increase" 
                    class="w-8 h-8 flex items-center justify-center border border-gray-300 
                           rounded-r-md bg-gray-50 hover:bg-gray-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 액션 버튼 -->
        <button id="add-to-cart-btn" 
                data-product-id="${n}"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-md 
                       hover:bg-blue-700 transition-colors font-medium">
          장바구니 담기
        </button>
      </div>
    </div>

    <!-- 상품 목록으로 이동 -->
    <div class="mb-6">
      <button class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
                hover:bg-gray-200 transition-colors go-to-product-list">
        상품 목록으로 돌아가기
      </button>
    </div>

    <!-- 관련 상품 -->
    ${t.length>0?`
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
          <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3 responsive-grid">
            ${t.slice(0,20).map(e=>`
              <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer"
                   data-product-id="${e.productId}">
                <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                  <img src="${e.image}" 
                       alt="${e.title}" 
                       class="w-full h-full object-cover"
                       loading="lazy">
                </div>
                <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${e.title}</h3>
                <p class="text-sm font-bold text-blue-600">${Number(e.lprice).toLocaleString()}원</p>
              </div>
            `).join(``)}
          </div>
        </div>
      </div>
    `:``}
  `}const Me=M({onMount:()=>{H(O.params.id)},watches:[()=>[O.params.id],()=>H(O.params.id)]},()=>{let{currentProduct:e,relatedProducts:t=[],error:n,loading:r}=S.getState();return Z({headerLeft:`<div class="flex items-center space-x-3">
          <button onclick="window.history.back()" 
                  class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
        </div>`,children:r?ke:n&&!e?Ae({error:n}):je({product:e,relatedProducts:t})})}),Ne=()=>Z({headerLeft:_e(),children:`<div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
        <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
            </linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1"/>
            </filter>
          </defs>
          
          <!-- 404 Numbers -->
          <text x="160" y="85" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="48" font-weight="600" fill="url(#blueGradient)" text-anchor="middle">404</text>
          
          <!-- Icon decoration -->
          <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
          <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8"/>
          <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
          <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5"/>
          
          <!-- Message -->
          <text x="160" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="14" font-weight="400" fill="#5f6368" text-anchor="middle">페이지를 찾을 수 없습니다</text>
          
          <!-- Subtle bottom accent -->
          <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3"/>
        </svg>
        
        <a href="/" data-link class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">홈으로</a>
      </div>`});O.addRoute(`/`,Oe),O.addRoute(`/product/:id`,Me),O.addRoute(`.*`,Ne);const Q=te(()=>{let e=document.getElementById(`root`);if(!e)return;let t=O.target;e.innerHTML=t()});function Pe(){S.subscribe(Q),T.subscribe(Q),E.subscribe(Q),O.subscribe(Q)}function $(){m(`keydown`,`#search-input`,async e=>{if(e.key===`Enter`){let t=e.target.value.trim();try{await B(t)}catch(e){console.error(`검색 실패:`,e)}}}),m(`change`,`#limit-select`,async e=>{let t=parseInt(e.target.value);try{await we(t)}catch(e){console.error(`상품 수 변경 실패:`,e)}}),m(`change`,`#sort-select`,async e=>{let t=e.target.value;try{await Ce(t)}catch(e){console.error(`정렬 변경 실패:`,e)}}),m(`click`,`#clear-search`,async()=>{let e=document.getElementById(`search-input`);e&&(e.value=``);try{await B(``)}catch(e){console.error(`검색 초기화 실패:`,e)}}),m(`click`,`[data-breadcrumb]`,async e=>{let t=e.target.getAttribute(`data-breadcrumb`);try{if(t===`reset`)await V({category1:``,category2:``});else if(t===`category1`){let t=e.target.getAttribute(`data-category1`);await V({category1:t,category2:``})}}catch(e){console.error(`브레드크럼 네비게이션 실패:`,e)}}),m(`click`,`.category1-filter-btn`,async e=>{let t=e.target.getAttribute(`data-category1`);if(t)try{await V({category1:t,category2:``})}catch(e){console.error(`1depth 카테고리 선택 실패:`,e)}}),m(`click`,`.category2-filter-btn`,async e=>{let t=e.target.getAttribute(`data-category1`),n=e.target.getAttribute(`data-category2`);if(!(!t||!n))try{await V({category1:t,category2:n})}catch(e){console.error(`2depth 카테고리 선택 실패:`,e)}}),m(`click`,`#retry-btn`,async()=>{try{await z(!0)}catch(e){console.error(`재시도 실패:`,e)}})}function Fe(){m(`click`,`.product-image, .product-info`,async e=>{let t=e.target.closest(`.product-card`);if(!t)return;let n=t.getAttribute(`data-product-id`);n&&O.push(`/product/${n}`)}),m(`click`,`.related-product-card`,async e=>{let t=e.target.closest(`[data-product-id]`).dataset.productId;t&&O.push(`/product/${t}`)}),m(`click`,`.breadcrumb-link`,async e=>{e.preventDefault();try{let t={},n=[...e.target.parentNode.querySelectorAll(`.breadcrumb-link`)].slice(0,2);for(let[r,i]of Object.entries(n)){let n=`category${parseInt(r)+1}`;if(t[n]=i.dataset[n],i===e.target)break}let r=new URLSearchParams(t).toString();O.push(`/?${r}`)}catch(e){console.error(`브레드크럼 카테고리 필터 실패:`,e)}}),m(`click`,`.go-to-product-list`,async()=>{let e=S.getState().currentProduct,t={category1:e?.category1,category2:e?.category2,currentPage:1},n=new URLSearchParams(t).toString();O.push(`/?${n}`)}),m(`click`,`#quantity-increase`,()=>{let e=document.getElementById(`quantity-input`);if(e){let t=parseInt(e.getAttribute(`max`))||100;e.value=Math.min(t,parseInt(e.value)+1)}}),m(`click`,`#quantity-decrease`,()=>{let e=document.getElementById(`quantity-input`);e&&(e.value=Math.max(1,parseInt(e.value)-1))}),m(`click`,`#add-to-cart-btn`,e=>{let t=e.target.getAttribute(`data-product-id`),n=document.getElementById(`quantity-input`),r=n?parseInt(n.value):1;if(!t)return;let i=S.getState(),a=i.currentProduct;a&&(console.log(`🛒 상품 상세 페이지에서 장바구니 추가:`,a),G(a,r))})}function Ie(){m(`click`,`.add-to-cart-btn`,async e=>{console.log(`🛒 장바구니 추가 버튼 클릭됨`,e.target);let t=e.target.getAttribute(`data-product-id`);if(console.log(`🛒 상품 ID:`,t),!t)return;let n=S.getState(),r=n.products.find(e=>e.productId===t);console.log(`🛒 찾은 상품:`,r),r&&(G(r,1),console.log(`🛒 장바구니 추가 완료`))}),m(`click`,`.quantity-increase-btn`,e=>{let t=e.target.closest(`[data-product-id]`),n=t.getAttribute(`data-product-id`),r=t.previousElementSibling;if(n&&r){let e=parseInt(r.value)+1;r.value=e,K(n,e)}}),m(`click`,`.quantity-decrease-btn`,e=>{let t=e.target.closest(`[data-product-id]`),n=t.getAttribute(`data-product-id`),r=t.nextElementSibling;if(n&&r){let e=Math.max(1,parseInt(r.value)-1);r.value=e,K(n,e)}}),m(`change`,`.quantity-input`,e=>{let t=e.target.closest(`[data-product-id]`),n=Math.max(1,parseInt(e.target.value)||1);t&&K(t,n)}),m(`change`,`.cart-item-checkbox`,e=>{let t=e.target.getAttribute(`data-product-id`);t&&De(t)}),m(`change`,`#select-all-checkbox`,e=>{e.target.checked?q():J()}),m(`click`,`.cart-item-remove-btn`,e=>{let t=e.target.getAttribute(`data-product-id`);t&&Ee(t)}),m(`click`,`#remove-selected-btn`,Y),m(`click`,`#clear-cart-btn`,X)}function Le(){m(`click`,`#cart-icon-btn`,()=>{E.dispatch({type:_.OPEN_CART_MODAL})}),m(`click`,`#cart-modal-close-btn, .cart-modal-overlay`,()=>{E.dispatch({type:_.CLOSE_CART_MODAL})}),document.addEventListener(`keydown`,e=>{if(e.key===`Escape`){let e=E.getState().cartModal;e.isOpen&&E.dispatch({type:_.CLOSE_CART_MODAL})}}),m(`change`,`#cart-modal-select-all-checkbox`,e=>{e.target.checked?q():J()}),m(`click`,`#cart-modal-remove-selected-btn`,()=>{Y()}),m(`click`,`#cart-modal-clear-cart-btn`,X),m(`click`,`#cart-modal-checkout-btn`,()=>{E.dispatch({type:_.SHOW_TOAST,payload:{message:`구매 기능은 추후 구현 예정입니다.`,type:`info`}})})}function Re(){window.addEventListener(`scroll`,async()=>{if(O.route.path===`/`&&ee(200)){let e=S.getState(),t=e.products.length<e.totalCount;if(e.loading||!t)return;try{await Se()}catch(e){console.error(`무한 스크롤 로드 실패:`,e)}}})}function ze(){m(`click`,`#toast-close-btn`,()=>{E.dispatch({type:_.HIDE_TOAST})})}function Be(){m(`click`,`[data-link]`,e=>{e.preventDefault();let t=e.target.getAttribute(`href`);t&&O.push(t)})}function Ve(){$(),Fe(),Ie(),Le(),Re(),ze(),Be()}const He=()=>u(async()=>{let{worker:e}=await import(`./browser-DEnVp-jf.js`);return{worker:e}},[]).then(({worker:e})=>e.start({serviceWorker:{url:`${D}mockServiceWorker.js`},onUnhandledRequest:`bypass`}));function Ue(){console.log(`🚀 애플리케이션이 시작되었습니다.`),console.log(`✅ MSW 워커 시작 완료`),Ve(),console.log(`✅ 애플리케이션 이벤트 등록 완료`),p(),console.log(`✅ 전역 이벤트 시스템 등록 완료`),Te(),console.log(`✅ 장바구니 데이터 복원 완료`),Pe(),console.log(`✅ 렌더링 시스템 초기화 완료`),O.start(),console.log(`✅ 렌더링 설정 완료`),console.log(`🎉 애플리케이션 초기화 완료!`)}He().then(Ue);