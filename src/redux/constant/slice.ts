const REDUX_SLICE = {
  SAMPLE: "sample-slice",
  PRODUCT: "product-slice",
  PRODUCT_FORM: "product-form-slice",
  CATEGORY_FORM: "category-form-slice",
} as const;

const REDUX_API = {
  SAMPLE: "sample-api",
  TAGS: {
    SAMPLE_LIST: "sample-api-list",
    SAMPLE_ID: "sample-api-id",
  },
} as const;

export const REDUX = {
  FIELD: {
    KEY: "_latestKey",
  },
  SLICE: REDUX_SLICE,
  API: REDUX_API,
} as const;
