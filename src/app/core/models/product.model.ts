export type CategorySlug = 'hot-drinks' | 'iced-drinks' | 'fresh-juice';

export interface ProductCustomization {
  sizes?: string[];
  sugarLevels?: string[];
  milkOptions?: string[];
  allowExtraShot?: boolean;
  allowExtraFlavor?: boolean;
}

export interface Product {
  id: string;
  categorySlug: CategorySlug;
  name: string;
  description: string;
  price: number; // base price for default size
  image: string;
  customization: ProductCustomization;
}

export interface Category {
  slug: CategorySlug;
  title: string;
  tagline: string;
  image: string;
}
