import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setShowHideModal, setTitleModal } from "@client/stores/reduce-dashboard";

const rowCreate: FC = () => {
    const dispatch = useDispatch();
    const onShow = () => {
        dispatch(setShowHideModal(true));
        dispatch(setTitleModal("Create new booking"));
    };

    return <>
        <tr>
            <td colSpan={6} style={{ cursor: "pointer" }} onClick={onShow}>
                <FontAwesomeIcon style={{ cursor: "pointer", color: "#06a5d0" }} icon={["fas", "plus"]} />
            </td>
        </tr>
    </>;
}

export default rowCreate;