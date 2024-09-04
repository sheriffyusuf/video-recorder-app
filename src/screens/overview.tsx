import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import { Button } from '~/components/Button';
import { ScreenContent } from '~/components/ScreenContent';
import { RootStackParamList } from '~/navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Recorder')} title="Let's go" />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
});
