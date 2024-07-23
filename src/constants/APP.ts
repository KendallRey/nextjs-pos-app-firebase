const ID = ":id:";

const PRODUCT = {
  NAME: "Product",
  LINK: "/admin/product",
  PRODUCT_ID: `/admin/product?id=${ID}`,
} as const;

const CATEGORY = {
  NAME: "Category",
  LINK: "/admin/category",
  CATEGORY_ID: `/admin/category?id=${ID}`,
} as const;

export const APP = {
  ID: ID,
  ROUTES: {
    ADMIN: {
      PRODUCT,
      CATEGORY,
    },
  },
} as const;
