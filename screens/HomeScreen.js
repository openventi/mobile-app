import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TopNav from '../components/TopNav';
import { VictoryChart, VictoryArea, VictoryAxis } from 'victory-native';

const MAX_ARRAY_SIZE = 10;
const GRAPH_HEIGHT = 150;

const emptyInitialObject = {
  rr: [],
  tidal: [],
  o2: [],
  peep: [],
};

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

const parametersArray = [
  {
    key: 'rr',
    title: 'RR',
    color: colors.green,
  },
  {
    key: 'tidal',
    title: 'Tidal',
    color: colors.blue,
  },
  {
    key: 'o2',
    title: 'o2',
    color: colors.purple,
  },
  {
    key: 'peep',
    title: 'PEEP',
    color: colors.red,
  },
];

export default function HomeScreen({ navigation }) {
  const [socket, setSocket] = React.useState({});
  const [readyState, setReadyState] = React.useState(0);
  const [graphValues, setGraphValues] = React.useState({
    ...emptyInitialObject,
  });
  // Use aux state to get information from ws
  const [auxGraphValues, setAuxGraphValues] = React.useState({
    ...emptyInitialObject,
  });

  React.useEffect(() => {
    const webSocket = new WebSocket('ws://104.248.228.69:8080/yubox/ws');
    webSocket.onmessage = e => {
      const data = e.data.split(' ')[1].split('=');
      const timestamp = e.data.split(' ')[2] / 1000000;
      const rr = parseFloat(data[1].split(',')[0]).toFixed(2);
      const tidal = parseFloat(data[2].split(',')[0]).toFixed(2);
      const o2 = parseFloat(data[3]).toFixed(2);
      const peep = parseFloat(data[3]).toFixed(2);

      setAuxGraphValues({
        rr: [...auxGraphValues.rr, { x: parseInt(timestamp, 10), y: parseFloat(rr) }].slice(-MAX_ARRAY_SIZE),
        tidal: [...auxGraphValues.tidal, { x: parseInt(timestamp, 10), y: parseFloat(tidal) }].slice(-MAX_ARRAY_SIZE),
        o2: [...auxGraphValues.o2, { x: parseInt(timestamp, 10), y: parseFloat(o2) }].slice(-MAX_ARRAY_SIZE),
        peep: [...auxGraphValues.peep, { x: parseInt(timestamp, 10), y: parseFloat(peep) }].slice(-MAX_ARRAY_SIZE),
      });
    };
    setSocket(webSocket);
    return () => {
      webSocket.close();
    };
  }, []);

  React.useEffect(() => {
    if (
      graphValues.rr.length > 0 &&
      graphValues.tidal.length > 0 &&
      graphValues.o2.length > 0 &&
      graphValues.peep.length > 0
    ) {
      setGraphValues({
        rr: [...graphValues.rr, ...auxGraphValues.rr].slice(-MAX_ARRAY_SIZE),
        tidal: [...graphValues.tidal, ...auxGraphValues.tidal].slice(-MAX_ARRAY_SIZE),
        o2: [...graphValues.o2, ...auxGraphValues.o2].slice(-MAX_ARRAY_SIZE),
        peep: [...graphValues.peep, ...auxGraphValues.peep].slice(-MAX_ARRAY_SIZE),
      });
    } else {
      setGraphValues({
        rr: auxGraphValues.rr,
        tidal: auxGraphValues.tidal,
        o2: auxGraphValues.o2,
        peep: auxGraphValues.peep,
      });
    }
  }, [auxGraphValues]);

  React.useEffect(() => {
    if (socket.readyState) {
      setReadyState(socket.readyState);
    }
  }, [socket.readyState]);
  return (
    <View style={styles.container}>
      <TopNav
        toggleDrawer={() => {
          navigation.toggleDrawer();
        }}
        title="Ventilador N98"
        connected={0 < readyState && readyState < 3}
      />
      <View style={summaryStyles.container}>
        {parametersArray.map(param => (
          <View key={param.key}>
            <Text style={StyleSheet.flatten([summaryStyles.title, param.color])}>{param.title}</Text>
            <Text style={summaryStyles.data}>
              {graphValues[param.key].length > 0 && graphValues[param.key][graphValues[param.key].length - 1].y}
            </Text>
          </View>
        ))}
      </View>
      <ScrollView style={scrollerStyles.container} contentContainerStyle={scrollerStyles.contentContainer}>
        {parametersArray.map(param => (
          <VictoryChart key={param.key} height={GRAPH_HEIGHT}>
            {graphValues[param.key].length > 1 && (
              <VictoryArea style={{ data: { fill: param.color.color } }} data={graphValues[param.key]} />
            )}
            <VictoryAxis dependentAxis />
          </VictoryChart>
        ))}
      </ScrollView>
    </View>
  );
}
