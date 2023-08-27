// 产品
export interface IProduct {
  availableSizes?: string[] | any;
  id?: number | any;
  installments?: number | any;
  isFreeShipping?: boolean | any;
  price?: number | any;
  style?: string | any;
  title?: string | any;
  front?: string | any;
  back?: string | any;
  currencyFormat?: string | any;
  description?: string | any;
}

// 尺寸列表
export enum SizeType {
  XS = "XS",
  S = "S",
  M = "M",
  ML = "ML",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}


export interface CartItem {
  product: IProduct;
  quantity: number;
  size: SizeType | null;
}

export interface SelectSizeState {
  open: boolean;
  product: IProduct | null;
  size: SizeType | null;
}

export interface ProductQuery {
  sort?: string;
  filter?: string;
  page?: number;
  pageSize?: number;
}
