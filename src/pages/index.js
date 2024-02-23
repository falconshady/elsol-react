import React, {useEffect, useState} from "react"
import {DeleteProduct, GetProducts, GetProductsInStores} from "../services/ApiProductServices";
import {Tabs, Button} from "flowbite-react";
import {navigate} from "gatsby";
import NavbarComponent from "../components/commons/Navbar";
import TableProducts from "../components/products/TableProducts";
import TableStores from "../components/stores/TableStores";
import {DeleteStore, GetStoreProducts, GetStores} from "../services/ApiStoreServices";
import {AssignProductToStore} from "../services/ApiAssignProductsToStoreServices";
import ModalAssignProduct from "../components/commons/ModalAssignProduct";
import ModalProductsInventory from "../components/commons/ModalProductsInventory";
import ModalStoresInventory from "../components/commons/ModalStoresInventory";

const IndexPage = () => {
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);
    const [showAssociateProduct, setShowAssociateProduct] = useState(false);
    const [selectedStore, setSelectedStore] = useState('');
    
    const [modalAssignResult, setModalAssignResult] = useState(false);
    const [productAssignResult, setProductAssignResult] = useState([]);
    
    const [modalProductsInventory, setModalProductsInventory] = useState(false);
    const [productsInventory, setProductsInventory] = useState([]);
    
    const [modalStoresInventory, setModalStoresInventory] = useState(false);
    const [storesInventory, setStoresInventory] = useState([]);
    
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
    
    const getProductsInStores = async (id) => {
        const request = await GetProductsInStores(id)
        if (request.success) {
            setProductsInventory(request.response.stores)
            setModalProductsInventory(true)
        }
    }

    const getStoreProducts = async (id) => {
        const request = await GetStoreProducts(id)
        if (request.success) {
            setStoresInventory(request.response.products)
            setModalStoresInventory(true)
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
            <Tabs aria-label="Tabs with underline">
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
                        getProductsInStores={getProductsInStores}
                    />
                </Tabs.Item>
                <Tabs.Item active title="Stores">
                    <div className="flex justify-end px-5 pb-5">
                        <Button onClick={() => {
                            navigate('/store/create')
                        }}>+ Add store</Button>
                    </div>
                    <TableStores storeList={stores} deleteStore={deleteStore} getStoreProducts={getStoreProducts}/>
                </Tabs.Item>
            </Tabs>

            <ModalAssignProduct list={productAssignResult} openModal={modalAssignResult} setOpenModal={setModalAssignResult} />
            <ModalProductsInventory 
                list={productsInventory}
                openModal={modalProductsInventory}
                setOpenModal={setModalProductsInventory}
            />
            <ModalStoresInventory
                list={storesInventory}
                openModal={modalStoresInventory}
                setOpenModal={setModalStoresInventory}
            />
        </div>
    )
}
export default IndexPage