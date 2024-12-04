"use client";

export default function SearchInput({placeholder, value, onChange }) {
    if (placeholder == null){placeholder = 'Search'}
    return (
        <>
            <input type="search" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
        </>
    )

}