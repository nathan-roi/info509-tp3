"use client";
import { useState } from 'react';

import SearchInput from "@/app/components/SearchInput";
import SelectCategory from "@/app/components/SelectCategory";

export default function AllOrder({ orders }) {
  const listOfSearchable = ["Client", "Ville", "Pays"];

  const [searchText, setSearchText] = useState('');
  const [searchCategory, setSearchCategory] = useState(listOfSearchable[0]);

  function fileterOrders(orders, searchText){
    var result = orders;
    if (searchCategory === 'Client'){
      result = orders.filter((order) => order.CustomerID.toLowerCase().includes(searchText.toLowerCase()));
    }else if(searchCategory === 'Ville'){
      result = orders.filter((order) => order.ShipCity.toLowerCase().includes(searchText.toLowerCase()));
    }else if(searchCategory === 'Pays'){
      result = orders.filter((order) => order.ShipCountry.toLowerCase().includes(searchText.toLowerCase()));
    }
    return result;
  }
  const foundOrders = fileterOrders(orders, searchText);
  console.log(searchCategory);

  return (
    <>
      <div className="list-data">
        <div className="header-list">
          <h2>Liste des commandes</h2>
          <div className="search-bar">
            <SelectCategory listOfSearchable={listOfSearchable} onChange={newCat => setSearchCategory(newCat)} />
            <SearchInput value={searchText} onChange={(newText) => setSearchText(newText)}/>
          </div>
        </div>
        <div className="list-table">
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
            {foundOrders.map((order) => (
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