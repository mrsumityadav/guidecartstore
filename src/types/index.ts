export interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  compareAtPrice?: number | null;
  currency: string;
  category: string;
  productType: string;
  thumbnail: string;
  images: string[];
  previewImages: string[];
  features: string[];
  whatYouGet: string[];
  fileFormat: string;
  pageCount: number;
  language: string;
  payhipKey: string;
  featured: boolean;
  bestseller: boolean;
  newProduct: boolean;
  published: boolean;
  faq: FAQItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  itemCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalProducts: number;
  publishedProducts: number;
  featuredProducts: number;
  bestsellers: number;
  newProducts: number;
}

export interface FilterParams {
  search?: string;
  category?: string;
  productType?: string;
  featured?: boolean;
  bestseller?: boolean;
  newProduct?: boolean;
  sort?: string;
  admin?: boolean;
}
