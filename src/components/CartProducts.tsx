import { useRecoilState } from 'recoil';
import { Button, InputNumber, Divider } from 'antd';
import Big from 'big.js';
import { cartState } from '@/atoms/cartState';
import { CartItem } from '@/interfaces/IProducts';
import { replaceItemAtIndex } from '@/utils/index';

const CartProducts = () => {
    const [cart, setCart] = useRecoilState(cartState);
    const onChange = (cartItem: CartItem, value: number) => {
        if (!value) {
            return;
        }
        const index = cart.findIndex((item) => item.product.id === cartItem.product.id && item.size === cartItem.size);
        const newCart = replaceItemAtIndex(cart, index, {
            ...cartItem,
            quantity: value,
        });
        setCart(newCart);
    };
    return (
        <>
            <div className="carproduct">
                {!cart.length
                    ? '购物车是空的'
                    : cart.map((product: CartItem) => {
                        return (
                            <div  key={`${product.product.id}-${product.size}`}>
                                <div className='relative'>
                                    <div className="flex items-top justify-left text-left">
                                        <img src={product.product.front} alt="" className="w-24 h-auto" loading="lazy" decoding="async" />
                                        <div className='pl-1'>
                                            <div className="text-slate-900 font-semibold mb-4">{product.product.title}</div>
                                            <div className="mt-0.5 text-sm leading-6 mb-4">{product.size} | {product.product.style}</div>
                                            <div className="text-slate-900 font-semibold mb-4">{product.product.currencyFormat} {Big(product.product.price).toFixed(2)}</div>
                                            <InputNumber className='w-14' min={1} max={10} value={product.quantity} defaultValue={product.quantity} onChange={onChange.bind(this, product) as any} />
                                        </div>
                                    </div>
                                    <Button type="text" danger className='absolute right-1 top-[50%]' onClick={() => {
                                        setCart((cart: any) => {
                                            return cart.filter((item: any) => `${item.product.id}-${item.size}` !== `${product.product.id}-${product.size}`)
                                        })
                                    }}>删除</Button>
                                </div>
                                <Divider></Divider>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default CartProducts;