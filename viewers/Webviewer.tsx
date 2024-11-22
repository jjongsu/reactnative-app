import {StyleSheet, Dimensions, View} from 'react-native';
import {WebView} from 'react-native-webview';
import React from 'react';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Webviewer: React.FC = () => {
  return (
    <View style={styles.container}>
      <WebView
        // source={{uri: 'https://food-diary-window.vercel.app/diary'}}
        source={{uri: 'http://localhost:5173/report'}}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
});

export default Webviewer;
