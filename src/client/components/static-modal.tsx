import React, { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

interface IStaticModal {
    show: boolean;
    title: string;
}

const staticModal: FC<IStaticModal> = ({ children, show, title }) => {

    return <>
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    </>;
}

export default staticModal;