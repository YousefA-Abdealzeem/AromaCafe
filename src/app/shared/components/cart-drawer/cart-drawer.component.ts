import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { TableService } from '../../../core/services/table.service';

@Component({
  selector: 'bh-cart-drawer',
  standalone: true,
  imports: [],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent {
  @Input() open = false;
  @Output() closed = new EventEmitter<void>();

  constructor(
    readonly cart: CartService,
    readonly table: TableService,
    private readonly router: Router
  ) {}

  increment(id: string, current: number): void {
    this.cart.updateQuantity(id, current + 1);
  }

  decrement(id: string, current: number): void {
    this.cart.updateQuantity(id, current - 1);
  }

  remove(id: string): void {
    this.cart.removeItem(id);
  }

  optionsSummary(options: { size: string; sugar: string; milk: string; extraShot: boolean; extraFlavor: boolean }): string {
    const parts = [options.size, options.sugar];
    if (options.milk) parts.push(options.milk);
    if (options.extraShot) parts.push('Extra Shot');
    if (options.extraFlavor) parts.push('Extra Flavor');
    return parts.join(' · ');
  }

  goToCheckout(): void {
    this.closed.emit();
    this.router.navigate(['/checkout']);
  }

  close(): void {
    this.closed.emit();
  }
}
