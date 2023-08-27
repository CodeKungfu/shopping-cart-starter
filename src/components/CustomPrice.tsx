import Big from 'big.js';

interface Props {
  price: number;
}

const CustomPrice =  (props: Props) => {
  const priceStr = Big(props.price).toFixed(2);
  const [intStr, dotStr] = priceStr.toString().split('.');
  return (
    <div className='text-center'>
      <span className='mr-4'>$</span>
      <span className='show-price' style={{ fontSize: 24, fontWeight: 700 }}>{intStr}</span>
      .{dotStr}
    </div>
  );
};

export default CustomPrice;