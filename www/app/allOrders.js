"use client"; 

import { useState } from "react";

export default function AllOrder({ orders }) {
  const [showModal, setShowModal] = useState(false); 

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>     
      <button onClick={toggleModal}>
        COMMANDES
      </button>

      {showModal && (
        <div className="modal" onClick={toggleModal} style={{ cursor: 'pointer' }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ cursor: 'auto' }}>
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
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.CustomerID}</td>
                      <td>{order.orderName}</td>
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
        </div>
      )}

    </>
  );
}