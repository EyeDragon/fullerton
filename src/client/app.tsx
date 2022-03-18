import { toDataUrl, urlImage } from "@utils/function-data";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { routes, Pages } from "./routes";
import { setBase64LogoFull } from "./stores/reduce-image";

const app: FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        toDataUrl(urlImage("logo/react-logo.png"), (base64) => {
            dispatch(setBase64LogoFull(base64));
        });
    }, [])
    return <>
        <div>
            <Switch>
                {
                    routes.map((x, i) =>
                    (<Route
                        key={i}
                        path={x.path}
                        exact={x.exact}
                        component={x.component}
                    />))
                }
                <Redirect from="/" to={Pages.Login.path} />
            </Switch>
        </div>
    </>;
};

export default app;