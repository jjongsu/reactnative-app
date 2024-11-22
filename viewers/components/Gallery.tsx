import {Button, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import ExifReader from '../../node_modules/exifreader/src/exif-reader.js';
import {decode} from 'base64-arraybuffer';
import React from 'react';

export default function Gallery({webviewRef}: {webviewRef?: any}) {
  console.log(webviewRef);
  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: true,
        selectionLimit: 10,
        includeExtra: true,
        presentationStyle: 'fullScreen',
      },
      async res => {
        console.log(res); // 갤러리에서 가져온 사진의 결과 데이터
        res.assets?.forEach(async asset => {
          console.log('for문', asset.uri);
          try {
            const b64Buffer = await RNFS.readFile(asset.uri ?? '', 'base64');
            const fileBuffer = decode(b64Buffer);
            const tags = await ExifReader.load(fileBuffer, {
              expanded: true,
              includeUnknown: true,
              async: true,
            });
            console.log(tags, tags.gps);
          } catch (error) {
            console.error('EXIF 데이터 처리 중 오류:', error.message);
          }
        });
        // 파일 읽기
      },
    );
  };

  return (
    <View>
      <Button title="이미지 선택" onPress={onSelectImage} />
    </View>
  );
}
