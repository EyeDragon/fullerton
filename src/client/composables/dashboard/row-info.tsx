import { IGridBooking } from "@client/entities/booking-models";
import React, { FC } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@client/stores/store";
import { dashboardAdapter } from "@client/adapters/dashboard-adapter";
import { activateRefreshGrid } from "@client/stores/reduce-global";
import { setAdminSubmit, setSelectedBooking, setShowHideModal, setTitleModal } from "@client/stores/reduce-dashboard";
import { STATUS_BOOKING } from "@utils/constant-data";

const rowInfo: FC<{ dataRow: IGridBooking, index: number }> = ({ dataRow, index }) => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state: RootState) => state.global.isAdmin);

    const tooltipCancel = (props) => (<Tooltip id="tooltip-icon-cancel" {...props}>Cancel Booking</Tooltip>);
    const tooltipApprove = (props) => (<Tooltip id="tooltip-icon-approve" {...props}>Approve</Tooltip>);
    const tooltipReject = (props) => (<Tooltip id="tooltip-icon-reject" {...props}>Reject Booking</Tooltip>);

    const onCancelBooking = async () => {
        if (confirm("Do you want to cancel this booking?")) {
            const result = await dashboardAdapter.asyncCancelBooking(dataRow.id);
            if (result) {
                dispatch(activateRefreshGrid());
            }
        }
    };

    const onRejectBooking = () => {
        dispatch(setAdminSubmit(STATUS_BOOKING.REJECTED));
        dispatch(setSelectedBooking(dataRow));
        dispatch(setTitleModal("Reject Booking"));
        dispatch(setShowHideModal(true));
    };

    const onApproveBooking = () => {
        dispatch(setAdminSubmit(STATUS_BOOKING.APPROVED));
        dispatch(setSelectedBooking(dataRow));
        dispatch(setTitleModal("Approve Booking"));
        dispatch(setShowHideModal(true));
    };

    return <>
        <tr>
            <td>{index}</td>
            <td>{dataRow.event}</td>
            <td>{dataRow.location}</td>
            <td>
                {
                    dataRow.proposedDate.map((item, index) => (
                        <p key={index}>{moment(item.date).format("DD/MM/YYYY")}</p>
                    ))
                }
            </td>
            <td>{dataRow.status}</td>
            <td>
                <div style={{ display: "inline-flex", width: "100%" }}>
                    {
                        !isAdmin &&
                        dataRow.status === STATUS_BOOKING.PENDING &&
                        <OverlayTrigger
                            placement="bottom"
                            overlay={tooltipCancel}>
                            <div onClick={onCancelBooking}>
                                <FontAwesomeIcon style={{ cursor: "pointer", color: "#EA1E30" }} icon={["fas", "trash"]} />
                            </div>
                        </OverlayTrigger>
                    }

                    {
                        isAdmin &&
                        dataRow.status === STATUS_BOOKING.PENDING &&
                        <OverlayTrigger
                            placement="bottom"
                            overlay={tooltipApprove}>
                            <div onClick={onApproveBooking}>
                                <FontAwesomeIcon style={{ cursor: "pointer", color: "#68BA50" }} icon={["fas", "check"]} />
                            </div>
                        </OverlayTrigger>
                    }

                    {
                        isAdmin &&
                        dataRow.status === STATUS_BOOKING.PENDING &&
                        <OverlayTrigger
                            placement="bottom"
                            overlay={tooltipReject}>
                            <div onClick={onRejectBooking}>
                                <FontAwesomeIcon style={{ cursor: "pointer", color: "#EA1E30" }} icon={["fas", "ban"]} />
                            </div>
                        </OverlayTrigger>}
                </div>
            </td>
        </tr>
    </>;
}

export default rowInfo;