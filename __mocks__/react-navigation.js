

const navMock = () => ({
  router: {
    getActionForPathAndParams: jest.fn(),
    getStateForAction: jest.fn(),
  },
}
);

module.exports = {
  addNavigationHelpers: jest.fn(),
  StackNavigator: navMock,
  TabNavigator: navMock,
  NavigationActions: { back: jest.fn(), navigate: jest.fn() },
};


