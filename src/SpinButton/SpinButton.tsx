import React, {useState, useRef} from 'react';
import {TouchableWithoutFeedback, View, Text} from 'react-native';

interface SpinButtonProps {
  inactive: boolean;
  onPress: () => void;
}

export const SpinButton = ({inactive, onPress}: SpinButtonProps) => {
  const [status, setStatus] = useState('active');

  const handlePressIn = () => {
    if (inactive) {
      return;
    }
    setStatus('pushed');
    onPress && onPress();
  };

  const handlePressOut = () => {
    if (inactive) {
      return;
    }
    setStatus('active');
  };

  let state = inactive ? 'inactive' : status;

  return (
    <TouchableWithoutFeedback
      onPressIn={() => handlePressIn()}
      onPressOut={() => handlePressOut()}>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: '#00CC00',
          marginTop: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
          borderWidth: 5,
          borderColor: '#6666FF',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Spin
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
