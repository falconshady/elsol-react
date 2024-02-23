import React from "react"
import {Table} from 'flowbite-react';
import {Link} from "gatsby";
import TableEmptyData from "../commons/TableEmptyData";

const TableComponent = ({storeList, deleteStore, getStoreProducts}) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>City</Table.HeadCell>
                    <Table.HeadCell>Address</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                    <Table.HeadCell>Inventory</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        (storeList.length === 0) ? (<TableEmptyData />) : 
                        storeList.map(
                            (store, index) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                    <Table.Cell>{store.name}</Table.Cell>
                                    <Table.Cell>{store.city}</Table.Cell>
                                    <Table.Cell>{store.address}</Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/store/edit/${store.id}`}>Edit</Link>
                                        <button onClick={() => deleteStore(store)} className="ml-5">Delete</button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button onClick={() => getStoreProducts(store.id)} className="inline-block">Check products</button>
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