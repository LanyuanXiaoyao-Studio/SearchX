export default {
  state: () => ({
    event: {
      routeTo: 'ROUTE_TO'
    }
  }),
  getters: {
    event: state => state.event
  }
}
