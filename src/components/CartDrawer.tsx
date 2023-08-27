import { useRecoilState, useRecoilValue } from 'recoil';
import { Button, Drawer, message } from 'antd';
import { isOpenCartState, cartState } from '@/atoms/cartState';
import cartTotalState from '@/selectors/cartTotalState';
import CartProducts from './CartProducts';

export function CartDrawer() {
    const [isOpenCart, setIsOpenCart] = useRecoilState(isOpenCartState);
    const [cart, setCart] = useRecoilState(cartState);
    const totalInfo = useRecoilValue(cartTotalState);
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const success = () => {
        messageApi.open({
            key,
            type: 'loading',
            content: '开始结算',
          });
          setTimeout(() => {
            messageApi.open({
              key,
              type: 'success',
              content: '结算完成',
              duration: 2,
            });
            setCart([]);
            setIsOpenCart(false);
          }, 1000);
    };
    return (
        <Drawer title="购物车" placement='right' open={isOpenCart} onClose={() => setIsOpenCart(false)}
        footer={
            <>
            {contextHolder}
            <div className="flex items-center justify-between text-right">
                <div>小计</div>
                <div className="total">
                    {/* <div className='my-2'>TOTAL: {totalInfo.total.toFixed(2)}</div> */}
                    <div className='my-2 font-bold'>$ {totalInfo.total.toFixed(2)}</div>
                </div>
            </div>
            <Button disabled={cart.length === 0} onClick={success} className='w-full my-2'>结算</Button>
            </>
        }
        >
            <CartProducts></CartProducts>
        </Drawer>
    )
}