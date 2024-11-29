"use client";

import Image from "next/image";
import styles from "./page.module.css";

import React, { useState } from 'react';

export default function Home() {
  // let data = await fetch('http://localhost:2000/product/11');
  // let res = await data.json();
  // console.log(res);
  const [rs, setRs] = useState();

  async function handleClick(){
    const response = await fetch('http://localhost:3000/product/11');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    console.log('Product data:', data);

    // Afficher les données sur la page HTML
    setRs(
      <>
        <p>Product ID: {data.productID}</p>
        <p>Name: {data.productName}</p>
        <p>Price: {data.unitPrice}</p>
      </>
    );
        
    
  }
  return (
    <div className={styles.page}>
      {/* <img width="250px" src="node-mongo.png"> */}
      <h1>Product</h1>
      <button onClick={handleClick}>Fetch Product 11</button>

	    <div id="product">{rs}</div>
    </div>
  );
}