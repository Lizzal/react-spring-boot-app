import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
});

export default {
  // GETTERS
  getGroups() {
    return apiClient.get('/groups');
  },
  getGroup(id) {
    return apiClient.get(`/group/${id}`);
  },

  // CREATERS
  createGroup(group) {
    return apiClient.post('/group', JSON.stringify(group));
  },

  // UPDATERS
  updateGroup(id, group) {
    return apiClient.put(`/group/${id}`, JSON.stringify(group));
  },

  // DELETERS
  deleteGroup(id) {
    return apiClient.delete(`/group/${id}`);
  },
};
