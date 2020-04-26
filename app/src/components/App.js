import React, { Component } from 'react';
import Axios from 'axios';
// import backend from '../api/backend';

export default class App extends Component {
  state = {
    isLoading: true,
    groups: [],
  };

  async fetchData() {
    await Axios.get('/api/groups')
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
    const { groups, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-intro">
            <h2>JUG List</h2>
            {groups.map((group) => (
              <div key={group.id}>{group.name}</div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}
