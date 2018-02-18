const isAuthenticated = state => {
  return state.isAuthenticated;
};

const latestPath = state => {
  return state.latestPath;
};

const subscribers = state => {
  return state.subscribers;
};

export default { isAuthenticated, latestPath, subscribers };
