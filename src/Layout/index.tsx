import { ReactNode } from "react";
import './layout.scss'
import { Row, Col } from "antd";
import Header from '../components/Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Row>
            <Col span={24} className="layout">
                <Row className="header">
                    <Col span={6} className="header_title">{children}</Col>
                    <Col span={10} offset={8} className="header_navBar">
                        <Header/>
                    </Col>
                </Row>
                <Row>
                    <Col span={16} offset={4} className="searchBar"></Col>
                </Row>
                <Row >
                    <Col span={20} offset={2} className="content"></Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Layout;