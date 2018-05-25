  // Mock the map library
  module.exports = {
    MapView: 'View',
    Marker: 'View',
    Callout: 'View',
    Ploygon: 'View',
    Polyline: 'View',
    Circle: 'View',
    Overlay: 'View',
  };

  jest.mock('react-native-maps', () => 'View');