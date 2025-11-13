import { getProducts, getProduct, getCategories } from "./api/productApi.js";
import { Home } from "./pages/home.js";
import { Detail } from "./pages/detail.js";
import { error404 } from "./pages/404.js";
import { Search, updateCategoryBreadcrumb, updateCategoryButtons, ItemList, Cart } from "./components/index.js";
import { addCartAlert, delCartAlert, errorAlert, infoAlert, showToast } from "./components/Alert.js";

const INITIAL_LOAD_ERROR_MESSAGE = "상품 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
const LOAD_MORE_ERROR_MESSAGE = "상품을 추가로 불러오지 못했습니다. 다시 시도해 주세요.";
const DETAIL_LOAD_ERROR_MESSAGE = "상품 상세 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
const DEFAULT_LIMIT = 20;
const DEFAULT_SORT = "price_asc";
const HOME_LIMIT_OPTIONS = [10, DEFAULT_LIMIT, 50, 100];
const HOME_SORT_OPTIONS = new Set(["price_asc", "price_desc", "name_asc", "name_desc"]);

function createInitialDetailState() {
  return {
    isLoading: false,
    error: null,
    product: null,
  };
}
// 상태관리박스
const state = {
  products: [],
  isLoadingProducts: false,
  isLoadingMore: false,
  productsError: null,
  loadMoreError: null,
  limit: DEFAULT_LIMIT,
  currentPage: 0,
  hasMoreProducts: true,
  sort: DEFAULT_SORT,
  totalProducts: 0,
  categories: {},
  categoriesLoaded: false,
  isLoadingCategories: false,
  route: null,
  detail: createInitialDetailState(),
  selectedCategory1: null,
  selectedCategory2: null,
  searchTerm: "",
  urlTouched: false,
  limitTouched: false,
  sortTouched: false,
  isCartOpen: false,
  cartItems: {},
};

let loadMoreObserver = null;
let homeShellMounted = false;
let searchSectionInitialized = false;
let cartEscapeListenerAttached = false;
let cartModalEventsAttached = false;

const enableMocking = async () => {
  const { worker } = await import("./mocks/browser.js");

  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
};

state.route = parseRoute();
state.cartItems = loadCartFromStorage();
function loadCartFromStorage() {
  try {
    const stored = window.localStorage.getItem("shopping_cart");
    if (!stored) {
      return {};
    }
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === "object") {
      return Object.fromEntries(
        Object.entries(parsed).map(([productId, item]) => [
          productId,
          {
            product: item.product ?? {},
            quantity: Number(item.quantity) || 1,
            selected: Boolean(item.selected),
          },
        ]),
      );
    }
  } catch (error) {
    console.error("장바구니 정보를 복원하지 못했습니다.", error);
  }
  return {};
}

function saveCartToStorage() {
  try {
    window.localStorage.setItem("shopping_cart", JSON.stringify(state.cartItems));
  } catch (error) {
    console.error("장바구니 정보를 저장하지 못했습니다.", error);
  }
}

function render() {
  const root = document.getElementById("root");
  if (!root) return;

  if (state.route?.name === "detail") {
    renderDetailView(root);
  } else if (state.route?.name === "home") {
    renderHomeView(root);
  } else {
    renderNotFound(root);
  }

  renderCartModal();
}

function renderDetailView(root) {
  disconnectLoadMoreObserver();
  root.innerHTML = Detail({
    navProps: {
      product: state.detail.product,
      loading: state.detail.isLoading,
    },
    contentProps: {
      product: state.detail.product,
      loading: state.detail.isLoading,
      error: state.detail.error,
    },
  });
  attachDetailEvents(root);
}

function renderHomeView(root) {
  if (!homeShellMounted) {
    root.innerHTML = Home();
    homeShellMounted = true;
    searchSectionInitialized = false;
    attachHeaderNavigation(root);
  }

  const searchContainer = document.getElementById("search-section");
  const productContainer = document.getElementById("product-section");

  if (!searchContainer || !productContainer) {
    root.innerHTML = Home();
    homeShellMounted = true;
    searchSectionInitialized = false;
    attachHeaderNavigation(root);
  }

  if (!searchSectionInitialized) {
    initializeSearchSection();
  }

  updateSearchUI();
  renderProductSection();
  setupLoadMoreObserver(root);
}

function renderNotFound(root) {
  disconnectLoadMoreObserver();
  homeShellMounted = false;
  searchSectionInitialized = false;
  root.innerHTML = error404();
  attachHeaderNavigation(root);
}

function initializeSearchSection() {
  const searchContainer = document.getElementById("search-section");
  if (!searchContainer) return;

  searchContainer.innerHTML = Search({
    loading: state.isLoadingCategories,
    limit: state.limit,
    sort: state.sort,
    selectedCategory1: state.selectedCategory1,
    selectedCategory2: state.selectedCategory2,
    categories: state.categories,
  });

  searchSectionInitialized = true;

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.value = state.searchTerm;
    searchInput.addEventListener("keydown", handleSearchInputKeyDown);
  }

  const limitSelect = document.getElementById("limit-select");
  if (limitSelect) {
    limitSelect.addEventListener("change", selectLimit);
  }

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", selectSort);
  }

  const categoryBreadcrumb = document.getElementById("category-breadcrumb");
  if (categoryBreadcrumb) {
    categoryBreadcrumb.addEventListener("click", handleCategoryBreadcrumbClick);
  }

  const categoryButtons = document.getElementById("category-buttons");
  if (categoryButtons) {
    categoryButtons.addEventListener("click", handleCategoryButtonsClick);
  }
}

