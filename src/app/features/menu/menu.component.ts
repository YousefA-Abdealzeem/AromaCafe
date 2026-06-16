import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuService } from '../../core/services/menu.service';
import { Product, Category } from '../../core/models/product.model';
import { ProductDrawerComponent } from '../../shared/components/product-drawer/product-drawer.component';
import { CartDrawerComponent } from '../../shared/components/cart-drawer/cart-drawer.component';

@Component({
  selector: 'bh-menu',
  standalone: true,
  imports: [RouterLink, ProductDrawerComponent, CartDrawerComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  readonly category = signal<Category | undefined>(undefined);
  readonly products = signal<Product[]>([]);

  readonly selectedProduct = signal<Product | null>(null);
  readonly drawerOpen = signal(false);
  readonly cartOpen = signal(false);  // ← جديد

  constructor(private readonly route: ActivatedRoute, private readonly menu: MenuService) {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('category') ?? '';
      this.category.set(this.menu.getCategory(slug));
      this.products.set(this.menu.getProductsByCategory(slug));
    });
  }

  openProduct(product: Product): void {
    this.selectedProduct.set(product);
    this.drawerOpen.set(true);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }

  onAdded(): void {
    this.drawerOpen.set(false);
    this.cartOpen.set(true);  // ← بدل الـ toast
  }
}