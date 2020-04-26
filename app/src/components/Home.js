import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import './App.css';
import AppNavBar from './AppNavBar';

export default class Home extends Component {
  render() {
    return (
      <div>
        <AppNavBar />
        <Container fluid>
          <Button color="link">
            <Link to="/groups">Manage JUG Tour</Link>
          </Button>
        </Container>
      </div>
    );
  }
}
