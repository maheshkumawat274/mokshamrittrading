/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  categoryId: number;
  categoryName: string;
  author: string;
  readTime: string;
  image: string;
  published: boolean;
  createdDate: string;
  seoTitle?: string;
  seoKeywords?: string;
  seoDescription?: string;
}

export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdDate: string;
}

export interface GlobalSettings {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  seo: {
    seoTitle: string;
    seoKeywords: string;
    seoDescription: string;
  };
}
