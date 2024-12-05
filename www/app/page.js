// Données chargées côté serveur puis afficher côté client
import styles from "./page.module.css";
import "./css/scrollbar.css";
import "./css/table.css";
import "./css/button.css";
import "./css/modal.css";
import './css/listData.css';

import DisplayData from "./displayData.js";
import AllProducts from "./allProducts";
import AllOrders from "./components/allOrders";
import AllSuppliers from "./allSuppliers";
import ProductsChart from "./components/ProductsChart";


export default async function Home() {
  {/* <img width="250px" src="node-mongo.png"> */}
  // Fetch d'un produit spécifique
  const response = await fetch("http://localhost:3000/product/11");
  const product = await response.json();

  // Fetch de tots les produits
  const resProducts = await fetch("http://localhost:3000/products");
  const products = await resProducts.json();

  // Fetch de toutes les commandes
  const resOrders = await fetch("http://localhost:3000/orders");
  const orders = await resOrders.json();

  // Fetch de tout les fournisseurs
  const resSuppliers = await fetch("http://localhost:3000/suppliers");
  const suppliers = await resSuppliers.json();

  return (
    <div className={styles.page}>
      <AllProducts products={products} />
      <AllOrders orders={orders} />
      <AllSuppliers suppliers={suppliers} />
      {/* <ProductsChart /> */}
    </div>
  );
}