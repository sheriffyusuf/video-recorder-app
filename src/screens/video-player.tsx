import { useRoute } from '@react-navigation/native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { useRef, useState } from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';

export default function VideoPlayer() {
  const { params } = useRoute();
  //@ts-ignore
  const videoUri = params?.videoUri;
  //console.log('params ', params?.videoUri);
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>();
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoUri ?? 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status?.isLoaded && status?.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status?.isLoaded && status.isPlaying
              ? video.current?.pauseAsync()
              : video.current?.playAsync()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  video: {
    maxWidth: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
  },
  buttons: {},
});