function updateSearchUI() {
  if (!searchSectionInitialized) {
    return;
  }

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.value = state.searchTerm;
  }

  const categoryBreadcrumb = document.getElementById("category-breadcrumb");
  if (categoryBreadcrumb) {
    categoryBreadcrumb.innerHTML = updateCategoryBreadcrumb({
      selectedCategory1: state.selectedCategory1,
      selectedCategory2: state.selectedCategory2,
    });
  }

  const categoryButtons = document.getElementById("category-buttons");
  if (categoryButtons) {
    categoryButtons.innerHTML = updateCategoryButtons({
      categories: state.categories,
      selectedCategory1: state.selectedCategory1,
      selectedCategory2: state.selectedCategory2,
      loading: state.isLoadingCategories,
    });
  }

  const limitSelect = document.getElementById("limit-select");
  if (limitSelect) {
    limitSelect.value = String(state.limit);
  }

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.value = state.sort;
  }
}

function renderProductSection() {
  const productContainer = document.getElementById("product-section");
  if (!productContainer) return;

  productContainer.innerHTML = ItemList({
    loading: state.isLoadingProducts,
    loadingMore: state.isLoadingMore,
    products: state.products,
    error: state.productsError,
    hasMore: state.hasMoreProducts,
    loadMoreError: state.loadMoreError,
    totalCount: state.totalProducts,
  });

  const addToCartButtons = productContainer.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const productId = button.dataset.productId;
      if (!productId) {
        return;
      }
      handleAddToCart(productId, 1);
    });
  });

  const retryButton = productContainer.querySelector("#products-retry-button");
  if (retryButton) {
    retryButton.addEventListener("click", () => loadProducts(), { once: true });
  }

  const loadMoreRetryButton = productContainer.querySelector("#products-load-more-retry-button");
  if (loadMoreRetryButton) {
    loadMoreRetryButton.addEventListener("click", () => loadProducts({ append: true }), {
      once: true,
    });
  }

  const productCards = productContainer.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.addEventListener("click", handleProductCardClick);
  });
}

function handleCategoryBreadcrumbClick(event) {
  const target = event.target.closest("button");
  if (!target) {
    return;
  }

  if (target.dataset.breadcrumb === "reset") {
    handleCategoryReset(event);
    return;
  }

  if (target.dataset.breadcrumb === "category1") {
    handleCategoryBreadcrumb(event);
    return;
  }
}

function handleCategoryButtonsClick(event) {
  const target = event.target.closest("button");
  if (!target) {
    return;
  }

  if (target.dataset.category2) {
    handleCategory2Select(event);
    return;
  }

  if (target.dataset.category1) {
    handleCategory1Select(event);
  }
}

function attachDetailEvents(root) {
  attachHeaderNavigation(root);

  const backButtons = root.querySelectorAll('[data-navigate="home"]');
  backButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      resetFilters();
      navigateToHome({ replace: false });
    });
  });

  const detailBreadcrumb = root.querySelector(".detail-breadcrumb");
  if (detailBreadcrumb) {
    detailBreadcrumb.addEventListener("click", handleDetailBreadcrumbClick);
  }

  const relatedCards = root.querySelectorAll(".related-product-card");
  relatedCards.forEach((card) => {
    card.addEventListener("click", () => {
      const productId = card.dataset.productId;
      if (productId) {
        navigateToDetail(productId);
      }
    });
  });

  const decreaseButton = root.querySelector("[data-quantity-decrease]");
  const increaseButton = root.querySelector("[data-quantity-increase]");
  const quantityInput = root.querySelector("#quantity-input");
  const addToCartButton = root.querySelector(".add-to-cart");

  if (decreaseButton && quantityInput) {
    decreaseButton.addEventListener("click", () => adjustQuantity(quantityInput, -1));
  }

  if (increaseButton && quantityInput) {
    increaseButton.addEventListener("click", () => adjustQuantity(quantityInput, 1));
  }

  if (quantityInput) {
    quantityInput.addEventListener("input", () => normalizeQuantityInput(quantityInput));
  }

  if (addToCartButton && quantityInput) {
    addToCartButton.addEventListener("click", () =>
      handleAddToCart(addToCartButton.dataset.productId, quantityInput.value),
    );
  }
}

function handleDetailBreadcrumbClick(event) {
  const button = event.target.closest("[data-navigate]");
  if (!button) {
    return;
  }

  if (button.dataset.navigate === "home") {
    event.preventDefault();
    resetFilters({ updateUrl: false });
    navigateToHome({ replace: false });
    return;
  }

  if (button.dataset.navigate === "home-category") {
    event.preventDefault();
    const { category1, category2 } = button.dataset;
    // resetFilters를 호출하지 않고 navigateToHome에 직접 파라미터를 전달
    // navigateToHome이 URL을 업데이트하고 handleRouteChange가 applyHomeQueryParams를 통해 상태를 복원함
    navigateToHome({
      category1: category1 || null,
      category2: category2 || null,
      current: 1,
      search: null,
    });
  }
}

function resetFilters({ updateUrl = true } = {}) {
  state.selectedCategory1 = null;
  state.selectedCategory2 = null;
  state.searchTerm = "";
  state.currentPage = 0;
  if (updateUrl && state.route?.name === "home") {
    updateHomeUrlParams({ current: 1, category1: null, category2: null, search: null });
  }
}

