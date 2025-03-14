"use client"

import { useEffect, useState } from "react"
import axios from "axios";
import Image from "next/image";

export const Items = ({ result }) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        try {
            const fetchProducts = async () => {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_TABLE_BACKEND_URL}/products`);
                setProducts(response.data.products);
            }
            fetchProducts();

        } catch(err) {
            console.log("Error :", err)
        }
    },[]);
    return (
        <>
            {products.length == 0 ? <div className="w-full h-full flex justify-center items-center"><h1 className="text-center max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Loading products!</h1></div> :
                <div className="p-8 w-full flex flex-col gap-8 justify-center items-center">
                    <div className="w-[50%] flex justify-center items-center">
                        <h1 className="w-full text-center mb-4 text-xl font-bold tracking-tight leading-none md:text-xl xl:text-2xl">Use these products to launch the campaign</h1>
                    </div>
                    <div className="w-[50%] overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Stock
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, i) => { return (
                                    <tr key={i} className="bg-white border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {i+1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {product.product_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.product_price}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.quantity}
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}

