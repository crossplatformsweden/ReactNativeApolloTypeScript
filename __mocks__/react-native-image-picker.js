const mock = {
    showImagePicker: (options, callback) => {
        callback({
         cancelled: false,
         uri: 'test',
         width: 1,
         height: 1,
        });
      }
};

jest.mock('react-native-image-picker', () => ({
    mock
}));

export default mock;

module.exports = mock;