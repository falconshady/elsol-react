import React from "react"
import {Tabs} from "flowbite-react";
import NavbarComponent from "../../components/commons/Navbar";
import FormCreateComponent from "../../components/products/FormCreate";
const ProductCreatePage = () => {
    return (
        <div className="w-full">
            <NavbarComponent />
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Create">
                    <FormCreateComponent />
                </Tabs.Item>
            </Tabs>
        </div>
    )
}
export default ProductCreatePage