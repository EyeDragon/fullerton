import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";

import "@assets/css/login.css";

import { browserStorage, isEmpty, isNullOrUndefined } from "@utils/function-data";
import { authenticationAdapter } from "@client/adapters/authentication-adapter";
import { StorageKey } from "@utils/constant-data";
import { useForm } from "react-hook-form";
import { IUser } from "@client/entities/user-model";
import { Form } from "react-bootstrap";
import { Pages } from "@client/routes";

const login: FC = () => {
    const [isNotExistedAccount, setIsNotExistedAccount] = useState<boolean>(false);
    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<IUser>();

    const hasVal = (text: string) => {
        return isEmpty(text) ? "" : "has-val";
    };

    const onLogin = async () => {
        if (isEmpty(getValues("username")) && isEmpty(getValues("password"))) {
            return;
        }
        const param: IUser = { username: getValues("username"), password: getValues("password") };
        const result = await authenticationAdapter.asyncRequestToken(param);
        if (isNullOrUndefined(result)) {
            setIsNotExistedAccount(true);
        } else if (!isEmpty(result?.accessToken)) {
            browserStorage.set(StorageKey.CLIENT_LOGIN_INFO, result);
            history.push(Pages.MainLayout.path);
        }
    };

    const onHandleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key === "Enter") {
            evt.preventDefault();
            evt.stopPropagation();
            onLogin();
        }
    }

    return <>
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-b-160 p-t-50">
                    <Form onSubmit={handleSubmit(onLogin)} className="login100-form validate-form">
                        <div className="wrap-input100 rs1 validate-input">
                            <input className={"input100 " + hasVal(getValues("username"))} type="text" name="username"
                                {...register("username", { required: true })}
                                onChange={(evt) => setValue("username", evt.target.value?.trim())}
                                onKeyDown={onHandleKeyDown} />
                            <span className="label-input100">Username</span>
                        </div>
                        <div className="wrap-input100 rs2 validate-input">
                            <input className={"input100 " + hasVal(getValues("password"))} type="password" name="password"
                                {...register("password", { required: true })}
                                onChange={(evt) => setValue("password", evt.target.value)}
                                onKeyDown={onHandleKeyDown} />
                            <span className="label-input100">Password</span>
                        </div>
                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" type="submit">
                                Login
                            </button>
                        </div>
                        <div className="w-100 p-t-23">
                            {(errors?.username?.type === "required" || errors?.password?.type === "required")
                                && <p className="pt-3 text-center error-message">Username or Password are required</p>}
                            {isNotExistedAccount
                                && <p className="pt-3 text-center error-message">Username or Password is incorrect</p>}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </>;
}

export default login;