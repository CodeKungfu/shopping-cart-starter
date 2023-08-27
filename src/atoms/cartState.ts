import { atom } from "recoil";
import {
  CartItem,
  SelectSizeState,
  ProductQuery,
} from "@/interfaces/IProducts";
// Atom Effect 可以用 浏览器本地存储 来持久化 atom 状态。localStorage 是同步的，所以我们可以直接检索数据而不需要 async、await 或 Promise。
// https://recoiljs.org/zh-hans/docs/guides/atom-effects
const localStorageEffect =
  (key: any) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any) => {
      if (newValue instanceof String) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
  effects_UNSTABLE: [localStorageEffect("current_cart")],
});

export const isOpenCartState = atom<boolean>({
  key: "isOpenCartState",
  default: false,
});

export const selectSizeState = atom<SelectSizeState>({
  key: "selectSizeState",
  default: {
    open: false,
    product: null,
    size: null,
  },
});

export const currentProductQueryState = atom<ProductQuery>({
  key: "currentProductQueryState",
  default: {
    sort: "DESC",
    filter: '',
    page: 1,
    pageSize: 20,
  },
});
