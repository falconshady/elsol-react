import React from "react"
import {Tabs} from "flowbite-react";
import NavbarComponent from "../../../components/commons/Navbar";
import FormUpdateComponent from "../../../components/stores/FormUpdate";
const ProductEditPage =  ({location}) => {
    const id = location.pathname.split('/').reverse()[1]
    return (
        <div className="w-full">
            <NavbarComponent />
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Update">
                    <FormUpdateComponent id={id} />
                </Tabs.Item>
            </Tabs>
        </div>
    )
}
export default ProductEditPage