import { ReactNode } from "react";
import "./layout.scss";
import { Row, Col } from "antd";
import NavBar from "../components/navBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode); // Get the theme state

  return (
    <Row>
      <Col span={24} style={{
        backgroundColor: isDarkMode ? "#000" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
      }}>
        <Row className="header">
          <NavBar />
        </Row>
        <Row>
          <Col span={24}>{children}</Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Layout;
