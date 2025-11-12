(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=`modulepreload`,t=function(e){return`/front_7th_chapter2-1/`+e},n={},r=function(r,i,a){let o=Promise.resolve();if(i&&i.length>0){let r=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},s=document.getElementsByTagName(`link`),c=document.querySelector(`meta[property=csp-nonce]`),l=c?.nonce||c?.getAttribute(`nonce`);o=r(i.map(r=>{if(r=t(r,a),r in n)return;n[r]=!0;let i=r.endsWith(`.css`),o=i?`[rel="stylesheet"]`:``,c=!!a;if(c)for(let e=s.length-1;e>=0;e--){let t=s[e];if(t.href===r&&(!i||t.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${r}"]${o}`))return;let u=document.createElement(`link`);if(u.rel=i?`stylesheet`:e,i||(u.as=`script`),u.crossOrigin=``,u.href=r,l&&u.setAttribute(`nonce`,l),document.head.appendChild(u),i)return new Promise((e,t)=>{u.addEventListener(`load`,e),u.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${r}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(e=>{for(let t of e||[]){if(t.status!==`rejected`)continue;s(t.reason)}return r().catch(s)})};async function i(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function a(e){let t=await fetch(`/api/products/${e}`);return await t.json()}async function o(){let e=await fetch(`/api/categories`);return await e.json()}const s=`
	<button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
		</svg>
	</button>
`,c=({showBack:e=!1}={})=>{let t=e?`상품 상세`:`쇼핑몰`,n=e?`<span class="text-xl font-bold text-gray-900">${t}</span>`:`<a href="/" data-link="" class="text-xl font-bold text-gray-900">${t}</a>`;return`
		<header class="bg-white shadow-sm sticky top-0 z-40">
			<div class="max-w-md mx-auto px-4 py-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						${e?s:``}
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
`,m=(e={},t=null)=>{let n=Object.keys(e);return n.length===0?`<span class="text-sm text-gray-400">표시할 카테고리가 없습니다.</span>`:n.map(e=>{let n=e===t,r=`category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors`,i=n?`bg-blue-600 border-blue-600 text-white`:`bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;return`
        <button data-category1="${e}" class="${r} ${i}">
          ${e}
        </button>
      `}).join(``)},h=({selectedCategory1:e,selectedCategory2:t})=>{let n=[`<span class="text-sm text-gray-600">카테고리:</span>`,`<button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>`];return e&&n.push(`<span class="text-xs text-gray-500">&gt;</span>`,`<button data-breadcrumb="category1" data-category1="${e}" class="text-xs hover:text-blue-800 hover:underline">${e}</button>`),t&&n.push(`<span class="text-xs text-gray-500">&gt;</span>`,`<span class="text-xs text-gray-600 cursor-default">${t}</span>`),n.join(` `)},g=({categories:e,selectedCategory1:t,selectedCategory2:n,loading:r})=>{if(r)return p;if(!t)return m(e,t);let i=e?.[t],a=Array.isArray(i)?i:Object.keys(i??{});return n?f({category1:t,activeCategory2:n,category2List:a}):d({category1:t,category2List:a})},ee=(e,t)=>`
  <option value="${e}" ${t===e?`selected`:``}>${e}개</option>
`,te=(e,t,n)=>`
  <option value="${e}" ${t===e?`selected`:``}>${n}</option>
`,ne=({loading:e=!1,limit:t=20,sort:n=`price_asc`,selectedCategory1:r=null,selectedCategory2:i=null,categories:a={}}={})=>`
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
              ${[10,20,50,100].map(e=>ee(e,t)).join(``)}
            </select>
          </div>

          <div class="flex items-center gap-2">
            <label class="text-sm text-gray-600" for="sort-select">정렬:</label>
            <select
              id="sort-select"
              class="text-sm border border-gray-300 rounded px-2 py-1
                focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              ${[[`price_asc`,`가격 낮은순`],[`price_desc`,`가격 높은순`],[`name_asc`,`이름순`],[`name_desc`,`이름 역순`]].map(([e,t])=>te(e,n,t)).join(``)}
            </select>
          </div>
        </div>
      </div>
    </div>
  `,re=({selectedCategory1:e,selectedCategory2:t})=>h({selectedCategory1:e,selectedCategory2:t}),ie=({categories:e,selectedCategory1:t,selectedCategory2:n,loading:r})=>g({categories:e,selectedCategory1:t,selectedCategory2:n,loading:r}),ae=()=>`
  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
  </svg>
`,oe=({product:e,loading:t=!1}={})=>{let n=[`<button data-navigate="home" class="text-sm text-gray-600 hover:text-blue-600 transition-colors">홈</button>`];t?n.push(`<span class="text-sm text-gray-400">로딩 중...</span>`):(e?.category1&&n.push(`<button data-navigate="home-category" data-category1="${e.category1}" class="text-xs text-gray-600 hover:text-blue-600 transition-colors">${e.category1}</button>`),e?.category2&&n.push(`<button data-navigate="home-category" data-category1="${e.category1}" data-category2="${e.category2}" class="text-xs text-gray-600 hover:text-blue-600 transition-colors">${e.category2}</button>`));let r=n.map((e,t)=>t===0?e:`${ae()}${e}`).join(``);return`
    <nav class="mb-4">
      <div class="flex items-center space-x-2 text-sm text-gray-600 detail-breadcrumb">
        ${r}
      </div>
    </nav>
  `},se=`
  <div class="py-20 bg-gray-50 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">상품 정보를 불러오는 중...</p>
    </div>
  </div>
`,_=e=>`
  <div class="bg-white rounded-lg shadow-sm border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">
    <p class="mb-4">${e}</p>
    <button data-navigate="home" class="inline-flex items-center gap-2 rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition">
      상품 목록으로 돌아가기
    </button>
  </div>
`,v=e=>{let t=Number(e);return Number.isNaN(t)?e:`${t.toLocaleString()}원`},ce=(e,t)=>{if(typeof e!=`number`)return``;let n=Math.round(e),r=`
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
          <p class="text-sm font-bold text-blue-600">${v(e.lprice)}</p>
        </div>
      `).join(``)}
    </div>
  `,ue=({product:e,loading:t=!1,error:n=null}={})=>{if(t)return se;if(n)return _(n);if(!e)return _(`상품 정보를 찾을 수 없습니다.`);let{title:r,description:i,image:a,lprice:o,mallName:s,stock:c,rating:l,reviewCount:u,brand:d,maker:f,relatedProducts:p=[]}=e,m=v(o),h=ce(l,u),g=[d,f,s].filter(Boolean).join(` • `);return`
    <article class="space-y-6">
      <section class="bg-white rounded-lg shadow-sm">
        <div class="p-4">
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img src="${a}" alt="${r}" class="w-full h-full object-cover">
          </div>
          <div class="mt-4 space-y-4">
            <header>
              <p class="text-sm text-gray-500 mb-1">${g}</p>
              <h1 class="text-xl font-bold text-gray-900 mb-3">${r}</h1>
              ${h}
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
`,fe=({title:e,image:t,productId:n,lprice:r})=>`
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
	`,pe=`
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
  `},y=e=>{let t=Number(e)||0;return`${t.toLocaleString()}원`},ve=({product:e={},quantity:t=1,selected:n=!1})=>{let{productId:r=``,title:i=``,image:a=``,lprice:o=0}=e??{},s=(Number(o)||0)*t,c=a||`https://via.placeholder.com/64x64?text=No+Image`;return`
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
        <p class="text-sm text-gray-600 mt-1">${y(o)}</p>
        <div class="flex items-center mt-2">
          <button
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
            value="${t}"
            min="1"
            class="quantity-input w-12 h-7 text-center text-sm border-t border-b border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            disabled
            data-cart-product-id="${r}"
          />
          <button
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
        <p class="text-sm font-medium text-gray-900">${y(s)}</p>
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
                            <span class="font-medium text-gray-900">${r}개 / ${y(i)}</span>
                          </div>
                          <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>총 금액</span>
                            <span class="text-lg font-bold text-blue-600">${y(n)}</span>
                          </div>
                          <button
                            class="w-full bg-red-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-600 transition"
                            data-cart-action="remove-selected"
                          >
                            선택한 상품 삭제
                          </button>
                          <div class="flex gap-2">
                            <button
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
                            <span class="text-lg font-bold text-blue-600">${y(n)}</span>
                          </div>
                          <div class="flex gap-2 pt-1">
                            <button
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
  `},b=()=>`
    ${u({headerProps:{showBack:!1},top:`<section id="search-section"></section>`,main:`<section id="product-section"></section>`})}
  `,be=({navProps:e={},contentProps:t={},bottom:n=``}={})=>`
    ${u({headerProps:{showBack:!0},top:oe(e),main:ue(t),bottom:n})}
  `,xe=`
<main class="max-w-md mx-auto px-4 py-4">
<div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
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
</div>
</main>
`,Se=()=>`
    ${u({headerProps:{showBack:!1},main:xe})}
  `,x=`
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
`,S=`
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
`,C=`
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
`;let w=null,T=null,E=null;const Ce=`
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
`,we=()=>w&&document.body.contains(w)?w:(w=document.createElement(`div`),w.className=`pointer-events-none fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 transform space-y-2`,document.body.appendChild(w),w),Te=e=>{let t=()=>{w&&(e.remove(),w.childElementCount||(w.remove(),w=null),E=null)},n=e.querySelector(`#toast-close-btn`);n&&(n.addEventListener(`click`,e=>{e.preventDefault(),t()},{once:!0}),n.removeAttribute(`id`)),T=window.setTimeout(()=>{t()},3e3)},Ee=e=>e===x?`add`:e===S?`delete`:e===C?`error`:e===Ce?`info`:`default`,D=e=>{if(!e)return;let t=Ee(e);if(t===E&&w&&document.body.contains(w))return;let n=we(),r=document.createElement(`div`);r.innerHTML=e.trim();let i=r.firstElementChild;i&&(i.classList.add(`pointer-events-auto`),n.appendChild(i),T&&(window.clearTimeout(T),T=null),E=t,Te(i))},De=`상품 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.`,Oe=`상품을 추가로 불러오지 못했습니다. 다시 시도해 주세요.`,ke=`상품 상세 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.`,O=20,k=`price_asc`,Ae=[10,O,50,100],je=new Set([`price_asc`,`price_desc`,`name_asc`,`name_desc`]);function A(){return{isLoading:!1,error:null,product:null}}const j={products:[],isLoadingProducts:!1,isLoadingMore:!1,productsError:null,loadMoreError:null,limit:O,currentPage:0,hasMoreProducts:!0,sort:k,totalProducts:0,categories:{},categoriesLoaded:!1,isLoadingCategories:!1,route:null,detail:A(),selectedCategory1:null,selectedCategory2:null,searchTerm:``,urlTouched:!1,limitTouched:!1,sortTouched:!1,isCartOpen:!1,cartItems:{}};let M=null,N=!1,P=!1,F=!1,I=!1;const Me=async()=>{let{worker:e}=await r(async()=>{let{worker:e}=await import(`./browser-CcyfQrG1.js`);return{worker:e}},[]);return e.start({onUnhandledRequest:`bypass`,serviceWorker:{url:`/front_7th_chapter2-1/mockServiceWorker.js`}})};j.route=K(),j.cartItems=Ne();function Ne(){try{let e=window.localStorage.getItem(`shopping_cart`);if(!e)return{};let t=JSON.parse(e);if(t&&typeof t==`object`)return Object.fromEntries(Object.entries(t).map(([e,t])=>[e,{product:t.product??{},quantity:Number(t.quantity)||1,selected:!!t.selected}]))}catch(e){console.error(`장바구니 정보를 복원하지 못했습니다.`,e)}return{}}function L(){try{window.localStorage.setItem(`shopping_cart`,JSON.stringify(j.cartItems))}catch(e){console.error(`장바구니 정보를 저장하지 못했습니다.`,e)}}function R(){var e,t;let n=document.getElementById(`root`);n&&((e=j.route)?.name===`detail`?Pe(n):(t=j.route)?.name===`home`?Fe(n):Ie(n),Q())}function Pe(e){H(),e.innerHTML=be({navProps:{product:j.detail.product,loading:j.detail.isLoading},contentProps:{product:j.detail.product,loading:j.detail.isLoading,error:j.detail.error}}),Ve(e)}function Fe(e){N||(e.innerHTML=b(),N=!0,P=!1,V(e));let t=document.getElementById(`search-section`),n=document.getElementById(`product-section`);(!t||!n)&&(e.innerHTML=b(),N=!0,P=!1,V(e)),P||Le(),z(),Re(),Ue(e)}function Ie(e){H(),N=!1,P=!1,e.innerHTML=Se(),V(e)}function Le(){let e=document.getElementById(`search-section`);if(!e)return;e.innerHTML=ne({loading:j.isLoadingCategories,limit:j.limit,sort:j.sort,selectedCategory1:j.selectedCategory1,selectedCategory2:j.selectedCategory2,categories:j.categories}),P=!0;let t=document.getElementById(`search-input`);t&&(t.value=j.searchTerm,t.addEventListener(`keydown`,et));let n=document.getElementById(`limit-select`);n&&n.addEventListener(`change`,Ye);let r=document.getElementById(`sort-select`);r&&r.addEventListener(`change`,Xe);let i=document.getElementById(`category-breadcrumb`);i&&i.addEventListener(`click`,ze);let a=document.getElementById(`category-buttons`);a&&a.addEventListener(`click`,Be)}function z(){if(!P)return;let e=document.getElementById(`search-input`);e&&(e.value=j.searchTerm);let t=document.getElementById(`category-breadcrumb`);t&&(t.innerHTML=re({selectedCategory1:j.selectedCategory1,selectedCategory2:j.selectedCategory2}));let n=document.getElementById(`category-buttons`);n&&(n.innerHTML=ie({categories:j.categories,selectedCategory1:j.selectedCategory1,selectedCategory2:j.selectedCategory2,loading:j.isLoadingCategories}));let r=document.getElementById(`limit-select`);r&&(r.value=String(j.limit));let i=document.getElementById(`sort-select`);i&&(i.value=j.sort)}function Re(){let e=document.getElementById(`product-section`);if(!e)return;e.innerHTML=_e({loading:j.isLoadingProducts,loadingMore:j.isLoadingMore,products:j.products,error:j.productsError,hasMore:j.hasMoreProducts,loadMoreError:j.loadMoreError,totalCount:j.totalProducts});let t=e.querySelectorAll(`.add-to-cart-btn`);t.forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),t.stopPropagation();let n=e.dataset.productId;n&&jt(n,1)})});let n=e.querySelector(`#products-retry-button`);n&&n.addEventListener(`click`,()=>U(),{once:!0});let r=e.querySelector(`#products-load-more-retry-button`);r&&r.addEventListener(`click`,()=>U({append:!0}),{once:!0});let i=e.querySelectorAll(`.product-card`);i.forEach(e=>{e.addEventListener(`click`,We)})}function ze(e){let t=e.target.closest(`button`);if(t){if(t.dataset.breadcrumb===`reset`){qe(e);return}if(t.dataset.breadcrumb===`category1`){Je(e);return}}}function Be(e){let t=e.target.closest(`button`);if(t){if(t.dataset.category2){Ke(e);return}t.dataset.category1&&Ge(e)}}function Ve(e){V(e);let t=e.querySelectorAll(`[data-navigate="home"]`);t.forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),B(),G({replace:!1})})});let n=e.querySelector(`.detail-breadcrumb`);n&&n.addEventListener(`click`,He);let r=e.querySelectorAll(`.related-product-card`);r.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.productId;t&&W(t)})});let i=e.querySelector(`[data-quantity-decrease]`),a=e.querySelector(`[data-quantity-increase]`),o=e.querySelector(`#quantity-input`),s=e.querySelector(`.add-to-cart`);i&&o&&i.addEventListener(`click`,()=>kt(o,-1)),a&&o&&a.addEventListener(`click`,()=>kt(o,1)),o&&o.addEventListener(`input`,()=>At(o)),s&&o&&s.addEventListener(`click`,()=>jt(s.dataset.productId,o.value))}function He(e){let t=e.target.closest(`[data-navigate]`);if(t){if(t.dataset.navigate===`home`){e.preventDefault(),B({updateUrl:!1}),G({replace:!1});return}if(t.dataset.navigate===`home-category`){e.preventDefault();let{category1:n,category2:r}=t.dataset;G({category1:n||null,category2:r||null,current:1,search:null})}}}function B({updateUrl:e=!0}={}){var t;j.selectedCategory1=null,j.selectedCategory2=null,j.searchTerm=``,j.currentPage=0,e&&(t=j.route)?.name===`home`&&$({current:1,category1:null,category2:null,search:null})}function V(e){let t=e.querySelectorAll(`[data-link]`);t.forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),j.urlTouched=!1,j.limitTouched=!1,j.sortTouched=!1,j.limit=O,j.sort=k,B({updateUrl:!1});let t=q(``);window.history.pushState({},``,t.toString()),J()})});let n=e.querySelector(`#cart-icon-btn`);n&&n.addEventListener(`click`,st)}function Ue(e){var t;if((t=j.route)?.name!==`home`){H();return}if(M&&(M.disconnect(),M=null),j.loadMoreError)return;let n=e.querySelector(`#products-load-more-trigger`);n&&(M=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&U({append:!0})})},{root:null,rootMargin:`0px 0px 200px 0px`,threshold:0}),M.observe(n))}function H(){M&&(M.disconnect(),M=null)}async function U({append:e=!1}={}){var t;if((t=j.route)?.name!==`home`)return;let n=e?Qe():Ze();if(!n)return;let{nextPage:r}=n;try{let t=await $e(r);tt(t,{append:e,requestedPage:r})}catch(t){console.error(`상품 목록을 불러오지 못했습니다.`,t),nt(e),D(C)}finally{rt(e)}}function We(e){if(e.target.closest(`.add-to-cart-btn`)){e.stopPropagation();return}let t=e.currentTarget,n=t.dataset.productId;n&&W(n)}function W(e){let t=q(`product/${encodeURIComponent(e)}`);window.history.pushState({productId:e},``,t.toString()),J()}function G({replace:e=!1,category1:t,category2:n,current:r,search:i}={}){let a=Ot({current:r,category1:t,category2:n,search:i});e?window.history.replaceState({},``,a.toString()):window.history.pushState({},``,a.toString()),J()}function Ge(e){e.preventDefault();let t=e.target.closest(`[data-category1]`);if(!t)return;let{category1:n}=t.dataset;if(!n)return;let r=j.selectedCategory1!==n||j.selectedCategory2!==null;j.selectedCategory1=n,j.selectedCategory2=null,r?(j.urlTouched=!0,$({current:1,category1:n,category2:null}),U()):z()}function Ke(e){e.preventDefault();let t=e.target.closest(`[data-category2]`);if(!t)return;let{category1:n,category2:r}=t.dataset;if(!n||!r)return;let i=j.selectedCategory1!==n||j.selectedCategory2!==r;j.selectedCategory1=n,j.selectedCategory2=r,i?(j.urlTouched=!0,$({current:1,category1:n,category2:r}),U()):z()}function qe(e){e.preventDefault();let t=e.target.closest(`[data-breadcrumb="reset"]`);if(!t)return;let n=j.selectedCategory1!==null||j.selectedCategory2!==null||j.searchTerm!==``;if(!n){z();return}B({updateUrl:!1}),j.urlTouched=!0,$({current:1,category1:null,category2:null,search:null}),U()}function Je(e){e.preventDefault();let t=e.target.closest(`[data-breadcrumb="category1"]`);if(!t)return;let{category1:n}=t.dataset,r=n||null,i=j.selectedCategory1!==r||j.selectedCategory2!==null||j.searchTerm!==``;j.selectedCategory1=r,j.selectedCategory2=null,i?(j.urlTouched=!0,$({current:1,category1:r,category2:null,search:j.searchTerm}),U()):z()}function Ye(e){let t=Number(e.target.value);if(Number.isNaN(t)||j.limit===t){R();return}j.limit=t,j.limitTouched=!0,j.urlTouched=!0,$({current:1,limit:t}),U()}function Xe(e){var t;let n=e.target.value;if(!n||j.sort===n||(t=j.route)?.name!==`home`){R();return}j.sort=n,j.sortTouched=!0,j.urlTouched=!0,$({current:1,sort:n}),U()}function Ze(){return j.isLoadingProducts?null:(j.isLoadingProducts=!0,j.productsError=null,j.loadMoreError=null,j.currentPage=0,j.hasMoreProducts=!0,j.totalProducts=0,R(),{nextPage:1})}function Qe(){var e;return(e=j.route)?.name!==`home`||j.isLoadingProducts||j.isLoadingMore||!j.hasMoreProducts?null:(j.isLoadingMore=!0,j.loadMoreError=null,R(),{nextPage:j.currentPage+1})}async function $e(e){return await i({limit:j.limit,page:e,sort:j.sort,...j.selectedCategory1?{category1:j.selectedCategory1}:{},...j.selectedCategory2?{category2:j.selectedCategory2}:{},...j.searchTerm?{search:j.searchTerm}:{}})}function et(e){if(e.key!==`Enter`)return;let t=e.target;if(!(t instanceof HTMLInputElement))return;e.preventDefault();let n=t.value.trim();j.searchTerm!==n&&(j.searchTerm=n,j.urlTouched=!0,$({current:1,category1:j.selectedCategory1,category2:j.selectedCategory2,search:n||null}),U())}function tt(e,{append:t,requestedPage:n}){var r,i,a,o;let s=e?.products??[],c=(e==null||(r=e.pagination)==null?void 0:r.page)??n,l=(e==null||(i=e.pagination)==null?void 0:i.hasNext)??s.length>=j.limit,u=e==null||(a=e.pagination)==null?void 0:a.total;j.products=t?[...j.products,...s]:s,j.currentPage=c,j.hasMoreProducts=l,typeof u==`number`?j.totalProducts=u:t||(j.totalProducts=j.products.length),(o=j.route)?.name===`home`&&$({current:j.currentPage,category1:j.selectedCategory1,category2:j.selectedCategory2})}function nt(e){if(e){j.loadMoreError=Oe;return}j.productsError=De}function rt(e){e?j.isLoadingMore=!1:j.isLoadingProducts=!1,R()}async function it(e){j.detail=A(),j.detail.isLoading=!0,R();try{var t;let n=await a(e);if((t=j.route)?.name!==`detail`||j.route.params.productId!==e)return;let r=[];try{if(n.category1){let e=await i({limit:12,category1:n.category1,...n.category2?{category2:n.category2}:{}});r=(e?.products??[]).filter(e=>e.productId!==n.productId).slice(0,4)}}catch(e){console.error(`관련 상품을 불러오지 못했습니다.`,e),r=[]}j.detail.product={...n,relatedProducts:r}}catch(t){var n;if((n=j.route)?.name!==`detail`||j.route.params.productId!==e)return;console.error(`상품 상세 정보를 불러오지 못했습니다.`,t),j.detail.error=ke,D(C)}finally{var r;(r=j.route)?.name===`detail`&&j.route.params.productId===e&&(j.detail.isLoading=!1,R())}}function K(){let e=`/front_7th_chapter2-1/`,t=e.endsWith(`/`)?e:`${e}/`,n=window.location.pathname;if(t!==`/`&&n.startsWith(t)?n=n.slice(t.length):t===`/`&&n.startsWith(`/`)&&(n=n.slice(1)),n=n.replace(/^\/+/,``).replace(/\/+$/,``),!n)return{name:`home`};let r=n.match(/^product\/([^/]+)$/);return r?{name:`detail`,params:{productId:decodeURIComponent(r[1])}}:{name:`not_found`}}function q(e=``){let t=`/front_7th_chapter2-1/`,n=t.endsWith(`/`)?t:`${t}/`,r=e.startsWith(`/`)?e.slice(1):e;return new URL(`${n}${r}`,window.location.origin)}async function J(){if(Y(),j.route=K(),j.route.name===`detail`){await it(j.route.params.productId);return}if(j.route.name!==`home`){N=!1,P=!1,j.detail=A(),j.isLoadingProducts=!1,j.productsError=null,R();return}wt(),j.detail=A(),await ot(),await U()}async function at(){window.addEventListener(`popstate`,()=>{J()}),await J()}Me().then(at);async function ot(){var e;if(!(j.categoriesLoaded||j.isLoadingCategories)){j.isLoadingCategories=!0,(e=j.route)?.name===`home`&&R();try{let e=await o();j.categories=e??{},j.categoriesLoaded=!0}catch(e){console.error(`카테고리 정보를 불러오지 못했습니다.`,e),j.categories={},j.categoriesLoaded=!1,D(C)}finally{var t;j.isLoadingCategories=!1,(t=j.route)?.name===`home`&&R()}}}function st(e){e.preventDefault(),ct()}function ct(){j.isCartOpen=!0,Q()}function Y(){j.isCartOpen&&(j.isCartOpen=!1,Q())}function lt(){return Object.values(j.cartItems??{})}function X(){let e=lt(),t=e.length,n=e.reduce((e,t)=>{var n;return e+(Number(t==null||(n=t.product)==null?void 0:n.lprice)||0)*(t?.quantity??0)},0),r=e.filter(e=>e?.selected),i=r.length,a=r.reduce((e,t)=>{var n;return e+(Number(t==null||(n=t.product)==null?void 0:n.lprice)||0)*(t?.quantity??0)},0);return{items:e,totalCount:t,totalPrice:n,selectedCount:i,selectedPrice:a}}function Z(e){let t=document.getElementById(`cart-count-badge`);if(!t)return;let n=e??X().totalCount;n>0?(t.textContent=String(n),t.classList.remove(`hidden`)):(t.textContent=``,t.classList.add(`hidden`))}function Q(){let e=document.getElementById(`cart-modal-root`);if(!j.isCartOpen){e&&e.remove(),pt(),I=!1,Z();return}let{items:t,totalCount:n,totalPrice:r,selectedCount:i,selectedPrice:a}=X(),o=e;o||(o=document.createElement(`div`),o.id=`cart-modal-root`,document.body.appendChild(o)),o.innerHTML=ye({items:t,totalCount:n,totalPrice:r,selectedCount:i,selectedPrice:a}),ut(o),ft(),Z(n)}function ut(e){I||(e.addEventListener(`click`,mt),e.addEventListener(`change`,ht),I=!0)}function dt(e){e.key===`Escape`&&Y()}function ft(){F||(document.addEventListener(`keydown`,dt),F=!0)}function pt(){F&&(document.removeEventListener(`keydown`,dt),F=!1)}function mt(e){let t=e.target.closest(`[data-cart-action]`);if(!t)return;e.preventDefault(),e.stopPropagation();let{cartAction:n,cartProductId:r}=t.dataset;switch(n){case`close`:Y();break;case`increase`:r&&xt(r);break;case`decrease`:r&&St(r);break;case`remove`:r&&Ct(r);break;case`remove-selected`:vt();break;case`clear`:yt();break;case`checkout`:bt();break;default:break}}function ht(e){let t=e.target.closest(`.cart-item-checkbox`);if(t){gt(t);return}let n=e.target.closest(`.cart-select-all-checkbox`);n&&_t(n.checked)}function gt(e){let t=e.dataset.productId;!t||!j.cartItems[t]||(j.cartItems[t].selected=e.checked,Q(),L())}function _t(e){Object.keys(j.cartItems).forEach(t=>{j.cartItems[t].selected=e}),Q(),L()}function vt(){let e=Object.keys(j.cartItems).length;Object.keys(j.cartItems).forEach(e=>{var t;(t=j.cartItems[e])?.selected&&delete j.cartItems[e]}),Object.keys(j.cartItems).length!==e&&(Q(),D(S),L())}function yt(){Object.keys(j.cartItems).length!==0&&(j.cartItems={},Q(),D(S),L())}function bt(){let{selectedCount:e,selectedPrice:t}=X();if(D(Ce),e===0){console.info(`선택된 상품이 없습니다.`);return}console.info(`선택한 ${e}개의 상품, 총 ${t}원 결제 진행 (모의).`)}function xt(e){let t=j.cartItems[e];t&&(t.quantity+=1,Q(),L())}function St(e){let t=j.cartItems[e];t&&(t.quantity<=1?(delete j.cartItems[e],D(S)):--t.quantity,Q(),L())}function Ct(e){j.cartItems[e]&&(delete j.cartItems[e],Q(),D(S),L())}function wt(){let e=new URLSearchParams(window.location.search),t=e.get(`category1`),n=e.get(`category2`),r=e.get(`search`)??``,i=e.get(`sort`),a=e.get(`limit`),o=e.has(`category1`)||e.has(`category2`)||e.has(`search`)||e.has(`sort`)||e.has(`limit`)||e.has(`current`);j.selectedCategory1=t||null,j.selectedCategory2=n||null,j.searchTerm=r,i!==null&&je.has(i)?(j.sort=i,j.sortTouched=!0):(j.sort=k,j.sortTouched=!1),a!==null&&Ae.includes(Number(a))?(j.limit=Number(a),j.limitTouched=!0):(j.limit=O,j.limitTouched=!1),j.urlTouched=o}function Tt(e={}){let t=Object.prototype.hasOwnProperty,n=n=>t.call(e,n),r=(t,r)=>n(t)?e[t]:r,i=r(`category1`,j.selectedCategory1),a=r(`category2`,j.selectedCategory2),o=n(`sort`)?e.sort:j.sortTouched?j.sort:void 0,s=n(`limit`)?e.limit:j.limitTouched?j.limit:void 0,c=r(`search`,j.searchTerm),l=Number.isFinite(j.currentPage)&&j.currentPage>0?j.currentPage:1,u=r(`current`,l),d=n(`current`);return{category1:i,category2:a,sort:o,limit:s,search:c,current:u,forceCurrent:d}}function Et({category1:e,category2:t,sort:n,limit:r,search:i,current:a,forceCurrent:o}={}){let s=new URLSearchParams;if(e&&s.set(`category1`,e),t&&s.set(`category2`,t),n&&s.set(`sort`,n),r!=null){let e=Number(r);Number.isFinite(e)&&e>0&&s.set(`limit`,String(Math.trunc(e)))}i&&s.set(`search`,i);let c=Number(a),l=!!i;return Number.isFinite(c)&&(c>1||l||o)&&s.set(`current`,String(Math.max(1,Math.trunc(c)))),s}function Dt(e={}){let t=Tt(e);return Et(t)}function $(e={}){var t;if((t=j.route)?.name!==`home`||!j.urlTouched)return;let n=new URL(window.location.href),r=Dt(e);n.search=r.toString(),window.history.replaceState(window.history.state,``,n.toString())}function Ot(e={}){let t=q(``),n=Dt(e);return t.search=n.toString(),t}function kt(e,t){let n=Number(e.value)||1,r=Number(e.min)||1,i=Number(e.max)||1/0,a=Math.min(Math.max(n+t,r),i);e.value=String(a)}function At(e){let t=Number(e.min)||1,n=Number(e.max)||1/0,r=Number(e.value);Number.isFinite(r)||(r=t),r=Math.min(Math.max(r,t),n),e.value=String(r)}function jt(e,t){if(!e)return;let n=Math.max(1,Number(t)||1),r=Mt(e);if(!r){console.warn(`상품 정보를 찾을 수 없어 장바구니에 담지 못했습니다.`,e),D(C);return}let i=Number(r.lprice??r.price??0),a=j.cartItems[e];a||(j.cartItems[e]={product:{productId:e,title:r.title??``,image:r.image??``,lprice:i},quantity:0,selected:!1}),j.cartItems[e].quantity+=n,Z(),D(x),L()}function Mt(e){var t,n;let r=j.products.find(t=>t?.productId===e);return r||(((t=j.detail)==null||(t=t.product)==null?void 0:t.productId)===e?j.detail.product:(n=j.cartItems[e])?.product??null)}