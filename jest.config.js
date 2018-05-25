module.exports = {
  globals: {
    "ts-jest": {
      useBabelrc: true
    }
  },
  preset: "jest-expo",
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
    "\\.(ts|tsx)$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$",
  testMatch: null,
  testPathIgnorePatterns: [
    "\\.snap$",
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|vector-icons|react-native/Libraries/Image/RelativeImageStub|react-navigation|jest-resolve|expo|lodash|enzyme|react|jest-enzyme|enzyme|jest-expo|jest-serializer-enzyme|react-native-elements|react-native-google-places-autocomplete)/)"
  ],
  setupFiles: ["./config/jest/globalFetch.ts", "./config/enzyme/index.ts"],
  moduleDirectories: ["node_modules"],
  unmockedModulePathPatterns: [
    "<rootDir>/node_modules/react",
    "<rootDir>/node_modules/react-dom",
    "<rootDir>/node_modules/react-addons-test-utils"
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/react-native-router-flux/node_modules/react-native/Libraries/Core/Devtools/setupDevtools.js"
  ]
};
