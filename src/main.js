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

function main() {
  const root = document.getElementById("root");
  root.innerHTML = Home();
}

if (import.meta.env.MODE === "test") {
  main();
} else {
  enableMocking().then(main);
}
