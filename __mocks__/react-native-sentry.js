const SentryMock = {
  install: () => {},
  config: () => {
    return {
      install: () => {},
    };
  },
  captureException: () => {},
};

module.exports = SentryMock;

// jest.mock('react-native-sentry', () => SentryMock);