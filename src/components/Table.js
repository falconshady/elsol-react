import React from "react"
import {Table} from 'flowbite-react';

const TableComponent = ({productList}) => {
    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Product name</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Actions</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        productList.map(
                            (product, index) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                    <Table.Cell>{product.name}</Table.Cell>
                                    <Table.Cell>{product.price}</Table.Cell>
                                    <Table.Cell>{product.type}</Table.Cell>
                                    <Table.Cell>
                                        <a href="#"
                                           className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Edit
                                        </a>
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