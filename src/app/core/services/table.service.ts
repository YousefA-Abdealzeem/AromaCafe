import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'bh_table_number';

/**
 * Detects the table number from the URL query string (?table=12),
 * persists it in sessionStorage, and exposes it as a signal so it
 * stays available throughout the entire ordering journey.
 */
@Injectable({ providedIn: 'root' })
export class TableService {
  readonly tableNumber = signal<string | null>(null);

  constructor() {
    this.restore();
  }

  /** Called once on app bootstrap with the current URL search params. */
  detectFromUrl(search: string): void {
    const params = new URLSearchParams(search);
    const table = params.get('table');

    if (table) {
      this.set(table);
    }
  }

  set(table: string): void {
    this.tableNumber.set(table);
    try {
      sessionStorage.setItem(STORAGE_KEY, table);
    } catch {
      /* sessionStorage unavailable — degrade silently */
    }
  }

  private restore(): void {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.tableNumber.set(stored);
      }
    } catch {
      /* ignore */
    }
  }

  get hasTable(): boolean {
    return !!this.tableNumber();
  }
}
