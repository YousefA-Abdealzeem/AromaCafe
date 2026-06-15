import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

/**
 * Ambient floating particle layer used to evoke drifting steam / coffee dust
 * across hero and section backgrounds. Purely decorative, pointer-events: none.
 */
@Component({
  selector: 'bh-floating-particles',
  standalone: true,
  imports: [NgClass],
  templateUrl: './floating-particles.component.html',
  styleUrl: './floating-particles.component.scss'
})
export class FloatingParticlesComponent {
  @Input() count = 18;
  @Input() variant: 'steam' | 'dust' = 'dust';

  get particles(): number[] {
    return Array.from({ length: this.count }, (_, i) => i);
  }
}
