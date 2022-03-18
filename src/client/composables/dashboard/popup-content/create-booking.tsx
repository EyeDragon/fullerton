import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFieldArray, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { IInputtedBooking } from "@client/entities/booking-models";
import { dashboardAdapter } from "@client/adapters/dashboard-adapter";
import { activateRefreshGrid } from "@client/stores/reduce-global";
import { RootState } from "@client/stores/store";
import { setShowHideModal } from "@client/stores/reduce-dashboard";

const createBooking: FC = () => {
    const dispatch = useDispatch();
    const eventTypes = useSelector((state: RootState) => state.metaData.eventTypes);
    const showModal = useSelector((state: RootState) => state.dashboard.showModal);

    const { register, handleSubmit, formState: { errors }, getValues, setValue, control } = useForm<IInputtedBooking>();
    const { fields, update } = useFieldArray({ name: "proposedDate", control });

    useEffect(() => {
        if (showModal) {
            setValue("eventCode", "");
            setValue("location", "");
            setValue("proposedDate", [{ date: new Date() }, { date: new Date() }, { date: new Date() }]);
        }
    }, [showModal])

    const onClose = () => dispatch(setShowHideModal(false));
    const onConfirm = async () => {
        const result = await dashboardAdapter.asyncCreateBooking({
            eventCode: getValues("eventCode"),
            location: getValues("location"),
            proposedDate: getValues("proposedDate")
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
                        <Form.Label>Type of event</Form.Label>
                        <Form.Control as="select" className="form-control"
                            {...register("eventCode", { required: true })}
                            onChange={(evt) => setValue("eventCode", evt.target.value)}>
                            <option value="">--- Select ---</option>
                            {eventTypes.map(item => (
                                <option
                                    key={item.code}
                                    value={item.code}
                                >
                                    {item.label}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {errors?.eventCode?.type === "required" && <p className="invalid-feedback">Required</p>}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Location of event</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("location", { required: true })}
                            onChange={(evt: ChangeEvent<HTMLInputElement>) => setValue("location", evt.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {errors?.location?.type === "required" && <p className="invalid-feedback">Required</p>}
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        fields.map((item, index) => (
                            <div key={item.id}>
                                <Form.Group>
                                    <Form.Label>Proposed Date {(index + 1)}</Form.Label>
                                    <DatePicker
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy"
                                        {...register(`proposedDate.${index}.date`, { required: true })}
                                        selected={item.date}
                                        onChange={(evt) => update(index, { date: evt })}
                                        onChangeRaw={(evt) => evt.preventDefault()} />
                                </Form.Group>
                                {errors?.proposedDate?.[index]?.date.type === "required" && <p className="invalid-feedback">Required</p>}
                            </div>
                        ))
                    }
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

export default createBooking;