function attachHeaderNavigation(root) {
  const homeLinks = root.querySelectorAll("[data-link]");
  homeLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      state.urlTouched = false;
      state.limitTouched = false;
      state.sortTouched = false;
      state.limit = DEFAULT_LIMIT;
      state.sort = DEFAULT_SORT;
      resetFilters({ updateUrl: false });
      const url = buildUrl("");
      window.history.pushState({}, "", url.toString());
      handleRouteChange();
    });
  });

  const cartButton = root.querySelector("#cart-icon-btn");
  if (cartButton) {
    cartButton.addEventListener("click", handleCartIconClick);
  }
}

function setupLoadMoreObserver(rootElement) {
  if (state.route?.name !== "home") {
    disconnectLoadMoreObserver();
    return;
  }

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

function disconnectLoadMoreObserver() {
  if (loadMoreObserver) {
    loadMoreObserver.disconnect();
    loadMoreObserver = null;
  }
}

async function loadProducts({ append = false } = {}) {
  if (state.route?.name !== "home") {
    return;
  }

  const context = append ? startAppendLoad() : startInitialLoad();
  if (!context) {
    return;
  }

  const { nextPage } = context;

  try {
    const data = await fetchProductPage(nextPage);
    applyProductResponse(data, { append, requestedPage: nextPage });
  } catch (error) {
    console.error("상품 목록을 불러오지 못했습니다.", error);
    handleLoadError(append);
    showToast(errorAlert);
  } finally {
    finishLoad(append);
  }
}

function handleProductCardClick(event) {
  if (event.target.closest(".add-to-cart-btn")) {
    event.stopPropagation();
    return;
  }

  const card = event.currentTarget;
  const productId = card.dataset.productId;

  if (!productId) {
    return;
  }

  navigateToDetail(productId);
}

function navigateToDetail(productId) {
  const detailUrl = buildUrl(`product/${encodeURIComponent(productId)}`);
  window.history.pushState({ productId }, "", detailUrl.toString());
  handleRouteChange();
}

function navigateToHome({ replace = false, category1, category2, current, search } = {}) {
  const url = buildHomeUrlWithParams({
    current,
    category1,
    category2,
    search,
  });

  if (replace) {
    window.history.replaceState({}, "", url.toString());
  } else {
    window.history.pushState({}, "", url.toString());
  }

  handleRouteChange();
}

function handleCategory1Select(event) {
  event.preventDefault();
  const button = event.target.closest("[data-category1]");
  if (!button) {
    return;
  }
  const { category1 } = button.dataset;
  if (!category1) {
    return;
  }

  const changed = state.selectedCategory1 !== category1 || state.selectedCategory2 !== null;

  if (changed) {
    // 카테고리 변경 시 기존 로딩 상태를 리셋하여 새로운 API 호출이 보장되도록 함
    state.isLoadingProducts = false;
    state.isLoadingMore = false;
    state.productsError = null;
    state.loadMoreError = null;
    state.products = []; // 이전 상품 목록 초기화
    state.totalProducts = 0; // 총 개수 초기화
    state.currentPage = 0;

    state.selectedCategory1 = category1;
    state.selectedCategory2 = null;
    state.urlTouched = true;

    // 브레드크럼과 카테고리 버튼을 즉시 업데이트
    updateSearchUI();

    // 새로운 카테고리로 API 호출
    loadProducts();
  } else {
    updateSearchUI();
  }
}

function handleCategory2Select(event) {
  event.preventDefault();
  const button = event.target.closest("[data-category2]");
  if (!button) {
    return;
  }
  const { category1, category2 } = button.dataset;
  if (!category1 || !category2) {
    return;
  }

  const changed = state.selectedCategory1 !== category1 || state.selectedCategory2 !== category2;

  if (changed) {
    // 카테고리 변경 시 기존 로딩 상태를 리셋하여 새로운 API 호출이 보장되도록 함
    state.isLoadingProducts = false;
    state.isLoadingMore = false;
    state.productsError = null;
    state.loadMoreError = null;
    state.products = []; // 이전 상품 목록 초기화
    state.totalProducts = 0; // 총 개수 초기화
    state.currentPage = 0;

    state.selectedCategory1 = category1;
    state.selectedCategory2 = category2;
    state.urlTouched = true;

    // 브레드크럼과 카테고리 버튼을 즉시 업데이트
    updateSearchUI();

    // 새로운 카테고리로 API 호출
    loadProducts();
  } else {
    updateSearchUI();
  }
}

function handleCategoryReset(event) {
  event.preventDefault();
  const button = event.target.closest('[data-breadcrumb="reset"]');
  if (!button) {
    return;
  }

  const changed = state.selectedCategory1 !== null || state.selectedCategory2 !== null || state.searchTerm !== "";
  if (!changed) {
    updateSearchUI();
    return;
  }

  resetFilters({ updateUrl: false });
  state.urlTouched = true;
  updateHomeUrlParams({ current: 1, category1: null, category2: null, search: null });
  loadProducts();
}

function handleCategoryBreadcrumb(event) {
  event.preventDefault();
  const button = event.target.closest('[data-breadcrumb="category1"]');
  if (!button) {
    return;
  }

  const { category1 } = button.dataset;
  const targetCategory = category1 || null;
  const changed =
    state.selectedCategory1 !== targetCategory || state.selectedCategory2 !== null || state.searchTerm !== "";

  state.selectedCategory1 = targetCategory;
  state.selectedCategory2 = null;

  if (changed) {
    state.urlTouched = true;
    updateHomeUrlParams({ current: 1, category1: targetCategory, category2: null, search: state.searchTerm });
    loadProducts();
  } else {
    updateSearchUI();
  }
}

function selectLimit(event) {
  const nextLimit = Number(event.target.value);
  if (Number.isNaN(nextLimit) || state.limit === nextLimit) {
    render();
    return;
  }

  // 개수 변경 시 기존 로딩 상태를 리셋하여 새로운 API 호출이 보장되도록 함
  state.isLoadingProducts = false;
  state.isLoadingMore = false;
  state.productsError = null;
  state.loadMoreError = null;
  state.products = []; // 이전 상품 목록 초기화 (페이지당 개수가 변경되므로)
  state.currentPage = 0;

  state.limit = nextLimit;
  state.limitTouched = true;
  state.urlTouched = true;
  updateHomeUrlParams({ current: 1, limit: nextLimit });
  loadProducts();
}

function selectSort(event) {
  const nextSort = event.target.value;
  if (!nextSort || state.sort === nextSort || state.route?.name !== "home") {
    render();
    return;
  }

  // 정렬 변경 시 기존 로딩 상태를 리셋하여 새로운 API 호출이 보장되도록 함
  state.isLoadingProducts = false;
  state.isLoadingMore = false;
  state.productsError = null;
  state.loadMoreError = null;
  state.products = []; // 이전 상품 목록 초기화 (정렬이 변경되므로)
  state.currentPage = 0;

  state.sort = nextSort;
  state.sortTouched = true;
  state.urlTouched = true;
  updateHomeUrlParams({ current: 1, sort: nextSort });
  loadProducts();
}

function startInitialLoad() {
  if (state.isLoadingProducts) {
    return null;
  }

  state.isLoadingProducts = true;
  state.productsError = null;
  state.loadMoreError = null;
  state.currentPage = 0;
  state.products = []; // 이전 상품 목록 초기화
  state.hasMoreProducts = true;
  state.totalProducts = 0;
  render();

  return { nextPage: 1 };
}

function startAppendLoad() {
  if (state.route?.name !== "home" || state.isLoadingProducts || state.isLoadingMore || !state.hasMoreProducts) {
    return null;
  }

  state.isLoadingMore = true;
  state.loadMoreError = null;
  render();

  return { nextPage: state.currentPage + 1 };
}

async function fetchProductPage(page) {
  const params = {
    limit: state.limit,
    page,
    sort: state.sort,
    ...(state.selectedCategory1 ? { category1: state.selectedCategory1 } : {}),
    ...(state.selectedCategory2 ? { category2: state.selectedCategory2 } : {}),
    ...(state.searchTerm ? { search: state.searchTerm } : {}),
  };

  // API 호출 파라미터 콘솔 로그
  console.log("🔍 API 호출:", params);

  const result = await getProducts(params);

  // API 응답 콘솔 로그
  console.log("📥 API 응답:", {
    productsCount: result?.products?.length ?? 0,
    totalCount: result?.pagination?.total ?? 0,
    page: result?.pagination?.page ?? 0,
  });

  return result;
}

function handleSearchInputKeyDown(event) {
  if (event.key !== "Enter") {
    return;
  }
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) {
    return;
  }
  event.preventDefault();
  const nextTerm = input.value.trim();
  if (state.searchTerm === nextTerm) {
    return;
  }
  state.searchTerm = nextTerm;
  state.urlTouched = true;
  updateHomeUrlParams({
    current: 1,
    category1: state.selectedCategory1,
    category2: state.selectedCategory2,
    search: nextTerm || null,
  });
  loadProducts();
}

