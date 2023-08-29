import { render, screen } from '@testing-library/react';
import CustomPrice from './CustomPrice';

const mockChildComponent = jest.fn();
jest.mock("./CustomPrice", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});
// 测试组件props 文档：
// https://echobind.com/post/how-to-write-functional-tests-in-react-part-1
// https://akoskm.com/how-to-test-props-in-react-testing-library
// https://robertmarshall.dev/blog/react-component-props-passed-to-child-jest-unit-test/
test('renders custom price component', () => {
  render(<CustomPrice price={8.8}  />);
  // const linkElement = screen.getByText(/.80/i);
  // expect(linkElement).toBeInTheDocument();
  expect(mockChildComponent).toHaveBeenCalledWith(
    expect.objectContaining({
      price: 8.8
    })
  );
  // screen.debug();
});
