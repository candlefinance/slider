# Slider

A little (horizontal) animated slider component for React Native. Inspired by [rn-vertical-slider](https://github.com/sacmii/rn-vertical-slider).

<img center width="400px" src="https://user-images.githubusercontent.com/12258850/202975094-f3547c27-7b1c-42e8-8edc-6efc71766f21.gif" />

## Features
* Vanilla React Native
* Compatible with expo

## Caveats
* This implementation of the pan gesture animation runs on the JS thread.

## Installation

```sh
yarn add @candlefinance/slider
```

## Usage

Check out the [example](./example/) project for a demo project.

```jsx
import Slider from '@candlefinance/slider';

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
  ballIndicatorColor={'#4f4f4f'}
  ballIndicatorTextColor={'#ffffff'}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
