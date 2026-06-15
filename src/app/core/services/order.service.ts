import { Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Order, OrderStatus, ORDER_STATUS_FLOW, PaymentMethod } from '../models/order.model';

const STORAGE_KEY = 'bh_orders';

/**
 * Simulates the ASP.NET Core order API for this frontend-only prototype.
 * Orders persist to sessionStorage so the admin panel and the
 * order-status page can share live state within the same session.
 */
@Injectable({ providedIn: 'root' })
export class OrderService {
  readonly orders = signal<Order[]>([]);

  constructor() {
    this.restore();
  }

  createOrder(params: {
    tableNumber: string;
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: PaymentMethod;
  }): Order {
    const order: Order = {
      id: this.generateReceiptNumber(),
      tableNumber: params.tableNumber,
      items: params.items,
      subtotal: params.subtotal,
      tax: params.tax,
      total: params.total,
      paymentMethod: params.paymentMethod,
      status: 'received',
      createdAt: new Date().toISOString()
    };

    this.orders.update((list) => [order, ...list]);
    this.persist();
    return order;
  }

  getOrder(id: string): Order | undefined {
    return this.orders().find((o) => o.id === id);
  }

  setStatus(id: string, status: OrderStatus): void {
    this.orders.update((list) =>
      list.map((o) => (o.id === id ? { ...o, status } : o))
    );
    this.persist();
  }

  advanceStatus(id: string): void {
    const order = this.getOrder(id);
    if (!order) return;
    const idx = ORDER_STATUS_FLOW.indexOf(order.status);
    const next = ORDER_STATUS_FLOW[Math.min(idx + 1, ORDER_STATUS_FLOW.length - 1)];
    this.setStatus(id, next);
  }

  private generateReceiptNumber(): string {
    const date = new Date();
    const stamp = `${date.getFullYear().toString().slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `BH-${stamp}-${rand}`;
  }

  private persist(): void {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.orders()));
    } catch {
      /* ignore */
    }
  }

  private restore(): void {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        this.orders.set(JSON.parse(raw));
      }
    } catch {
      /* ignore */
    }
  }
}
