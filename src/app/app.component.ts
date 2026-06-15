import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { CartDrawerComponent } from './shared/components/cart-drawer/cart-drawer.component';
import { TableService } from './core/services/table.service';

@Component({
  selector: 'bh-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CartDrawerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly cartOpen = signal(false);

  constructor(private readonly tableService: TableService) {
    // Detect ?table=12 from the QR code link on first load.
    this.tableService.detectFromUrl(window.location.search);
  }

  openCart(): void {
    this.cartOpen.set(true);
  }

  closeCart(): void {
    this.cartOpen.set(false);
  }
}
