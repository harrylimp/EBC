import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import Draggable from '../card/Draggable';
import CircularButton from '../buttons/CircularButton';

export default class CardCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      open: false,
    }
  };

  addDraggable = (type) => {
    const cards = this.state.cards;

    cards.push({
      id: this.state.cards.length,
      xCoordinate: 0,
      yCoordinate: 0,
      type: type,
    });
    this.setState({ cards: cards })
  }

  handleToggleMenu = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    const { cards } = this.state;

    const Menu = (
      <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>
      <List containerStyle={{marginBottom: 20}}>
        <ListItem title={'sames'}/>
      </List>
    </View>
    )

    console.log('what is cards?', cards)
    return(
      <SideMenu
          open={this.state.open}
          menu={Menu}
      >
        <View style={styles.container}>
          {
            cards.map(card => 
            <Draggable
              key={card.id}
              x={card.xCoordinate}
              y={card.yCoordinate}
            >
              <Text>
              {card.type}
              </Text>
            </Draggable>)
          }
          <Text>
            Same
          </Text>
          <View style={ styles.footer } >
            <Button
              title={ 'Name' }
              buttonStyle={ styles.button }
              onPress={ () => this.addDraggable('name') }
            />
            <Button
              title={ "Email" }
              buttonStyle={ styles.button }
              onPress={ () => this.addDraggable('email') }
            />
            <Button
              title={ "Company" }
              buttonStyle={ styles.button }
              onPress={ () => this.addDraggable('company') }
            />
            <Button
              title={ "Options" }
              onPress={ this.handleToggleMenu }
            />
          </View>
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    flex: 1,
  },
  button: {
    backgroundColor: 'brown',
  },
});
