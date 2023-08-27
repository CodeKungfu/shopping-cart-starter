import { useRecoilState } from 'recoil';
import { Modal, Button, Segmented } from 'antd';
import { selectSizeState, cartState, isOpenCartState } from '@/atoms/cartState';
import { CartItem } from "@/interfaces/IProducts";
import { replaceItemAtIndex } from '@/utils/index';

const ProductSizeDialog = () => {
  const [, setIsOpenCart] = useRecoilState(isOpenCartState);
  const [selectSize, setSelectSize] = useRecoilState(selectSizeState);
  const [cart, setCart] = useRecoilState(cartState);
  const handleClose = () => {
    setSelectSize({
      open: false,
      product: null,
      size: null
    });
  }
  const handleSubmit = () => {
    if (!selectSize.product) {
      return;
    }
    const cartItem: CartItem = {
        product: selectSize.product,
        size: selectSize.size,
        quantity: 1,
    }
    if (cart.find((item: any) => item.product.id === cartItem.product.id && item.size === cartItem.size)) {
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
    setSelectSize({
      open: false,
      product: null,
      size: null
    });
  }
  const handleChange = (sizeValue: any) => {
    setSelectSize({
      open: selectSize.open,
      product: selectSize.product,
      size: sizeValue
    });
  }
  return (
    <Modal title="选择尺寸" open={selectSize.open} onCancel={handleClose} afterClose={handleClose}
    footer={
      <Button onClick={handleSubmit}>确认</Button>
    }
    >
        <Segmented size="large" defaultValue={selectSize.size as any} value={selectSize.size as any} options={(selectSize.product && selectSize.product.availableSizes) || []}  onChange={handleChange}/>
    </Modal>
  )
}

export default ProductSizeDialog;