import { CartItem } from './cart-item.model';

export type PaymentMethod = 'cash' | 'card';

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'served';

export const ORDER_STATUS_FLOW: OrderStatus[] = ['received', 'preparing', 'ready', 'served'];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  received: 'Order Received',
  preparing: 'Preparing',
  ready: 'Ready',
  served: 'Served'
};

export interface Order {
  id: string;            // receipt number
  tableNumber: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string; // ISO timestamp
}
