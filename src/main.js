import { getProducts } from "./api/productApi.js";
import { Home } from "./pages/home.js";

// 상태보관
const state = {
  products: [],
  isLoadingProducts: true,
  isLoadingMore: false,
  productsError: null,
  loadMoreError: null,
  limit: 20,
  currentPage: 0,
  hasMoreProducts: true,
};

let loadMoreObserver = null;

// ?? 모킹 활성화
const enableMocking = async () => {
  const { worker } = await import("./mocks/browser.js");

  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
};

// 현재 state를 기반으로 화면을 그리는 함수.
// Search와 ItemList에 필요한 상태를 내려주고, 이벤트 리스너를 연결한다.
function render() {
  const root = document.getElementById("root"); //html 뿌려주기

  root.innerHTML = Home({
    // 검색에 들어갈 props
    searchProps: {
      loading: state.isLoadingProducts,
      limit: state.limit,
    },
    //item에 들어갈 props
    productProps: {
      loading: state.isLoadingProducts,
      loadingMore: state.isLoadingMore,
      products: state.products,
      error: state.productsError,
      hasMore: state.hasMoreProducts,
      loadMoreError: state.loadMoreError,
    },
  });

  // 페이지당 개수 선택 이벤트를 연결한다.
  const limitSelect = root.querySelector("#limit-select");
  if (limitSelect) {
    limitSelect.value = String(state.limit);
    limitSelect.addEventListener("change", selectLimit, { once: true });
  }

  // 로딩 실패 시 보여주는 재시도 버튼 이벤트를 연결한다.
  const retryButton = root.querySelector("#products-retry-button");
  if (retryButton) {
    retryButton.addEventListener(
      "click",
      () => {
        loadProducts();
      },
      { once: true },
    );
  }

  const loadMoreRetryButton = root.querySelector("#products-load-more-retry-button");
  if (loadMoreRetryButton) {
    loadMoreRetryButton.addEventListener(
      "click",
      () => {
        loadProducts({ append: true });
      },
      { once: true },
    );
  }

  setupLoadMoreObserver(root);
}

function setupLoadMoreObserver(rootElement) {
  if (loadMoreObserver) {
    loadMoreObserver.disconnect();
    loadMoreObserver = null;
  }

  if (state.loadMoreError) {
    return;
  }

  const sentinel = rootElement.querySelector("#products-load-more-trigger");
  if (!sentinel) {
    return;
  }

  loadMoreObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadProducts({ append: true });
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px 200px 0px",
      threshold: 0,
    },
  );

  loadMoreObserver.observe(sentinel);
}

async function loadProducts({ append = false } = {}) {
  if (append) {
    if (state.isLoadingProducts || state.isLoadingMore || !state.hasMoreProducts) {
      return;
    }

    state.isLoadingMore = true;
    state.loadMoreError = null;
    render();
  } else {
    state.isLoadingProducts = true;
    state.productsError = null;
    state.loadMoreError = null;
    state.currentPage = 0;
    state.hasMoreProducts = true;
    render();
  }

  const nextPage = append ? state.currentPage + 1 : 1;

  try {
    const data = await getProducts({ limit: state.limit, page: nextPage });
    const incomingProducts = data?.products ?? [];
    const hasNext = data?.pagination?.hasNext ?? incomingProducts.length >= state.limit;

    state.products = append ? [...state.products, ...incomingProducts] : incomingProducts;
    state.currentPage = data?.pagination?.page ?? nextPage;
    state.hasMoreProducts = hasNext;
  } catch (error) {
    console.error("상품 목록을 불러오지 못했습니다.", error);
    if (append) {
      state.loadMoreError = "상품을 추가로 불러오지 못했습니다. 다시 시도해 주세요.";
    } else {
      state.productsError = "상품 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
    }
  } finally {
    if (append) {
      state.isLoadingMore = false;
    } else {
      state.isLoadingProducts = false;
    }
    render();
  }
}

// 상품 보여줄 갯수 설정
function selectLimit(event) {
  const nextLimit = Number(event.target.value);
  if (Number.isNaN(nextLimit) || state.limit === nextLimit) {
    render();
    return;
  }

  state.limit = nextLimit;
  loadProducts();
}

// 앱 진입점: 최초 렌더 후 상품 데이터를 불러온다.
async function main() {
  render();
  await loadProducts();
}

enableMocking().then(main);
