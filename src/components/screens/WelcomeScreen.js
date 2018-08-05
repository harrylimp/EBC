import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import Question from '../common/Question';
import UserInput from '../common/UserInput';

class WelcomeScreen extends Component {
    state = {
        question: 'this is the question',
        answer: 'this is the answer',
        password: 'real=password',
        error: 'error with ya know'
    }
          
    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
    }

    onLoginFail() {
        this.setState({
            error: 'Authentication Failed',
            loading: false
        });
    }

    onLoginSucess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Login
            </Button>
        )
    }
    
    render() {
        return (
            <View>
                <Question
                    question={this.state.question} 
                />
                <UserInput
                    placeHolder='user@gmail.com'
                    label='Email'
                    value={this.state.answer}
                    onChangeText={answer => this.setState({ answer })}
                />
                <UserInput
                    secureTextEntry
                    placeholder="password"
                    label="Passowrd"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <Text>
                    GG
                </Text> 
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>   
                <Image
                    style={styles.image} 
                    source={{uri: '../../images/UoA_GIF.gif'}}/>
            </View>
        )
    }
}

const styles = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    }
};

export default WelcomeScreen;
