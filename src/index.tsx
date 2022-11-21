import * as React from 'react';
import {
  View,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
  Easing,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

export interface props {
  value?: number;
  disabled?: boolean;
  min: number;
  max: number;
  onChange: (value: number) => void;
  onComplete?: (value: number) => void;
  width: number;
  height: number;
  borderRadius?: number;
  maximumTrackTintColor?: string;
  minimumTrackTintColor?: string;
  showBallIndicator?: boolean;
  step?: number;
  ballIndicatorColor?: string;
  ballIndicatorWidth?: number;
  ballIndicatorHeight?: number;
  ballIndicatorPosition?: number;
  ballIndicatorTextColor?: string;
}

const Slider = ({
  width = 350,
  height = 30,
  borderRadius = 25,
  maximumTrackTintColor = '#c7c7c7',
  minimumTrackTintColor = '#ff0067',
  ballIndicatorWidth = 48,
  ballIndicatorHeight = 48,
  ballIndicatorPosition = 60,
  ballIndicatorTextColor = '#000000',
  showBallIndicator = true,
  ballIndicatorColor,
  min,
  max,
  step,
  onChange,
  disabled,
  onComplete,
  value,
}: props) => {
  var _moveStartValue = React.useRef(0);
  const _value = React.useRef(value || min);
  const translation = React.useRef(new Animated.Value(0)).current;
  const isActive = React.useRef(new Animated.Value(0)).current;
  const ballTranslation = React.useRef(new Animated.Value(0)).current;
  const [panResponder, setPanResponder] = React.useState<
    PanResponderInstance | undefined
  >(undefined);

  React.useEffect(() => {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderGrant: () => {
        _moveStartValue.current = _value.current;
        isActive.setValue(1);
      },
      onPanResponderMove: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        const value = fetchNewValueFromGesture(gestureState);
        _changeState(value);
        if (onChange) {
          onChange(value);
        }
      },
      onPanResponderRelease: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        if (disabled) {
          return;
        }
        isActive.setValue(0);
        const value = fetchNewValueFromGesture(gestureState);
        _changeState(value);
        if (onComplete) {
          onComplete(value);
        }
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        if (disabled) {
          return;
        }
        const value = fetchNewValueFromGesture(gestureState);
        _changeState(value);
        if (onComplete) {
          onComplete(value);
        }
      },
    });
    setPanResponder(panResponder);
    _changeState(value || 0);
    // eslint-disable-next-line
  }, []);

  const fetchNewValueFromGesture = (
    gestureState: PanResponderGestureState
  ): number => {
    const ratio = gestureState.dx / width;
    const diff = max - min;
    if (step) {
      return Math.max(
        min,
        Math.min(
          max,
          _moveStartValue.current + Math.round((ratio * diff) / step) * step
        )
      );
    }
    const value = Math.max(min, _moveStartValue.current + ratio * diff);
    return Math.floor(value * 100) / 100;
  };

  const getSliderHeight = (value: number): number => {
    return ((value - min) * width) / (max - min);
  };

  const _changeState = (value: number): void => {
    const sliderWidth = getSliderHeight(value);
    let ballPosition = sliderWidth;
    const ballWidth = ballIndicatorWidth;
    ballPosition = ballPosition - ballWidth / 2;
    Animated.parallel([
      Animated.timing(translation, {
        toValue: sliderWidth,
        easing: Easing.linear,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(ballTranslation, {
        toValue: ballPosition,
        easing: Easing.linear,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
    _value.current = value;
  };

  return (
    <View style={[{ height, width, borderRadius }]}>
      <View
        style={[
          styles.container,
          {
            height,
            width,
            borderRadius,
            backgroundColor: maximumTrackTintColor,
          },
        ]}
        {...panResponder?.panHandlers}
      >
        <Animated.View
          style={[
            styles.slider,
            {
              width: translation,
              height,
              backgroundColor: minimumTrackTintColor,
            },
          ]}
        />
      </View>
      {showBallIndicator && (
        <Animated.View
          style={[
            styles.ball,
            {
              height: ballIndicatorHeight,
              width: ballIndicatorWidth,
              borderRadius: ballIndicatorWidth / 2,
              bottom: ballIndicatorPosition,
              backgroundColor: ballIndicatorColor,
              transform: [
                {
                  translateX: ballTranslation,
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.ballText,
              {
                color: ballIndicatorTextColor,
              },
            ]}
          >
            {Math.round(_value.current * 100) / 100}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  ballText: {
    fontWeight: '900',
  },
  container: {
    overflow: 'hidden',
  },
  slider: {
    position: 'absolute',
    bottom: 0,
  },
});

export default Slider;
