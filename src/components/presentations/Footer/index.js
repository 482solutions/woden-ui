import React from "react";
import { Row, Col } from "antd";
import "./style.css";

const Footer = () => (
  <Row gutter={8} className="holder">
    <Col span={8} className="footer__text">
      © {new Date().getFullYear()} 482.solutions. All rights reserved.
    </Col>
    <Col span={3} offset={10} className="flex-end">
      <a href="/#" className="footer__link">
        Privacy Notice
      </a>
    </Col>
  </Row>
);

export default Footer;
