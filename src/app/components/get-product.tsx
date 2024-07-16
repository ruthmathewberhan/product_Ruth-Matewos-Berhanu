import React from "react";
import ProductCard from "./product-card";

interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  tags: string[];
}

const GetProduct = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // for loading
  const res = await fetch("https://dummyjson.com/products");
  const products: Products[] = await res.json();

  return (
    <>
      <ProductCard product={products} />
    </>
  );
};

export default GetProduct;
