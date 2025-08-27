export type Category = {
  _id?: string;
  name: string;
  slug: string;
};

export type Product = {
  _id?: string;
  slug: string;
  name: string;
  description?: string;
  images: string[];
  // Prefer pence; keep GBP for legacy data while migrating
  pricePence?: number;
  priceGBP?: number;
  category?: string | Category;
  inventory?: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CartItem = {
  slug: string;
  name: string;
  image?: string;
  pricePence: number;
  qty: number;
};
