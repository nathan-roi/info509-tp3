"use client"; // client compoenent (les données sont chargées côté serveur puis afficher côté client)

import { useState } from "react";

export default function DisplayData ({ product }) {
    const [showProduct, setShowProduct] = useState(false); 
  return (
    <>
        <button onClick={() => {setShowProduct(!showProduct)}}>Fetch Product 11</button>

        <div>{showProduct &&
            <>
                <p>Product ID: {product.productID}</p>
                <p>Name: {product.productName}</p>
                <p>Price: {product.unitPrice}</p>
            </>
        }</div>
    </>

  );
}