import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

circularButton: {
  backgroundColor: "transparent",
  borderRadius: 50,
  height: 60,
  width: 60,
  justifyContent: 'center',
  alignItems: 'center',
},

centerIcon: {
  marginRight: 0,
},

controlButtons: {
  flex: 0.08,
  margin: 15,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignSelf: 'stretch',
  bottom: 0,
},

iconButton:  {
  height: 60,
  width: 60,
  backgroundColor: 'transparent',
},

iconStyle: {
  marginRight: 0,
},

blackStyle: {
  color: 'black',
  marginRight: 0,
},

color: {
  backgroundColor: 'orange',
}

});
