"use client";

import "@/app/css/total.css"

export default function totalPrice({totalPrice}) {
    return(

        <div className="list-data">
            <h2>Total</h2>
            <span>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice)}</span>
        </div >
    )
}