import { dashboardAdapter } from "@client/adapters/dashboard-adapter";
import { setShowHideModal } from "@client/stores/reduce-dashboard";
import { activateRefreshGrid } from "@client/stores/reduce-global";
import { RootState } from "@client/stores/store";
import { STATUS_BOOKING } from "@utils/constant-data";
import React, { FC, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Radio, RadioGroup } from "react-radio-group";
import moment from "moment";

const approveBooking: FC = () => {
    const dispatch = useDispatch();
    const selectedBooking = useSelector((state: RootState) => state.dashboard.selectedBooking);

    const [dateSelected, setDateSelected] = useState(null);
    const [proposedDate, setProposedDate] = useState(selectedBooking.proposedDate);

    useEffect(() => {
        let cloneProposedDate = [...proposedDate];
        cloneProposedDate.forEach((item, index) => {
            cloneProposedDate[index] = {
                date: item.date,
                isSelected: (moment(item.date).isSame(moment(dateSelected)))
            };
        });
        setProposedDate(cloneProposedDate);
    }, [dateSelected])

    const onClose = () => dispatch(setShowHideModal(false));
    const onConfirm = async () => {
        if (proposedDate.some(x => x.isSelected)) {
            const result = await dashboardAdapter.asyncApprovedRejectedBooking({
                id: selectedBooking.id,
                status: STATUS_BOOKING.APPROVED,
                proposedDate
            });
            if (result) {
                dispatch(activateRefreshGrid());
                onClose();
            }
        }
    };

    return <>
        <Form >
            <Row>
                <Col>
                    <RadioGroup name="fruits" onChange={(e) => setDateSelected(e)}>
                        {
                            proposedDate.map((item, index) => (
                                <div key={index} className="radio-button-background">
                                    <Radio value={item.date} className="radio-button" />{moment(item.date).format("DD/MM/YYYY")}
                                </div>
                            ))
                        }
                    </RadioGroup>
                </Col>
            </Row>
            <Row>
                <Col sm="12" md="6">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </Col>
                <Col sm="12" md="6">
                    <Button variant="primary" onClick={onConfirm}>Confirm</Button>
                </Col>
            </Row>
        </Form>
    </>;
}

export default approveBooking;