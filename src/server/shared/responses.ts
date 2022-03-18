import { RESPONSE_STATUS, RESPONSE_STATUS_CODES } from "@utils/constant-data";
import { Response, Errback } from "express";
import camelcaseKeys from "camelcase-keys";

export function successResponse(res: Response, message?: string, data?: any) {
    return res.status(RESPONSE_STATUS_CODES.SUCCESS).json(camelcaseKeys({
        status: RESPONSE_STATUS.SUCCESS,
        message,
        data
    }, { deep: true }));
}

export function badRequest(res: Response, message: string = "Invalid parameters") {
    return res.status(RESPONSE_STATUS_CODES.BAD_REQUEST).json(camelcaseKeys({
        status: RESPONSE_STATUS.FAILURE,
        message
    }, { deep: true }));
}

export function serverError(res: Response, err: Errback) {
    return res.status(RESPONSE_STATUS_CODES.SERVER_ERROR).json(camelcaseKeys({
        status: RESPONSE_STATUS.FAILURE,
        message: "Sever has errors",
        data: err
    }, { deep: true }));
}