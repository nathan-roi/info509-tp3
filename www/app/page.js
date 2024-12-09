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
import TotalPrice from "./components/TotalPrice";
import ProductsChart from "./components/ProductsChart";
import OrderTimeChart from "./components/OrderTimeChart";
import TotalCustomers from "./components/TotalCustomers";

export default async function Home() {
  // Fetch d'un produit spécifique
  const response = await fetch("http://localhost:3000/product/11");
  const product = await response.json();

  // Fetch de tous les produits
  const resProducts = await fetch("http://localhost:3000/products");
  const products = await resProducts.json();

  // Fetch de toutes les commandes
  const resOrders = await fetch("http://localhost:3000/orders");
  const orders = await resOrders.json();

  // Fetch le prix total de toutes les commandes
  const resTotalPriceOrders = await (await fetch("http://localhost:3000/total_orders_price")).json();
  const totalPrice = resTotalPriceOrders[0].totalPrice;

    // Fetch le prix total de toutes les commandes
    const resCustomersPriceOrders = await (await fetch("http://localhost:3000/total_customers")).json();
    const totalCutstomers = resCustomersPriceOrders[0].totalCutstomers;


  // Fetch de tous les fournisseurs
  const resSuppliers = await fetch("http://localhost:3000/suppliers");
  const suppliers = await resSuppliers.json();

  return (
    <div className={styles.page}>
        <AllProducts products={products} />
        <div>
          <TotalPrice totalPrice={totalPrice} />
          <TotalCustomers totalCutstomers={totalCutstomers} />
        </div>
        <AllOrders orders={orders}/>
        <OrderTimeChart />
    </div>
  );
}