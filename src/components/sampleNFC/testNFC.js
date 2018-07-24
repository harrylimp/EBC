import React, { Component } from 'react';
import { View, Text } from 'react-native';
import NfcManager, {NdefParser} from 'react-native-nfc-manager';

class testNFC extends Component {
    state = {
        NFCSupported: false,
        message: '',
        NFCMessage: '',
        tagMessage: ''
    }

    componentDidMount() {}

    componentWillMount() {
        this.setState({ message: 'loading' });

        NfcManager.start({
                onSessionClosedIOS: () => {
                    console.log('ios session closed');
                }
            })
            .then(result => {
                console.log('start OK');
                console.log(result);
                this.setState({ message: 'started' });
            })
            .catch(error => {
                console.log('error was caught');
                this.setState({ message: 'failed' });
            })
        
        NfcManager.isSupported()
            .then(result => {
                console.log('It is supported!!');
                console.log(result);
                this.setState({ 
                    NFCSupported: result,
                    NFCMessage: 'supported'
                });
            })
            .catch(error => {
                console.log('Sorry! No NFC available on device');    
                this.setState({ message: error });
            })

        // This must be called before writing??
        NfcManager.registerTagEvent(tag => {
            console.log("Tag Discovered", tag);
            this.setState({ tagMessage: tag });
        }, 'Hold your device over the tag', true)

        // This is where you send the data through??
        // write ndef
        NfcManager.requestNdefWrite(bytes)
            .then(() => console.log('write completed'))
            .catch(err => console.warn(err))

        
    }

    componentWillUnmount() {
        NfcManager.closeTechnology();
        NfcManager.unregisterTagEvent();
    }

    render() {
        return (
            <View>
                <Text style={styles.textStyle}>{this.state.NFCSupported}</Text>
                <Text style={styles.nfcTextStyle}>{this.state.NFCMessage}</Text>
                <Text style={styles.nfcTextStyle}>{this.state.message}</Text>
                <Text style={styles.nfcTextStyle}>{this.state.tagMessage}</Text>
            </View>
        );
    }

    nfcSettingChanged() {
        NfcManager.onStateChanged(
            event => {
                console.log('State  changed');
                console.log(event.state);
            }
        )
    }
}

const styles = {
    textStyle: {
        fontSize: 20,
        color: '#dfd',
        backgroundColor: '#ae1f2f'
    },
    nfcTextStyle: {
        fontSize: 40,
        color: '#dfd',
        backgroundColor: '#eaf12f'
    }
}

export default testNFC;
