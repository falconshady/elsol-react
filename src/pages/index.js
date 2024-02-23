import React, {useEffect, useState} from "react"
import {DeleteProduct, GetProducts} from "../services/ApiProductServices";
import {Tabs, Button} from "flowbite-react";
import {navigate} from "gatsby";
import NavbarComponent from "../components/commons/Navbar";
import TableProducts from "../components/products/TableProducts";
import TableStores from "../components/stores/TableStores";
import {DeleteStore, GetStores} from "../services/ApiStoreServices";
import {AssignProductToStore} from "../services/ApiAssignProductsToStoreServices";
import ModalAssignProduct from "../components/commons/ModalAssignProduct";

const IndexPage = () => {
    const [products, setProducts] = useState([]);
    const [productAssignResult, setProductAssignResult] = useState([]);
    const [stores, setStores] = useState([]);
    const [showAssociateProduct, setShowAssociateProduct] = useState(false);
    const [selectedStore, setSelectedStore] = useState('');
    const [modalAssignResult, setModalAssignResult] = useState(false);
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
        if (window.confirm(`Are you sure to delete '${product.name}' product ?`)) {
            let deleted = await DeleteProduct(product.id)
            if (deleted.success) {
                alert('Deleted successfully')
                await getProducts()
            }
        }
    }

    const deleteStore = async (store) => {
        if (window.confirm(`Are you sure to delete '${store.name}' product ?`)) {
            let deleted = await DeleteStore(store.id)
            if (deleted.success) {
                alert('Deleted successfully')
                await getStores()
            }
        }
    }

    const selectAllProducts = (checked) => {
        setSelectedStore('')
        let checkboxes = document.querySelectorAll('.productSelected')
        if (checked) {
            checkboxes.forEach((checkbox) => {
                if (!checkbox.checked) {
                    checkbox.click()
                }
            })
            setShowAssociateProduct(true)
        } else {
            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    checkbox.click()
                }
            })
            setShowAssociateProduct(false)
        }
    }
    
    const assignProductsToStore = () => {
        if(!selectedStore){
            alert('Need selected store')
            return false
        }
        if(window.confirm('Assign this products to store?')){
            let assigned = []
            let products = document.querySelectorAll('.productSelected:checked')
            products.forEach(async (product, index) => {
                let productname = product.getAttribute('data-name')
                let result = await AssignProductToStore(product.value, selectedStore)
                if(result?.success){
                    assigned.push({
                        product: productname,
                        status: true
                    })
                }else{
                    assigned.push({
                        product: productname,
                        status: false
                    })
                }                
                product.click()
            })
            setSelectedStore('')
            setProductAssignResult(assigned)
            setModalAssignResult(true)
        }        
    }

    useEffect(() => {
        getProducts()
        getStores()
    }, []);

    return (
        <div className="w-full">
            <NavbarComponent/>
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Products">
                    <div className="flex justify-between">
                        <div className="px-5 pb-5">
                            {
                                (showAssociateProduct ?
                                    <>
                                        <select className="inline" onChange={(e) => setSelectedStore(e.target.value)}>
                                            <option value="">Select store</option>
                                            {
                                                stores.map((store, indexStore) => (
                                                    <option key={indexStore} value={store.id}>[{store.city}] {store.name} ({store.address})</option>
                                                ))
                                            }
                                        </select>
                                        <Button type="button" className="inline ml-2" onClick={assignProductsToStore}>Assign</Button>
                                    </>
                                    : '')
                            }
                        </div>
                        <div className="px-5 pb-5">
                            <Button onClick={() => {
                                navigate('/product/create')
                            }}>+ Add product</Button>
                        </div>
                    </div>
                    <TableProducts 
                        productList={products}
                        deleteProduct={deleteProduct}
                        selectAllProducts={selectAllProducts}
                        setShowAssociateProduct={setShowAssociateProduct}
                    />
                </Tabs.Item>
                <Tabs.Item active title="Stores">
                    <div className="flex justify-end px-5 pb-5">
                        <Button onClick={() => {
                            navigate('/store/create')
                        }}>+ Add store</Button>
                    </div>
                    <TableStores storeList={stores} deleteStore={deleteStore}/>
                </Tabs.Item>
            </Tabs>
            <ModalAssignProduct products={productAssignResult} openModal={modalAssignResult} setOpenModal={setModalAssignResult} />
        </div>
    )
}
export default IndexPage