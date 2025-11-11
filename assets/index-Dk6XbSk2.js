(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_7th_chapter2-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},s=document.getElementsByTagName(`link`),c=document.querySelector(`meta[property=csp-nonce]`),l=c?.nonce||c?.getAttribute(`nonce`);o=r(i.map(r=>{if(r=t(r,a),r in n)return;n[r]=!0;let i=r.endsWith(`.css`),o=i?`[rel="stylesheet"]`:``,c=!!a;if(c)for(let e=s.length-1;e>=0;e--){let t=s[e];if(t.href===r&&(!i||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${r}"]${o}`))return;let u=document.createElement(`link`);if(u.rel=i?`stylesheet`:e,i||(u.as=`script`),u.crossOrigin=``,u.href=r,l&&u.setAttribute(`nonce`,l),document.head.appendChild(u),i)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${r}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})};async function i(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function a(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function o(){let e=await fetch(`/api/categories`);return await e.json()}const s=`
	<button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
		</svg>
	</button>
`,c=({showBack:e=!1}={})=>{let t=e?`상품 상세`:`쇼핑몰`;return`
		<header class="bg-white shadow-sm sticky top-0 z-40">
			<div class="max-w-md mx-auto px-4 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						${e?s:``}
						<h1 class="text-xl font-bold text-gray-900">
							<a href="/" data-link="">${t}</a>
						</h1>
					</div>
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
	`},l=()=>`
		<footer class="bg-white shadow-sm sticky top-0 z-40">
		  <div class="max-w-md mx-auto py-8 text-center text-gray-500">
			<p>© ${new Date().getFullYear()} 항해플러스 프론트엔드 쇼핑몰</p>
		  </div>
		</footer>
	`,u=({top:e=``,main:t=``,bottom:n=``,headerProps:r={}})=>`
    <div class="min-h-screen bg-gray-50">
        ${c(r)}
        <main class="max-w-md mx-auto px-4 py-4">
            ${e}
            ${t}
            ${n}
        </main>
        ${l()}
    </div>
  `,d=({category1:e=``,category2List:t=[]}={})=>{let n=e||``;return t.length?t.map(e=>`
        <button
          data-category1="${n}"
          data-category2="${e}"
          class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          ${e}
        </button>
      `).join(``):`<span class="text-sm text-gray-400">하위 카테고리가 없습니다.</span>`},f=({category1:e=``,activeCategory2:t=``,category2List:n=[]}={})=>{let r=e||``;return n.length?n.map(e=>{let n=e===t,i=`category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors`,a=n?`bg-blue-100 border-blue-300 text-blue-800`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;return`
        <button
          data-category1="${r}"
          data-category2="${e}"
          class="${i} ${a}"
        >
          ${e}
        </button>
      `}).join(``):`<span class="text-sm text-gray-400">하위 카테고리가 없습니다.</span>`},p=`
  <div class="flex flex-wrap gap-2">
    <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>
  </div>
`,m=(e={},t=null)=>{let n=Object.keys(e);return n.length===0?`<span class="text-sm text-gray-400">표시할 카테고리가 없습니다.</span>`:n.sort((e,t)=>e.localeCompare(t,`ko`)).map(e=>{let n=e===t,r=`category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors`,i=n?`bg-blue-600 border-blue-600 text-white`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;return`
        <button data-category1="${e}" class="${r} ${i}">
          ${e}
        </button>
      `}).join(``)},h=({selectedCategory1:e,selectedCategory2:t})=>{let n=[`<span class="text-sm text-gray-600">카테고리:</span>`,`<button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>`];return e&&n.push(`<span class="text-xs text-gray-500">&gt;</span>`,`<button data-breadcrumb="category1" data-category1="${e}" class="text-xs hover:text-blue-800 hover:underline">${e}</button>`),t&&n.push(`<span class="text-xs text-gray-500">&gt;</span>`,`<span class="text-xs text-gray-600 cursor-default">${t}</span>`),n.join(` `)},g=({categories:e,selectedCategory1:t,selectedCategory2:n,loading:r})=>{if(r)return p;if(!t)return m(e,t);let i=e?.[t],a=Array.isArray(i)?i:Object.keys(i??{}).sort((e,t)=>e.localeCompare(t,`ko`));return n?f({category1:t,activeCategory2:n,category2List:a}):d({category1:t,category2List:a})},_=(e,t)=>`
  <option value="${e}" ${t===e?`selected`:``}>${e}개</option>
`,v=(e,t,n)=>`
  <option value="${e}" ${t===e?`selected`:``}>${n}</option>
`,y=({loading:e=!1,limit:t=20,sort:n=`price_asc`,selectedCategory1:r=null,selectedCategory2:i=null,categories:a={}}={})=>`
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
          <div class="flex items-center gap-2" id="category-breadcrumb">
            ${h({selectedCategory1:r,selectedCategory2:i})}
          </div>
          <div class="space-y-2">
            <div class="flex flex-wrap gap-2" id="category-buttons">
              ${g({categories:a,selectedCategory1:r,selectedCategory2:i,loading:e})}
            </div>
          </div>
        </div>

        <div class="flex gap-2 items-center justify-between">
          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600" for="limit-select">개수:</label>
            <select
              id="limit-select"
              class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              ${[10,20,50,100].map(e=>_(e,t)).join(``)}
            </select>
          </div>

          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600" for="sort-select">정렬:</label>
            <select
              id="sort-select"
              class="text-sm border border-gray-300 rounded px-2 py-1
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              ${[[`price_asc`,`가격 낮은순`],[`price_desc`,`가격 높은순`],[`name_asc`,`이름순`],[`name_desc`,`이름 역순`]].map(([e,t])=>v(e,n,t)).join(``)}
            </select>
          </div>
        </div>
      </div>
    </div>
  `,b=({selectedCategory1:e,selectedCategory2:t})=>h({selectedCategory1:e,selectedCategory2:t}),x=({categories:e,selectedCategory1:t,selectedCategory2:n,loading:r})=>g({categories:e,selectedCategory1:t,selectedCategory2:n,loading:r}),S=()=>`
  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
  </svg>
`,ee=({product:e,loading:t=!1}={})=>{let n=[`<button data-navigate="home" class="text-sm text-gray-600 hover:text-blue-600 transition-colors">홈</button>`];if(t)n.push(`<span class="text-sm text-gray-400">로딩 중...</span>`);else{e?.category1&&n.push(`<button data-navigate="home-category" data-category1="${e.category1}" class="text-xs text-gray-600 hover:text-blue-600 transition-colors">${e.category1}</button>`),e?.category2&&n.push(`<button data-navigate="home-category" data-category1="${e.category1}" data-category2="${e.category2}" class="text-xs text-gray-600 hover:text-blue-600 transition-colors">${e.category2}</button>`);let t=[e?.category3,e?.category4].filter(Boolean).map(e=>`<span class="text-xs text-gray-600">${e}</span>`);n.push(...t)}let r=n.map((e,t)=>t===0?e:`${S()}${e}`).join(``);return`
    <nav class="mb-4">
      <div class="flex items-center space-x-2 text-sm text-gray-600 detail-breadcrumb">
        ${r}
      </div>
    </nav>
  `},te=`
  <div class="py-20 bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">상품 정보를 불러오는 중...</p>
    </div>
  </div>
`,C=e=>`
  <div class="bg-white rounded-lg shadow-sm border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">
    <p class="mb-4">${e}</p>
    <button data-navigate="home" class="inline-flex items-center gap-2 rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition">
      상품 목록으로 돌아가기
    </button>
  </div>
`,ne=e=>{let t=Number(e);return Number.isNaN(t)?e:`${t.toLocaleString()}원`},re=(e,t)=>{if(typeof e!=`number`)return``;let n=Math.round(e),r=`
    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  `,i=`
    <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  `,a=Array.from({length:5},(e,t)=>t<n?r:i).join(``),o=typeof t==`number`?`<span class="ml-2 text-sm text-gray-600">${e.toFixed(1)} (${t}개 리뷰)</span>`:``;return`
    <div class="flex items-center mb-3">
      <div class="flex items-center">
        ${a}
      </div>
      ${o}
    </div>
  `},ie=(e=[])=>{let t=Array.from(new Set(e.filter(Boolean)));return t.length<=1?``:`
    <div class="grid grid-cols-3 gap-2 mt-2">
      ${t.slice(0,6).map(e=>`
        <div class="aspect-square bg-gray-100 rounded-md overflow-hidden">
          <img src="${e}" alt="상품 미리보기" class="w-full h-full object-cover">
        </div>
      `).join(``)}
    </div>
  `},ae=({product:e,loading:t=!1,error:n=null}={})=>{if(t)return te;if(n)return C(n);if(!e)return C(`상품 정보를 찾을 수 없습니다.`);let{title:r,description:i,image:a,images:o=[],lprice:s,mallName:c,link:l,stock:u,rating:d,reviewCount:f,brand:p,maker:m}=e,h=ne(s),g=ie([a,...o]),_=re(d,f),v=[p,m,c].filter(Boolean).join(` • `);return`
    <article class="space-y-6">
      <section class="bg-white rounded-lg shadow-sm">
        <div class="p-4">
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img src="${a}" alt="${r}" class="w-full h-full object-cover">
          </div>
          ${g}
          <div class="mt-4 space-y-4">
            <header>
              <p class="text-sm text-gray-500 mb-1">${v}</p>
              <h1 class="text-xl font-bold text-gray-900 mb-3">${r}</h1>
              ${_}
            </header>
            <div>
              <span class="text-2xl font-bold text-blue-600">${h}</span>
              ${typeof u==`number`?`<p class="text-sm text-gray-600 mt-1">재고 ${u}개</p>`:``}
            </div>
            <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              ${i??`상세 설명이 준비되어 있지 않습니다.`}
            </p>
            ${l?`<a href="${l}" target="_blank" rel="noreferrer noopener" class="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
                     원본 상세 페이지 방문
                   </a>`:``}
          </div>
        </div>
        <div class="border-t border-gray-100 p-4">
          <button
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            data-product-id="${e.productId}"
          >
            장바구니 담기
          </button>
        </div>
      </section>

      <div class="flex justify-center">
        <button
          data-navigate="home"
          class="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          상품 목록으로 돌아가기
        </button>
      </div>
    </article>
  `},w=`
	<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
		<div class="aspect-square bg-gray-200"></div>
		<div class="p-3">
			<div class="h-4 bg-gray-200 rounded mb-2"></div>
			<div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
			<div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
			<div class="h-8 bg-gray-200 rounded"></div>
		</div>
	</div>
`,T=({title:e,image:t,productId:n,lprice:r})=>`
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
	`,E=`
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
`,oe=`
  <div class="py-4 text-sm text-gray-600 flex items-center justify-center gap-2">
    <svg class="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>상품을 불러오는 중입니다...</span>
  </div>
`,se=e=>`
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
`,ce=()=>`
  <div class="col-span-2 rounded-md border border-dashed border-gray-200 bg-white px-4 py-10 text-center text-sm text-gray-500">
    표시할 상품이 없습니다.
  </div>
`,le=({loading:e=!0,loadingMore:t=!1,products:n=[],error:r=null,hasMore:i=!1,loadMoreError:a=null,totalCount:o=0}={})=>{if(r)return se(r);if(e)return`
      <section class="mb-6">
        ${E}
        <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
          ${w.repeat(4)}
        </div>
      </section>
    `;let s=Array.isArray(n)&&n.length>0;return`
    <section class="mb-6">
      <div class="mb-4 text-sm text-gray-600">
        총 <span class="font-medium text-gray-900">${o||n.length}개</span>의 상품
      </div>
      <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
        ${s?n.map(T).join(``):ce()}
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
      ${t?oe:``}
      ${i?`<div id="products-load-more-trigger" class="h-2 w-full"></div>`:``}
    </section>
  `},D=()=>`
    ${u({headerProps:{showBack:!1},top:`<section id="search-section"></section>`,main:`<section id="product-section"></section>`})}
  `,ue=({navProps:e={},contentProps:t={},bottom:n=``}={})=>`
    ${u({headerProps:{showBack:!0},top:ee(e),main:ae(t),bottom:n})}
  `,O=`상품 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.`,k=`상품을 추가로 불러오지 못했습니다. 다시 시도해 주세요.`,A=`상품 상세 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.`;function j(){return{isLoading:!1,error:null,product:null}}const M={products:[],isLoadingProducts:!1,isLoadingMore:!1,productsError:null,loadMoreError:null,limit:20,currentPage:0,hasMoreProducts:!0,sort:`price_asc`,totalProducts:0,categories:{},categoriesLoaded:!1,isLoadingCategories:!1,route:null,detail:j(),selectedCategory1:null,selectedCategory2:null,searchTerm:``};let N=null,P=!1,F=!1;const I=async()=>{let{worker:e}=await r(async()=>{let{worker:e}=await import(`./browser-CcyfQrG1.js`);return{worker:e}},[]);return e.start({onUnhandledRequest:`bypass`,serviceWorker:{url:`/front_7th_chapter2-1/mockServiceWorker.js`}})};M.route=X();function L(){var e;let t=document.getElementById(`root`);if(t){if((e=M.route)?.name===`detail`){R(t);return}z(t)}}function R(e){K(),e.innerHTML=ue({navProps:{product:M.detail.product,loading:M.detail.isLoading},contentProps:{product:M.detail.product,loading:M.detail.isLoading,error:M.detail.error}}),fe(e)}function z(e){P||(e.innerHTML=D(),P=!0,F=!1,G(e));let t=document.getElementById(`search-section`),n=document.getElementById(`product-section`);(!t||!n)&&(e.innerHTML=D(),P=!0,F=!1,G(e)),!F&&M.categoriesLoaded&&B(),V(),H(),me(e)}function B(){let e=document.getElementById(`search-section`);if(!e)return;e.innerHTML=y({loading:M.isLoadingCategories,limit:M.limit,sort:M.sort,selectedCategory1:M.selectedCategory1,selectedCategory2:M.selectedCategory2,categories:M.categories}),F=!0;let t=document.getElementById(`search-input`);t&&(t.value=M.searchTerm,t.addEventListener(`keydown`,Ee));let n=document.getElementById(`limit-select`);n&&n.addEventListener(`change`,xe);let r=document.getElementById(`sort-select`);r&&r.addEventListener(`change`,Se);let i=document.getElementById(`category-breadcrumb`);i&&i.addEventListener(`click`,U);let a=document.getElementById(`category-buttons`);a&&a.addEventListener(`click`,de)}function V(){if(!F)return;let e=document.getElementById(`search-input`);e&&(e.value=M.searchTerm);let t=document.getElementById(`category-breadcrumb`);t&&(t.innerHTML=b({selectedCategory1:M.selectedCategory1,selectedCategory2:M.selectedCategory2}));let n=document.getElementById(`category-buttons`);n&&(n.innerHTML=x({categories:M.categories,selectedCategory1:M.selectedCategory1,selectedCategory2:M.selectedCategory2,loading:M.isLoadingCategories}));let r=document.getElementById(`limit-select`);r&&(r.value=String(M.limit));let i=document.getElementById(`sort-select`);i&&(i.value=M.sort)}function H(){let e=document.getElementById(`product-section`);if(!e)return;e.innerHTML=le({loading:M.isLoadingProducts,loadingMore:M.isLoadingMore,products:M.products,error:M.productsError,hasMore:M.hasMoreProducts,loadMoreError:M.loadMoreError,totalCount:M.totalProducts});let t=e.querySelector(`#products-retry-button`);t&&t.addEventListener(`click`,()=>q(),{once:!0});let n=e.querySelector(`#products-load-more-retry-button`);n&&n.addEventListener(`click`,()=>q({append:!0}),{once:!0});let r=e.querySelectorAll(`.product-card`);r.forEach(e=>{e.addEventListener(`click`,he)})}function U(e){let t=e.target.closest(`button`);if(t){if(t.dataset.breadcrumb===`reset`){ye(e);return}if(t.dataset.breadcrumb===`category1`){be(e);return}}}function de(e){let t=e.target.closest(`button`);if(t){if(t.dataset.category2){ve(e);return}t.dataset.category1&&_e(e)}}function fe(e){G(e);let t=e.querySelectorAll(`[data-navigate="home"]`);t.forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),J()})});let n=e.querySelector(`.detail-breadcrumb`);n&&n.addEventListener(`click`,pe)}function pe(e){let t=e.target.closest(`[data-navigate]`);if(t){if(t.dataset.navigate===`home`){e.preventDefault(),W(),J({replace:!1});return}if(t.dataset.navigate===`home-category`){e.preventDefault(),W();let{category1:n,category2:r}=t.dataset;M.selectedCategory1=n||null,M.selectedCategory2=r||null,$({current:1,category1:M.selectedCategory1,category2:M.selectedCategory2,search:M.searchTerm}),q()}}}function W(){M.selectedCategory1=null,M.selectedCategory2=null,M.searchTerm=``,M.currentPage=0,$({current:1,category1:null,category2:null,search:null})}function G(e){let t=e.querySelectorAll(`[data-link]`);t.forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),W(),J({replace:!1})})})}function me(e){var t;if((t=M.route)?.name!==`home`){K();return}if(N&&(N.disconnect(),N=null),M.loadMoreError)return;let n=e.querySelector(`#products-load-more-trigger`);n&&(N=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&q({append:!0})})},{root:null,rootMargin:`0px 0px 200px 0px`,threshold:0}),N.observe(n))}function K(){N&&(N.disconnect(),N=null)}async function q({append:e=!1}={}){var t;if((t=M.route)?.name!==`home`)return;let n=e?we():Ce();if(!n)return;let{nextPage:r}=n;try{let t=await Te(r);Y(t,{append:e,requestedPage:r})}catch(t){console.error(`상품 목록을 불러오지 못했습니다.`,t),De(e)}finally{Oe(e)}}function he(e){if(e.target.closest(`.add-to-cart-btn`)){e.stopPropagation();return}let t=e.currentTarget,n=t.dataset.productId;n&&ge(n)}function ge(e){let t=Z(`product/${encodeURIComponent(e)}`);window.history.pushState({productId:e},``,t.toString()),Q()}function J({replace:e=!1,category1:t,category2:n,current:r,search:i}={}){let a=Pe({current:r,category1:t,category2:n,search:i});e?window.history.replaceState({},``,a.toString()):window.history.pushState({},``,a.toString()),Q()}function _e(e){e.preventDefault();let t=e.target.closest(`[data-category1]`);if(!t)return;let{category1:n}=t.dataset;if(!n)return;let r=M.selectedCategory1!==n||M.selectedCategory2!==null;M.selectedCategory1=n,M.selectedCategory2=null,r?($({current:1,category1:n,category2:null}),q()):V()}function ve(e){e.preventDefault();let t=e.target.closest(`[data-category2]`);if(!t)return;let{category1:n,category2:r}=t.dataset;if(!n||!r)return;let i=M.selectedCategory1!==n||M.selectedCategory2!==r;M.selectedCategory1=n,M.selectedCategory2=r,i?($({current:1,category1:n,category2:r}),q()):V()}function ye(e){e.preventDefault();let t=e.target.closest(`[data-breadcrumb="reset"]`);if(!t)return;let n=M.selectedCategory1!==null||M.selectedCategory2!==null||M.searchTerm!==``;if(!n){V();return}M.selectedCategory1=null,M.selectedCategory2=null,M.searchTerm=``,$({current:1,category1:null,category2:null,search:null}),q()}function be(e){e.preventDefault();let t=e.target.closest(`[data-breadcrumb="category1"]`);if(!t)return;let{category1:n}=t.dataset,r=n||null,i=M.selectedCategory1!==r||M.selectedCategory2!==null||M.searchTerm!==``;M.selectedCategory1=r,M.selectedCategory2=null,i?($({current:1,category1:r,category2:null,search:M.searchTerm}),q()):V()}function xe(e){let t=Number(e.target.value);if(Number.isNaN(t)||M.limit===t){L();return}M.limit=t,q()}function Se(e){var t;let n=e.target.value;if(!n||M.sort===n||(t=M.route)?.name!==`home`){L();return}M.sort=n,q()}function Ce(){return M.isLoadingProducts?null:(M.isLoadingProducts=!0,M.productsError=null,M.loadMoreError=null,M.currentPage=0,M.hasMoreProducts=!0,M.totalProducts=0,L(),{nextPage:1})}function we(){var e;return(e=M.route)?.name!==`home`||M.isLoadingProducts||M.isLoadingMore||!M.hasMoreProducts?null:(M.isLoadingMore=!0,M.loadMoreError=null,L(),{nextPage:M.currentPage+1})}async function Te(e){return await i({limit:M.limit,page:e,sort:M.sort,...M.selectedCategory1?{category1:M.selectedCategory1}:{},...M.selectedCategory2?{category2:M.selectedCategory2}:{},...M.searchTerm?{search:M.searchTerm}:{}})}function Ee(e){if(e.key!==`Enter`)return;let t=e.target;if(!(t instanceof HTMLInputElement))return;e.preventDefault();let n=t.value.trim();M.searchTerm!==n&&(M.searchTerm=n,$({current:1,category1:M.selectedCategory1,category2:M.selectedCategory2,search:n||null}),q())}function Y(e,{append:t,requestedPage:n}){var r,i,a,o;let s=e?.products??[],c=(e==null||(r=e.pagination)==null?void 0:r.page)??n,l=(e==null||(i=e.pagination)==null?void 0:i.hasNext)??s.length>=M.limit,u=e==null||(a=e.pagination)==null?void 0:a.total;M.products=t?[...M.products,...s]:s,M.currentPage=c,M.hasMoreProducts=l,typeof u==`number`?M.totalProducts=u:t||(M.totalProducts=M.products.length),(o=M.route)?.name===`home`&&$({current:M.currentPage,category1:M.selectedCategory1,category2:M.selectedCategory2})}function De(e){if(e){M.loadMoreError=k;return}M.productsError=O}function Oe(e){e?M.isLoadingMore=!1:M.isLoadingProducts=!1,L()}async function ke(e){M.detail=j(),M.detail.isLoading=!0,L();try{var t;let n=await a(e);if((t=M.route)?.name!==`detail`||M.route.params.productId!==e)return;M.detail.product=n}catch(t){var n;if((n=M.route)?.name!==`detail`||M.route.params.productId!==e)return;console.error(`상품 상세 정보를 불러오지 못했습니다.`,t),M.detail.error=A}finally{var r;(r=M.route)?.name===`detail`&&M.route.params.productId===e&&(M.detail.isLoading=!1,L())}}function X(){let e=`/front_7th_chapter2-1/`,t=e.endsWith(`/`)?e:`${e}/`,n=window.location.pathname;if(t!==`/`&&n.startsWith(t)?n=n.slice(t.length):t===`/`&&n.startsWith(`/`)&&(n=n.slice(1)),n=n.replace(/^\/+/,``).replace(/\/+$/,``),!n)return{name:`home`};let r=n.match(/^product\/([^/]+)$/);return r?{name:`detail`,params:{productId:decodeURIComponent(r[1])}}:{name:`home`}}function Z(e=``){let t=`/front_7th_chapter2-1/`,n=t.endsWith(`/`)?t:`${t}/`,r=e.startsWith(`/`)?e.slice(1):e;return new URL(`${n}${r}`,window.location.origin)}async function Q(){if(M.route=X(),M.route.name===`detail`){await ke(M.route.params.productId);return}if(Ne(),M.detail=j(),await je(),!M.products.length){await q();return}M.isLoadingProducts=!1,M.productsError=null,L()}async function Ae(){window.addEventListener(`popstate`,()=>{Q()}),await Q()}I().then(Ae);async function je(){if(!(M.categoriesLoaded||M.isLoadingCategories)){M.isLoadingCategories=!0;try{let e=await o();M.categories=Me(e),M.categoriesLoaded=!0}catch(e){console.error(`카테고리 정보를 불러오지 못했습니다.`,e),M.categories={},M.categoriesLoaded=!1}finally{M.isLoadingCategories=!1}}}function Me(e={}){return Object.fromEntries(Object.entries(e??{}).map(([e,t])=>[e,Object.keys(t??{}).sort((e,t)=>e.localeCompare(t,`ko`))]))}function Ne(){let e=new URLSearchParams(window.location.search),t=e.get(`category1`),n=e.get(`category2`),r=e.get(`search`)??``;M.selectedCategory1=t||null,M.selectedCategory2=n||null,M.searchTerm=r}function $({current:e,category1:t,category2:n,search:r}={}){var i;if((i=M.route)?.name!==`home`)return;let a=new URL(window.location.href),o=a.searchParams;e!==void 0&&(e&&Number.isFinite(e)?o.set(`current`,String(e)):o.delete(`current`)),t!==void 0&&(t?o.set(`category1`,t):o.delete(`category1`)),n!==void 0&&(n?o.set(`category2`,n):o.delete(`category2`)),r!==void 0&&(r?o.set(`search`,r):o.delete(`search`)),a.search=o.toString(),window.history.replaceState(window.history.state,``,a.toString())}function Pe({current:e,category1:t,category2:n,search:r}={}){let i=Z(``),a=i.searchParams;return e!==void 0&&(e&&Number.isFinite(e)?a.set(`current`,String(e)):a.delete(`current`)),t!==void 0&&(t?a.set(`category1`,t):a.delete(`category1`)),n!==void 0&&(n?a.set(`category2`,n):a.delete(`category2`)),r!==void 0&&(r?a.set(`search`,r):a.delete(`search`)),i.search=a.toString(),i}