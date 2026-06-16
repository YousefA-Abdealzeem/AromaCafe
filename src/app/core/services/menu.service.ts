import { Injectable } from '@angular/core';
import { Category, Product } from '../models/product.model';

/**
 * In a real build this would call the ASP.NET Core Web API.
 * For this frontend-only prototype, menu data is provided in-memory
 * so the full ordering journey can be demoed end to end.
 */
@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly categories: Category[] = [
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

  private readonly products: Product[] = [
    // ─── Hot Drinks ───────────────────────────────────────────────────────────
    {
      id: 'h-espresso',
      categorySlug: 'hot-drinks',
      name: 'Single Origin Espresso',
      description: 'A concentrated shot of our house roast — notes of dark cocoa and toasted hazelnut.',
      price: 65,
      image: 'assets/hero/turkish_french_coffee.png',
      customization: {
        sizes: ['Small', 'Medium', 'Large'],
        sugarLevels: ['No Sugar', 'Less Sugar', 'Normal', 'Extra Sugar'],
        allowExtraShot: true,
        allowExtraFlavor: true
      }
    },
    {
      id: 'h-flat-white',
      categorySlug: 'hot-drinks',
      name: 'Velvet Flat White',
      description: 'Double espresso with micro-foamed milk, silky and balanced.',
      price: 85,
      image: 'assets/hero/flat_white.png',
      customization: {
        sizes: ['Small', 'Medium', 'Large'],
        sugarLevels: ['No Sugar', 'Less Sugar', 'Normal', 'Extra Sugar'],
        milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk'],
        allowExtraShot: true,
        allowExtraFlavor: true
      }
    },
    {
      id: 'h-mocha',
      categorySlug: 'hot-drinks',
      name: 'Dark Mocha',
      description: 'Espresso, steamed milk and Valrhona dark chocolate, finished with cocoa dust.',
      price: 95,
      image: 'assets/hero/mocha.png',
      customization: {
        sizes: ['Small', 'Medium', 'Large'],
        sugarLevels: ['No Sugar', 'Less Sugar', 'Normal', 'Extra Sugar'],
        milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk'],
        allowExtraShot: true,
        allowExtraFlavor: true
      }
    },
    {
      id: 'h-pourover',
      categorySlug: 'hot-drinks',
      name: 'Ceremonial Pour-Over',
      description: 'A single-origin Ethiopian Yirgacheffe, hand-poured tableside.',
      price: 110,
      image: 'assets/hero/latte.png',
      customization: {
        sizes: ['Medium', 'Large'],
        sugarLevels: ['No Sugar', 'Less Sugar', 'Normal'],
        allowExtraShot: false,
        allowExtraFlavor: false
      }
    },

    // ─── Iced Drinks ──────────────────────────────────────────────────────────
    {
      id: 'i-cold-brew',
      categorySlug: 'iced-drinks',
      name: 'Signature Cold Brew',
      description: '18-hour slow steep over filtered water, served over hand-cracked ice.',
      price: 90,
      image: 'assets/hero/iced_cold_brew.png',
      customization: {
        sizes: ['Small', 'Medium', 'Large'],
        sugarLevels: ['No Sugar', 'Less Sugar', 'Normal', 'Extra Sugar'],
        milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk'],
        allowExtraShot: true,
        allowExtraFlavor: true
      }
    },
    {
      id: 'i-iced-latte',
      categorySlug: 'iced-drinks',
      name: 'Iced Vanilla Latte',
      description: 'Espresso over cold milk with house-made Madagascar vanilla syrup.',
      price: 95,
      image: 'assets/hero/iced_latte.png',
      customization: {
        sizes: ['Small', 'Medium', 'Large'],
        sugarLevels: ['No Sugar', 'Less Sugar', 'Normal', 'Extra Sugar'],
        milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk'],
        allowExtraShot: true,
        allowExtraFlavor: true
      }
    },
    {
      id: 'i-affogato',
      categorySlug: 'iced-drinks',
      name: 'Affogato',
      description: 'A scoop of vanilla bean gelato drowned in hot espresso, served chilled.',
      price: 105,
      image: 'assets/hero/affogato.png',
      customization: {
        sizes: ['Medium'],
        sugarLevels: ['No Sugar', 'Normal'],
        allowExtraShot: true,
        allowExtraFlavor: true
      }
    },

    // ─── Fresh Juice ──────────────────────────────────────────────────────────
    {
      id: 'j-citrus',
      categorySlug: 'fresh-juice',
      name: 'Golden Citrus Press',
      description: 'Cold-pressed orange, blood orange and a touch of ginger.',
      price: 75,
      image: 'assets/hero/3.png',
      customization: {
        sizes: ['Medium', 'Large'],
        sugarLevels: ['No Sugar', 'Less Sugar', 'Normal']
      }
    },
    {
      id: 'j-greens',
      categorySlug: 'fresh-juice',
      name: 'Emerald Greens',
      description: 'Spinach, green apple, cucumber and mint, pressed to order.',
      price: 80,
      image: 'assets/hero/3.png',
      customization: {
        sizes: ['Medium', 'Large'],
        sugarLevels: ['No Sugar', 'Less Sugar', 'Normal']
      }
    },
    {
      id: 'j-berry',
      categorySlug: 'fresh-juice',
      name: 'Wild Berry Press',
      description: 'Strawberry, blackberry and raspberry, cold-pressed and unfiltered.',
      price: 85,
      image: 'assets/hero/3.png',
      customization: {
        sizes: ['Medium', 'Large'],
        sugarLevels: ['No Sugar', 'Less Sugar', 'Normal']
      }
    }
  ];

  getCategories(): Category[] {
    return this.categories;
  }

  getCategory(slug: string): Category | undefined {
    return this.categories.find((c) => c.slug === slug);
  }

  getProductsByCategory(slug: string): Product[] {
    return this.products.filter((p) => p.categorySlug === slug);
  }

  getProduct(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}