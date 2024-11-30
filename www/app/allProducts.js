"use client"; 

import { useState } from "react";

export default function AllProducts({ products }) {
  const [showModal, setShowModal] = useState(false); 

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>     
      <button onClick={toggleModal}>
        PRODUITS
      </button>

      {showModal && (
        <div className="modal" onClick={toggleModal} style={{ cursor: 'pointer' }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ cursor: 'auto' }}>
            <div className="products">
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
                  {products.map((product) => (
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
        </div>
      )}

    </>
  );
}