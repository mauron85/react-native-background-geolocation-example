import React, {PropTypes, Component} from 'react';
import {Navigator} from 'react-native';
import MainScene from '../common/scenes/MainScene';
import MenuScene from '../common/scenes/MenuScene';
import LogsScene from '../common/scenes/LogsScene';
import LocationHistoryScene from '../common/scenes/LocationHistoryScene';
import ConfigScene from '../ios/scenes/ConfigScene';

class App extends Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
    }

    renderScene(route, navigator) {
        switch (route.name) {
            case 'Logs':
                return <LogsScene onBack={navigator.pop}/>
            case 'LocationHistory':
                return <LocationHistoryScene onBack={navigator.pop}/>
            case 'Config':
                return <ConfigScene onBack={navigator.pop}/>
            case 'Menu':
                return <MenuScene onBack={navigator.replace} navigator={navigator}/>
            default:
                return <MainScene navigator={navigator}/>
        }
    }

    render() {
        return (
          <Navigator style={{
              flex: 1
          }} initialRoute={{
              name: 'Main'
          }} renderScene={this.renderScene} />
        );
    }
}

export default App;
