"use client"
import { useState } from 'react';
import './../style.css'
export default function Page(){

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [company, setCompany] = useState('');
    const [color, setColor] = useState('');
    const [category, setCategory] = useState('');

    const addProduct = async() => {
       
        let response = await fetch('http://localhost:3000/api/products', {
            method: 'Post',
            body: JSON.stringify({name, price, color, company, category})
        });
        response = await response.json()
        console.log(response);
        if (response.success) {
           alert("New Product Added");
        }else{
            alert("Error while adding Product");
        }
    }

    return(
        <div className='add-user'>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Eneter Name" className="input-field" />
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}  placeholder="Eneter Price" className="input-field"/>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)}  placeholder="Eneter Color" className="input-field"/>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)}  placeholder="Eneter Company" className="input-field"/>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}  placeholder="Eneter Category" className="input-field"/>
            <button onClick={addProduct} className="btn">Add Product</button>
        </div>
    );
}