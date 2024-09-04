import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CameraView } from 'expo-camera';
import { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

import useVideoRecorder from '~/hooks/use-video-recorder';

export default function RecorderScreen() {
  const { cameraRef, requestPermission, startRecording, isRecording, stopRecording, videoUri } =
    useVideoRecorder();
  const { navigate } = useNavigation();

  useEffect(() => {
    requestPermission();
  }, []);

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      const videoUri = await startRecording();
      if (videoUri) {
        //@ts-ignore
        navigate('VideoPlayer', { videoUri });
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} mode="video" style={styles.cameraView}>
        <View
          style={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={handleRecord}>
            <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 48, padding: 12 }}>
              <Ionicons
                name={isRecording ? 'stop' : 'videocam'}
                color={isRecording ? 'red' : 'white'}
                size={48}
              />
            </View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView: { height: Dimensions.get('window').height * 0.45 },
});
