import { ReactNode } from "react";
import './layout.scss'
import { Row, Col } from "antd";
import NavBar from '../components/navBar';
interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Row>
            <Col span={24}>
                <Row className="header">
                    <NavBar />
                </Row>
                <Row>
                    <Col span={24}>{children}</Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Layout;