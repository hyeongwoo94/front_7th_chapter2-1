(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_7th_chapter2-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},s=document.getElementsByTagName(`link`),c=document.querySelector(`meta[property=csp-nonce]`),l=c?.nonce||c?.getAttribute(`nonce`);o=r(i.map(r=>{if(r=t(r,a),r in n)return;n[r]=!0;let i=r.endsWith(`.css`),o=i?`[rel="stylesheet"]`:``,c=!!a;if(c)for(let e=s.length-1;e>=0;e--){let t=s[e];if(t.href===r&&(!i||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${r}"]${o}`))return;let u=document.createElement(`link`);if(u.rel=i?`stylesheet`:e,i||(u.as=`script`),u.crossOrigin=``,u.href=r,l&&u.setAttribute(`nonce`,l),document.head.appendChild(u),i)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${r}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})},i=`
	<button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
		</svg>
	</button>
`,a=({showBack:e=!1}={})=>{let t=e?`상품 상세`:`쇼핑몰`,n=e?`<span class="text-xl font-bold text-gray-900">${t}</span>`:`<a href="/" data-link="" class="text-xl font-bold text-gray-900">${t}</a>`;return`
		<header class="bg-white shadow-sm sticky top-0 z-40">
			<div class="max-w-md mx-auto px-4 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						${e?i:``}
						<h1>${n}</h1>
					</div>
					<div class="flex items-center space-x-2">
						<button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									 d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
              </svg>
              <span
                id="cart-count-badge"
                class="hidden absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-600 px-1 text-[11px] font-semibold text-white flex items-center justify-center leading-none"
              ></span>
            </button>
					</div>
				</div>
			</div>
		</header>
	`},o=()=>`
		<footer class="bg-white shadow-sm sticky top-0 z-40">
		  <div class="max-w-md mx-auto py-8 text-center text-gray-500">
			<p>© ${new Date().getFullYear()} 항해플러스 프론트엔드 쇼핑몰</p>
		  </div>
		</footer>
	`,s=({top:e=``,main:t=``,bottom:n=``,headerProps:r={}})=>`
    <div class="min-h-screen bg-gray-50">
        ${a(r)}
        <main class="max-w-md mx-auto px-4 py-4">
            ${e}
            ${t}
            ${n}
        </main>
        ${o()}
    </div>
  `,c=({category1:e=``,category2List:t=[]}={})=>{let n=e||``;return t.length?t.map(e=>`
        <button
          data-category1="${n}"
          data-category2="${e}"
          class="category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          ${e}
        </button>
      `).join(``):`<span class="text-sm text-gray-400">하위 카테고리가 없습니다.</span>`},l=({category1:e=``,activeCategory2:t=``,category2List:n=[]}={})=>{let r=e||``;return n.length?n.map(e=>{let n=e===t,i=`category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors`,a=n?`bg-blue-100 border-blue-300 text-blue-800`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;return`
        <button
          data-category1="${r}"
          data-category2="${e}"
          class="${i} ${a}"
        >
          ${e}
        </button>
      `}).join(``):`<span class="text-sm text-gray-400">하위 카테고리가 없습니다.</span>`},u=`
  <div class="flex flex-wrap gap-2">
    <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>
  </div>
`,d=(e={},t=null)=>{let n=Object.keys(e);return n.length===0?`<span class="text-sm text-gray-400">표시할 카테고리가 없습니다.</span>`:n.map(e=>{let n=e===t,r=`category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors`,i=n?`bg-blue-600 border-blue-600 text-white`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;return`
        <button data-category1="${e}" class="${r} ${i}">
          ${e}
        </button>
      `}).join(``)},f=({selectedCategory1:e,selectedCategory2:t})=>{let n=[`<span class="text-sm text-gray-600">카테고리:</span>`,`<button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>`];return e&&n.push(`<span class="text-xs text-gray-500">&gt;</span>`,`<button data-breadcrumb="category1" data-category1="${e}" class="text-xs hover:text-blue-800 hover:underline">${e}</button>`),t&&n.push(`<span class="text-xs text-gray-500">&gt;</span>`,`<span class="text-xs text-gray-600 cursor-default">${t}</span>`),n.join(` `)},p=({categories:e,selectedCategory1:t,selectedCategory2:n,loading:r})=>{if(r)return u;if(!t)return d(e,t);let i=e?.[t],a=Array.isArray(i)?i:Object.keys(i??{});return n?l({category1:t,activeCategory2:n,category2List:a}):c({category1:t,category2List:a})},m=(e,t)=>`
  <option value="${e}" ${t===e?`selected`:``}>${e}개</option>
`,ee=(e,t,n)=>`
  <option value="${e}" ${t===e?`selected`:``}>${n}</option>
`,h=({loading:e=!1,limit:t=20,sort:n=`price_asc`,selectedCategory1:r=null,selectedCategory2:i=null,categories:a={}}={})=>`
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
            ${f({selectedCategory1:r,selectedCategory2:i})}
          </div>
          <div class="space-y-2">
            <div class="flex flex-wrap gap-2" id="category-buttons">
              ${p({categories:a,selectedCategory1:r,selectedCategory2:i,loading:e})}
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
              ${[10,20,50,100].map(e=>m(e,t)).join(``)}
            </select>
          </div>

          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600" for="sort-select">정렬:</label>
            <select
              id="sort-select"
              class="text-sm border border-gray-300 rounded px-2 py-1
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              ${[[`price_asc`,`가격 낮은순`],[`price_desc`,`가격 높은순`],[`name_asc`,`이름순`],[`name_desc`,`이름 역순`]].map(([e,t])=>ee(e,n,t)).join(``)}
            </select>
          </div>
        </div>
      </div>
    </div>
  `,te=({selectedCategory1:e,selectedCategory2:t})=>f({selectedCategory1:e,selectedCategory2:t}),ne=({categories:e,selectedCategory1:t,selectedCategory2:n,loading:r})=>p({categories:e,selectedCategory1:t,selectedCategory2:n,loading:r}),re=()=>`
  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
  </svg>
`,ie=({product:e,loading:t=!1}={})=>{let n=[`<button data-navigate="home" class="text-sm text-gray-600 hover:text-blue-600 transition-colors">홈</button>`];t?n.push(`<span class="text-sm text-gray-400">로딩 중...</span>`):(e?.category1&&n.push(`<button data-navigate="home-category" data-category1="${e.category1}" class="text-xs text-gray-600 hover:text-blue-600 transition-colors">${e.category1}</button>`),e?.category2&&n.push(`<button data-navigate="home-category" data-category1="${e.category1}" data-category2="${e.category2}" class="text-xs text-gray-600 hover:text-blue-600 transition-colors">${e.category2}</button>`));let r=n.map((e,t)=>t===0?e:`${re()}${e}`).join(``);return`
    <nav class="mb-4">
      <div class="flex items-center space-x-2 text-sm text-gray-600 detail-breadcrumb">
        ${r}
      </div>
    </nav>
  `},ae=`
  <div class="py-20 bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">상품 정보를 불러오는 중...</p>
    </div>
  </div>
`,oe=e=>`
  <div class="bg-white rounded-lg shadow-sm border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">
    <p class="mb-4">${e}</p>
    <button data-navigate="home" class="inline-flex items-center gap-2 rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition">
      상품 목록으로 돌아가기
    </button>
  </div>
`,se=e=>{let t=Number(e);return Number.isNaN(t)?e:`${t.toLocaleString()}원`},ce=(e,t)=>{if(typeof e!=`number`)return``;let n=Math.round(e),r=`
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
  `},le=(e=[])=>!Array.isArray(e)||e.length===0?`
      <p class="text-sm text-gray-500">관련 상품 정보를 준비 중입니다.</p>
    `:`
    <div class="grid grid-cols-2 gap-3 responsive-grid">
      ${e.slice(0,4).map(e=>`
        <div class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer" data-product-id="${e.productId}">
          <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
            <img src="${e.image}" alt="${e.title}" class="w-full h-full object-cover" loading="lazy">
          </div>
          <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${e.title}</h3>
          <p class="text-sm font-bold text-blue-600">${se(e.lprice)}</p>
        </div>
      `).join(``)}
    </div>
  `,ue=({product:e,loading:t=!1,error:n=null}={})=>{if(t)return ae;if(n)return oe(n);if(!e)return oe(`상품 정보를 찾을 수 없습니다.`);let{title:r,description:i,image:a,lprice:o,mallName:s,stock:c,rating:l,reviewCount:u,brand:d,maker:f,relatedProducts:p=[]}=e,m=se(o),ee=ce(l,u),h=[d,f,s].filter(Boolean).join(` • `);return`
    <article class="space-y-6">
      <section class="bg-white rounded-lg shadow-sm">
        <div class="p-4">
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img src="${a}" alt="${r}" class="w-full h-full object-cover">
          </div>
          <div class="mt-4 space-y-4">
            <header>
              <p class="text-sm text-gray-500 mb-1">${h}</p>
              <h1 class="text-xl font-bold text-gray-900 mb-3">${r}</h1>
              ${ee}
            </header>
            <div>
              <span class="text-2xl font-bold text-blue-600">${m}</span>
              ${typeof c==`number`?`<p class="text-sm text-gray-600 mt-1">재고 ${c}개</p>`:``}
            </div>
            <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              ${i??`상세 설명이 준비되어 있지 않습니다.`}
            </p>
          </div>
        </div>
        <div class="border-t border-gray-100 p-4 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-900">수량</span>
            <div class="flex items-center">
              <button
                type="button"
                id="quantity-decrease"
                data-quantity-decrease
                class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                </svg>
              </button>
              <input
                type="number"
                id="quantity-input"
                value="1"
                min="1"
                ${typeof c==`number`?`max="${c}"`:``}
                class="w-16 h-8 text-center text-sm border-t border-b border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                id="quantity-increase"
                data-quantity-increase
                class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
            </div>
          </div>
          <button
            id="add-to-cart-btn"
            data-product-id="${e.productId}"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium add-to-cart"
          >
            장바구니 담기
          </button>
        </div>
      </section>
      <div class="flex justify-center">
        <button
          data-navigate="home"
          class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md 
                hover:bg-gray-200 transition-colors go-to-product-list"
        >
          상품 목록으로 돌아가기
        </button>
      </div>

      <section class="bg-white rounded-lg shadow-sm">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
          <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
        </div>
        <div class="p-4">
          ${le(p)}
        </div>
      </section>


    </article>
  `},de=`
	<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
		<div class="aspect-square bg-gray-200"></div>
		<div class="p-3">
			<div class="h-4 bg-gray-200 rounded mb-2"></div>
			<div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
			<div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
			<div class="h-8 bg-gray-200 rounded"></div>
		</div>
	</div>
`,fe=({title:e,image:t,productId:n,lprice:r,brand:i,maker:a})=>{let o=i||a||``;return`
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
				${o?`<p class="text-xs text-gray-500 mb-2">${o}</p>`:`<p class="text-xs text-gray-500 mb-2"></p>`}
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
	`},pe=`
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
`,me=`
  <div class="py-4 text-sm text-gray-600 flex items-center justify-center gap-2">
    <svg class="animate-spin h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>상품을 불러오는 중입니다...</span>
  </div>
`,he=e=>`
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
`,ge=()=>`
  <div class="col-span-2 rounded-md border border-dashed border-gray-200 bg-white px-4 py-10 text-center text-sm text-gray-500">
    표시할 상품이 없습니다.
  </div>
`,_e=({loading:e=!0,loadingMore:t=!1,products:n=[],error:r=null,hasMore:i=!1,loadMoreError:a=null,totalCount:o=0}={})=>{if(r)return he(r);if(e)return`
      <section class="mb-6">
        ${pe}
        <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
          ${de.repeat(4)}
        </div>
      </section>
    `;let s=Array.isArray(n)&&n.length>0;return`
    <section class="mb-6">
      <div class="mb-4 text-sm text-gray-600">
        총 <span class="font-medium text-gray-900">${o||n.length}개</span>의 상품
      </div>
      <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
        ${s?n.map(fe).join(``):ge()}
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
      ${t?me:``}
      ${i?`<div id="products-load-more-trigger" class="h-2 w-full"></div>`:``}
    </section>
  `},g=e=>{let t=Number(e)||0;return`${t.toLocaleString()}원`},ve=({product:e={},quantity:t=1,selected:n=!1})=>{let{productId:r=``,title:i=``,image:a=``,lprice:o=0}=e??{},s=(Number(o)||0)*t,c=a||`https://via.placeholder.com/64x64?text=No+Image`;return`
    <div class="flex items-center gap-3 py-3 border-b border-gray-100 cart-item" data-product-id="${r}">
      <label class="flex items-center pt-1">
        <input
          type="checkbox"
          class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          data-product-id="${r}"
          ${n?`checked`:``}
        />
      </label>
      <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img src="${c}" alt="${i}" class="w-full h-full object-cover">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">${i}</h4>
        <p class="text-sm text-gray-600 mt-1">${g(o)}</p>
        <div class="flex items-center mt-2">
          <button
            id="quantity-decrease-${r}"
            class="quantity-decrease-btn w-7 h-7 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
            data-cart-action="decrease"
            data-cart-product-id="${r}"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg>
          </button>
          <input
            type="number"
            id="quantity-input-${r}"
            value="${t}"
            min="1"
            class="quantity-input w-12 h-7 text-center text-sm border-t border-b border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            disabled
            data-cart-product-id="${r}"
          />
          <button
            id="quantity-increase-${r}"
            class="quantity-increase-btn w-7 h-7 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
            data-cart-action="increase"
            data-cart-product-id="${r}"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-col items-end gap-2">
        <p class="text-sm font-medium text-gray-900">${g(s)}</p>
        <button
          class="text-xs text-red-600 hover:text-red-700"
          data-cart-action="remove"
          data-cart-product-id="${r}"
        >
          삭제
        </button>
      </div>
    </div>
  `},ye=({items:e=[],totalCount:t=0,totalPrice:n=0,selectedCount:r=0,selectedPrice:i=0}={})=>{let a=Array.isArray(e)&&e.length>0;return`
    <div class="fixed inset-0 z-50 overflow-y-auto cart-modal">
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cart-modal-overlay" data-cart-action="close"></div>
      <div class="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4">
        <div class="relative bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden">
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
              </svg>
              장바구니
              ${a?`<span class="text-sm font-medium text-gray-500">(${t}개)</span>`:``}
            </h2>
            <button id="cart-modal-close-btn" data-cart-action="close" class="text-gray-400 hover:text-gray-600 p-1">
              <span class="sr-only">장바구니 닫기</span>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          ${a?`
                <div class="flex flex-col max-h-[calc(90vh-120px)] bg-white">
                  <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                    <label class="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        id="cart-modal-select-all-checkbox"
                        class="cart-select-all-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        ${r>0&&r===t?`checked`:``}
                      />
                      전체선택 (${r}/${t})
                    </label>
                  </div>
                  <div class="flex-1 overflow-y-auto">
                    <div class="p-4 space-y-4 cart-items-container">
                      ${e.map(ve).join(``)}
                    </div>
                  </div>
                  ${r>0?`
                        <div class="border-t border-gray-200 p-4 bg-gray-50 space-y-3">
                          <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>선택한 상품</span>
                            <span class="font-medium text-gray-900">${r}개 / ${g(i)}</span>
                          </div>
                          <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>총 금액</span>
                            <span class="text-lg font-bold text-blue-600">${g(n)}</span>
                          </div>
                          <button
                            id="cart-modal-remove-selected-btn"
                            class="w-full bg-red-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-600 transition"
                            data-cart-action="remove-selected"
                          >
                            선택한 상품 삭제
                          </button>
                          <div class="flex gap-2">
                            <button
                              id="cart-modal-clear-cart-btn"
                              class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition"
                              data-cart-action="clear"
                            >
                              전체 비우기
                            </button>
                            <button
                              class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                              data-cart-action="checkout"
                            >
                              구매하기
                            </button>
                          </div>
                        </div>
                      `:`
                        <div class="border-t border-gray-200 p-4 bg-gray-50 space-y-3">

                          <div class="flex items-center justify-between">
                            <span class="text-lg font-bold text-gray-900">총 금액</span>
                            <span class="text-lg font-bold text-blue-600">${g(n)}</span>
                          </div>
                          <div class="flex gap-2 pt-1">
                            <button
                              id="cart-modal-clear-cart-btn"
                              class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition"
                              data-cart-action="clear"
                            >
                              전체 비우기
                            </button>
                            <button
                              class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                              data-cart-action="checkout"
                            >
                              구매하기
                            </button>
                          </div>
                        </div>
                      `}
                </div>
              `:`
                <div class="flex flex-col max-h-[calc(90vh-120px)]">
                  <div class="flex-1 flex items-center justify-center p-8">
                    <div class="text-center">
                      <div class="text-gray-400 mb-4">
                        <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"></path>
                        </svg>
                      </div>
                      <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
                      <p class="text-gray-600 text-sm">원하는 상품을 담아보세요!</p>
                    </div>
                  </div>
                </div>
              `}
        </div>
      </div>
    </div>
  `},be=`
<main class="max-w-md mx-auto px-4 py-4" role="img"
aria-label="404 페이지를 찾을 수 없습니다">
  <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
  <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" >
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
  </div>
</main>
`,xe=()=>`
    ${s({headerProps:{showBack:!1},main:be})}
  `,Se=`
	<div class="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
		<div class="flex-shrink-0">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
			</svg>
		</div>
		<p class="text-sm font-medium">장바구니에 추가되었습니다</p>
		<button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
			</svg>
		</button>
	</div>
`,_=`
	<div class="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
		<div class="flex-shrink-0">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
			</svg>
		</div>
		<p class="text-sm font-medium">선택된 상품들이 삭제되었습니다</p>
		<button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
			</svg>
		</button>
	</div>
`,v=`
	<div class="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
		<div class="flex-shrink-0">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
			</svg>
		</div>
		<p class="text-sm font-medium">오류가 발생했습니다.</p>
		<button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
			</svg>
		</button>
	</div>
`;let y=null,b=null,x=null;const Ce=`
	<div class="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
		<div class="flex-shrink-0">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
			</svg>
		</div>
		<p class="text-sm font-medium">구매 기능은 추후 구현 예정입니다</p>
		<button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
			</svg>
		</button>
	</div>
`,we=()=>y&&document.body.contains(y)?y:(y=document.createElement(`div`),y.className=`pointer-events-none fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 transform space-y-2`,document.body.appendChild(y),y),Te=e=>{let t=()=>{y&&(e.remove(),y.childElementCount||(y.remove(),y=null),x=null)},n=e.querySelector(`#toast-close-btn`);n&&n.addEventListener(`click`,e=>{e.preventDefault(),t()},{once:!0}),b=window.setTimeout(()=>{t()},3e3)},Ee=e=>e===Se?`add`:e===_?`delete`:e===v?`error`:e===Ce?`info`:`default`,S=e=>{if(!e)return;let t=Ee(e);if(t===x&&y&&document.body.contains(y))return;let n=we(),r=document.createElement(`div`);r.innerHTML=e.trim();let i=r.firstElementChild;i&&(i.classList.add(`pointer-events-auto`),n.appendChild(i),b&&(window.clearTimeout(b),b=null),x=t,Te(i))},De=`상품 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.`,Oe=`상품을 추가로 불러오지 못했습니다. 다시 시도해 주세요.`,ke=`상품 상세 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.`,C=20,w=`price_asc`,Ae=[10,C,50,100],je=new Set([`price_asc`,`price_desc`,`name_asc`,`name_desc`]),Me=`shopping_cart`;function Ne(){try{let e=window.localStorage.getItem(Me);if(!e)return{};let t=JSON.parse(e);if(t&&typeof t==`object`)return Object.fromEntries(Object.entries(t).map(([e,t])=>[e,{product:t.product??{},quantity:Number(t.quantity)||1,selected:!!t.selected}]))}catch(e){console.error(`장바구니 정보를 복원하지 못했습니다.`,e)}return{}}function T(e){try{window.localStorage.setItem(Me,JSON.stringify(e))}catch(e){console.error(`장바구니 정보를 저장하지 못했습니다.`,e)}}function E(){return{isLoading:!1,error:null,product:null}}const D={products:[],isLoadingProducts:!1,isLoadingMore:!1,productsError:null,loadMoreError:null,limit:C,currentPage:0,hasMoreProducts:!0,sort:w,totalProducts:0,categories:{},categoriesLoaded:!1,isLoadingCategories:!0,route:null,detail:E(),selectedCategory1:null,selectedCategory2:null,searchTerm:``,urlTouched:!1,limitTouched:!1,sortTouched:!1,isCartOpen:!1,cartItems:{}};function Pe(e){D.route=e,D.cartItems=Ne()}function O(){let e=`/front_7th_chapter2-1/`,t=e.endsWith(`/`)?e:`${e}/`,n=window.location.pathname;if(t!==`/`&&n.startsWith(t)?n=n.slice(t.length):t===`/`&&n.startsWith(`/`)&&(n=n.slice(1)),n=n.replace(/^\/+/,``).replace(/\/+$/,``),!n)return{name:`home`};let r=n.match(/^product\/([^/]+)$/);return r?{name:`detail`,params:{productId:decodeURIComponent(r[1])}}:{name:`not_found`}}function k(e=``){let t=`/front_7th_chapter2-1/`,n=t.endsWith(`/`)?t:`${t}/`,r=e.startsWith(`/`)?e.slice(1):e;return new URL(`${n}${r}`,window.location.origin)}function Fe(e,t){let n=k(`product/${encodeURIComponent(e)}`);window.history.pushState({productId:e},``,n.toString()),t&&t()}function Ie({replace:e=!1,category1:t,category2:n,current:r,search:i}={},a,o){let s=a({current:r,category1:t,category2:n,search:i});e?window.history.replaceState({},``,s.toString()):window.history.pushState({},``,s.toString()),o&&o()}function Le(){let e=new URLSearchParams(window.location.search),t=e.get(`category1`),n=e.get(`category2`),r=e.get(`search`)??``,i=e.get(`sort`),a=e.get(`limit`),o=e.has(`category1`)||e.has(`category2`)||e.has(`search`)||e.has(`sort`)||e.has(`limit`)||e.has(`current`);D.selectedCategory1=t||null,D.selectedCategory2=n||null,D.searchTerm=r,i!==null&&je.has(i)?(D.sort=i,D.sortTouched=!0):(D.sort=w,D.sortTouched=!1),a!==null&&Ae.includes(Number(a))?(D.limit=Number(a),D.limitTouched=!0):(D.limit=C,D.limitTouched=!1),D.urlTouched=o}function Re(e={}){let t=Object.prototype.hasOwnProperty,n=n=>t.call(e,n),r=(t,r)=>n(t)?e[t]:r,i=r(`category1`,D.selectedCategory1),a=r(`category2`,D.selectedCategory2),o=n(`sort`)?e.sort:D.sortTouched?D.sort:void 0,s=n(`limit`)?e.limit:D.limitTouched?D.limit:void 0,c=r(`search`,D.searchTerm),l=Number.isFinite(D.currentPage)&&D.currentPage>0?D.currentPage:1,u=r(`current`,l),d=n(`current`),f=!!(i||a||c||o&&D.sortTouched||s&&D.limitTouched),p=Number(u),m=d&&(f||p>1);return{category1:i,category2:a,sort:o,limit:s,search:c,current:u,forceCurrent:m}}function ze({category1:e,category2:t,sort:n,limit:r,search:i,current:a,forceCurrent:o}={}){let s=new URLSearchParams;if(e&&s.set(`category1`,e),t&&s.set(`category2`,t),n&&s.set(`sort`,n),r!=null){let e=Number(r);Number.isFinite(e)&&e>0&&s.set(`limit`,String(Math.trunc(e)))}i&&s.set(`search`,i);let c=Number(a),l=!!i;return Number.isFinite(c)&&(c>1||l||o)&&s.set(`current`,String(Math.max(1,Math.trunc(c)))),s}function Be(e={}){let t=Re(e);return ze(t)}function A(e={}){var t;if((t=D.route)?.name!==`home`)return;let{force:n,...r}=e;if(!n&&!D.urlTouched)return;let i=new URL(window.location.href),a=Be(r);i.search=a.toString(),window.history.replaceState(window.history.state,``,i.toString())}function Ve(e={}){let t=k(``),n=Be(e);return t.search=n.toString(),t}async function He(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function Ue(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function We(){let e=await fetch(`/api/categories`);return await e.json()}function Ge(e){return D.isLoadingProducts?null:(D.isLoadingProducts=!0,D.productsError=null,D.loadMoreError=null,D.currentPage=0,D.products=[],D.hasMoreProducts=!0,D.totalProducts=0,e&&e(),{nextPage:1})}function Ke(e){var t;return(t=D.route)?.name!==`home`||D.isLoadingProducts||D.isLoadingMore||!D.hasMoreProducts?null:(D.isLoadingMore=!0,D.loadMoreError=null,e&&e(),{nextPage:D.currentPage+1})}async function qe(e){var t,n,r;let i={limit:D.limit,page:e,sort:D.sort,...D.selectedCategory1?{category1:D.selectedCategory1}:{},...D.selectedCategory2?{category2:D.selectedCategory2}:{},...D.searchTerm?{search:D.searchTerm}:{}};console.log(`🔍 API 호출:`,i);let a=await He(i);return console.log(`📥 API 응답:`,{productsCount:(a==null||(t=a.products)==null?void 0:t.length)??0,totalCount:(a==null||(n=a.pagination)==null?void 0:n.total)??0,page:(a==null||(r=a.pagination)==null?void 0:r.page)??0}),a}function Je(e,{append:t,requestedPage:n},r){var i,a,o,s;let c=e?.products??[],l=(e==null||(i=e.pagination)==null?void 0:i.page)??n,u=(e==null||(a=e.pagination)==null?void 0:a.hasNext)??c.length>=D.limit,d=e==null||(o=e.pagination)==null?void 0:o.total;D.products=t?[...D.products,...c]:c,D.currentPage=l,D.hasMoreProducts=u,typeof d==`number`?D.totalProducts=d:t||(D.totalProducts=D.products.length),console.log(`📦 총 상품 개수 업데이트:`,D.totalProducts,`개`,{category1:D.selectedCategory1,category2:D.selectedCategory2,search:D.searchTerm,products:D.products.length,totalFromAPI:d}),(s=D.route)?.name===`home`&&r&&r({current:D.currentPage,category1:D.selectedCategory1,category2:D.selectedCategory2,force:!0})}function Ye(e){if(e){D.loadMoreError=Oe;return}D.productsError=De}function Xe(e,t){e?D.isLoadingMore=!1:D.isLoadingProducts=!1,t&&t()}async function j({append:e=!1}={},t,n,r){var i;if((i=D.route)?.name!==`home`)return;let a=e?Ke(t):Ge(t);if(!a)return;let{nextPage:o}=a;try{let t=await qe(o);Je(t,{append:e,requestedPage:o},r)}catch(t){console.error(`상품 목록을 불러오지 못했습니다.`,t),Ye(e),n&&n()}finally{Xe(e,t)}}async function Ze(e,t,n){D.detail=E(),D.detail.isLoading=!0,t&&t();try{var r;let t=await Ue(e);if((r=D.route)?.name!==`detail`||D.route.params.productId!==e)return;let n=[];try{if(t.category1){let e=await He({limit:12,category1:t.category1,...t.category2?{category2:t.category2}:{}});n=(e?.products??[]).filter(e=>e.productId!==t.productId).slice(0,4)}}catch(e){console.error(`관련 상품을 불러오지 못했습니다.`,e),n=[]}D.detail.product={...t,relatedProducts:n}}catch(t){var i;if((i=D.route)?.name!==`detail`||D.route.params.productId!==e)return;console.error(`상품 상세 정보를 불러오지 못했습니다.`,t),D.detail.error=ke,n&&n()}finally{var a;(a=D.route)?.name===`detail`&&D.route.params.productId===e&&(D.detail.isLoading=!1,t&&t())}}async function Qe(e,t){if(D.categoriesLoaded){D.isLoadingCategories=!1;return}if(!(D.isLoadingCategories&&Object.keys(D.categories).length>0)){D.isLoadingCategories=!0;try{let e=await We();D.categories=e??{},D.categoriesLoaded=!0}catch(e){console.error(`카테고리 정보를 불러오지 못했습니다.`,e),D.categories={},D.categoriesLoaded=!1,t&&t()}finally{var n;D.isLoadingCategories=!1,(n=D.route)?.name===`home`&&e&&e()}}}function $e(e,t,n){let r=D.selectedCategory1!==e||D.selectedCategory2!==null;r?(D.isLoadingProducts=!1,D.isLoadingMore=!1,D.productsError=null,D.loadMoreError=null,D.products=[],D.totalProducts=0,D.currentPage=0,D.selectedCategory1=e,D.selectedCategory2=null,D.urlTouched=!0,t&&t(),n&&n()):t&&t()}function et(e,t,n,r){let i=D.selectedCategory1!==e||D.selectedCategory2!==t;i?(D.isLoadingProducts=!1,D.isLoadingMore=!1,D.productsError=null,D.loadMoreError=null,D.products=[],D.totalProducts=0,D.currentPage=0,D.selectedCategory1=e,D.selectedCategory2=t,D.urlTouched=!0,n&&n(),r&&r()):n&&n()}function tt(e,t){let n=D.selectedCategory1!==null||D.selectedCategory2!==null||D.searchTerm!==``;if(!n){e&&e();return}D.selectedCategory1=null,D.selectedCategory2=null,D.searchTerm=``,D.currentPage=0,D.urlTouched=!0,A({current:1,category1:null,category2:null,search:null}),t&&t()}function nt(e,t,n){let r=e||null,i=D.selectedCategory1!==r||D.selectedCategory2!==null||D.searchTerm!==``;D.selectedCategory1=r,D.selectedCategory2=null,i?(D.urlTouched=!0,A({current:1,category1:r,category2:null,search:D.searchTerm}),n&&n()):t&&t()}const M=()=>`
    ${s({headerProps:{showBack:!1},top:`<section id="search-section"></section>`,main:`<section id="product-section"></section>`})}
  `;let N=!1,P=!1;function rt(){N=!1,P=!1}function it(e,{attachHeaderNavigation:t,initializeSearchSection:n,updateSearchUI:r,renderProductSection:i,setupLoadMoreObserver:a}){N||(e.innerHTML=M(),N=!0,P=!1,t(e));let o=document.getElementById(`search-section`),s=document.getElementById(`product-section`);(!o||!s)&&(e.innerHTML=M(),N=!0,P=!1,t(e)),P||n(),r(),i(),a(e)}function at({onSearchInputKeyDown:e,onSelectLimit:t,onSelectSort:n,onCategoryBreadcrumbClick:r,onCategoryButtonsClick:i}){let a=document.getElementById(`search-section`);if(!a)return;a.innerHTML=h({loading:D.isLoadingCategories,limit:D.limit,sort:D.sort,selectedCategory1:D.selectedCategory1,selectedCategory2:D.selectedCategory2,categories:D.categories}),P=!0;let o=document.getElementById(`search-input`);o&&(o.value=D.searchTerm,o.addEventListener(`keydown`,e));let s=document.getElementById(`limit-select`);s&&s.addEventListener(`change`,t);let c=document.getElementById(`sort-select`);c&&c.addEventListener(`change`,n);let l=document.getElementById(`category-breadcrumb`);l&&l.addEventListener(`click`,r);let u=document.getElementById(`category-buttons`);u&&u.addEventListener(`click`,i)}function F(){if(!P)return;let e=document.getElementById(`search-input`);e&&(e.value=D.searchTerm);let t=document.getElementById(`category-breadcrumb`);t&&(t.innerHTML=te({selectedCategory1:D.selectedCategory1,selectedCategory2:D.selectedCategory2}));let n=document.getElementById(`category-buttons`);n&&(n.innerHTML=ne({categories:D.categories,selectedCategory1:D.selectedCategory1,selectedCategory2:D.selectedCategory2,loading:D.isLoadingCategories}));let r=document.getElementById(`limit-select`);r&&(r.value=String(D.limit));let i=document.getElementById(`sort-select`);i&&(i.value=D.sort)}function ot({onAddToCart:e,onProductCardClick:t,onRetry:n,onLoadMoreRetry:r}){let i=document.getElementById(`product-section`);if(!i)return;i.innerHTML=_e({loading:D.isLoadingProducts,loadingMore:D.isLoadingMore,products:D.products,error:D.productsError,hasMore:D.hasMoreProducts,loadMoreError:D.loadMoreError,totalCount:D.totalProducts});let a=i.querySelectorAll(`.add-to-cart-btn`);a.forEach(t=>{t.addEventListener(`click`,n=>{n.preventDefault(),n.stopPropagation();let r=t.dataset.productId;r&&e(r,1)})});let o=i.querySelector(`#products-retry-button`);o&&o.addEventListener(`click`,n,{once:!0});let s=i.querySelector(`#products-load-more-retry-button`);s&&s.addEventListener(`click`,r,{once:!0});let c=i.querySelectorAll(`.product-card`);c.forEach(e=>{e.addEventListener(`click`,t)})}const st=({navProps:e={},contentProps:t={},bottom:n=``}={})=>`
    ${s({headerProps:{showBack:!0},top:ie(e),main:ue(t),bottom:n})}
  `;function ct(e,{disconnectLoadMoreObserver:t,attachDetailEvents:n}){t(),e.innerHTML=st({navProps:{product:D.detail.product,loading:D.detail.isLoading},contentProps:{product:D.detail.product,loading:D.detail.isLoading,error:D.detail.error}}),n(e)}function lt(e,t){if(e.target.closest(`.add-to-cart-btn`)){e.stopPropagation();return}let n=e.currentTarget,r=n.dataset.productId;r&&t&&t(r)}function ut(e,t,n){let r=e.target.closest(`button`);if(r){if(r.dataset.breadcrumb===`reset`){t&&t(e);return}if(r.dataset.breadcrumb===`category1`){n&&n(e);return}}}function dt(e,t,n){let r=e.target.closest(`button`);if(r){if(r.dataset.category2){n&&n(e);return}r.dataset.category1&&t&&t(e)}}function ft(e,t,n){e.preventDefault();let r=e.target.closest(`[data-category1]`);if(!r)return;let{category1:i}=r.dataset;i&&$e(i,t,n)}function pt(e,t,n){e.preventDefault();let r=e.target.closest(`[data-category2]`);if(!r)return;let{category1:i,category2:a}=r.dataset;!i||!a||et(i,a,t,n)}function mt(e,t,n){e.preventDefault();let r=e.target.closest(`[data-breadcrumb="reset"]`);r&&tt(t,n)}function ht(e,t,n){e.preventDefault();let r=e.target.closest(`[data-breadcrumb="category1"]`);if(!r)return;let{category1:i}=r.dataset;nt(i,t,n)}function gt(e,t,n){if(e.key!==`Enter`)return;let r=e.target;if(!(r instanceof HTMLInputElement))return;e.preventDefault();let i=r.value.trim();D.searchTerm!==i&&(D.searchTerm=i,D.urlTouched=!0,n&&n({current:1,category1:D.selectedCategory1,category2:D.selectedCategory2,search:i||null}),t&&t())}function _t(){return Object.values(D.cartItems??{})}function I(){let e=_t(),t=e.length,n=e.reduce((e,t)=>{var n;return e+(Number(t==null||(n=t.product)==null?void 0:n.lprice)||0)*(t?.quantity??0)},0),r=e.filter(e=>e?.selected),i=r.length,a=r.reduce((e,t)=>{var n;return e+(Number(t==null||(n=t.product)==null?void 0:n.lprice)||0)*(t?.quantity??0)},0);return{items:e,totalCount:t,totalPrice:n,selectedCount:i,selectedPrice:a}}function L(e){let t=document.getElementById(`cart-count-badge`);if(!t)return;let n=e??I().totalCount;n>0?(t.textContent=String(n),t.classList.remove(`hidden`)):(t.textContent=``,t.classList.add(`hidden`))}function vt(e){var t,n;let r=D.products.find(t=>t?.productId===e);return r||(((t=D.detail)==null||(t=t.product)==null?void 0:t.productId)===e?D.detail.product:(n=D.cartItems[e])?.product??null)}function yt(e,t,n,r){if(!e)return;let i=Math.max(1,Number(t)||1),a=vt(e);if(!a){console.warn(`상품 정보를 찾을 수 없어 장바구니에 담지 못했습니다.`,e),r&&r();return}let o=Number(a.lprice??a.price??0),s=D.cartItems[e];s||(D.cartItems[e]={product:{productId:e,title:a.title??``,image:a.image??``,lprice:o},quantity:0,selected:!1}),D.cartItems[e].quantity+=i,n&&n(),r&&r(),T(D.cartItems)}function bt(e,t){let n=D.cartItems[e];n&&(n.quantity+=1,T(D.cartItems),t&&t())}function xt(e,t,n,r){let i=D.cartItems[e];i&&(i.quantity<=1?(delete D.cartItems[e],T(D.cartItems),r&&r(),n&&n(e)):(--i.quantity,T(D.cartItems),t&&t()))}function St(e,t,n){D.cartItems[e]&&(delete D.cartItems[e],T(D.cartItems),t&&t(e),n&&n())}function Ct(e,t){Object.keys(D.cartItems).length!==0&&(D.cartItems={},e&&e(),t&&t(),T(D.cartItems))}function wt(e){let{selectedCount:t,selectedPrice:n}=I();if(e&&e(),t===0){console.info(`선택된 상품이 없습니다.`);return}console.info(`선택한 ${t}개의 상품, 총 ${n}원 결제 진행 (모의).`)}let Tt=!1;function Et(){return Tt}function R(e){Tt=e}function Dt({attachCartModalEvents:e,attachCartEscapeListener:t,detachCartEscapeListener:n}){var r;let i=document.querySelector(`main`),a=!(i==null||(r=i.nextElementSibling)==null||(r=r.classList)==null)&&r.contains(`cart-modal`)?i.nextElementSibling:null;if(!D.isCartOpen){a&&a.remove(),n(),R(!1),L();return}let{items:o,totalCount:s,totalPrice:c,selectedCount:l,selectedPrice:u}=I(),d=a;if(!d&&i){let e=ye({items:o,totalCount:s,totalPrice:c,selectedCount:l,selectedPrice:u});i.insertAdjacentHTML(`afterend`,e),d=i.nextElementSibling}else d&&(R(!1),d.innerHTML=ye({items:o,totalCount:s,totalPrice:c,selectedCount:l,selectedPrice:u}));d&&d.classList.contains(`cart-modal`)&&(e(d),t(),L(s))}function z({onAttachCartModalEvents:e}){if(!D.isCartOpen)return;let t=document.querySelector(`.cart-modal`);t&&(Object.keys(D.cartItems).forEach(e=>{let n=D.cartItems[e],r=t.querySelector(`.cart-item-checkbox[data-product-id="${e}"]`);r&&r.checked!==n.selected&&(r.checked=n.selected)}),B(e))}function B(e){if(!D.isCartOpen)return;let t=document.querySelector(`.cart-modal`);if(!t)return;let{totalCount:n,selectedCount:r,selectedPrice:i,totalPrice:a}=I(),o=t.querySelector(`.border-t.border-gray-200.p-4.bg-gray-50`);if(o){let n=e=>{let t=Number(e)||0;return`${t.toLocaleString()}원`};r>0?o.innerHTML=`
        <div class="space-y-3">
          <div class="flex items-center justify-between text-sm text-gray-600">
            <span>선택한 상품</span>
            <span class="font-medium text-gray-900">${r}개 / ${n(i)}</span>
          </div>
          <div class="flex items-center justify-between text-sm text-gray-600">
            <span>총 금액</span>
            <span class="text-lg font-bold text-blue-600">${n(a)}</span>
          </div>
          <button
            id="cart-modal-remove-selected-btn"
            class="w-full bg-red-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-600 transition"
            data-cart-action="remove-selected"
          >
            선택한 상품 삭제
          </button>
          <div class="flex gap-2">
            <button
              id="cart-modal-clear-cart-btn"
              class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition"
              data-cart-action="clear"
            >
              전체 비우기
            </button>
            <button
              class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition"
              data-cart-action="checkout"
            >
              구매하기
            </button>
          </div>
        </div>
      `:o.innerHTML=`
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-gray-900">총 금액</span>
            <span class="text-lg font-bold text-blue-600">${n(a)}</span>
          </div>
          <div class="flex gap-2 pt-1">
            <button
              id="cart-modal-clear-cart-btn"
              class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 transition"
              data-cart-action="clear"
            >
              전체 비우기
            </button>
            <button
              class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition"
              data-cart-action="checkout"
            >
              구매하기
            </button>
          </div>
        </div>
      `,R(!1),e&&e(t)}let s=t.querySelector(`.cart-select-all-checkbox`);if(s){let e=r>0&&r===n;s.checked!==e&&(s.checked=e);let t=s.closest(`label`);if(t){let e=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,null),i;for(;i=e.nextNode();)if(i.textContent.trim().startsWith(`전체선택`)){i.textContent=`전체선택 (${r}/${n})`;break}}}let c=t.querySelector(`h2.text-lg.font-bold.text-gray-900`);if(c)if(n>0){let e=c.querySelector(`span`);if(e)e.textContent=`(${n}개)`;else{let e=document.createElement(`span`);e.className=`text-sm font-medium text-gray-500`,e.textContent=`(${n}개)`,c.appendChild(e)}}else{let e=c.querySelector(`span`);e&&e.remove()}}function Ot(e,t){if(!D.isCartOpen)return;let n=document.querySelector(`.cart-modal`);if(!n)return;let r=D.cartItems[e];if(!r)return;let{product:i,quantity:a}=r,o=Number(i?.lprice)||0,s=o*a,c=n.querySelector(`#quantity-input-${e}`);c&&(c.value=a);let l=n.querySelector(`.cart-item[data-product-id="${e}"]`);if(l){let e=l.querySelector(`.flex.flex-col.items-end.gap-2`);if(e){let t=e.querySelector(`p.text-sm.font-medium.text-gray-900`);if(t){let e=e=>{let t=Number(e)||0;return`${t.toLocaleString()}원`};t.textContent=e(s)}}}B(t)}function kt(e,t,n){if(!D.isCartOpen)return;let r=document.querySelector(`.cart-modal`);if(!r)return;let i=r.querySelector(`.cart-item[data-product-id="${e}"]`);if(i&&i.remove(),Object.keys(D.cartItems).length===0){n&&n();return}B(t)}function V(e,t){e.preventDefault(),t&&t()}function At(e,{onCloseCartModal:t,onIncrementCartItem:n,onDecrementCartItem:r,onRemoveCartItem:i,onRemoveSelectedCartItems:a,onClearCartItems:o,onCheckoutCart:s}){let c=e.target.closest(`[data-cart-action]`);if(!c)return;e.preventDefault(),e.stopPropagation();let{cartAction:l,cartProductId:u}=c.dataset;switch(l){case`close`:t&&t();break;case`increase`:u&&n&&n(u);break;case`decrease`:u&&r&&r(u);break;case`remove`:u&&i&&i(u);break;case`remove-selected`:a&&a();break;case`clear`:o&&o();break;case`checkout`:s&&s();break;default:break}}function jt(e,{onCartCheckboxToggle:t,onCartSelectAllChange:n}){let r=e.target.closest(`.cart-item-checkbox`);if(r){t&&t(r);return}let i=e.target.closest(`.cart-select-all-checkbox`);i&&n&&n(i.checked)}function Mt(e,t){let n=e.dataset.productId;!n||!D.cartItems[n]||(D.cartItems[n].selected=e.checked,t&&t(),T(D.cartItems))}function Nt(e,t){Object.keys(D.cartItems).forEach(t=>{D.cartItems[t].selected=e}),t&&t(),T(D.cartItems)}function Pt(e,t,n){bt(e,()=>{if(t&&t(e),n){let{totalCount:e}=I();n(e)}})}function Ft(e,t,n,r,i){xt(e,()=>{if(t&&t(e),i){let{totalCount:e}=I();i(e)}},n,r)}function It(e,t,n,r){if(St(e,t,n),r){let{totalCount:e}=I();r(e)}}function Lt(e,t){Ct(e,t)}function Rt(e){wt(e)}function zt({onUpdateCartBadge:e,onRenderCartModal:t,onUpdateCartModalSelection:n,onShowToast:r}){let i=Object.keys(D.cartItems).length,a=[];if(Object.keys(D.cartItems).forEach(e=>{var t;(t=D.cartItems[e])?.selected&&(a.push(e),delete D.cartItems[e])}),Object.keys(D.cartItems).length!==i){if(e){let{totalCount:t}=I();e(t)}if(D.isCartOpen){let e=document.querySelector(`.cart-modal`);e&&(a.forEach(t=>{let n=e.querySelector(`.cart-item[data-product-id="${t}"]`);n&&n.remove()}),Object.keys(D.cartItems).length===0?t&&t():n&&n())}r&&r(),T(D.cartItems)}}let H=!1;function Bt(e,t){yt(e,t,L,()=>S(Se))}function Vt(e,t,n){return{onCloseCartModal:n,onIncrementCartItem:t=>Pt(t,t=>Ot(t,e),L),onDecrementCartItem:n=>Ft(n,t=>Ot(t,e),n=>kt(n,e,()=>t()),()=>S(_),L),onRemoveCartItem:n=>It(n,n=>kt(n,e,()=>t()),()=>S(_),L),onRemoveSelectedCartItems:()=>zt({onUpdateCartBadge:L,onRenderCartModal:()=>t(),onUpdateCartModalSelection:()=>z({onAttachCartModalEvents:e}),onShowToast:()=>S(_)}),onClearCartItems:()=>Lt(()=>t(),()=>S(_)),onCheckoutCart:()=>Rt(()=>S(Ce))}}function Ht(e,t,n,r,i){return Dt({attachCartModalEvents:t=>e(t,Vt(e,r,i)),attachCartEscapeListener:t,detachCartEscapeListener:n})}function U(e,t){Et()||(e.addEventListener(`click`,e=>At(e,t)),e.addEventListener(`change`,e=>jt(e,{onCartCheckboxToggle:e=>Mt(e,()=>z({onAttachCartModalEvents:e=>U(e,t)})),onCartSelectAllChange:e=>Nt(e,()=>z({onAttachCartModalEvents:e=>U(e,t)}))})),R(!0))}function Ut(e,t){e.key===`Escape`&&t()}function Wt(e){if(H)return;let t=t=>Ut(t,e);document.addEventListener(`keydown`,t),H={attached:!0,handler:t}}function Gt(){!H||!H.attached||(document.removeEventListener(`keydown`,H.handler),H=!1)}function Kt(e){D.isCartOpen=!0,e()}function qt(e){D.isCartOpen&&(D.isCartOpen=!1,e())}function Jt(e,t){let n=e.target.closest(`[data-navigate]`);if(n){if(n.dataset.navigate===`home`){e.preventDefault(),W({updateUrl:!1}),t&&t({replace:!1});return}if(n.dataset.navigate===`home-category`){e.preventDefault();let{category1:r,category2:i}=n.dataset;t&&t({category1:r||null,category2:i||null,current:1,search:null})}}}function W({updateUrl:e=!0}={}){var t;D.selectedCategory1=null,D.selectedCategory2=null,D.searchTerm=``,D.currentPage=0,e&&(t=D.route)?.name===`home`&&A({current:1,category1:null,category2:null,search:null})}function Yt(e,{attachHeaderNavigation:t,onNavigateToHome:n,onNavigateToDetail:r,onAdjustQuantity:i,onNormalizeQuantityInput:a,onAddToCart:o}){t(e);let s=e.querySelectorAll(`[data-navigate="home"]`);s.forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),W({updateUrl:!1}),n&&n({replace:!1})})});let c=e.querySelector(`.detail-breadcrumb`);c&&c.addEventListener(`click`,e=>Jt(e,n));let l=e.querySelectorAll(`.related-product-card`);l.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.productId;t&&r&&r(t)})});let u=e.querySelector(`[data-quantity-decrease]`),d=e.querySelector(`[data-quantity-increase]`),f=e.querySelector(`#quantity-input`),p=e.querySelector(`.add-to-cart`);u&&f&&i&&u.addEventListener(`click`,()=>i(f,-1)),d&&f&&i&&d.addEventListener(`click`,()=>i(f,1)),f&&a&&f.addEventListener(`input`,()=>a(f)),p&&f&&o&&p.addEventListener(`click`,()=>o(p.dataset.productId,f.value))}function Xt(e,t){let n=Number(e.value)||1,r=Number(e.min)||1,i=Number(e.max)||1/0,a=Math.min(Math.max(n+t,r),i);e.value=String(a)}function Zt(e){let t=Number(e.min)||1,n=Number(e.max)||1/0,r=Number(e.value);Number.isFinite(r)||(r=t),r=Math.min(Math.max(r,t),n),e.value=String(r)}function G(e,{onNavigateToHome:t,onCartIconClick:n}){let r=e.querySelectorAll(`[data-link]`);r.forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),D.urlTouched=!1,D.limitTouched=!1,D.sortTouched=!1,D.limit=C,D.sort=w,W({updateUrl:!1});let n=k(``);window.history.pushState({},``,n.toString()),t&&t()})});let i=e.querySelector(`#cart-icon-btn`);i&&n&&i.addEventListener(`click`,e=>n(e))}let K=null;function Qt(e,t){var n;if((n=D.route)?.name!==`home`){q();return}if(K&&(K.disconnect(),K=null),D.loadMoreError)return;let r=e.querySelector(`#products-load-more-trigger`);r&&(K=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&t&&t()})},{root:null,rootMargin:`0px 0px 200px 0px`,threshold:0}),K.observe(r))}function q(){K&&(K.disconnect(),K=null)}const $t=async()=>{let{worker:e}=await r(async()=>{let{worker:e}=await import(`./browser-CcyfQrG1.js`);return{worker:e}},[]);return e.start({onUnhandledRequest:`bypass`,serviceWorker:{url:`/front_7th_chapter2-1/mockServiceWorker.js`}})};function en(){let e=()=>Ht(U,()=>Wt(()=>X()),Gt,e,()=>X());return e}const J=en();function Y(){Kt(J)}function X(){qt(J)}function Z(){var e,t;let n=document.getElementById(`root`);n&&((e=D.route)?.name===`detail`?ct(n,{disconnectLoadMoreObserver:q,attachDetailEvents:e=>Yt(e,{attachHeaderNavigation:e=>G(e,{onNavigateToHome:$,onCartIconClick:e=>V(e,Y)}),onNavigateToHome:rn,onNavigateToDetail:nn,onAdjustQuantity:Xt,onNormalizeQuantityInput:Zt,onAddToCart:Bt})}):(t=D.route)?.name===`home`?it(n,{attachHeaderNavigation:e=>G(e,{onNavigateToHome:$,onCartIconClick:e=>V(e,Y)}),initializeSearchSection:()=>at({onSearchInputKeyDown:e=>gt(e,Q,A),onSelectLimit:an,onSelectSort:on,onCategoryBreadcrumbClick:e=>ut(e,e=>mt(e,F,Q),e=>ht(e,F,Q)),onCategoryButtonsClick:e=>dt(e,e=>ft(e,F,Q),e=>pt(e,F,Q))}),updateSearchUI:F,renderProductSection:()=>ot({onAddToCart:Bt,onProductCardClick:e=>lt(e,nn),onRetry:()=>j({append:!1},Z,()=>S(v),A),onLoadMoreRetry:()=>j({append:!0},Z,()=>S(v),A)}),setupLoadMoreObserver:e=>Qt(e,()=>j({append:!0},Z,()=>S(v),A))}):tn(n),J())}function tn(e){q(),rt(),e.innerHTML=xe(),G(e,{onNavigateToHome:$,onCartIconClick:e=>V(e,Y)})}function Q({append:e=!1}={}){return j({append:e},Z,()=>S(v),A)}function nn(e){Fe(e,$)}function rn({replace:e=!1,category1:t,category2:n,current:r,search:i}={}){Ie({replace:e,category1:t,category2:n,current:r,search:i},Ve,$)}function an(e){let t=Number(e.target.value);if(Number.isNaN(t)||D.limit===t){Z();return}D.isLoadingProducts=!1,D.isLoadingMore=!1,D.productsError=null,D.loadMoreError=null,D.products=[],D.currentPage=0,D.limit=t,D.limitTouched=!0,D.urlTouched=!0,A({current:1,limit:t}),Q()}function on(e){var t;let n=e.target.value;if(!n||D.sort===n||(t=D.route)?.name!==`home`){Z();return}D.isLoadingProducts=!1,D.isLoadingMore=!1,D.productsError=null,D.loadMoreError=null,D.products=[],D.currentPage=0,D.sort=n,D.sortTouched=!0,D.urlTouched=!0,A({current:1,sort:n}),j({append:!1},Z,()=>S(v),A)}async function $(){if(X(),D.route=O(),D.route.name===`detail`){await Ze(D.route.params.productId,Z,()=>S(v));return}if(D.route.name!==`home`){rt(),D.detail=E(),D.isLoadingProducts=!1,D.productsError=null,Z();return}Le(),D.detail=E(),Z(),await Qe(Z,()=>S(v)),await j({append:!1},Z,()=>S(v),A)}async function sn(){Pe(O()),window.addEventListener(`popstate`,()=>{$()}),await $()}$t().then(sn);