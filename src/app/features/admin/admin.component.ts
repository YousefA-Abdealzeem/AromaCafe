import { Component, signal } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { MenuService } from '../../core/services/menu.service';
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, OrderStatus } from '../../core/models/order.model';

@Component({
  selector: 'bh-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  readonly statuses = ORDER_STATUS_FLOW;
  readonly labels = ORDER_STATUS_LABEL;

  readonly activeTab = signal<'orders' | 'menu'>('orders');

  constructor(readonly orderService: OrderService, readonly menuService: MenuService) {}

  setStatus(orderId: string, status: OrderStatus): void {
    this.orderService.setStatus(orderId, status);
  }

  categories() {
    return this.menuService.getCategories();
  }

  productsFor(slug: string) {
    return this.menuService.getProductsByCategory(slug);
  }
}
