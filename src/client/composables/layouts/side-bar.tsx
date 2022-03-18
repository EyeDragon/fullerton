import { routesMainLayout } from "@client/routes";
import { urlImage } from "@utils/function-data";
import React, { FC } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "reactstrap";

const SideBar: FC = () => {
    const logo = urlImage("logo/react-logo.png");
    const sideBar = urlImage("img/sidebar-4.jpg");
    const location = useLocation();
    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };

    const navRoutes = () => {
        return routesMainLayout.map((prop, index) => {
            return (
                <li key={index}
                    className={activeRoute(prop.path)}
                >
                    <NavLink to={prop.path}
                        className="nav-link"
                        activeClassName="active"
                    >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                    </NavLink>
                </li>
            );
        });
    };

    return <>
        <div className="sidebar" data-image="" data-color="white">
            <div
                className="sidebar-background"
                style={{ backgroundImage: "url(" + sideBar + ")" }}
            />
            <div className="sidebar-wrapper">
                <div className="logo d-flex align-items-center justify-content-start">
                    <a href="##" className="simple-text logo-mini mx-1" >
                        <div className="logo-img">
                            <img src={logo} alt="..." />
                        </div>
                    </a>
                    <a className="simple-text" href="##">
                        Fullerton Healthcare Group
                    </a>
                </div>
                <Nav>
                    {navRoutes()}
                </Nav>
            </div>
        </div>
    </>;
}

export default SideBar;