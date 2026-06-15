import { Injectable, computed, signal } from '@angular/core';
import { CartItem, CartItemOptions } from '../models/cart-item.model';

const EXTRA_SHOT_PRICE = 15;
const EXTRA_FLAVOR_PRICE = 10;
const SIZE_SURCHARGE: Record<string, number> = {
  Small: 0,
  Medium: 5,
  Large: 12
};

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);
  readonly items = this._items.asReadonly();

  readonly itemCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this._items().reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  );

  /** 14% VAT, common in many specialty cafés — adjust per locale. */
  readonly taxRate = 0.14;

  readonly tax = computed(() => Math.round(this.subtotal() * this.taxRate * 100) / 100);

  readonly total = computed(() => Math.round((this.subtotal() + this.tax()) * 100) / 100);

  readonly isEmpty = computed(() => this._items().length === 0);

  /** Computes the per-unit price including size surcharge and add-ons. */
  computeUnitPrice(basePrice: number, options: CartItemOptions): number {
    let price = basePrice;
    price += SIZE_SURCHARGE[options.size] ?? 0;
    if (options.extraShot) price += EXTRA_SHOT_PRICE;
    if (options.extraFlavor) price += EXTRA_FLAVOR_PRICE;
    return price;
  }

  addItem(item: Omit<CartItem, 'id'>): void {
    const newItem: CartItem = { ...item, id: crypto.randomUUID() };
    this._items.update((items) => [...items, newItem]);
  }

  updateQuantity(id: string, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(id);
      return;
    }
    this._items.update((items) =>
      items.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }

  removeItem(id: string): void {
    this._items.update((items) => items.filter((i) => i.id !== id));
  }

  clear(): void {
    this._items.set([]);
  }
}
