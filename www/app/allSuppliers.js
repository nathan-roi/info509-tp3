"use client"; 

import { useState } from "react";

export default function AllSuppliers({ suppliers }) {
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
            <div className="suppliers">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Entreprise</th>
                    <th>Gérant contrat</th>
                    <th>Adresse</th>
                    <th>Ville</th>
                    <th>Code postal</th>
                    <th>Pays</th>
                    <th>Telephone</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr key={supplier.SupplierID}>
                      <td>{supplier.SupplierID}</td>
                      <td>{supplier.CompanyName}</td>
                      <td>{supplier.ContactName}</td>
                      <td>{supplier.Address}</td>
                      <td>{supplier.City}</td>
                      <td>{supplier.PostalCode}</td>
                      <td>{supplier.Country}</td>
                      <td>{supplier.Phone}</td>
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