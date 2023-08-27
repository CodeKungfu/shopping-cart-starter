import Big from 'big.js';

interface Props {
  price: number;
}

const CustomPrice =  (props: Props) => {
  const priceStr = Big(props.price).toFixed(2);
  const [intStr, dotStr] = priceStr.toString().split('.');
  return (
    <div className='text-center'>
      <span className='mr-1'>$</span>
      <span className='text-2xl	font-bold'>{intStr}</span>
      .{dotStr}
    </div>
  );
};

export default CustomPrice;