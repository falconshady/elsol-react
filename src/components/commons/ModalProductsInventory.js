import React from "react";
import {Button, Modal} from "flowbite-react";

const ModalAssignProduct = ({list, openModal, setOpenModal}) => {
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Assign to store results</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <ul>
                        {
                            (list.length === 0) ? (<div>No Data</div>) :
                            list.map((item, index) => (
                                <li key={index} className="pb-3">
                                    In <span className="bg-green-400 text-white p-1">{item.name}</span> Store
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