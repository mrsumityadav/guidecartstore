import { Product, Category, ContactMessage, AdminStats, FilterParams } from '@/types';
import { products, getAllProducts, getProductBySlug } from '@/data/products';
import { getCategoriesWithCounts } from '@/data/categories';

// ================= PRODUCT APIS (STATIC FRONTEND-FIRST) =================

export async function fetchProducts(params: FilterParams = {}): Promise<Product[]> {
  let list = getAllProducts();

  // Search filter
  if (params.search && params.search.trim()) {
    const s = params.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.shortDescription.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s)
    );
  }

  // Category filter
  if (params.category && params.category !== 'All') {
    list = list.filter((p) => p.category.toLowerCase() === params.category!.toLowerCase());
  }

  // Product Type filter
  if (params.productType && params.productType !== 'All') {
    list = list.filter(
      (p) =>
        p.productType.toLowerCase() === params.productType!.toLowerCase() ||
        p.fileFormat.toLowerCase() === params.productType!.toLowerCase()
    );
  }

  // Flag filters
  if (params.featured) {
    list = list.filter((p) => p.featured);
  }

  if (params.bestseller) {
    list = list.filter((p) => p.bestseller);
  }

  if (params.newProduct) {
    list = list.filter((p) => p.newProduct);
  }

  // Sorting
  if (params.sort) {
    if (params.sort === 'price-low-high') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price-high-low') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (params.sort === 'title-asc') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (params.sort === 'oldest') {
      list = [...list].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      // Default: newest
      list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }

  return list;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const product = getProductBySlug(slug);
  return product || null;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const product = products.find((p) => p._id === id);
  return product || null;
}

// Client-side stub for admin management
export async function createProduct(productData: Partial<Product>): Promise<{ success: boolean; data?: Product; message?: string }> {
  return {
    success: true,
    message: 'Store is currently operating in static frontend-only mode. New products are managed in src/data/products.ts.'
  };
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<{ success: boolean; data?: Product; message?: string }> {
  return {
    success: true,
    message: 'Store is currently operating in static frontend-only mode. Product updates are configured in src/data/products.ts.'
  };
}

export async function deleteProduct(id: string): Promise<{ success: boolean; message?: string }> {
  return {
    success: true,
    message: 'Store is running in static frontend-only mode.'
  };
}

// ================= CATEGORY APIS =================

export async function fetchCategories(): Promise<Category[]> {
  return getCategoriesWithCounts();
}

export async function createCategory(catData: { name: string; description?: string; icon?: string }): Promise<{ success: boolean; data?: Category; message?: string }> {
  return {
    success: true,
    message: 'Categories are configured in src/data/categories.ts.'
  };
}

export async function deleteCategory(id: string): Promise<{ success: boolean; message?: string }> {
  return { success: true };
}

// ================= CONTACT APIS =================

export async function sendContactMessage(msgData: { name: string; email: string; subject: string; message: string }): Promise<{ success: boolean; message: string }> {
  // Store locally in browser storage if available
  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(localStorage.getItem('guidecart_contact_messages') || '[]');
      existing.push({
        ...msgData,
        _id: 'msg-' + Date.now(),
        status: 'unread',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('guidecart_contact_messages', JSON.stringify(existing));
    } catch {
      // Ignore storage errors
    }
  }

  return {
    success: true,
    message: 'Thank you! Your inquiry has been received. Our support team will reply to ' + msgData.email + ' shortly.'
  };
}

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(localStorage.getItem('guidecart_contact_messages') || '[]');
    } catch {
      return [];
    }
  }
  return [];
}

export async function updateMessageStatus(id: string, status: string): Promise<boolean> {
  return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  return true;
}

// ================= ADMIN APIS =================

export async function loginAdminApi(email: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
  if (email && password) {
    const dummyToken = 'static_guidecart_admin_token_2026';
    if (typeof window !== 'undefined') {
      localStorage.setItem('guidecart_admin_token', dummyToken);
    }
    return { success: true, token: dummyToken };
  }
  return { success: false, message: 'Invalid credentials' };
}

export async function fetchAdminStats(): Promise<AdminStats | null> {
  const published = products.filter((p) => p.published);
  return {
    totalProducts: products.length,
    publishedProducts: published.length,
    featuredProducts: products.filter((p) => p.featured).length,
    bestsellers: products.filter((p) => p.bestseller).length,
    newProducts: products.filter((p) => p.newProduct).length
  };
}
