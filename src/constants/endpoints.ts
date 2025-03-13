export const ENDPOINTS = {
  USERS: {
    ROOT: 'users',
    ME: 'me',
  },
  AUTH: {
    ROOT: 'auth',
    SIGN_IN: 'sign-in',
    SIGN_UP: 'sign-up',
    REFRESH_TOKEN: 'refresh-token',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
  },
  BLOG_POSTS: {
    ROOT: 'blog-posts',
    SINGLE_POST: ':slug',
    CATEGORIES: 'categories',
    SINGLE_CATEGORY: ':slug',
  },
};
