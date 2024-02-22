import React, {useEffect, useState} from "react"
import {DeleteProduct, GetProducts} from "../services/ApiProductServices";
import {Tabs, Button} from "flowbite-react";
import {navigate} from "gatsby";
import NavbarComponent from "../components/commons/Navbar";
import TableProducts from "../components/products/TableProducts";
import TableStores from "../components/stores/TableStores";
import {DeleteStore, GetStores} from "../services/ApiStoreServices";
const IndexPage = () => {
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);
    const getProducts = async () => {
        const request = await GetProducts()
        if (request.success) {
            setProducts(request.response)
        }
    }

    const getStores = async () => {
        const request = await GetStores()
        if (request.success) {
            setStores(request.response)
        }
    }
    
    const deleteProduct = async (product) => {
        if(window.confirm(`Are you sure to delete '${product.name}' product ?`)){
            let deleted = await DeleteProduct(product.id)
            if(deleted.success){
                alert('Deleted successfully')
                await getProducts()
            }
        }
    }

    const deleteStore = async (store) => {
        if(window.confirm(`Are you sure to delete '${store.name}' product ?`)){
            let deleted = await DeleteStore(store.id)
            if(deleted.success){
                alert('Deleted successfully')
                await getStores()
            }
        }
    }

    useEffect(() => {
        getProducts()
        getStores()
    }, []);

    return (
        <div className="w-full">
            <NavbarComponent />
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Products">
                    <div className="flex justify-end px-5 pb-5">
                        <Button onClick={() => {navigate('/product/create')}}>+ Add product</Button>
                    </div>
                    <TableProducts productList={products} deleteProduct={deleteProduct}/>
                </Tabs.Item>
                <Tabs.Item active title="Stores">
                    <div className="flex justify-end px-5 pb-5">
                        <Button onClick={() => {navigate('/store/create')}}>+ Add store</Button>
                    </div>
                    <TableStores storeList={stores} deleteStore={deleteStore}/>
                </Tabs.Item>
            </Tabs>
        </div>
    )
}
export default IndexPage