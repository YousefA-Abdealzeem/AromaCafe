export interface CartItemOptions {
  size: string;
  sugar: string;
  milk: string;
  extraShot: boolean;
  extraFlavor: boolean;
  notes: string;
}

export interface CartItem {
  id: string;            // unique line id
  productId: string;
  name: string;
  image: string;
  basePrice: number;
  unitPrice: number;      // computed with add-ons
  quantity: number;
  options: CartItemOptions;
}
