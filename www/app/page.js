// Données chargées côté serveur puis afficher côté client
import styles from "./page.module.css";
import "./css/scrollbar.css";
import "./css/table.css";
import "./css/button.css";
import "./css/modal.css";
import './css/listData.css';

import AllProducts from "./allProducts";
import AllOrders from "./components/allOrders";
import TotalPrice from "./components/TotalPrice";
import TotalCustomers from "./components/TotalCustomers";
import FiveBestProducts from "./components/FiveBestProducts";
import FiveWorstProducts from "./components/FiveWorstProducts";

export default async function Home() {
  // Fetch d'un produit spécifique
  const response = await fetch("http://localhost:3000/product/11");
  const product = await response.json();

  // Fetch de tous les produits
  const resProducts = await fetch("http://localhost:3000/products");
  const products = await resProducts.json();

  // Fetch de toutes les commandes
  const resOrders = await (await fetch("http://localhost:3000/orders")).json();
  const orders = resOrders;

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
        <div className={styles.containerList}>
            <AllOrders orders={orders}/>
            <AllProducts products={products} />
        </div>
        <div className={styles.containerStatnList}>
            <div className={styles.containerStat}>
                <TotalPrice totalPrice={totalPrice} />
                <TotalCustomers totalCutstomers={totalCutstomers} />
            </div>

            <div className={styles.containerPie}>
                <FiveBestProducts />
                <FiveWorstProducts />
            </div>
        </div>
    </div>
  );
}