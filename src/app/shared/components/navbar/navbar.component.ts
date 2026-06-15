import { Component, EventEmitter, HostListener, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { TableService } from '../../../core/services/table.service';

@Component({
  selector: 'bh-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() cartClick = new EventEmitter<void>();

  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  constructor(
    readonly cart: CartService,
    readonly table: TableService
  ) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }
}