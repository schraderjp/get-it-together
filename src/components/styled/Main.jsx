import { Container } from '@mantine/core';
import styled from 'styled-components';

export const Main = styled.div`
  height: 100vh;
  position: relative;
  margin-left: 0;
  background-color: #1a1b1e;
  padding: ${({ isFullScreen }) => (isFullScreen ? '0' : '36px 0 0 0')};
  overflow: hidden;
  transition: padding 0.2s;
  border-left: 1px solid hsl(225, 7%, 20%);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #000000;
  }
  &::-webkit-scrollbar-track-piece {
    background: #1e1e1f;
  }
  &::-webkit-scrollbar-thumb {
    background: #003e6d;
  }
  @media screen and (max-width: 450px) {
    margin-left: 0;
    border-left: 0px;
  }
`;
