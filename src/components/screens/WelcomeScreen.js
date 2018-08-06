import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import Question from '../common/Question';
import UserInput from '../common/UserInput';
import GeneralButton from '../buttons/GeneralButton';

class WelcomeScreen extends Component {
    state = {
        currentQuestion: '',
        questions: '',
        name: '',
        companyName: '',
        occupation: '',
        email: '',
        phoneNumber: '',
        address: '',
        companyLogo: '',
        website: '',
        selectedTemplate: '',
        password: '',
        error: '',
        labels: '',
        loading: false
    }

    componentWillMount() {
        this.setState({
            questions: [
                'What is your name?',
                'What company do you work for?',
                'What is your occupation?',
                'What is your email address?',
                'What is your phone number?',
                'What address would you like on your business card?',
                'Would you like to add a company logo?',
                'Would you like to add a link to your website?',
                'Please set a password for your account!'
            ],
            labels: [
                'name',
                'companyName',
                'occupation',
                'email',
                'phoneNumber',
                'address',
                'companyLogo',
                'website',
                'selectedTemplate',
                'password'
            ],
            currentQuestion: 'What is your name?',
            currentLabel: 'name'
        });
    }

    onButtonPress() {
        console.log(this.state.answer);

        var currentState = this.checkQuestionValue();
        var question = this.state.questions[currentState];
        var label = this.state.labels[currentState];

        this.setState({
            currentQuestion: question,
            currentLabel: label
        })
    }

    checkQuestionValue() {
        var value = 0;

        if (!this.state.name) {
            value = 0;
        } else if (!this.state.companyName) {
            value = 1;
        } else if (!this.state.occupation) {
            value = 2;
        } else if (!this.state.email) {
            value = 3;
        } else if (!this.state.phoneNumber) {
            value = 4;
        } else {
            if (this.state.optionalQuestions) {
                if (!this.state.phoneNumber) {
                    value = 5;
                } else if (!this.state.companyLogo) {
                    value = 6;
                } else if (!this.state.website) {
                    value = 7;
                }
            } else {
                if (!this.state.password) {
                    value = 8;
                }
            }
        }

        return value;
    }

    renderButton() {
        if (this.state.loading) {
            //return <Spinner size="small" />;
        }

        return (
            <GeneralButton onPress={this.onButtonPress.bind(this)}>
                Next
            </GeneralButton>
        )
    }
    
    render() {
        return (
            <View>
                <Question
                    question={this.state.currentQuestion}
                />
                <UserInput
                    placeHolder='user@gmail.com'
                    label={this.state.label}
                    value={this.state.answer}
                    onChangeText={answer => this.setState({ answer })}
                />
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                {this.renderButton()}
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
