import { selector } from "recoil";
import { cartState } from '@/atoms/cartState';
import Big from 'big.js';

const cartTotalState = selector({
    key: "cartTotalState",
    get: ({ get }) => {
        const cart = get(cartState)
        const total = cart.reduce((previous, current) => {
            const currentNum = (new Big(current.product.price)).times(current.quantity);
            const num = (new Big(previous)).plus(currentNum).toFixed(2);
            return Number(num);
        }, 0);
        const tipsNum = cart.reduce((previous, current) => previous + current.quantity, 0);
        return { total, tipsNum }
    }
});

export default cartTotalState;