import React, {useEffect, useState} from "react"
import {GetProducts} from "../services/api";
import TableComponent from "../components/Table";
import NavbarComponent from "../components/Navbar";
import {Tabs} from "flowbite-react";
import {HiAdjustments, HiClipboardList, HiUserCircle} from "react-icons/hi";
import {MdDashboard} from "react-icons/md";
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
                    <TableComponent />
                </Tabs.Item>
            </Tabs>
        </div>
    )
}

export default IndexPage