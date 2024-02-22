import React from "react"
import {Tabs} from "flowbite-react";
import UpdateFormComponent from "../../../components/products/UpdateForm";
import NavbarComponent from "../../../components/Navbar";

const ProductEditPage =  ({location}) => {
    const id = location.pathname.split('/').reverse()[1]
    console.log(id)
    return (
        <div className="w-full">
            <NavbarComponent/>
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Update">
                    <UpdateFormComponent id={id} />
                </Tabs.Item>
            </Tabs>
        </div>
    )
}
export default ProductEditPage