import { ReactNode, useEffect } from "react";
import "./layout.scss";
import { Row, Col } from "antd";
import NavBar from "../components/navBar/navBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// @ts-ignore
import { gsap } from "gsap";
// @ts-ignore
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode); // Get the theme state


useEffect(()=>{
  ScrollTrigger.create({
    start: 'top -20',
    end: 99999,
    toggleClass: { className: 'custom-menu--scrolled', targets: '.custom-menu' }
  });
  // 清除 ScrollTrigger，防止內存洩漏
  return () => ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
})


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