function applyProductResponse(data, { append, requestedPage }) {
  const incomingProducts = data?.products ?? [];
  const resolvedPage = data?.pagination?.page ?? requestedPage;
  const hasNext = data?.pagination?.hasNext ?? incomingProducts.length >= state.limit;
  const totalCount = data?.pagination?.total;

  state.products = append ? [...state.products, ...incomingProducts] : incomingProducts;
  state.currentPage = resolvedPage;
  state.hasMoreProducts = hasNext;
  if (typeof totalCount === "number") {
    state.totalProducts = totalCount;
  } else if (!append) {
    state.totalProducts = state.products.length;
  }

  // 총 상품 개수 콘솔 로그
  console.log("📦 총 상품 개수 업데이트:", state.totalProducts, "개", {
    category1: state.selectedCategory1,
    category2: state.selectedCategory2,
    search: state.searchTerm,
    products: state.products.length,
    totalFromAPI: totalCount,
  });

  if (state.route?.name === "home") {
    updateHomeUrlParams({
      current: state.currentPage,
      category1: state.selectedCategory1,
      category2: state.selectedCategory2,
      force: true, // 무한 스크롤 시에도 current를 URL에 표시
    });
  }
}

function handleLoadError(append) {
  if (append) {
    state.loadMoreError = LOAD_MORE_ERROR_MESSAGE;
    return;
  }

  state.productsError = INITIAL_LOAD_ERROR_MESSAGE;
}

function finishLoad(append) {
  if (append) {
    state.isLoadingMore = false;
  } else {
    state.isLoadingProducts = false;
  }

  render();
}

