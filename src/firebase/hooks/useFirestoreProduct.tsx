import { addDoc, collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { nanoid } from "@reduxjs/toolkit";
import { getValidationErrors } from "@/model/helper/data";
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

  return { addProductApi };
};

export default useFirestoreProductTransaction;
