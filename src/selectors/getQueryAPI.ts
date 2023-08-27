import axios from "axios";
import { selector } from "recoil";
import { currentProductQueryState } from '@/atoms/cartState';

const url = `https://api.lkm8.com/v1/products`;
const productQuery = selector({
    key: "Products",
    get: async ({ get }) => {
        try {
            const params = get(currentProductQueryState);
            const response = await axios.get(url, {
                params,
            });
            return response.data.data.list || [];
        } catch (error) {
            console.log(`Erro: ${error}`);
            return []
        }
    }
});

export default productQuery;