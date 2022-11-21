import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import Slider from '@candlefinance/slider';

export default function App() {
  const [myValue, setMyValue] = React.useState<number>(50);
  return (
    <View style={styles.container}>
      <Slider
        value={myValue}
        disabled={false}
        min={1}
        max={99}
        onChange={(value) => {
          console.log('CHANGE', value);
          setMyValue(value);
        }}
        onComplete={(value) => {
          console.log('COMPLETE', value);
        }}
        width={300}
        height={54}
        step={1}
        maximumTrackTintColor="#c7c7c7"
        minimumTrackTintColor="#ff0067"
        ballIndicatorColor={'gray'}
        ballIndicatorTextColor={'white'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
