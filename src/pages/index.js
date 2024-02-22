import React, {useEffect, useState} from "react"
import {GetProducts} from "../services/api";
import TableComponent from "../components/Table";
import NavbarComponent from "../components/Navbar";
import {Tabs, Button} from "flowbite-react";
import {navigate} from "gatsby";
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
                <Tabs.Item active title="List Products">
                    <div className="flex justify-end px-5 pb-5">
                        <Button onClick={() => {navigate('/product/create')}}>+ Add</Button>
                    </div>
                    <TableComponent productList={products}/>
                </Tabs.Item>
            </Tabs>
        </div>
    )
}

export default IndexPage