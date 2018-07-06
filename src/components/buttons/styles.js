import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({

circularButton: {
  backgroundColor: "red",
  borderRadius: 50,
  height: 50,
  width: 50,
  justifyContent: 'center',
  alignItems: 'center',
},

centerIcon: {
  marginRight: 0,
},

controlButtons: {
  flex: 0.08,
  margin: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignSelf: 'stretch',
  bottom: 0,
}

});