async function loadProductDetail(productId) {
  state.detail = createInitialDetailState();
  state.detail.isLoading = true;
  render();

  try {
    const product = await getProduct(productId);
    if (state.route?.name !== "detail" || state.route.params.productId !== productId) {
      return;
    }

    let relatedProducts = [];
    try {
      if (product.category1) {
        const relatedResponse = await getProducts({
          limit: 12,
          category1: product.category1,
          ...(product.category2 ? { category2: product.category2 } : {}),
        });
        relatedProducts = (relatedResponse?.products ?? [])
          .filter((item) => item.productId !== product.productId)
          .slice(0, 4);
      }
    } catch (relatedError) {
      console.error("관련 상품을 불러오지 못했습니다.", relatedError);
      relatedProducts = [];
    }

    state.detail.product = {
      ...product,
      relatedProducts,
    };
  } catch (error) {
    if (state.route?.name !== "detail" || state.route.params.productId !== productId) {
      return;
    }
    console.error("상품 상세 정보를 불러오지 못했습니다.", error);
    state.detail.error = DETAIL_LOAD_ERROR_MESSAGE;
    showToast(errorAlert);
  } finally {
    if (state.route?.name === "detail" && state.route.params.productId === productId) {
      state.detail.isLoading = false;
      render();
    }
  }
}

function parseRoute() {
  const basePath = import.meta.env.BASE_URL ?? "/";
  const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  let pathname = window.location.pathname;

  if (normalizedBase !== "/" && pathname.startsWith(normalizedBase)) {
    pathname = pathname.slice(normalizedBase.length);
  } else if (normalizedBase === "/" && pathname.startsWith("/")) {
    pathname = pathname.slice(1);
  }

  pathname = pathname.replace(/^\/+/, "").replace(/\/+$/, "");

  if (!pathname) {
    return { name: "home" };
  }

  const detailMatch = pathname.match(/^product\/([^/]+)$/);
  if (detailMatch) {
    return {
      name: "detail",
      params: {
        productId: decodeURIComponent(detailMatch[1]),
      },
    };
  }

  return { name: "not_found" };
}

function buildUrl(path = "") {
  const basePath = import.meta.env.BASE_URL ?? "/";
  const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return new URL(`${normalizedBase}${normalizedPath}`, window.location.origin);
}

async function handleRouteChange() {
  closeCartModal();
  state.route = parseRoute();

  if (state.route.name === "detail") {
    await loadProductDetail(state.route.params.productId);
    return;
  }

  if (state.route.name !== "home") {
    homeShellMounted = false;
    searchSectionInitialized = false;
    state.detail = createInitialDetailState();
    state.isLoadingProducts = false;
    state.productsError = null;
    render();
    return;
  }

  applyHomeQueryParams();
  state.detail = createInitialDetailState();
  await ensureCategoriesLoaded();

  // URL 파라미터가 변경되었을 수 있으므로 항상 상품을 다시 로드
  // 이전에 로드된 상품이 있어도 새로운 필터 조건에 맞는 상품을 로드해야 함
  // loadProducts() 내부의 startInitialLoad()에서 상태 초기화가 이루어지므로 여기서는 초기화하지 않음
  await loadProducts();
}

async function main() {
  window.addEventListener("popstate", () => {
    handleRouteChange();
  });

  await handleRouteChange();
}

enableMocking().then(main);

async function ensureCategoriesLoaded() {
  if (state.categoriesLoaded || state.isLoadingCategories) {
    return;
  }

  state.isLoadingCategories = true;
  if (state.route?.name === "home") {
    render();
  }

  try {
    const categories = await getCategories();
    state.categories = categories ?? {};
    state.categoriesLoaded = true;
  } catch (error) {
    console.error("카테고리 정보를 불러오지 못했습니다.", error);
    state.categories = {};
    state.categoriesLoaded = false;
    showToast(errorAlert);
  } finally {
    state.isLoadingCategories = false;
    if (state.route?.name === "home") {
      render();
    }
  }
}

function handleCartIconClick(event) {
  event.preventDefault();
  openCartModal();
}

function openCartModal() {
  state.isCartOpen = true;
  renderCartModal();
}

function closeCartModal() {
  if (!state.isCartOpen) {
    return;
  }
  state.isCartOpen = false;
  renderCartModal();
}

function getCartItemsArray() {
  return Object.values(state.cartItems ?? {});
}

function getCartSummary() {
  const items = getCartItemsArray();
  const totalCount = items.length;
  const totalPrice = items.reduce((sum, item) => sum + (Number(item?.product?.lprice) || 0) * (item?.quantity ?? 0), 0);
  const selectedItems = items.filter((item) => item?.selected);
  const selectedCount = selectedItems.length;
  const selectedPrice = selectedItems.reduce(
    (sum, item) => sum + (Number(item?.product?.lprice) || 0) * (item?.quantity ?? 0),
    0,
  );
  return { items, totalCount, totalPrice, selectedCount, selectedPrice };
}

function updateCartBadge(providedCount) {
  const badge = document.getElementById("cart-count-badge");
  if (!badge) {
    return;
  }
  const count = providedCount ?? getCartSummary().totalCount;
  if (count > 0) {
    badge.textContent = String(count);
    badge.classList.remove("hidden");
  } else {
    badge.textContent = "";
    badge.classList.add("hidden");
  }
}

