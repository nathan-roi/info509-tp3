// Données chargées côté serveur puis afficher côté client
import styles from "./page.module.css";
import DisplayData from "./displayData.js";

export default async function Home() {
  let response = await fetch('http://localhost:3000/product/11');
  let product = await response.json();
  
  return (
    <div className={styles.page}>
      {/* <img width="250px" src="node-mongo.png"> */}
      <h1>Product</h1>
      <DisplayData product={product} />
    </div>
  );
}