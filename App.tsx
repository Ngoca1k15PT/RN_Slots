import React, {useRef, useState, useImperativeHandle, useEffect} from 'react';
import {Constants} from './src/Constants';
import {ReelSet, SpinButton} from './src';
import Images from './src/assets';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';

const App = () => {
  const reel = useRef();
  const [showModal, setShowModal] = useState(false);
  const [points, setPoints] = useState(100000);
  const [wallet, setWallet] = useState(0);
  const [line, setLine] = useState(1);
  const [bet, setBet] = useState(50);
  return (
    <>
      <View style={styles.constainer}>
        <ImageBackground
          source={Images.background}
          resizeMode="stretch"
          style={styles.bgImage}>
          <View style={styles.content}>
            <ReelSet ref={reel} setShowModal={setShowModal} />
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: Constants.MAX_HEIGHT * 0.03,
          left: 0,
          right: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: Constants.MAX_HEIGHT * 0.06,
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: (Constants.MAX_WIDTH - 50) / 3,
              backgroundColor: '#222222',
              borderRadius: 20,
              borderWidth: 3,
              borderColor: '#FF99CC',
            }}>
            <Image
              source={Images.coin}
              style={{
                width: 25,
                height: 25,
                marginLeft: 10,
              }}
            />
            <Text
              style={{
                color: 'white',
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              {points}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: (Constants.MAX_WIDTH - 50) / 3,
              backgroundColor: '#222222',
              borderRadius: 20,
              borderWidth: 3,
              borderColor: '#FF99CC',
            }}>
            <Image
              source={Images.coin}
              style={{
                width: 25,
                height: 25,
                marginLeft: 5,
              }}
            />
            <Text
              style={{
                color: 'white',
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              {bet}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: (Constants.MAX_WIDTH - 50) / 3,
              backgroundColor: '#222222',
              borderRadius: 20,
              borderWidth: 3,
              borderColor: '#FF99CC',
            }}>
            <Image
              source={Images.coin}
              style={{
                width: 25,
                height: 25,
                marginLeft: 10,
              }}
            />
            <Text
              style={{
                color: 'white',
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              {wallet}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              if (bet == 0) {
                return;
              }
              setBet(bet - 50);
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 4,
              borderColor: '#FF66CC',
              marginHorizontal: 20,
            }}>
            <Image
              source={Images.minus}
              style={{
                width: 25,
                height: 25,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
          <SpinButton
            onPress={() => {
              reel.current.spin({
                points,
                setPoints,
                bet,
              });
            }}
            inactive={false}
          />
          <TouchableOpacity
            onPress={() => {
              if (bet >= points - 50) {
                return;
              }
              setBet(bet + 50);
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 4,
              borderColor: '#FF66CC',
              marginHorizontal: 20,
            }}>
            <Image
              source={Images.plus}
              style={{
                width: 25,
                height: 25,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal isVisible={showModal}>
        <View
          style={{
            backgroundColor: '#C6E2FF',
            paddingVertical: 20,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: '#FF3399',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              color: '#FF00CC',
              marginBottom: 30,
            }}>
            You won +{bet * (Math.floor(Math.random() * 5) + 1)} !
          </Text>

          <TouchableOpacity
            style={{
              height: 48,
              width: 80,
              backgroundColor: '#00CC00',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              alignSelf: 'center',
            }}
            onPress={() => {
              setPoints(points + bet * (Math.floor(Math.random() * 5) + 1));
              setWallet(bet * (Math.floor(Math.random() * 5) + 1));
              setShowModal(!showModal);
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
              }}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  content: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT * 0.47,
    marginTop: Constants.MAX_HEIGHT * 0.2,
  },
});
