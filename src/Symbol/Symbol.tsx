import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import Images from '../assets';
import FastImage from 'react-native-fast-image';
import {Animated, View, StyleSheet} from 'react-native';

interface SymbolProps {
  symbol: string;
  width: number;
  height: number;
  key: number;
  index: number;
}

const getSymbol = (symbol: string) => {
  switch (symbol) {
    case 'A':
      return Images.apple;
    case 'C':
      return Images.cherries;
    case 'G':
      return Images.grape;
    case 'L':
      return Images.lemon;
    case 'M':
      return Images.mouse;
    case 'O':
      return Images.orange;
    case 'S':
      return Images.strawberry;
  }
};

export const Symbol = forwardRef((symbolProps: SymbolProps, ref) => {
  const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
  const symbolRef = useRef();

  const [active, setActive] = useState(true);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [imgPath, setImgPath] = useState(getSymbol(symbolProps.symbol));

  const symbolAnimation = [
    {
      scale: animatedValue.interpolate({
        inputRange: [0, 0.25, 0.5, 1],
        outputRange: [1, 1.25, 0.75, 1],
      }),
    },
    {
      rotate: animatedValue.interpolate({
        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        outputRange: [
          '0deg',
          '15deg',
          '0deg',
          '-15deg',
          '0deg',
          '15deg',
          '0deg',
          '-15deg',
          '0deg',
          '15deg',
          '0deg',
        ],
      }),
    },
  ];

  useImperativeHandle(ref, () => ({
    setActive(state: boolean) {
      setActive(state);
    },
    shake() {
      animatedValue.setValue(0);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }).start();
    },
  }));

  return (
    <View
      style={[
        styles.container,
        {
          width: symbolProps.width,
          height: symbolProps.height,
        },
      ]}
      ref={symbolRef}>
      <AnimatedFastImage
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: symbolProps.width * 0.7,
          height: symbolProps.height * 0.6,
          opacity: active ? 1 : 0.3,
          transform: symbolAnimation,
          alignSelf: 'center',
        }}
        source={imgPath}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
