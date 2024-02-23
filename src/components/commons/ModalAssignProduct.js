import React from "react";
import {Badge, Button, Modal} from "flowbite-react";

const ModalAssignProduct = ({products, openModal, setOpenModal}) => {
    console.log(products)
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Assign to store results</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <ul>
                        {
                            products.map((product, index) => (
                                <li key={index} className="pb-3">
                                    Product: {product.product} {(product.status
                                        ? <Badge color="success" size="sm">Success: Successfully assigned</Badge>
                                        : <Badge color="failure" size="sm">Failure: Product was previously added</Badge>)}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setOpenModal(false)}>Understand</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAssignProduct