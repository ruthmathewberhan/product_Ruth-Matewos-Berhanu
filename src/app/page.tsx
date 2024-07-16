'use client'
import React, {useEffect, useState} from "react";
import ProductCard from "./components/products/product-card";
import Notify from "./components/common/notify";


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

  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleNotifyClose = ( reason : string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        setMessage("Network response was not ok");
        setSeverity("error");

      }
      const data = await response.json();
      setProduct(data.products);
    } catch (err) {
      if (err instanceof Error) {
        setMessage(`Error updating product : ${err.message} `);
        setSeverity("error");
      } else {
        setMessage("An unknown error occurred");
        setSeverity("error");
        setOpen(true)
      }
    } 
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <>
      <ProductCard products={product} />
      <Notify
        open={open}
        message={message}
        severity={severity}
        handleClose={handleNotifyClose}
      />
    </>
  );
};

export default GetProduct;
