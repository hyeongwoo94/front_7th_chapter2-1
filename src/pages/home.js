import { Layout } from "../components/Layout.js";
import { Search } from "../components/Search.js";
import { ItemList } from "../components/ItemList.js";

export const Home = () => {
  return `
    ${Layout({
      top: Search(),
      main: ItemList(),
    })}
  `;
};
