import React from "react";
import styled from "styled-components";

import CommentLogo from "../../Images/comment.png";
import { Col, Layout, Row } from "antd";
import { Colors } from "../Themes/colors";

const { Header } = Layout;

const HeaderBar = styled(Header)`
  z-index: 9999;
  background: ${Colors.blueGradient};
  height: 50px;
  align-items: center;
  padding-left: 25px;
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 40px;
`;

const HeaderText = styled.div`
  && {
    color: ${Colors.pureWhite};
    font-weight: bold;
    font-size: 30px;
  }
`;

const Logo = styled.img`
  height: 29px;
  width: 40px;
  cursor: pointer;
  margin-right: 10px;
`;

const HeaderComponent = () => {
  return (
    <HeaderBar>
      <Row>
        <Col span={24}>
          <Logo src={CommentLogo} alt="headerLogo" />
        </Col>
      </Row>
      <HeaderText>Comment App Manager</HeaderText>
    </HeaderBar>
  );
};

export default HeaderComponent;
