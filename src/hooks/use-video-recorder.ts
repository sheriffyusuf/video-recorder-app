import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useRef, useState } from 'react';

export default function useVideoRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string>('');
  const cameraRef = useRef<CameraView | null>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();

  const requestPermission = () => {
    requestCameraPermission();
    requestMicrophonePermission();
  };

  const startRecording = async (): Promise<string | undefined> => {
    if (cameraRef.current) {
      setIsRecording(true);
      try {
        const video = await cameraRef.current.recordAsync();
        if (video?.uri) {
          setVideoUri(video.uri);
          setIsRecording(false);
          return video.uri;
        }
      } catch (error) {
        setIsRecording(false);
        console.error('Error recording video:', error);
      }
    }
  };

  const stopRecording = async (): Promise<void> => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };
  return {
    hasPermission: cameraPermission?.granted && microphonePermission?.granted,
    isRecording,
    videoUri,
    cameraRef,
    requestPermission,
    startRecording,
    stopRecording,
  };
}
