import { StyleSheet } from 'react-native';

const scrollerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 0,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090b0c',
  },
  getStartedText: {
    fontSize: 17,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  },
});

const colors = StyleSheet.create({
  green: {
    color: '#61C7AE',
  },
  blue: {
    color: '#50AFF8',
  },
  purple: {
    color: '#AC3DEB',
  },
  red: {
    color: '#DF4B2B',
  },
});

const summaryStyles = StyleSheet.create({
  container: {
    backgroundColor: '#090B0C',
    borderRadius: 5,

    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: -20,
    marginBottom: 10,
    paddingBottom: 10,
  },
  title: {
    backgroundColor: '#101416',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
  },
  data: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default {
  scrollerStyles,
  styles,
  colors,
  summaryStyles,
};
