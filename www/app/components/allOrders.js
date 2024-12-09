"use client";
import { useState } from "react";

import SearchInput from "@/app/components/SearchInput";
import SelectCategory from "@/app/components/SelectCategory";
import OrderTimeChart from "@/app/components/OrderTimeChart";

export default function AllOrder({ orders }) {
  const listOfSearchable = ["Client", "Ville", "Pays"];

  const [searchText, setSearchText] = useState("");
  const [searchCategory, setSearchCategory] = useState(listOfSearchable[0]);
  const [isGraphView, setIsGraphView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // Ordre sélectionné
  const [Product, setProduct] = useState(null); // Détails du Productt
  const [isLoading, setIsLoading] = useState(false); // État de chargement

  const toggleView = () => {
    setIsGraphView(!isGraphView);
  };

  const fetchProduct = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/order_product/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        console.error("Erreur lors de la récupération des détails de la commande.");
        setProduct(null);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setProduct(null);
    }
    setIsLoading(false);
  };

  function fileterOrders(orders, searchText) {
    var result = orders;
    if (searchCategory === "Client") {
      result = orders.filter((order) =>
        order.CustomerID.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (searchCategory === "Ville") {
      result = orders.filter((order) =>
        order.ShipCity.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (searchCategory === "Pays") {
      result = orders.filter((order) =>
        order.ShipCountry.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return result;
  }
  const foundOrders = fileterOrders(orders, searchText);

  return (
    <div id="list-orders" className="list-data">
      <div className="header-list">
        <h2>Liste des commandes</h2>
        <div className="search-bar">
          <SelectCategory
            listOfSearchable={listOfSearchable}
            onChange={(newCat) => setSearchCategory(newCat)}
          />
          <SearchInput
            value={searchText}
            onChange={(newText) => setSearchText(newText)}
          />
        </div>
        <button onClick={toggleView}>Vue graph</button>
      </div>
      {isGraphView ? (
        <OrderTimeChart />
      ) : (
        <div className="list-table">
          <table>
            <thead>
              <tr>
                <th>Info Productt</th>
                <th>ID</th>
                <th>Client</th>
                <th>Adresse</th>
                <th>Date de commande</th>
                <th>Date d'expédition</th>
                <th>Quantité</th>
                <th>Frais de port</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {foundOrders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        fetchProduct(order.OrderID);
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>{order.OrderID}</td>
                  <td>{order.CustomerID}</td>
                  <td>
                    {order.ShipCity} {order.ShipPostalCode}, {order.ShipCountry}
                  </td>
                  <td>{order.OrderDate}</td>
                  <td>{order.ShippedDate}</td>
                  <td>{order.Quantity}</td>
                  <td>{order.Freight}</td>
                  <td>{order.UnitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedOrder && (
        <div
          className="order-details"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -20%)",
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid black",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => {
              setSelectedOrder(null);
              setProduct(null);
            }}
            style={{ float: "right" }}
          >
            X
          </button>
          <h3>Details du produit commander</h3>
          {isLoading ? (
            <p>Chargement des détails...</p>
          ) : Product ? (
            <div>
              <p><strong>Nom du Product:</strong> {Product.productName}</p>
              <p><strong>Prix unitaire:</strong> {Product.unitPrice}</p>
              <p><strong>Quantité en stock:</strong> {Product.unitsInStock}</p>
              <p><strong>Quantié par unité:</strong> {Product.quantityPerUnit}</p>
            </div>
          ) : (
            <p>Aucun détail trouvé pour cette commande.</p>
          )}
        </div>
      )}
    </div>
  );
}
