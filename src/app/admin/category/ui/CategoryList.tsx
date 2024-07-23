"use client";

import CategoryListItem from "./CategoryListItem";
import { ICategorySchema } from "@/model/category/category";
import useFirestoreCollection from "@/firebase/hooks/useFirebaseCollection";
import { FIREBASE } from "@/firebase/constants/firebase";

const CategoryList = () => {
  const { data: categories } = useFirestoreCollection<ICategorySchema>(FIREBASE.COLLECTION.CATEGORY);

  return (
    <div className="grid grid-cols-4 gap-4 flex flex-grow items-center py-5">
      {categories.map((item) => (
        <CategoryListItem key={item.id} category={item} />
      ))}
    </div>
  );
};

export default CategoryList;
