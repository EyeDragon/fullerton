export class StorageKey {
    public static CLIENT_LOGIN_INFO: string = "Fullerton:Client:Login";

    public static SERVER_USER_INFO: string = "Fullerton:Server:User";
};

export enum KEY_PAGE {
    DASHBOARD = "dashboard",
    LOGIN = "login",
    LAYOUT = "layout"
}

export enum RESPONSE_STATUS {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}

export enum RESPONSE_STATUS_CODES {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500
}

export enum STATUS_BOOKING {
    PENDING = "Pending Review",
    APPROVED = "Approved",
    REJECTED = "Rejected"
}