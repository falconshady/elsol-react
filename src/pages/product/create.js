import React from "react"
import NavbarComponent from "../../components/Navbar";
import {Tabs} from "flowbite-react";
import CreateFormComponent from "../../components/products/CreateForm";

const ProductCreatePage = () => {
    return (
        <div className="w-full">
            <NavbarComponent/>
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Create">
                    <CreateFormComponent />
                </Tabs.Item>
            </Tabs>
        </div>
    )
}
export default ProductCreatePage