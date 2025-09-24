// src/types/order.types.ts

// =======================
// Orde r Root Interface
// =======================
export interface Order {
  _id: string;
  id: number;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card" | string;
  isPaid: boolean;
  isDelivered: boolean;
  user: OrderUser;
  cartItems: OrderCartItem[];
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// =======================
// Shipping Address
// =======================
export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

// =======================
// User Info inside Order
// =======================
export interface OrderUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// =======================
// Cart Items inside Order
// =======================
export interface OrderCartItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
}

// =======================
// Product inside Cart Item
// =======================
export interface OrderProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  ratingsQuantity: number;
  ratingsAverage: number;
  category: OrderCategory;
  brand: OrderBrand;
  subcategory: OrderSubcategory[];
}

// =======================
// Product Category
// =======================
export interface OrderCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// =======================
// Product Brand
// =======================
export interface OrderBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// =======================
// Product Subcategory
// =======================
export interface OrderSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
