import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { TableService } from '../../core/services/table.service';
import { OrderService } from '../../core/services/order.service';
import { PaymentMethod } from '../../core/models/order.model';

@Component({
  selector: 'bh-checkout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  readonly paymentMethod = signal<PaymentMethod | null>(null);
  readonly placingOrder = signal(false);

  constructor(
    readonly cart: CartService,
    readonly table: TableService,
    private readonly orderService: OrderService,
    private readonly router: Router
  ) {}

  selectPayment(method: PaymentMethod): void {
    this.paymentMethod.set(method);
  }

  confirmOrder(): void {
    const method = this.paymentMethod();
    if (!method || this.cart.isEmpty()) return;

    this.placingOrder.set(true);

    const order = this.orderService.createOrder({
      tableNumber: this.table.tableNumber() ?? 'N/A',
      items: this.cart.items(),
      subtotal: this.cart.subtotal(),
      tax: this.cart.tax(),
      total: this.cart.total(),
      paymentMethod: method
    });

    this.cart.clear();

    setTimeout(() => {
      this.router.navigate(['/order-status', order.id]);
    }, 700);
  }
}
