import React, {useEffect, useState} from "react"
import {GetProducts} from "../services/api";

const IndexPage = () => {
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        const request = await GetProducts()
        if (request.success) {
            setProducts(request.response)
        }
    }

    useEffect(() => {
        getProducts()
    }, []);

    return (
        <div>
            <ul>
                {
                    products.map((product, index) => (<li key={index}>{product.name}</li>))
                }
            </ul>
        </div>
    )
}

export default IndexPage