const BASE_URL = "http://localhost:8000";

export const API_ENDPOINTS = {
  // Contact
  CONTACT_CREATE: `${BASE_URL}/contact/contact_create.php`,
  CONTACT_GET: `${BASE_URL}/contact/contact_get.php`,
  CONTACT_SINGLE: `${BASE_URL}/contact/contact_single.php`,
  CONTACT_DELETE: `${BASE_URL}/contact/contact_delete.php`,

  // Blogs
  BLOG_CREATE: `${BASE_URL}/blog/blog_create.php`,
  BLOG_GET: `${BASE_URL}/blog/blog_get.php`,
  BLOG_SINGLE: `${BASE_URL}/blog/blog_single.php`,
  BLOG_UPDATE: `${BASE_URL}/blog/blog_update.php`,
  BLOG_DELETE: `${BASE_URL}/blog/blog_delete.php`,

  // Categories
  CATEGORY_CREATE: `${BASE_URL}/blog-category/category_create.php`,
  CATEGORY_GET: `${BASE_URL}/blog-category/category_get.php`,
  CATEGORY_UPDATE: `${BASE_URL}/blog-category/category_update.php`,

  //img

  UPLOAD_BLOG_IMAGE: `${BASE_URL}/blog/upload_image.php`,
};


export default API_ENDPOINTS;