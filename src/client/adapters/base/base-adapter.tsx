import { ILogin } from "@entities/global-model";
import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { RESPONSE_STATUS, StorageKey } from "@utils/constant-data";
import { browserStorage, cloneData, convertToParamExpress, isEmpty, isNullOrUndefined } from "@utils/function-data";

export class BaseAdapter {

    private axiosClient: AxiosInstance = null;

    private get tokenKey(): string {
        if (isNullOrUndefined(browserStorage.get(StorageKey.CLIENT_LOGIN_INFO))) {
            return "";
        }
        const loginInfo = browserStorage.get<ILogin>(StorageKey.CLIENT_LOGIN_INFO);
        return `${loginInfo.tokenType} ${loginInfo.accessToken}`;
    }

    public constructor(route: string) {
        let baseURL: string = `http://localhost:${(process.env.PORT_BE)}/${process.env.LOCAL_BE}/${route}`;
        if (process.env.NODE_ENV === "production") {
            let baseURL: string = `${window.location.origin}/${process.env.LOCAL_BE}/${route}`;
        }
        this.axiosClient = Axios.create({ baseURL });
    }

    protected async GET<T>(options: IOptions): Promise<IResponseData<T>> {
        try {
            const response: AxiosResponse<IResponseData<T>> = await this.axiosClient.request<IResponseData<T>>({
                method: "GET",
                url: options.url + (options.params ? convertToParamExpress(options.params) : ""),
                params: options.query,
                headers: this.commonHeaders()
            });
            return cloneData(response.data, true);
        }
        catch (error) {
            throw error;
        }
    }

    protected async POST<T>(options: IOptions): Promise<IResponseData<T>> {
        try {
            const response: AxiosResponse<IResponseData<T>> = await this.axiosClient.request<IResponseData<T>>({
                method: "POST",
                url: options.url + (options.params ? convertToParamExpress(options.params) : ""),
                params: options.query,
                data: JSON.stringify(options.body),
                headers: this.commonHeaders()
            });
            return cloneData(response.data, true);
        }
        catch (error) {
            throw error;
        }
    }

    protected async DELETE<T>(options: IOptions): Promise<IResponseData<T>> {
        try {
            const response: AxiosResponse<IResponseData<T>> = await this.axiosClient.request<IResponseData<T>>({
                method: "DELETE",
                url: options.url + (options.params ? convertToParamExpress(options.params) : ""),
                params: options.query,
                data: JSON.stringify(options.body),
                headers: this.commonHeaders()
            });
            return cloneData(response.data, true);
        }
        catch (error) {
            throw error;
        }
    }

    protected async PUT<T>(options: IOptions): Promise<IResponseData<T>> {
        try {
            const response: AxiosResponse<IResponseData<T>> = await this.axiosClient.request<IResponseData<T>>({
                method: "PUT",
                url: options.url + (options.params ? convertToParamExpress(options.params) : ""),
                params: options.query,
                data: JSON.stringify(options.body),
                headers: this.commonHeaders()
            });
            return cloneData(response.data, true);
        }
        catch (error) {
            throw error;
        }
    }

    private commonHeaders() {
        return {
            "Authorization": this.tokenKey,
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        };
    }
}

interface IParams {
    [key: string]: any;
}

interface IOptions {
    url: string;
    params?: IParams;
    query?: IParams;
    body?: any;
}

interface IResponseData<T> {
    status: RESPONSE_STATUS;
    message: string;
    data: T;
}