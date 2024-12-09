"use client";

import "@/app/css/total.css"

export default function totalCustomers({totalCutstomers}) {
    return(
        <div id="total-price" className="list-data">
            <h2>Nombre de clients</h2>
            <span>{Intl.NumberFormat('fr').format(totalCutstomers)} Clients</span>
        </div >
    )
}