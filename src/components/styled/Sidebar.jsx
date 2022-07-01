import { Box } from '@mantine/core';
import styled from 'styled-components';

export const Sidebar = styled.div`
  position: absolute;
  background: #1a1b1e;
  left: 0;
  bottom: 0;
  width: ${(props) => (props.showSidebar ? '200px' : '0px')};
  height: calc(100vh - 26px);
  padding-top: ${(props) => (props.largeWidth ? '36px' : '40px')};
  overflow: auto;
  z-index: 150;
  opacity: ${(props) => (props.showSidebar ? '1' : '0')};
  pointer-events: ${(props) => (props.showSidebar ? 'auto' : 'none')};
  transition: opacity 0.2s;

  @media screen and (max-width: 450px) {
    width: 100vw;
  }
`;
