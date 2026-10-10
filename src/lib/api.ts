import { Product, Category, ContactMessage, AdminStats, FilterParams } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper for fetching headers with auth token if logged in
const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('guidecart_admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

// ================= PRODUCT APIS =================

export async function fetchProducts(params: FilterParams = {}): Promise<Product[]> {
  try {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.productType && params.productType !== 'All') query.append('productType', params.productType);
    if (params.featured) query.append('featured', 'true');
    if (params.bestseller) query.append('bestseller', 'true');
    if (params.newProduct) query.append('newProduct', 'true');
    if (params.sort) query.append('sort', params.sort);
    if (params.admin) query.append('admin', 'true');

    const res = await fetch(`${API_URL}/products?${query.toString()}`, {
      cache: 'no-store',
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return null;
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/products/id/${encodeURIComponent(id)}`, {
      cache: 'no-store',
      headers: getAuthHeaders(),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching product by id ${id}:`, error);
    return null;
  }
}

export async function createProduct(productData: Partial<Product>): Promise<{ success: boolean; data?: Product; message?: string }> {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'Failed to create product' };
    }
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<{ success: boolean; data?: Product; message?: string }> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'Failed to update product' };
    }
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
}

export async function deleteProduct(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'Failed to delete product' };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
}

// ================= CATEGORY APIS =================

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function createCategory(catData: { name: string; description?: string; icon?: string }): Promise<{ success: boolean; data?: Category; message?: string }> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(catData),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'Failed to create category' };
    }
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
}

export async function deleteCategory(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'Failed to delete category' };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
}

// ================= CONTACT APIS =================

export async function sendContactMessage(msgData: { name: string; email: string; subject: string; message: string }): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msgData),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'Failed to send message.' };
    }
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message || 'Server connection error.' };
  }
}

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      cache: 'no-store',
      headers: getAuthHeaders(),
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }
}

export async function updateMessageStatus(id: string, status: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/contact/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch (error) {
    return false;
  }
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch (error) {
    return false;
  }
}

// ================= ADMIN APIS =================

export async function loginAdminApi(email: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'Invalid credentials' };
    }

    if (data.data?.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('guidecart_admin_token', data.data.token);
      }
      return { success: true, token: data.data.token };
    }

    return { success: false, message: 'No token returned' };
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
}

export async function fetchAdminStats(): Promise<AdminStats | null> {
  try {
    const res = await fetch(`${API_URL}/products/admin/stats`, {
      cache: 'no-store',
      headers: getAuthHeaders(),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return null;
  }
}
