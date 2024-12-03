"use client";

export default function SearchInput({value, onChange }) {
    return (
        <>
            <input type="search" placeholder="Search" value={value} onChange={(e) => onChange(e.target.value)} />
        </>
    )

}