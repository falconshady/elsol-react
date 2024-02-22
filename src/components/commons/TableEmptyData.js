import React from "react";
import {Table} from "flowbite-react";
const TableEmptyData = () => {
    return (
        <Table.Row><Table.Cell colSpan={3} className="text-center">No Data</Table.Cell></Table.Row>
    )
}
export default TableEmptyData