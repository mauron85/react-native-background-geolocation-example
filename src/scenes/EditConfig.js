import React, { Component } from 'react';
import { InteractionManager, View, Text } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Footer,
  FooterTab,
  Button
} from 'native-base';

class EditConfigScene extends Component {
  static navigationOptions = {
    title: 'Edit'
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value, key) {
    const { state } = this.props.navigation;
    state.params.config[key] = value;
    this.props.navigation.goBack();
  }

  render() {
    const { state } = this.props.navigation;

    return (
      <Container>
        <Content>
          <Text>Edit value</Text>
          <Form>
            <Item fixedLabel>
              <Label>{state.params.key}</Label>
              <Input value={state.params.value} />
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button large onPress={this.onChange}>
              <Text>Apply</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default EditConfigScene;
