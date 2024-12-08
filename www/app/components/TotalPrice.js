"use client";

import "@/app/css/total.css"

export default function totalPrice({totalPrice}) {
    return(
        <div id="total-price" className="list-data">
            <h2>Total</h2>
            <span>{Intl.NumberFormat('fr').format(totalPrice)} $</span>
        </div >
    )
}