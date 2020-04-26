import React, { Component } from 'react';
import backend from '../api/backend';
import { Button, ButtonGroup, Container, Table, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

import AppNavbar from './AppNavBar';

export default class GroupLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      groups: [],
    };

    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchData();
  }

  async fetchData() {
    await backend
      .getGroups()
      .then((response) => {
        this.setState({ groups: response.data, isLoading: false });
      })
      .then((error) => {
        console.log('There was an error fetching data from the backend: ' + error);
      });
  }

  async remove(id) {
    await backend
      .deleteGroup(id)
      .then((response) => {
        let updatedGroups = [...this.state.groups].filter((i) => i.id !== id);
        this.setState({ groups: updatedGroups });
      })
      .catch((error) => {
        console.log('There was an error removing a group: ', error);
      });
  }

  render() {
    const { isLoading, groups } = this.state;

    if (isLoading) {
      return (
        <div className="">
          <AppNavbar />
          <Container fluid>
            <div className="d-flex justify-content-center">
              <Spinner color="primary" style={{ width: '3rem', height: '3rem' }}>
                "Loading..."
              </Spinner>
            </div>
          </Container>
        </div>
      );
    }

    const groupList = groups.map((group) => {
      const address = `${group.address || ''} ${group.city || ''} ${
        group.stateOrProvince || ''
      }`;
      return (
        <tr key={group.id}>
          <td style={{ whiteSpace: 'nowrap' }}>{group.name}</td>
          <td>{address}</td>
          <td>
            {group.events.map((event) => {
              return (
                <div key={event.id}>
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                  }).format(new Date(event.date))}
                  : {event.title}
                </div>
              );
            })}
          </td>
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={'/groups/' + group.id}>
                Edit
              </Button>
              <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/groups/new">
              Add Group
            </Button>
          </div>
          <h3>My Groups</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Location</th>
                <th>Events</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>{groupList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
