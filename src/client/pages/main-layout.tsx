import SideBar from "@client/composables/layouts/side-bar";
import Header from "@client/composables/layouts/header";
import { Pages, routesMainLayout } from "@client/routes";
import React, { FC, useEffect, useRef, useState } from "react";
import { useLocation, Switch, Route, Redirect, useHistory } from "react-router-dom";
import { matchPath } from "react-router";
import "@assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "@assets/css/demo.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { browserStorage, isEmpty, isNullOrUndefined } from "@utils/function-data";
import { authenticationAdapter } from "@client/adapters/authentication-adapter";
import { IRoute } from "@client/entities/global-model";
import { StorageKey } from "@utils/constant-data";
import { useDispatch } from "react-redux";
import { checkUserIsAdmin } from "@client/stores/reduce-global";
import { metaDataAdapter } from "@client/adapters/meta-data-adapter";
import { fetchEventTypes } from "@client/stores/reduce-meta-data";


const mainLayout: FC = () => {
    const mainPanel = useRef(null);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [routes, setRoutes] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (!isEmpty(browserStorage.get(StorageKey.CLIENT_LOGIN_INFO))) {
            authenticationAdapter.asyncIsAdmin().then(result => {
                dispatch(checkUserIsAdmin(result));
            });
        } else {
            history.push(Pages.Login.path);
        }
    }, [])

    useEffect(() => {
        initMetaData();
        setRoutes(getRoutes());
    }, [])

    const getRoutes = () => {
        return routesMainLayout.map((x, i) => {
            return <Route
                key={i}
                path={x.path}
                exact={x.exact}
                component={x.component}
            />;
        });
    };

    const checkAuthen = async (currentRoute: IRoute) => {
        if (isNullOrUndefined(currentRoute)) {
            return false;
        }
        return await authenticationAdapter.asyncCheckAccessPage(currentRoute.key);
    };

    const initMetaData = async () => {
        const result = await Promise.all([
            metaDataAdapter.getEventTypes()
        ]);
        dispatch(fetchEventTypes(result[0]));
    };

    useEffect(() => {
        const currentRoute = routesMainLayout.find(x => matchPath(location.pathname, x));
        if (!isNullOrUndefined(currentRoute)) {
            checkAuthen(currentRoute).then(isAccess => {
                if (!isAccess) {
                    history.push(Pages.Login.path);
                }
            });
        }
    }, [location.pathname]);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainPanel.current.scrollTop = 0;
        if (
            window.innerWidth < 993 &&
            document.documentElement.className.indexOf("nav-open") !== -1
        ) {
            document.documentElement.classList.toggle("nav-open");
            var element = document.getElementById("bodyClick");
            element.parentNode.removeChild(element);
        }
    }, [location]);

    return <>
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover />
        </div>
        <div className="wrapper">
            <SideBar />
            <div className="main-panel" ref={mainPanel}>
                <Header />
                <div className="content">
                    <Switch>
                        {routes}
                        <Redirect from="*" to={Pages.Dashboard.path} />
                    </Switch>
                </div>
            </div>
        </div>
    </>;
}

export default mainLayout;