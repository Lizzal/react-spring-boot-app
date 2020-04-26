import React, { Component } from 'react';
import backend from '../api/backend';

export default class GroupLists extends Component {
  state = {
    isLoading: true,
    groups: [],
  };

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
  componentDidMount() {
    this.fetchData();
  }

  render() {
    return <div>GroupLists</div>;
  }
}
