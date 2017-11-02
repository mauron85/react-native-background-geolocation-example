import { StackNavigator } from 'react-navigation';
import MainScene from './scenes/Main';
import MenuScene from './scenes/Menu';
import LogsScene from './scenes/Logs';
import PendingLocationsScene from './scenes/PendingLocations';
import ConfigScene from './scenes/Config';
import EditConfigScene from './scenes/EditConfig';

const RootNavigator = StackNavigator({
  Main: { screen: MainScene },
  Menu: { screen: MenuScene },
  Logs: { screen: LogsScene },
  PendingLocations: { screen: PendingLocationsScene },
  Config: { screen: ConfigScene },
  EditConfig: { screen: EditConfigScene }
});

export default RootNavigator;