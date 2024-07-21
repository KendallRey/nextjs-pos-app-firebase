"use client";

import { FIREBASE } from "@/firebase/constants/firebase";
import useFirestoreCollection from "@/firebase/hooks/useFirebaseCollection";
import { IProductSchema } from "@/model/product/product";
import React from "react";
import ProducListItem from "./ProductListItem";
import MuiBox from "@/components/box/Box";
import { IProductPresentation } from "@/model/product/product-presentation";

const ProductList = () => {
  const { data: productItems } = useFirestoreCollection<IProductPresentation>(FIREBASE.COLLECTION.PRODUCT);

  return (
    <MuiBox className="grid grid-cols-3 gap-4 flex flex-grow items-center py-5">
      {productItems.map((item) => (
        <ProducListItem key={item.id} item={item} />
      ))}
    </MuiBox>
  );
};

export default ProductList;
