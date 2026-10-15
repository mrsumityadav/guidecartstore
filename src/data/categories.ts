import { Category } from '@/types';
import { products } from './products';

export interface StoreCategory extends Category {
  gradient?: string;
}

export const staticCategories: StoreCategory[] = [
  {
    _id: 'cat-career',
    name: 'Career & Interview',
    slug: 'career-interview',
    description: 'Actionable job preparation toolkits, interview answer frameworks, and recruiter-ready checklists.',
    icon: 'Briefcase',
    gradient: 'from-blue-600 to-indigo-700'
  },
  {
    _id: 'cat-ebooks',
    name: 'E-Books',
    slug: 'ebooks',
    description: 'In-depth digital books covering modern software architecture, professional growth, and technical mastery.',
    icon: 'BookOpen',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    _id: 'cat-pdf-guides',
    name: 'PDF Guides',
    slug: 'pdf-guides',
    description: 'Streamlined, step-by-step PDF field guides engineered for quick reading and rapid implementation.',
    icon: 'Compass',
    gradient: 'from-teal-600 to-emerald-700'
  },
  {
    _id: 'cat-ai-productivity',
    name: 'AI & Productivity',
    slug: 'ai-productivity',
    description: 'Modern prompt engineering playbooks, automation frameworks, and focus architectures.',
    icon: 'Sparkles',
    gradient: 'from-purple-600 to-indigo-800'
  },
  {
    _id: 'cat-planners-printables',
    name: 'Planners & Printables',
    slug: 'planners-printables',
    description: 'Minimalist goal planners, habit tracking sheets, and personal finance budgeting workbooks.',
    icon: 'Calendar',
    gradient: 'from-rose-500 to-pink-600'
  },
  {
    _id: 'cat-kids-learning',
    name: 'Kids Learning',
    slug: 'kids-learning',
    description: 'Fun printable early learning worksheets, alphabet tracing, and number puzzle workbooks.',
    icon: 'GraduationCap',
    gradient: 'from-emerald-500 to-cyan-600'
  }
];

export function getCategoriesWithCounts(): StoreCategory[] {
  return staticCategories.map((cat) => {
    const count = products.filter(
      (p) => p.published && p.category.toLowerCase() === cat.name.toLowerCase()
    ).length;
    return {
      ...cat,
      itemCount: count
    };
  });
}
