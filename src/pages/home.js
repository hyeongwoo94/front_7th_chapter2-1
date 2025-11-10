import { Layout } from "../components/Layout.js";
import { Search } from "../components/Search.js";
import { ItemList } from "../components/ItemList.js";
export const Home = ({ filters, pagination, products, loading }) => {
  return `
    ${Layout({
      top: Search({ filters, pagination }),
      main: ItemList({ products, loading }),
    })}
  `;
};
