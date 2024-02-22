import React, {useEffect, useState} from "react"
import {GetProducts} from "../services/api";
import {Tabs, Button} from "flowbite-react";
import {navigate} from "gatsby";
import NavbarComponent from "../components/commons/Navbar";
import TableProducts from "../components/products/TableProducts";
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
        <div className="w-full">
            <NavbarComponent />
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Products">
                    <div className="flex justify-end px-5 pb-5">
                        <Button onClick={() => {navigate('/product/create')}}>+ Add</Button>
                    </div>
                    <TableProducts productList={products}/>
                </Tabs.Item>
            </Tabs>
        </div>
    )
}
export default IndexPage