import React, { FC } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import ReactDOM from "react-dom";
import { Pages, routesMainLayout } from "@client/routes";
import { StorageKey } from "@utils/constant-data";
import { authenticationAdapter } from "@client/adapters/authentication-adapter";

const Header: FC = () => {
    const location = useLocation();
    const history = useHistory();

    const mobileSidebarToggle = (e) => {
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        var node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = () => {
            ReactDOM.findDOMNode(this).parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };

    const getBrandText = () => {
        for (let i = 0; i < routesMainLayout.length; i++) {
            if (location.pathname.indexOf(routesMainLayout[i].path) !== -1) {
                return routesMainLayout[i].name;
            }
        }
        return "Brand";
    };

    const onSignOut = async () => {
        await authenticationAdapter.asyncRemoveSession();
        // browserStorage.set(localKey, isSuccess);
        localStorage.removeItem(StorageKey.CLIENT_LOGIN_INFO);
        history.push(Pages.Login.path);
    };

    return <>
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                    <Button
                        variant="dark"
                        className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                        onClick={mobileSidebarToggle}
                    >
                        <i className="fas fa-ellipsis-v"></i>
                    </Button>
                    <Navbar.Brand
                        href="#home"
                        onClick={(e) => e.preventDefault()}
                        className="mr-2"
                    >
                        {getBrandText()}
                    </Navbar.Brand>
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
                    <span className="navbar-toggler-bar burger-lines"></span>
                    <span className="navbar-toggler-bar burger-lines"></span>
                    <span className="navbar-toggler-bar burger-lines"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* <Nav className="nav mr-auto" navbar>
                        <Nav.Item>
                            <Nav.Link
                                data-toggle="dropdown"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                className="m-0"
                            >
                                <i className="nc-icon nc-palette"></i>
                                <span className="d-lg-none ml-1">Dashboard</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle
                                as={Nav.Link}
                                data-toggle="dropdown"
                                id="dropdown-67443507"
                                variant="default"
                                className="m-0"
                            >
                                <i className="nc-icon nc-planet"></i>
                                <span className="notification">5</span>
                                <span className="d-lg-none ml-1">Notification</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Notification 1
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Notification 2
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Notification 3
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Notification 4
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Another notification
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <i className="nc-icon nc-zoom-split"></i>
                                <span className="d-lg-block"> Search</span>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav> */}
                    <Nav className="ml-auto" navbar>
                        {/* <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <span className="no-icon">Account</span>
                            </Nav.Link>
                        </Nav.Item>
                        <Dropdown as={Nav.Item}>
                            <Dropdown.Toggle
                                aria-expanded={false}
                                aria-haspopup={true}
                                as={Nav.Link}
                                data-toggle="dropdown"
                                id="navbarDropdownMenuLink"
                                variant="default"
                                className="m-0"
                            >
                                <span className="no-icon">Dropdown</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                                <Dropdown.Item
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Action
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Another action
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Something
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Something else here
                                </Dropdown.Item>
                                <div className="divider"></div>
                                <Dropdown.Item
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Separated link
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                        <Nav.Item>
                            <Nav.Link
                                className="m-0"
                                href="##"
                                onClick={(e) => e.preventDefault()}
                            >
                                <span className="no-icon" onClick={onSignOut}>Logout</span>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>;
}

export default Header;