import { StyleSheet } from 'react-native';

const Theme = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
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