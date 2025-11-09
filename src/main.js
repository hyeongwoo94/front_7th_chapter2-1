import { Footer } from "./components/Footer.js";
import { Header } from "./components/Header.js";

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
  document.body.innerHTML = `
  ${Header()}
  ${Footer()}
  `;
}

if (import.meta.env.MODE === "test") {
  main();
} else {
  enableMocking().then(main);
}
