import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '../components/BackButton';
import Details from '../screens/details';
import Overview from '../screens/overview';

import RecorderScreen from '~/screens/recorder';
import VideoPlayer from '~/screens/video-player';

export type RootStackParamList = {
  Overview: undefined;
  Details: { name: string };
  Recorder: undefined;
  VideoPlayer: { videoUri: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Overview">
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
          })}
        />
        <Stack.Screen
          name="Recorder"
          component={RecorderScreen}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
          })}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayer}
          options={({ navigation }) => ({
            headerLeft: () => <BackButton onPress={navigation.goBack} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
