import { addDoc, collection, doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "../config";
import { transformData } from "@/model/helper/data";
import { FIREBASE } from "../constants/firebase";
import { CategoryCreateSchema, ICategoryCreateSchema } from "@/model/category/category-create";
import { nanoid } from "@reduxjs/toolkit";
import { ERRORS } from "../constants/error";
import { METHOD } from "@/components/constants/method";
import { ICategorySchema } from "@/model/category/category";

const useFirestoreCategoryTransaction = () => {
  const actionLogCollectionRef = collection(db, FIREBASE.COLLECTION.ACTION_LOGS);

  // #region Create
  const addCategoryApi = async (data: Partial<ICategoryCreateSchema>): Promise<IApiResponse> => {
    try {
      await runTransaction(db, async (transaction) => {
        const categoryID = nanoid();
        const categoryDoc = doc(db, FIREBASE.COLLECTION.CATEGORY, categoryID);

        const categorySnapshot = await transaction.get(categoryDoc);
        if (categorySnapshot.exists()) throw new Error(ERRORS.CATEGORY_ALREADY_EXISTS);

        const categoryValidation = CategoryCreateSchema.safeParse(data);
        if (!categoryValidation.success) {
          console.log("dasd", categoryValidation.error.issues);
          throw new Error(ERRORS.CATEGORY_CREATE_VALIDATION_FAILED);
        }

        transaction.set(categoryDoc, data);

        await addDoc(actionLogCollectionRef, {
          userId: null,
          event: `${"user"}-${METHOD.POST}-[${FIREBASE.COLLECTION.CATEGORY}]-[${categoryDoc.id}, ${categoryID}]`,
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
  // #endregion

  // #region Update
  const updateCategoryApi = async (data: Partial<ICategorySchema>, id: string): Promise<IApiResponse> => {
    try {
      await runTransaction(db, async (transaction) => {
        const categoryDoc = doc(db, FIREBASE.COLLECTION.CATEGORY, id);

        const categorySnapshot = await transaction.get(categoryDoc);
        if (!categorySnapshot.exists()) throw new Error(ERRORS.CATEGORY_NOT_FOUND);

        const categoryValidation = CategoryCreateSchema.safeParse(data);
        if (!categoryValidation.success) {
          throw new Error(ERRORS.CATEGORY_UPDATE_VALIDATION_FAILED);
        }

        transaction.update(categoryDoc, data);

        await addDoc(actionLogCollectionRef, {
          userId: null,
          event: `${"user"}-${METHOD.POST}-[${FIREBASE.COLLECTION.CATEGORY}]-[${id}]`,
          action: METHOD.PUT,
          status: "success",
          model: FIREBASE.COLLECTION.CATEGORY,
          itemId: id,
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
  // #endregion

  // #region Delete
  const deleteCategoryApi = async (id: string): Promise<IApiResponse> => {
    try {
      await runTransaction(db, async (transaction) => {
        const categoryDoc = doc(db, FIREBASE.COLLECTION.CATEGORY, id);

        const categorySnapshot = await transaction.get(categoryDoc);
        if (!categorySnapshot.exists()) throw new Error(ERRORS.CATEGORY_NOT_FOUND);

        const deleteData = transformData({}, METHOD.DELETE);
        transaction.update(categoryDoc, deleteData);

        await addDoc(actionLogCollectionRef, {
          userId: null,
          event: `${"user"}-${METHOD.DELETE}-[${FIREBASE.COLLECTION.CATEGORY}]-[${id}]`,
          action: METHOD.PUT,
          status: "success",
          model: FIREBASE.COLLECTION.CATEGORY,
          itemId: null,
          timestamp: serverTimestamp(),
        });
      });

      return {
        status: "success",
        data: {},
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
  // #endregion

  return { addCategoryApi, updateCategoryApi, deleteCategoryApi };
};

export default useFirestoreCategoryTransaction;