function renderCartModal() {
  // main 태그를 찾아서 형제 태그로 모달을 추가
  const mainElement = document.querySelector("main");
  // Cart 컴포넌트가 반환하는 최상위 div.cart-modal을 찾음
  const existing = mainElement?.nextElementSibling?.classList?.contains("cart-modal")
    ? mainElement.nextElementSibling
    : null;

  if (!state.isCartOpen) {
    if (existing) {
      existing.remove();
    }
    detachCartEscapeListener();
    cartModalEventsAttached = false;
    updateCartBadge();
    return;
  }

  const { items, totalCount, totalPrice, selectedCount, selectedPrice } = getCartSummary();

  let container = existing;
  if (!container && mainElement) {
    // Cart 컴포넌트의 HTML을 직접 삽입
    const cartHTML = Cart({ items, totalCount, totalPrice, selectedCount, selectedPrice });
    mainElement.insertAdjacentHTML("afterend", cartHTML);
    // 삽입된 최상위 div.cart-modal 요소를 찾음
    container = mainElement.nextElementSibling;
  } else if (container) {
    // 기존 컨테이너가 있으면 내용만 업데이트
    // innerHTML을 사용하면 기존 이벤트 리스너가 제거되므로, 이벤트를 다시 연결해야 함
    cartModalEventsAttached = false;
    container.innerHTML = Cart({ items, totalCount, totalPrice, selectedCount, selectedPrice });
  }

  if (container && container.classList.contains("cart-modal")) {
    attachCartModalEvents(container);
    attachCartEscapeListener();
    updateCartBadge(totalCount);
  }
}

function attachCartModalEvents(container) {
  if (cartModalEventsAttached) {
    return;
  }

  container.addEventListener("click", handleCartModalClick);
  container.addEventListener("change", handleCartModalChange);
  cartModalEventsAttached = true;
}

function handleCartKeydown(event) {
  if (event.key === "Escape") {
    closeCartModal();
  }
}

