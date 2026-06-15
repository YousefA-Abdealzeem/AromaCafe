import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FloatingParticlesComponent } from '../../shared/components/floating-particles/floating-particles.component';
import { TableService } from '../../core/services/table.service';

gsap.registerPlugin(ScrollTrigger);

interface HeroScene {
  image: string;
  caption: string;
}

@Component({
  selector: 'bh-home',
  standalone: true,
  imports: [FloatingParticlesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroPin') heroPin!: ElementRef<HTMLElement>;
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;

  readonly scenes: HeroScene[] = [
    { image: 'assets/hero/1.png', caption: 'Sealed for freshness' },
    { image: 'assets/hero/2.png', caption: 'Opened to reveal' },
    { image: 'assets/hero/3.png', caption: 'Beans, ground to perfection' },
    { image: 'assets/hero/4.png', caption: 'Falling into the glass' },
    { image: 'assets/hero/6.png', caption: 'Crafted for you' }
  ];

  readonly categories = [
    {
      slug: 'hot-drinks',
      title: 'Hot Drinks',
      tagline: 'Slow-extracted, full-bodied, served at the perfect temperature.',
      image: 'assets/hero/5.png'
    },
    {
      slug: 'iced-drinks',
      title: 'Iced Drinks',
      tagline: 'Cold-brewed clarity over hand-cracked ice.',
      image: 'assets/hero/4.png'
    },
    {
      slug: 'fresh-juice',
      title: 'Fresh Juice',
      tagline: 'Cold-pressed fruit, no concentrates, no shortcuts.',
      image: 'assets/hero/3.png'
    }
  ];

  readonly activeScene = signal(0);
  readonly showThankYou = signal(false);

  private triggers: ScrollTrigger[] = [];

  constructor(private readonly router: Router, readonly table: TableService) {}

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.setupScrollStory());
  }

  ngOnDestroy(): void {
    this.triggers.forEach((t) => t.kill());
    this.triggers = [];
  }

  private setupScrollStory(): void {
    const slides = gsap.utils.toArray<HTMLElement>('.bh-scene');
    if (!slides.length) return;

    slides.forEach((slide, i) => {
      gsap.set(slide, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.08 });
    });

    const total = slides.length;

    // ── Hero cinematic scroll ──
    const trigger = ScrollTrigger.create({
      trigger: '.bh-hero',
      start: 'top top',
      end: () => `+=${window.innerHeight * (total - 1)}`,
      pin: '.bh-hero__pin',
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress * (total - 1);
        const index = Math.min(total - 1, Math.floor(progress));
        const localProgress = progress - index;

        this.activeScene.set(index);
        this.showThankYou.set(index === total - 1 && localProgress > 0.5);

        slides.forEach((slide, i) => {
          if (i === index) {
            gsap.set(slide, { opacity: 1 - localProgress, scale: 1 + localProgress * 0.08 });
          } else if (i === index + 1) {
            gsap.set(slide, { opacity: localProgress, scale: 1.08 - localProgress * 0.08 });
          } else {
            gsap.set(slide, { opacity: 0 });
          }
        });
      }
    });
    this.triggers.push(trigger);

    // ── Fade out hero copy on scroll ──
    const copyTrigger = ScrollTrigger.create({
      trigger: '.bh-hero',
      start: 'top top',
      end: '+=300',
      scrub: true,
      onUpdate: (self) => {
        gsap.set('.bh-hero__copy', {
          opacity: 1 - self.progress,
          y: -self.progress * 60
        });
      }
    });
    this.triggers.push(copyTrigger);

    // ── Category cards reveal ──
    gsap.utils.toArray<HTMLElement>('.bh-cat-card').forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 60, scale: 0.96 });

      const t = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: i * 0.08
          });
        }
      });
      this.triggers.push(t);
    });

    // ── Story section reveal ──
    gsap.set('.bh-story__content', { opacity: 0, y: 40 });

    const storyTrigger = ScrollTrigger.create({
      trigger: '.bh-story',
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.bh-story__content', {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out'
        });
      }
    });
    this.triggers.push(storyTrigger);
  }

  scrollToCategories(): void {
    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
  }

  goToCategory(slug: string): void {
    this.router.navigate(['/menu', slug]);
  }
}