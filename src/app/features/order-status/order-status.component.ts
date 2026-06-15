import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABEL, OrderStatus } from '../../core/models/order.model';

@Component({
  selector: 'bh-order-status',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent {
  readonly steps = ORDER_STATUS_FLOW;
  readonly labels = ORDER_STATUS_LABEL;

  readonly orderId = signal<string>('');

  readonly order = computed(() => this.orderService.getOrder(this.orderId()));

  readonly currentIndex = computed(() => {
    const order = this.order();
    return order ? this.steps.indexOf(order.status) : 0;
  });

  constructor(private readonly route: ActivatedRoute, private readonly orderService: OrderService) {
    this.orderId.set(this.route.snapshot.paramMap.get('id') ?? '');
  }

  stepState(step: OrderStatus): 'done' | 'active' | 'pending' {
    const idx = this.steps.indexOf(step);
    if (idx < this.currentIndex()) return 'done';
    if (idx === this.currentIndex()) return 'active';
    return 'pending';
  }

  /** Demo helper — in production this is driven by the admin panel / backend. */
  simulateNext(): void {
    const order = this.order();
    if (order) this.orderService.advanceStatus(order.id);
  }
}
