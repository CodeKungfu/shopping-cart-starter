import { useRecoilValueLoadable } from "recoil";
import { Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import CustomPrice from './CustomPrice';
import productQuery from '@/selectors/getQueryAPI';
import { IProduct, CartItem } from "@/interfaces/IProducts";
import { replaceItemAtIndex } from '@/utils/index';
import { isOpenCartState, cartState, selectSizeState } from '@/atoms/cartState';

const Products = () => {
    // 和 useRecoilValue 不同，useRecoilValueLoadable 不需要外层 Suspense
    // const queryProducts = useRecoilValue(productQuery);
    const queryProductsLoadable = useRecoilValueLoadable(productQuery);
    const antIcon = <LoadingOutlined style={{ fontSize: 52 }} spin />;
    const [, setIsOpenCart] = useRecoilState(isOpenCartState);
    const [, setSelectSize] = useRecoilState(selectSizeState);
    const [cart, setCart] = useRecoilState(cartState);
    const onAddCartItem = (products: IProduct) => {
        if (!products.availableSizes) {
            return;
        }
        if (products.availableSizes.length > 1) {
            setSelectSize({
                open: true,
                product: products,
                size: products.availableSizes[0]
            });
        } else { // 如果只有一个尺寸可以选择直接添加购物车
            const cartItem: CartItem = {
                product: products,
                size: products.availableSizes[0],
                quantity: 1,
            }
            if (cart.find((item: CartItem) => item.product.id === cartItem.product.id && item.size === cartItem.size)) {
                const index = cart.findIndex((item) => item.product.id === cartItem.product.id && item.size === cartItem.size);
                const newCart = replaceItemAtIndex(cart, index, {
                    ...cartItem,
                    quantity: cart[index].quantity + 1,
                });
                setCart(newCart);
            } else {
                setCart([...cart, cartItem]);
            }
            setIsOpenCart(true);
        }
    }
    const getHoverClass = (imgSrc: any) => {
        return `h-full w-full hover:content-[url('${imgSrc}')]`;
    }
    if (queryProductsLoadable.state === 'loading') {
        return <Spin className="w-full" indicator={antIcon} spinning={queryProductsLoadable.state === 'loading'} delay={0}></Spin>
    }
    return (
            <div className="flex items-center justify-around justify-items-start flex-wrap mx-2">
                    {(queryProductsLoadable.contents || []).map((products: IProduct) => {
                        return (
                            <div key={products.id} className="flex lg:w-[25%] lg:max-w-[25%] lg:min-w-[25%] md:w-[33.3%] md:max-w-[33.3%] md:min-w-[33.3%] w-[50%] max-w-[50%] min-w-[50%] p-2">
                                <div className="card card-compact w-full bg-base-100">
                                    <figure>
                                        <img className={getHoverClass(products.back)} src={products.front} alt={products.title} />
                                    </figure>
                                    <div className="card-body text-center">
                                        <h2 className="card-title w-full block">{products.title}</h2>
                                        {/* <div className="text-center">(${products.price})</div> */}
                                        <CustomPrice price={products.price}></CustomPrice>
                                        <div className="px-6 pt-4 pb-2">
                                            {
                                                products.availableSizes.map((size: any, index: number) => {
                                                    return <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1">{size}</span>
                                                })
                                            }
                                        </div>
                                        <div className="card-actions justify-end">
                                            <Button className="w-full" onClick={() => {
                                                onAddCartItem(products);
                                            }}>添加购物车</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
    )
}

export default Products;