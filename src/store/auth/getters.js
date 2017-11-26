const isAuthenticated = state => {
  return state.isAuthenticated;
};

const latestPath = state => {
  return state.latestPath;
};

export default { isAuthenticated, latestPath };
