"use client"; 

import { useState } from "react";
import SelectCategory from "@/app/components/SelectCategory";
import SearchInput from "@/app/components/SearchInput";

export default function AllProducts({ products }) {
  const [searchText, setSearchText] = useState('');

  function fileterproducts(products, searchText){
    return products.filter((product) => product.productName.toLowerCase().includes(searchText.toLowerCase()));
  }
  const foundproducts = fileterproducts(products, searchText);

  return (
      <>
        <div className="list-data">
          <div className="header-list">
            <h2>Liste des commandes</h2>
            <div className="search-bar" id="search-bar-products">
              <SearchInput value={searchText} onChange={(newText) => setSearchText(newText)}/>
            </div>
          </div>
          <div className="list-table">
            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Stock</th>
                <th>Quantité par unité</th>
                <th>Prix</th>
              </tr>
              </thead>
              <tbody>
              {foundproducts.map((product) => (
                  <tr key={product.productID}>
                    <td>{product.productID}</td>
                    <td>{product.productName}</td>
                    <td>{product.unitsInStock}</td>
                    <td>{product.quantityPerUnit}</td>
                    <td>{product.unitPrice}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
  );
}