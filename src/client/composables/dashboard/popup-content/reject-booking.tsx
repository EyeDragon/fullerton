import { dashboardAdapter } from "@client/adapters/dashboard-adapter";
import { IApprovedRejectedBooking } from "@client/entities/booking-models";
import { setShowHideModal } from "@client/stores/reduce-dashboard";
import { activateRefreshGrid } from "@client/stores/reduce-global";
import { RootState } from "@client/stores/store";
import { STATUS_BOOKING } from "@utils/constant-data";
import React, { ChangeEvent, FC, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const rejectBooking: FC = () => {
    const dispatch = useDispatch();
    const showModal = useSelector((state: RootState) => state.dashboard.showModal);
    const selectedBooking = useSelector((state: RootState) => state.dashboard.selectedBooking);

    const { register, handleSubmit, formState: { errors }, getValues, setValue, control } = useForm<IApprovedRejectedBooking>();

    useEffect(() => {
        if (showModal) {
            setValue("reason", "");
        }
    }, [showModal])

    const onClose = () => dispatch(setShowHideModal(false));
    const onConfirm = async () => {
        const result = await dashboardAdapter.asyncApprovedRejectedBooking({
            id: selectedBooking.id,
            status: STATUS_BOOKING.REJECTED,
            reason: getValues("reason")
        });
        if (result) {
            dispatch(activateRefreshGrid());
            onClose();
        }
    };

    return <>
        <Form onSubmit={handleSubmit(onConfirm)}>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Reason</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("reason", { required: true })}
                            onChange={(evt: ChangeEvent<HTMLInputElement>) => setValue("reason", evt.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {errors?.reason?.type === "required" && <p className="invalid-feedback">Required</p>}
                </Col>
            </Row>
            <Row>
                <Col sm="12" md="6">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </Col>
                <Col sm="12" md="6">
                    <Button variant="primary" type="submit">Confirm</Button>
                </Col>
            </Row>
        </Form>
    </>;
}

export default rejectBooking;