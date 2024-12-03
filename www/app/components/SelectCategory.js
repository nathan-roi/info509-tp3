"use client";

export default function selectCategory({listOfSearchable, onChange}) {
    return(
        <>
            <select name="categories" id="category-select" onChange={event => onChange(event.target.value)}>

                {listOfSearchable.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </>
    );
}