import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Container, Row, Table, Button, Modal } from "react-bootstrap";
import { IGridBooking } from "@client/entities/booking-models";
import { dashboardAdapter } from "@client/adapters/dashboard-adapter";
import { isEmpty } from "@utils/function-data";
import RowInfo from "@client/composables/dashboard/row-info";
import RowCreate from "@client/composables/dashboard/row-create";
import { RootState } from "@client/stores/store";
import StaticModal from "@client/components/static-modal";
import CreateBooking from "@client/composables/dashboard/popup-content/create-booking";
import RejectBooking from "@client/composables/dashboard/popup-content/reject-booking";
import ApproveBooking from "@client/composables/dashboard/popup-content/approve-booking";
import { STATUS_BOOKING } from "@utils/constant-data";

const dashboard: FC = () => {
    const [data, setData] = useState<IGridBooking[]>([]);

    const isAdmin = useSelector((state: RootState) => state.global.isAdmin);
    const refreshGrid = useSelector((state: RootState) => state.global.refreshGrid);
    const showModal = useSelector((state: RootState) => state.dashboard.showModal);
    const titleModal = useSelector((state: RootState) => state.dashboard.titleModal);
    const adminSubmit = useSelector((state: RootState) => state.dashboard.adminSubmit);

    useEffect(() => {
        dashboardAdapter.asyncGetAllBooking().then(result => {
            setData(!isEmpty(result) ? result : []);
        });
    }, [refreshGrid]);

    return <>
        <Container fluid>
            <Row>
                <Col sm="12">
                    <Card className="strpied-tabled-with-hover">
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table responsive="sm" className="table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th className="border-0">Number</th>
                                        <th className="border-0">Type of event</th>
                                        <th className="border-0">Location</th>
                                        <th className="border-0">Proposed date</th>
                                        <th className="border-0">Status</th>
                                        <th className="border-0">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((x, i) => <RowInfo key={i} dataRow={x} index={++i} />)}
                                    {!isAdmin && <RowCreate />}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>


        <StaticModal show={showModal} title={titleModal}>
            {!isAdmin && <CreateBooking />}
            {isAdmin && adminSubmit === STATUS_BOOKING.REJECTED && <RejectBooking />}
            {isAdmin && adminSubmit === STATUS_BOOKING.APPROVED && <ApproveBooking />}
        </StaticModal>
    </>;
};

export default dashboard;