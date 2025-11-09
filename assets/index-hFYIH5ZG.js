(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const e=()=>`
		<footer class="bg-white shadow-sm sticky top-0 z-40">
		  <div class="max-w-md mx-auto py-8 text-center text-gray-500">
			<p>© ${new Date().getFullYear()} 항해플러스 프론트엔드 쇼핑몰</p>
		  </div>
		</footer>
	`,t=()=>`
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
	`,n=()=>Promise.resolve();function r(){document.body.innerHTML=`
  ${t()}
  ${e()}
  `}n().then(r);