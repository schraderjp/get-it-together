import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
} from 'react-icons/vsc';
import { Burger, Button, Menu, Title, Tooltip } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import icon from '../img/icon.png';

const MenuBarWrapper = styled.div`
  height: ${({ isFullScreen }) => (isFullScreen ? '0' : '36px 0 0 0')};
  opacity: ${({ isFullScreen }) => (isFullScreen ? '0' : '1')};
  transition: height 0.2s, opacity 0.2s;
  position: fixed;
  width: 100vw;
  -webkit-app-region: drag;
  padding: 0;
  display: flex;
  top: 0;
  right: 0;
  background-color: #121314;
  z-index: 1;
`;

const StyledBurger = styled(Burger)`
  position: relative;
  top: 0;
  left: 0;
  z-index: 190;
  -webkit-app-region: no-drag;
  margin-left: auto;
`;

const WindowControls = styled.div`
  margin-left: auto;
  position: absolute;
  top: 0px;
  right: 8px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  z-index: 200;
  background: #121314;
`;

const WindowControlButton = styled.button`
  -webkit-app-region: no-drag;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row;
  border: none;
  height: 36px;
  width: 36px;
  background-color: #121314;
  color: #fff;
  transition: filter 100ms;

  &:hover {
    filter: brightness(0.8);
  }
`;

const appApi = window.app;
const MenuBar = ({ drawerOpened, setDrawerOpened, isFullScreen }) => {
  return (
    <>
      <MenuBarWrapper isFullScreen={isFullScreen}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '36px',
            paddingLeft: '6px',
            color: 'white',
          }}
        >
          <StyledBurger
            size="sm"
            mr={6}
            opened={drawerOpened}
            onClick={() => {
              setDrawerOpened((o) => !o);
            }}
          />

          <img src={icon} width="22" height="22" alt="pencil icon" />
          <Title style={{ fontSize: '16px', marginLeft: '4px' }}>
            Get It Together
          </Title>
        </div>
        <WindowControls>
          <Tooltip color="gray" label="Toggle Fullscreen" position="bottom">
            <WindowControlButton
              color="gray"
              onClick={() => {
                appApi.toggleFullScreen();
                appApi.isFullScreen();
              }}
            >
              {isFullScreen ? (
                <AiOutlineFullscreenExit size={25} />
              ) : (
                <AiOutlineFullscreen size={25} />
              )}
            </WindowControlButton>
          </Tooltip>
          <WindowControlButton onClick={appApi.minimizeWindow}>
            <VscChromeMinimize size={22} />
          </WindowControlButton>
          <WindowControlButton onClick={appApi.maximizeWindow}>
            <VscChromeMaximize size={22} />
          </WindowControlButton>
          <WindowControlButton onClick={appApi.closeWindow}>
            <VscChromeClose size={22} />
          </WindowControlButton>
        </WindowControls>
      </MenuBarWrapper>
    </>
  );
};

export default MenuBar;
