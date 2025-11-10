import { getProducts } from "./api/productApi.js";
import { Home } from "./pages/home.js";

const enableMocking = () => {
  if (!import.meta.env.DEV) {
    return Promise.resolve();
  }

  return import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );
};

async function main() {
  const root = document.getElementById("root");

  root.innerHTML = Home({ loading: true });
  const data = await getProducts();
  setTimeout(() => {
    console.log(data);
    root.innerHTML = Home({ ...data, loading: false });
  }, 1000);
}

if (import.meta.env.MODE === "test") {
  main();
} else {
  enableMocking().then(main);
}
