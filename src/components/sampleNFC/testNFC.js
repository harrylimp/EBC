import React, { Component } from 'react';
import { View, Text, AsyncStorage, NativeModules } from 'react-native';
import NfcManager, {NdefParser} from 'react-native-nfc-manager';

const NativeNFCManager = NativeModules.NfcManager;

function strToBytes(str) {
    let result = [];
    for (let i = 0; i < str.length; i++) {
        result.push(str.charCodeAt(i));
    }
    return result;
}

function buildUrlPayload(valueToWrite) {
    const urlBytes = strToBytes(valueToWrite);
    // in this example, we always use `http://` 
    const headerBytes = [0xD1, 0x01, (urlBytes.length + 1), 0x55, 0x03]; 
    return [...headerBytes, ...urlBytes];
}

function buildTextPayload(valueToWrite) {
    const textBytes = strToBytes(valueToWrite);
    // in this example. we always use `en`
    const headerBytes = [0xD1, 0x01, (textBytes.length + 3), 0x54, 0x02, 0x65, 0x6e];
    return [...headerBytes, ...textBytes];
}

class testNFC extends Component {
    state = {
        NFCSupported: false,
        message: '',
        NFCMessage: '',
        tagMessage: '',
        testNFC: [],
    }

    componentDidMount() {
        console.log('IM GAY');
        AsyncStorage.getItem("cards").then((result) => {
            console.log('did you fucking work or nah?', result);
            const retrieve = result == null ? [] : JSON.parse(result);
            this.setState({testNFC: retrieve});
            console.log('before buildTextPayLoad');
            const ParseTEXT = buildTextPayload(result);
            console.log('testing parsing URI', ParseTEXT);
            const buildURL = buildUrlPayload(result);
            console.log('testing my UIRL palyodad', buildURL);
            console.log('what does the mum say?', buildURL == ParseTEXT);
            console.log('hey man did you find this guy ->', NativeNFCManager);
            console.log('function', NativeNFCManager.requestNdefWrite.toString());

            const Nftag = NativeNFCManager.requestNdefWrite(bytes)
            .then(() => console.log('write completed'))
            .catch(err => console.warn(err));

            console.log('what is Nftag', Nftag);

            console.log('can you parse my dad', NdefParser._utf8ArrayToStr(buildURL));
        }).catch((error) => {
            console.log('error');
        });

    }

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
