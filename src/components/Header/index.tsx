import { link } from "fs";
import React from "react";
import { useLocation } from "react-router-dom";
import './header.scss'
import { Row, Col } from "antd";

const navLink = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Favorite",
        link: "/",
    },
]

const Header = () => {
    // const { pathName } = useLocation();
    return (
        <Row>
            <Col span={24} className="navBar">

            </Col>
        </Row>
    );
}

export default Header;