function updateCartModalSelection() {
  if (!state.isCartOpen) {
    return;
  }

  const modal = document.querySelector(".cart-modal");
  if (!modal) {
    return;
  }

  const { totalCount, selectedCount, selectedPrice, totalPrice } = getCartSummary();

  // 각 상품 체크박스 업데이트
  Object.keys(state.cartItems).forEach((productId) => {
    const item = state.cartItems[productId];
    const checkbox = modal.querySelector(`.cart-item-checkbox[data-product-id="${productId}"]`);
    if (checkbox && checkbox.checked !== item.selected) {
      checkbox.checked = item.selected;
    }
  });

  // 전체선택 체크박스 업데이트
  const selectAllCheckbox = modal.querySelector(".cart-select-all-checkbox");
  if (selectAllCheckbox) {
    const shouldBeChecked = selectedCount > 0 && selectedCount === totalCount;
    if (selectAllCheckbox.checked !== shouldBeChecked) {
      selectAllCheckbox.checked = shouldBeChecked;
    }
    // 전체선택 텍스트 업데이트 (label의 텍스트 노드 찾기)
    const selectAllLabel = selectAllCheckbox.closest("label");
    if (selectAllLabel) {
      // label의 모든 텍스트 노드를 찾아서 업데이트
      const walker = document.createTreeWalker(selectAllLabel, NodeFilter.SHOW_TEXT, null);
      let textNode;
      while ((textNode = walker.nextNode())) {
        if (textNode.textContent.trim().startsWith("전체선택")) {
          textNode.textContent = `전체선택 (${selectedCount}/${totalCount})`;
          break;
        }
      }
    }
  }

  // 하단 섹션 업데이트
  const bottomSection = modal.querySelector(".border-t.border-gray-200.p-4.bg-gray-50");
  if (bottomSection) {
    const formatPrice = (value) => {
      const numeric = Number(value) || 0;
      return `${numeric.toLocaleString()}원`;
    };

    if (selectedCount > 0) {
      bottomSection.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center justify-between text-sm text-gray-600">
            <span>선택한 상품</span>
            <span class="font-medium text-gray-900">${selectedCount}개 / ${formatPrice(selectedPrice)}</span>
          </div>
          <div class="flex items-center justify-between text-sm text-gray-600">
            <span>총 금액</span>
            <span class="text-lg font-bold text-blue-600">${formatPrice(totalPrice)}</span>
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
      `;
    } else {
      bottomSection.innerHTML = `
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-gray-900">총 금액</span>
            <span class="text-lg font-bold text-blue-600">${formatPrice(totalPrice)}</span>
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
      `;
    }

    // 이벤트 리스너 재연결
    cartModalEventsAttached = false;
    attachCartModalEvents(modal);
  }
}

function attachCartEscapeListener() {
  if (cartEscapeListenerAttached) {
    return;
  }
  document.addEventListener("keydown", handleCartKeydown);
  cartEscapeListenerAttached = true;
}

function detachCartEscapeListener() {
  if (!cartEscapeListenerAttached) {
    return;
  }
  document.removeEventListener("keydown", handleCartKeydown);
  cartEscapeListenerAttached = false;
}

function handleCartModalClick(event) {
  const actionButton = event.target.closest("[data-cart-action]");
  if (!actionButton) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  const { cartAction, cartProductId } = actionButton.dataset;
  switch (cartAction) {
    case "close":
      closeCartModal();
      break;
    case "increase":
      if (cartProductId) {
        incrementCartItem(cartProductId);
      }
      break;
    case "decrease":
      if (cartProductId) {
        decrementCartItem(cartProductId);
      }
      break;
    case "remove":
      if (cartProductId) {
        removeCartItem(cartProductId);
      }
      break;
    case "remove-selected":
      removeSelectedCartItems();
      break;
    case "clear":
      clearCartItems();
      break;
    case "checkout":
      checkoutCart();
      break;
    default:
      break;
  }
}

function handleCartModalChange(event) {
  const checkbox = event.target.closest(".cart-item-checkbox");
  if (checkbox) {
    handleCartCheckboxToggle(checkbox);
    return;
  }

  const selectAll = event.target.closest(".cart-select-all-checkbox");
  if (selectAll) {
    handleCartSelectAllChange(selectAll.checked);
  }
}

function handleCartCheckboxToggle(checkbox) {
  const productId = checkbox.dataset.productId;
  if (!productId || !state.cartItems[productId]) {
    return;
  }

  state.cartItems[productId].selected = checkbox.checked;
  updateCartModalSelection();
  saveCartToStorage();
}

function handleCartSelectAllChange(checked) {
  Object.keys(state.cartItems).forEach((productId) => {
    state.cartItems[productId].selected = checked;
  });
  updateCartModalSelection();
  saveCartToStorage();
}

function removeCartItemFromModal(productId) {
  if (!state.isCartOpen) {
    return;
  }

  const modal = document.querySelector(".cart-modal");
  if (!modal) {
    return;
  }

  const cartItem = modal.querySelector(`.cart-item[data-product-id="${productId}"]`);
  if (cartItem) {
    cartItem.remove();
  }

  const { totalCount } = getCartSummary();
  updateCartBadge(totalCount);

  // 장바구니가 비어있으면 모달 재렌더링
  if (Object.keys(state.cartItems).length === 0) {
    renderCartModal();
  } else {
    // 선택 정보 업데이트
    updateCartModalSelection();
  }
}

function removeSelectedCartItems() {
  const before = Object.keys(state.cartItems).length;
  const removedProductIds = [];

  Object.keys(state.cartItems).forEach((productId) => {
    if (state.cartItems[productId]?.selected) {
      removedProductIds.push(productId);
      delete state.cartItems[productId];
    }
  });

  if (Object.keys(state.cartItems).length !== before) {
    const { totalCount } = getCartSummary();
    updateCartBadge(totalCount);

    // cart-items-container에서 선택된 상품들만 제거
    if (state.isCartOpen) {
      const modal = document.querySelector(".cart-modal");
      if (modal) {
        removedProductIds.forEach((productId) => {
          const cartItem = modal.querySelector(`.cart-item[data-product-id="${productId}"]`);
          if (cartItem) {
            cartItem.remove();
          }
        });

        // 장바구니가 비어있으면 모달 재렌더링
        if (Object.keys(state.cartItems).length === 0) {
          renderCartModal();
        } else {
          // 선택 정보 업데이트
          updateCartModalSelection();
        }
      }
    }

    showToast(delCartAlert);
    saveCartToStorage();
  }
}

function clearCartItems() {
  if (Object.keys(state.cartItems).length === 0) {
    return;
  }
  state.cartItems = {};
  renderCartModal();
  showToast(delCartAlert);
  saveCartToStorage();
}

function checkoutCart() {
  const { selectedCount, selectedPrice } = getCartSummary();
  showToast(infoAlert);
  if (selectedCount === 0) {
    console.info("선택된 상품이 없습니다.");
    return;
  }
  console.info(`선택한 ${selectedCount}개의 상품, 총 ${selectedPrice}원 결제 진행 (모의).`);
}

function updateCartItemQuantity(productId) {
  if (!state.isCartOpen) {
    return;
  }

  const modal = document.querySelector(".cart-modal");
  if (!modal) {
    return;
  }

  const item = state.cartItems[productId];
  if (!item) {
    return;
  }

  const { product, quantity } = item;
  const lprice = Number(product?.lprice) || 0;
  const itemPrice = lprice * quantity;

  // 수량 입력 필드 업데이트
  const quantityInput = modal.querySelector(`#quantity-input-${productId}`);
  if (quantityInput) {
    quantityInput.value = quantity;
  }

  // 상품 금액 업데이트
  const cartItem = modal.querySelector(`.cart-item[data-product-id="${productId}"]`);
  if (cartItem) {
    const priceContainer = cartItem.querySelector(`.flex.flex-col.items-end.gap-2`);
    if (priceContainer) {
      const itemPriceElement = priceContainer.querySelector(`p.text-sm.font-medium.text-gray-900`);
      if (itemPriceElement) {
        const formatPrice = (value) => {
          const numeric = Number(value) || 0;
          return `${numeric.toLocaleString()}원`;
        };
        itemPriceElement.textContent = formatPrice(itemPrice);
      }
    }
  }

  // 총 금액 업데이트
  updateCartModalSelection();
}

function incrementCartItem(productId) {
  const item = state.cartItems[productId];
  if (!item) {
    return;
  }
  item.quantity += 1;
  updateCartItemQuantity(productId);
  saveCartToStorage();
}

function decrementCartItem(productId) {
  const item = state.cartItems[productId];
  if (!item) {
    return;
  }

  if (item.quantity <= 1) {
    delete state.cartItems[productId];
    showToast(delCartAlert);
    // 상품이 삭제되면 모달에서 해당 아이템 제거
    removeCartItemFromModal(productId);
  } else {
    item.quantity -= 1;
    updateCartItemQuantity(productId);
  }

  saveCartToStorage();
}

function removeCartItem(productId) {
  if (!state.cartItems[productId]) {
    return;
  }

  delete state.cartItems[productId];
  removeCartItemFromModal(productId);
  showToast(delCartAlert);
  saveCartToStorage();
}

function applyHomeQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const category1 = params.get("category1");
  const category2 = params.get("category2");
  const search = params.get("search") ?? "";
  const sort = params.get("sort");
  const limit = params.get("limit");
  const hasRelevantParams =
    params.has("category1") ||
    params.has("category2") ||
    params.has("search") ||
    params.has("sort") ||
    params.has("limit") ||
    params.has("current");

  state.selectedCategory1 = category1 || null;
  state.selectedCategory2 = category2 || null;
  state.searchTerm = search;

  if (sort !== null && HOME_SORT_OPTIONS.has(sort)) {
    state.sort = sort;
    state.sortTouched = true;
  } else {
    state.sort = DEFAULT_SORT;
    state.sortTouched = false;
  }

  if (limit !== null && HOME_LIMIT_OPTIONS.includes(Number(limit))) {
    state.limit = Number(limit);
    state.limitTouched = true;
  } else {
    state.limit = DEFAULT_LIMIT;
    state.limitTouched = false;
  }

  state.urlTouched = hasRelevantParams;
}

function resolveHomeParams(overrides = {}) {
  const hasOwn = Object.prototype.hasOwnProperty;
  const hasOverride = (key) => hasOwn.call(overrides, key);
  const valueOr = (key, fallback) => (hasOverride(key) ? overrides[key] : fallback);

  const resolvedCategory1 = valueOr("category1", state.selectedCategory1);
  const resolvedCategory2 = valueOr("category2", state.selectedCategory2);
  const resolvedSort = hasOverride("sort") ? overrides.sort : state.sortTouched ? state.sort : undefined;
  const resolvedLimit = hasOverride("limit") ? overrides.limit : state.limitTouched ? state.limit : undefined;
  const resolvedSearch = valueOr("search", state.searchTerm);
  const fallbackPage = Number.isFinite(state.currentPage) && state.currentPage > 0 ? state.currentPage : 1;
  const resolvedCurrent = valueOr("current", fallbackPage);

  // current가 오버라이드되었을 때, 필터가 없고 current가 1이면 forceCurrent를 false로 설정
  // (필터/검색/정렬/개수 변경 없이 무한 스크롤할 때 current=1은 URL에 표시하지 않음)
  const hasCurrentOverride = hasOverride("current");
  const hasFilter = Boolean(
    resolvedCategory1 ||
      resolvedCategory2 ||
      resolvedSearch ||
      (resolvedSort && state.sortTouched) ||
      (resolvedLimit && state.limitTouched),
  );
  const numericCurrent = Number(resolvedCurrent);
  const forceCurrent = hasCurrentOverride && (hasFilter || numericCurrent > 1);

  return {
    category1: resolvedCategory1,
    category2: resolvedCategory2,
    sort: resolvedSort,
    limit: resolvedLimit,
    search: resolvedSearch,
    current: resolvedCurrent,
    forceCurrent,
  };
}

function createHomeSearchParams({ category1, category2, sort, limit, search, current, forceCurrent } = {}) {
  const params = new URLSearchParams();

  if (category1) {
    params.set("category1", category1);
  }

  if (category2) {
    params.set("category2", category2);
  }

  if (sort) {
    params.set("sort", sort);
  }

  if (limit !== undefined && limit !== null) {
    const numericLimit = Number(limit);
    if (Number.isFinite(numericLimit) && numericLimit > 0) {
      params.set("limit", String(Math.trunc(numericLimit)));
    }
  }

  if (search) {
    params.set("search", search);
  }

  const numericCurrent = Number(current);
  const hasSearch = Boolean(search);
  if (Number.isFinite(numericCurrent) && (numericCurrent > 1 || hasSearch || forceCurrent)) {
    params.set("current", String(Math.max(1, Math.trunc(numericCurrent))));
  }

  return params;
}

function buildHomeParams(overrides = {}) {
  const resolved = resolveHomeParams(overrides);
  return createHomeSearchParams(resolved);
}

function updateHomeUrlParams(overrides = {}) {
  if (state.route?.name !== "home") {
    return;
  }

  const { force, ...restOverrides } = overrides;
  if (!force && !state.urlTouched) {
    return;
  }

  const url = new URL(window.location.href);
  const params = buildHomeParams(restOverrides);
  url.search = params.toString();
  window.history.replaceState(window.history.state, "", url.toString());
}

function buildHomeUrlWithParams(overrides = {}) {
  const url = buildUrl("");
  const params = buildHomeParams(overrides);
  url.search = params.toString();
  return url;
}

function adjustQuantity(input, delta) {
  const current = Number(input.value) || 1;
  const min = Number(input.min) || 1;
  const max = Number(input.max) || Infinity;
  const next = Math.min(Math.max(current + delta, min), max);
  input.value = String(next);
}

function normalizeQuantityInput(input) {
  const min = Number(input.min) || 1;
  const max = Number(input.max) || Infinity;
  let value = Number(input.value);
  if (!Number.isFinite(value)) {
    value = min;
  }
  value = Math.min(Math.max(value, min), max);
  input.value = String(value);
}

function handleAddToCart(productId, quantity) {
  if (!productId) {
    return;
  }

  const amount = Math.max(1, Number(quantity) || 1);
  const product = findProductForCart(productId);
  if (!product) {
    console.warn("상품 정보를 찾을 수 없어 장바구니에 담지 못했습니다.", productId);
    showToast(errorAlert);
    return;
  }

  const price = Number(product.lprice ?? product.price ?? 0);
  const stored = state.cartItems[productId];
  if (!stored) {
    state.cartItems[productId] = {
      product: {
        productId,
        title: product.title ?? "",
        image: product.image ?? "",
        lprice: price,
      },
      quantity: 0,
      selected: false,
    };
  }

  state.cartItems[productId].quantity += amount;
  updateCartBadge();
  showToast(addCartAlert);
  saveCartToStorage();
}

function findProductForCart(productId) {
  const fromList = state.products.find((item) => item?.productId === productId);
  if (fromList) {
    return fromList;
  }

  if (state.detail?.product?.productId === productId) {
    return state.detail.product;
  }

  return state.cartItems[productId]?.product ?? null;
}
