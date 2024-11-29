import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  // document.getElementById('fetch').addEventListener('click', async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/product/11');
      
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }

  //     const data = await response.json();
      
  //     console.log('Product data:', data);

  //     // Afficher les données sur la page HTML
  //     const productInfo = `
  //       <p>Product ID: ${data.productID}</p>
  //       <p>Name: ${data.productName}</p>
  //       <p>Price: $${data.unitPrice}</p>
  //     `;
     
  //   const dproduct = document.getElementById('product') ; 
  //   dproduct.innerHTML=productInfo ; 
        
  //   } catch (error) {
  //           console.error('Error fetching product:', error);
  //       }
  // });
  return (
    <div className={styles.page}>
      {/* <img width="250px" src="node-mongo.png"> */}
      <h1>Product</h1>
      <button id="fetch">Fetch Product 11</button>

	    <div id="product"></div>
    </div>
  );
}
