import { useRecoilState, useRecoilValue } from 'recoil';
import { Col, Row, Layout, Radio, Avatar, Badge, Checkbox } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import Products from "@/components/Products";
import ProductSizeDialog from "@/components/ProductSizeDialog";
import { CartDrawer } from "@/components/CartDrawer";
import { isOpenCartState, currentProductQueryState } from '@/atoms/cartState';
import cartTotalState from '@/selectors/cartTotalState';
import { SizeType } from "@/interfaces/IProducts";

const { Header, Content, Footer } = Layout;
const CheckboxGroup = Checkbox.Group;
const ALLSizeList = [
  SizeType.XS,
  SizeType.S,
  SizeType.M,
  SizeType.ML,
  SizeType.L,
  SizeType.XL,
  SizeType.XXL
]

function App() {
  const totalInfo = useRecoilValue(cartTotalState);
  const [, setIsOpenCart] = useRecoilState(isOpenCartState);
  const [currentProductQuery, setCurrentProductQuery] = useRecoilState(currentProductQueryState);
  const plainOptions = ALLSizeList;
  const onChange = (list: any) => {
    setCurrentProductQuery({
      filter: list.length === 0 ? '' : list.join(','),
      sort: currentProductQuery.sort
    });
  };
  const onChangeSort = ({ target: { value } }: RadioChangeEvent) => {
    setCurrentProductQuery({
      filter: currentProductQuery.filter,
      sort: value
    });
  }
  return (
    <>
      <Layout>
        <Header>
          <Row justify="space-between">
            <Col className="text-white" xs={2} sm={4} md={6} lg={4} xl={4}>商城购物车</Col>
            <Col xs={2} sm={4} md={6} lg={4} xl={4} className='text-right'>
              <span onClick={() => { setIsOpenCart(true); }}>
                <Badge className="text-white cursor-pointer" count={totalInfo.tipsNum}>
                  <Avatar size="large" icon={<ShoppingCartOutlined />} />
                </Badge>
              </span>
            </Col>
          </Row>
        </Header>
        <Content className='p-5'>
          <div className="mx-2 my-5">尺寸：
            <CheckboxGroup options={plainOptions} value={currentProductQuery.filter && currentProductQuery.filter.split(',') as any} onChange={onChange} />
          </div>
          <div className="mx-2 my-5">价格：
            <Radio.Group value={currentProductQuery.sort} onChange={onChangeSort}>
              <Radio.Button value="ASC">按价格升序</Radio.Button>
              <Radio.Button value="DESC">按价格降序</Radio.Button>
            </Radio.Group>
          </div>
          {/* <div className="mx-2 mt-5 mb-2">共找到16个商品</div> */}
          <CartDrawer></CartDrawer>
          <Products></Products>
          <ProductSizeDialog></ProductSizeDialog>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}

export default App;
