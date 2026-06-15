import { Component, EventEmitter, Input, OnChanges, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/models/product.model';
import { CartItemOptions } from '../../../core/models/cart-item.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'bh-product-drawer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-drawer.component.html',
  styleUrl: './product-drawer.component.scss'
})
export class ProductDrawerComponent implements OnChanges {
  @Input() product: Product | null = null;
  @Input() open = false;
  @Output() closed = new EventEmitter<void>();
  @Output() added = new EventEmitter<void>();

  readonly size = signal('Medium');
  readonly sugar = signal('Normal');
  readonly milk = signal('Whole Milk');
  readonly extraShot = signal(false);
  readonly extraFlavor = signal(false);
  readonly notes = signal('');
  readonly quantity = signal(1);

  constructor(private readonly cart: CartService) {}

  ngOnChanges(): void {
    if (this.product) {
      const c = this.product.customization;
      this.size.set(c.sizes?.[Math.floor((c.sizes.length - 1) / 2)] ?? c.sizes?.[0] ?? 'Medium');
      this.sugar.set(c.sugarLevels?.includes('Normal') ? 'Normal' : c.sugarLevels?.[0] ?? 'Normal');
      this.milk.set(c.milkOptions?.[0] ?? 'Whole Milk');
      this.extraShot.set(false);
      this.extraFlavor.set(false);
      this.notes.set('');
      this.quantity.set(1);
    }
  }

  get unitPrice(): number {
    if (!this.product) return 0;
    return this.cart.computeUnitPrice(this.product.price, this.options);
  }

  get options(): CartItemOptions {
    return {
      size: this.size(),
      sugar: this.sugar(),
      milk: this.product?.customization.milkOptions ? this.milk() : '',
      extraShot: this.extraShot(),
      extraFlavor: this.extraFlavor(),
      notes: this.notes().trim()
    };
  }

  incQty(): void { this.quantity.update((q) => q + 1); }
  decQty(): void { this.quantity.update((q) => Math.max(1, q - 1)); }

  addToCart(): void {
    if (!this.product) return;
    this.cart.addItem({
      productId: this.product.id,
      name: this.product.name,
      image: this.product.image,
      basePrice: this.product.price,
      unitPrice: this.unitPrice,
      quantity: this.quantity(),
      options: this.options
    });
    this.added.emit();
  }

  close(): void {
    this.closed.emit();
  }
}
