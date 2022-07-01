import { Box, Button } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeWrapper = styled(Box)`
  padding: 8px;
  display: flex;
  flex-flow: column;
`;
const Home = () => {
  return (
    <HomeWrapper>
      <Button component={Link} to="/notes" color="gray" size="lg" m="16px">
        Notes
      </Button>
      <Button
        component={Link}
        to="/tasks/list1"
        color="gray"
        size="lg"
        m="16px"
      >
        Tasks
      </Button>
    </HomeWrapper>
  );
};

export default Home;
