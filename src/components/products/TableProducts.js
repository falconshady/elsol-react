import React from "react"
import {Table} from 'flowbite-react';
import {Link} from "gatsby";
import TableEmptyData from "../commons/TableEmptyData";

const TableComponent = ({productList, deleteProduct, selectAllProducts, setShowAssociateProduct, getProductsInStores}) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>
                        <input id="checkedAll" type="checkbox" onChange={(e) => selectAllProducts(e.target.checked)}/>
                    </Table.HeadCell>
                    <Table.HeadCell>Product name</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                    <Table.HeadCell>Inventory</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        (productList.length === 0) ? (<TableEmptyData/>) :
                            productList.map(
                                (product, index) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                        <Table.Cell>
                                            <input type="checkbox" className="productSelected"
                                                   data-name={product.name}
                                                   defaultValue={product.id}
                                                   onChange={(e) => {
                                                       document.querySelectorAll('.productSelected:checked').length
                                                           ?setShowAssociateProduct(true)
                                                           :setShowAssociateProduct(false)
                                                   }}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>{product.name}</Table.Cell>
                                        <Table.Cell>{product.price}</Table.Cell>
                                        <Table.Cell>{product.type}</Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/product/edit/${product.id}`} className="inline-block">Edit</Link>
                                            <button onClick={() => deleteProduct(product)} className="inline-block">Delete</button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <button onClick={() => getProductsInStores(product.id)} className="inline-block">Check stores</button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            )
                    }
                </Table.Body>
            </Table>
        </div>
    );
}
export default TableComponent