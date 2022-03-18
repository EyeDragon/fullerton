import React, { FC } from "react";
import { Container } from "react-bootstrap";

const Footer: FC = () => {
    return <>
        <footer className="footer px-0 px-lg-3">
            <Container fluid>
                <nav>
                    <ul className="footer-menu">
                        <li>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                Company
                            </a>
                        </li>
                        <li>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                Portfolio
                            </a>
                        </li>
                        <li>
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                Blog
                            </a>
                        </li>
                    </ul>
                    <p className="copyright text-center">
                        © {new Date().getFullYear()}{" "}
                        <a href="##">TAC</a>
                    </p>
                </nav>
            </Container>
        </footer>
    </>;
}

export default Footer;