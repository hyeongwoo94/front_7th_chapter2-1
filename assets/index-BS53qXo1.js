(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_7th_chapter2-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},s=document.getElementsByTagName(`link`),c=document.querySelector(`meta[property=csp-nonce]`),l=c?.nonce||c?.getAttribute(`nonce`);o=r(i.map(r=>{if(r=t(r,a),r in n)return;n[r]=!0;let i=r.endsWith(`.css`),o=i?`[rel="stylesheet"]`:``,c=!!a;if(c)for(let e=s.length-1;e>=0;e--){let t=s[e];if(t.href===r&&(!i||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${r}"]${o}`))return;let u=document.createElement(`link`);if(u.rel=i?`stylesheet`:e,i||(u.as=`script`),u.crossOrigin=``,u.href=r,l&&u.setAttribute(`nonce`,l),document.head.appendChild(u),i)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${r}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})};async function i(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}const a=()=>`
		<header class="bg-white shadow-sm sticky top-0 z-40">
		  <div class="max-w-md mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
			  <h1 class="text-xl font-bold text-gray-900">
				<a href="/" data-link="">쇼핑몰</a>
			  </h1>
			  <div class="flex items-center space-x-2">
				<!-- 장바구니 아이콘 -->
				<button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
				  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
				  </svg>
				</button>
			  </div>
			</div>
		  </div>
		</header>
	`,o=()=>`
		<footer class="bg-white shadow-sm sticky top-0 z-40">
		  <div class="max-w-md mx-auto py-8 text-center text-gray-500">
			<p>© ${new Date().getFullYear()} 항해플러스 프론트엔드 쇼핑몰</p>
		  </div>
		</footer>
	`,s=({top:e=``,main:t=``,bottom:n=``})=>`
    <div class="min-h-screen bg-gray-50">
        ${a()}
        <main class="max-w-md mx-auto px-4 py-4">
            ${e}
            ${t}
            ${n}
        </main>
        ${o()}
    </div>
  `,c=`
  <div class="flex flex-wrap gap-2">
    <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>
  </div>
`,l=()=>`
  <div class="flex flex-wrap gap-2">
    <button
      data-category1="생활/건강"
      class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
        bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
    >
      생활/건강
    </button>
    <button
      data-category1="디지털/가전"
      class="category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors
        bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
    >
      디지털/가전
    </button>
  </div>
`,u=(e,t)=>`
  <option value="${e}" ${t===e?`selected`:``}>${e}개</option>
`,d=(e,t,n)=>`
  <option value="${e}" ${t===e?`selected`:``}>${n}</option>
`,f=({loading:e=!1,limit:t=20,sort:n=`price_asc`}={})=>`
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div class="mb-4">
        <div class="relative">
          <input
            type="text"
            id="search-input"
            placeholder="상품명을 검색해보세요..."
            value=""
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600">카테고리:</label>
            <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
          </div>
          ${e?c:l()}
        </div>

        <div class="flex gap-2 items-center justify-between">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600" for="limit-select">개수:</label>
            <select
              id="limit-select"
              class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              ${[10,20,50,100].map(e=>u(e,t)).join(``)}
            </select>
          </div>

          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600" for="sort-select">정렬:</label>
            <select
              id="sort-select"
              class="text-sm border border-gray-300 rounded px-2 py-1
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              ${[[`price_asc`,`가격 낮은순`],[`price_desc`,`가격 높은순`],[`name_asc`,`이름순`],[`name_desc`,`이름 역순`]].map(([e,t])=>d(e,n,t)).join(``)}
            </select>
          </div>
        </div>
      </div>
    </div>
  `,p=`
	<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
		<div class="aspect-square bg-gray-200"></div>
		<div class="p-3">
			<div class="h-4 bg-gray-200 rounded mb-2"></div>
			<div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
			<div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
			<div class="h-8 bg-gray-200 rounded"></div>
		</div>
	</div>
`,m=({title:e,image:t,productId:n,lprice:r})=>`
	<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
		data-product-id="${n}">
		<div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
			<img src="${t}"
				alt="${e}"
				class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
				loading="lazy">
		</div>
		<div class="p-3">
			<div class="cursor-pointer product-info mb-3">
				<h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
					${e}
				</h3>
				<p class="text-xs text-gray-500 mb-2"></p>
				<p class="text-lg font-bold text-gray-900">
					${Number(r).toLocaleString()}원
				</p>
			</div>
			<button class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
				hover:bg-blue-700 transition-colors add-to-cart-btn" data-product-id="${n}">
				장바구니 담기
			</button>
		</div>
	</div>
	`,h=`
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
`,g=`
  <div class="py-4 text-sm text-gray-600 flex items-center justify-center gap-2">
    <svg class="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>상품을 불러오는 중입니다...</span>
  </div>
`,_=e=>`
  <section class="mb-6">
    <div class="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      ${e}
    </div>
    <div class="text-center">
      <button
        id="products-retry-button"
        class="inline-flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition"
        type="button"
      >
        다시 시도
      </button>
    </div>
  </section>
`,v=()=>`
  <div class="col-span-2 rounded-md border border-dashed border-gray-200 bg-white px-4 py-10 text-center text-sm text-gray-500">
    표시할 상품이 없습니다.
  </div>
`,y=({loading:e=!0,loadingMore:t=!1,products:n=[],error:r=null,hasMore:i=!1,loadMoreError:a=null,totalCount:o=0}={})=>{if(r)return _(r);if(e)return`
      <section class="mb-6">
        ${h}
        <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
          ${p.repeat(4)}
        </div>
      </section>
    `;let s=Array.isArray(n)&&n.length>0;return`
    <section class="mb-6">
      <div class="mb-4 text-sm text-gray-600">
        총 <span class="font-medium text-gray-900">${o||n.length}개</span>의 상품
      </div>
      <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
        ${s?n.map(m).join(``):v()}
      </div>
      ${a?`<div class="mb-4 flex flex-col items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-center">
              <span>${a}</span>
              <button
                id="products-load-more-retry-button"
                class="inline-flex items-center gap-2 rounded-md border border-red-300 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 transition"
                type="button"
              >
                다시 시도
              </button>
            </div>`:``}
      ${t?g:``}
      ${i?`<div id="products-load-more-trigger" class="h-2 w-full"></div>`:``}
    </section>
  `},b=({searchProps:e={},productProps:t={}}={})=>`
    ${s({top:f(e),main:y(t)})}
  `,x=`상품 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.`,S=`상품을 추가로 불러오지 못했습니다. 다시 시도해 주세요.`,C={products:[],isLoadingProducts:!0,isLoadingMore:!1,productsError:null,loadMoreError:null,limit:20,currentPage:0,hasMoreProducts:!0,sort:`price_asc`,totalProducts:0};let w=null;const T=async()=>{let{worker:e}=await r(async()=>{let{worker:e}=await import(`./browser-CcyfQrG1.js`);return{worker:e}},[]);return e.start({onUnhandledRequest:`bypass`,serviceWorker:{url:`/front_7th_chapter2-1/mockServiceWorker.js`}})};function E(){let e=document.getElementById(`root`);e.innerHTML=b({searchProps:{loading:C.isLoadingProducts,limit:C.limit,sort:C.sort},productProps:{loading:C.isLoadingProducts,loadingMore:C.isLoadingMore,products:C.products,error:C.productsError,hasMore:C.hasMoreProducts,loadMoreError:C.loadMoreError,totalCount:C.totalProducts}});let t=e.querySelector(`#limit-select`);t&&(t.value=String(C.limit),t.addEventListener(`change`,k,{once:!0}));let n=e.querySelector(`#sort-select`);n&&(n.value=C.sort,n.addEventListener(`change`,A,{once:!0}));let r=e.querySelector(`#products-retry-button`);r&&r.addEventListener(`click`,()=>{O()},{once:!0});let i=e.querySelector(`#products-load-more-retry-button`);i&&i.addEventListener(`click`,()=>{O({append:!0})},{once:!0}),D(e)}function D(e){if(w&&(w.disconnect(),w=null),C.loadMoreError)return;let t=e.querySelector(`#products-load-more-trigger`);t&&(w=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&O({append:!0})})},{root:null,rootMargin:`0px 0px 200px 0px`,threshold:0}),w.observe(t))}async function O({append:e=!1}={}){let t=e?M():j();if(!t)return;let{nextPage:n}=t;try{let t=await N(n);P(t,{append:e,requestedPage:n})}catch(t){console.error(`상품 목록을 불러오지 못했습니다.`,t),F(e)}finally{I(e)}}function k(e){let t=Number(e.target.value);if(Number.isNaN(t)||C.limit===t){E();return}C.limit=t,O()}function A(e){let t=e.target.value;if(!t||C.sort===t){E();return}C.sort=t,O()}function j(){return C.isLoadingProducts=!0,C.productsError=null,C.loadMoreError=null,C.currentPage=0,C.hasMoreProducts=!0,C.totalProducts=0,E(),{nextPage:1}}function M(){return C.isLoadingProducts||C.isLoadingMore||!C.hasMoreProducts?null:(C.isLoadingMore=!0,C.loadMoreError=null,E(),{nextPage:C.currentPage+1})}async function N(e){return await i({limit:C.limit,page:e,sort:C.sort})}function P(e,{append:t,requestedPage:n}){var r,i,a;let o=e?.products??[],s=(e==null||(r=e.pagination)==null?void 0:r.page)??n,c=(e==null||(i=e.pagination)==null?void 0:i.hasNext)??o.length>=C.limit,l=e==null||(a=e.pagination)==null?void 0:a.total;C.products=t?[...C.products,...o]:o,C.currentPage=s,C.hasMoreProducts=c,typeof l==`number`?C.totalProducts=l:t||(C.totalProducts=C.products.length)}function F(e){if(e){C.loadMoreError=S;return}C.productsError=x}function I(e){e?C.isLoadingMore=!1:C.isLoadingProducts=!1,E()}async function L(){E(),await O()}T().then(L);