"use client"

import { useEffect, useState } from "react";

export default function Page() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();

    }, []);

    return (
        <div>
            <h1>Product List</h1>
            {products.map(item => (
                <div key={item.id}>
                    <h3>Name: {item.title}</h3>
                </div>
            ))}
        </div>
    );
}


// async function productList() {
//     let data = await fetch("https://dummyjson.com/products");
//     data = await data.json();
//     return data.products
// }

// export default async function Page() {
  
//     let products = await productList();
//     console.log(products);
//     return (<div>
//         <h1>Product List</h1>
//         {
//             products.map((item)=>(
//                 <div><h3>Name: {item.title}</h3></div>
//             ))
//         }
//     </div>)
// }