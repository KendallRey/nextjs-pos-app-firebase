import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { nanoid } from "@reduxjs/toolkit";
import { getValidationErrors, parseData } from "@/model/helper/data";
import { ERRORS } from "@/firebase/constants/error";
import { IProductCreateSchema } from "@/model/product/product-create";
import { FIREBASE } from "@/firebase/constants/firebase";
import { db } from "@/firebase/config";
import { METHOD } from "@/components/constants/method";
import { ProductItemCreateSchema } from "@/model/product/product-item-create";

const useFirestoreProductTransaction = () => {
  const actionLogCollectionRef = collection(db, FIREBASE.COLLECTION.ACTION_LOGS);

  const addProductApi = async (data: Partial<IProductCreateSchema>): Promise<IApiResponse> => {
    try {
      await runTransaction(db, async (transaction) => {
        const productID = nanoid();
        const productDoc = doc(db, FIREBASE.COLLECTION.PRODUCT, productID);
        const productSnapshot = await transaction.get(productDoc);
        if (productSnapshot.exists()) throw new Error(ERRORS.PRODUCT_ALREADY_EXISTS);

        const productItemID = nanoid();
        const productItemDoc = doc(db, FIREBASE.COLLECTION.PRODUCT_ITEM, productItemID);
        const productItemSnapshot = await transaction.get(productItemDoc);
        if (productItemSnapshot.exists()) throw new Error(ERRORS.PRODUCT_ITEM_ALREADY_EXISTS);

        const productItemData = {
          ...data,
          categories: data.categories?.map((item) => doc(db, FIREBASE.COLLECTION.CATEGORY, item.id)),
        };

        transaction.set(productItemDoc, productItemData);

        const productItemDocRef = doc(db, FIREBASE.COLLECTION.PRODUCT_ITEM, productItemDoc.id);

        const { categories, ...cleanProductItemData } = productItemData;
        const productData = {
          ...cleanProductItemData,
          categories: data.categories?.map((item) => item.name),
          product_ref: productItemDocRef,
        };
        const productItemValidation = ProductItemCreateSchema.safeParse(productData);
        if (!productItemValidation.success) {
          const errors = getValidationErrors(productItemValidation);
          throw new Error(ERRORS.PRODUCT_ITEM_CREATE_VALIDATION_FAILED);
        }

        transaction.set(productDoc, productData);

        await addDoc(actionLogCollectionRef, {
          userId: null,
          event: `${"user"}-${METHOD.POST}-[${FIREBASE.COLLECTION.PRODUCT_ITEM}, ${FIREBASE.COLLECTION.PRODUCT}]-[${productDoc.id}, ${productItemDoc.id}]`,
          action: METHOD.POST,
          status: "success",
          model: "log.model",
          itemId: null,
          timestamp: serverTimestamp(),
        });
      });
      return {
        status: "success",
        data: data,
      };
    } catch (error) {
      const apiError = error as Error;
      return {
        status: "failed",
        error: error,
        message: apiError?.message || ERRORS[505],
      };
    }
  };

  const getProductApi = async <T,>(productID: string): Promise<IApiResponse<T>> => {
    try {
      let data = {};
      await runTransaction(db, async (transaction) => {
        const productDoc = doc(db, FIREBASE.COLLECTION.PRODUCT, productID);
        const productSnapshot = await transaction.get(productDoc);
        if (!productSnapshot.exists()) throw new Error(ERRORS.PRODUCT_NOT_FOUND);
        const productData = productSnapshot.data();
        const { product_ref, ...cleanProductData } = productData;
        const productRef = product_ref as DocumentReference<DocumentData, DocumentData>;

        const productItemSnapshot = await transaction.get(productRef);
        if (!productItemSnapshot.exists()) throw new Error(ERRORS.PRODUCT_ITEM_NOT_FOUND);

        const productRefData = productItemSnapshot.data();
        const categoryRefs = productRefData.categories as DocumentReference<DocumentData, DocumentData>[];
        let categoryDataArray: DocumentData[] = [];
        if (Array.isArray(categoryRefs)) {
          const categories = await Promise.allSettled(
            categoryRefs.map(async (categoryRef) => {
              const categoryDoc = await transaction.get(categoryRef);
              if (!categoryDoc.exists()) {
                throw new Error(ERRORS.CATEGORY_NOT_FOUND);
              }

              const data = parseData(categoryDoc.data());
              return {
                id: categoryDoc.id,
                ...data,
              };
            }),
          );

          categories.forEach((cat) => {
            if (cat.status === "fulfilled") {
              categoryDataArray.push(cat.value);
            }
          });
        }

        await addDoc(actionLogCollectionRef, {
          userId: null,
          event: `${"user"}-${METHOD.GET}-[${FIREBASE.COLLECTION.PRODUCT}]-[${productData.id}]`,
          action: METHOD.GET,
          status: "success",
          model: "log.model",
          itemId: null,
          timestamp: serverTimestamp(),
        });
        data = {
          id: productSnapshot.id,
          ...parseData(cleanProductData),
          categories: categoryDataArray,
        };
      });

      return {
        status: "success",
        data: data as T,
      };
    } catch (error) {
      const apiError = error as Error;
      return {
        status: "failed",
        error: error as T,
        message: apiError?.message || ERRORS[505],
      };
    }
  };

  const updateProductApi = async (productID: string, data: Partial<IProductCreateSchema>): Promise<IApiResponse> => {
    try {
      await runTransaction(db, async (transaction) => {
        const productDoc = doc(db, FIREBASE.COLLECTION.PRODUCT, productID);
        const productSnapshot = await transaction.get(productDoc);
        if (!productSnapshot.exists()) throw new Error(ERRORS.PRODUCT_NOT_FOUND);

        const productItemID = nanoid();
        const productItemDoc = doc(db, FIREBASE.COLLECTION.PRODUCT_ITEM, productItemID);
        const productItemSnapshot = await transaction.get(productItemDoc);
        if (productItemSnapshot.exists()) throw new Error(ERRORS.PRODUCT_ITEM_ALREADY_EXISTS);

        const productItemData = {
          ...data,
          categories: data.categories?.map((item) => doc(db, FIREBASE.COLLECTION.CATEGORY, item.id)),
        };

        transaction.set(productItemDoc, productItemData);

        const productItemDocRef = doc(db, FIREBASE.COLLECTION.PRODUCT_ITEM, productItemDoc.id);

        const { categories, ...cleanProductItemData } = productItemData;
        const productData = {
          ...cleanProductItemData,
          categories: data.categories?.map((item) => item.name),
          product_ref: productItemDocRef,
        };
        const productItemValidation = ProductItemCreateSchema.safeParse(productData);
        if (!productItemValidation.success) {
          const errors = getValidationErrors(productItemValidation);
          throw new Error(ERRORS.PRODUCT_ITEM_CREATE_VALIDATION_FAILED);
        }

        transaction.set(productDoc, productData);

        await addDoc(actionLogCollectionRef, {
          userId: null,
          event: `${"user"}-${METHOD.POST}-[${FIREBASE.COLLECTION.PRODUCT_ITEM}, ${FIREBASE.COLLECTION.PRODUCT}]-[${productDoc.id}, ${productItemDoc.id}]`,
          action: METHOD.POST,
          status: "success",
          model: "log.model",
          itemId: null,
          timestamp: serverTimestamp(),
        });
      });
      return {
        status: "success",
        data: data,
      };
    } catch (error) {
      const apiError = error as Error;
      return {
        status: "failed",
        error: error,
        message: apiError?.message || ERRORS[505],
      };
    }
  };

  return { addProductApi, getProductApi, updateProductApi };
};

export default useFirestoreProductTransaction;
