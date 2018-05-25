import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

export enum Colors {
  CrossLightBlue = '#057dc2',
  CrossDarkBlue = '#00539b',
  CrossYellow = '#fede00',
  CrossBlack = '#2f2f2f',
}

/**
 * Size if icons in tab bars
 * @type int
 * @public
 */
export const TabIconSize: number = Constants.platform ? 25 : 19;

/**
 * Main theme for the app
 */
const Theme = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddingDefault: {
    padding: 10,
  },
  label: {
    color: 'gray',
    fontSize: 14,
  },
  containerCentered: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  alignCentered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignTop: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  alignLeft: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  alignRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  alignBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabBar: {
    backgroundColor: Colors.CrossLightBlue,
  },
  tabBarTitle: {
    color: 'green',
    alignSelf: 'center',
  },
  tabBarIcon: {
    color: 'white',
  },
  horizontalTopCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  horizontalTopLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  horizontalTopRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  verticalTopCenter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  verticalTopLeft: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  verticalTopRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  vertical: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  verticalBottomCenter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  backgroundWhite: {
    backgroundColor: '#ffffff',
  },
  overlay: {
    backgroundColor: 'rgba(254, 222, 0, 0.3)',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  spinner: {
    width: 50,
    height: 50,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    opacity: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  textSpinner: {
    fontSize: 20,
    color: Colors.CrossLightBlue,
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: 5,
    opacity: 1,
  },
    para: {
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: { color: 'blue' },
    textBlock: {
        width: 300,
    },
});

export default Theme;