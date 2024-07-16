'use client'
import React, {useEffect, useState} from "react";
import ProductCard from "../components/product-card";


type Products = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  tags: string[];
}

const GetProduct = async () => {

  const [product, setProduct] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProduct(data.products);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(product)

  // useEffect(() => {
  //   handleInitialData()
  // }, [])

  return (
    <>
      <ProductCard products={product} />
      {/* {product.map((product: Products) => (
      <h1>
        {product.title}
      </h1>
      ))} */}
    </>
  );
};

export default GetProduct;
