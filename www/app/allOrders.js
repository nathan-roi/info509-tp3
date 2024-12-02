"use client";
import { useState } from 'react';

import "./SearchInput";
import SearchInput from "@/app/SearchInput";

export default function AllOrder({ orders }) {
  const [searchText, setSearchText] = useState('');

  const result = orders.filter((order) => order.CustomerID.toLowerCase().includes(searchText.toLowerCase()));
  return (
    <>
      <div className="modal-content">
        <h2>Liste des commandes</h2>
        <SearchInput value={searchText} onChange={(newText) => setSearchText(newText)} />
        <div className="orders">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Ville</th>
              <th>Code postal</th>
              <th>Pays</th>
              <th>Date de commande</th>
              <th>Date d'expédition</th>
              <th>Quantité</th>
              <th>Frais de port</th>
              <th>Prix</th>
            </tr>
            </thead>
            <tbody>
            {result.map((order) => (
                <tr key={order._id}>
                  <td>{order.OrderID}</td>
                  <td>{order.CustomerID}</td>
                  <td>{order.ShipCity}</td>
                  <td>{order.ShipPostalCode}</td>
                  <td>{order.ShipCountry}</td>
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
      </div>
    </>
  );
}