import React, { Component } from 'react';
import { View, Image, Text, Spinner } from 'react-native';
import Question from '../common/Question';
import UserInput from '../common/UserInput';
import GeneralButton from '../buttons/GeneralButton';

class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                'What is your name?',
                'What company do you work for?',
                'What is your occupation?',
                'What is your email address?',
                'What is your phone number?',
                'Would you like to fill in any additional questions?',
                'What address would you like on your business card?',
                'Would you like to add a company logo?',
                'Would you like to add a link to your website?',
                'Please select a template',
                'Please set a password for your account!'
            ],
            labels: [
                'name',
                'companyName',
                'occupation',
                'email',
                'phoneNumber',
                'optionalQuestion',
                'address',
                'companyLogo',
                'website',
                'selectedTemplate',
                'password'
            ],
            currentQuestion: 'What is your name?',
            currentLabel: 'name',
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
            optionalQuestions: false,
            error: '',
            loading: false
        };
    }

    onButtonPress() {
        var label = this.state.currentLabel;
        var value = this.state.answer; 

        this.setUserInformation(label, value); // calls setState
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
        } else if (this.state.optionalQuestions) {
            if (!this.state.phoneNumber) {
                value = 5;
            } else if (!this.state.companyLogo) {
                value = 6;
            } else if (!this.state.website) {
                value = 7;
            }
        } else {
            if (!this.state.selectedTemplate) {
                value = 8;
            } else if (!this.state.password) {
                value = 9;
            } else {
                console.log("All details have been filled in!");
                value = -1;
            }
        }

        return value;
    }

    setUserInformation(label, value) {        
        switch(label) {
            case 'name':
                this.setState({ name: value }, this.setNewQuestion());
                break;
            case 'companyName':
                this.setState({ companyName: value }, this.setNewQuestion());
                break;
            case 'occupation':
                this.setState({ occupation: value }, this.setNewQuestion());
                break;
            case 'email':
                this.setState({ email: value }, this.setNewQuestion());
                break;
            case 'phoneNumber':
                this.setState({ phoneNumber: value }, this.setNewQuestion());
                break;
            case 'optionalQuestion':
                this.setState({ optionalQuestions: true }, this.setNewQuestion()); // To-Do, just true for now
                break;
            case 'address':
                this.setState({ address: value }, this.setNewQuestion());
                break;
            case 'companyLogo':
                this.setState({ companyLogo: value }, this.setNewQuestion());
                break;
            case 'website':
                this.setState({ website: value, optionalQuestions: false }, this.setNewQuestion());
                break;
            case 'selectedTemplate':
                this.setState({ selectedTemplate: value }, this.setNewQuestion());
                break;
            case 'password':
                this.setState({ password: value, loading: true }, this.setNewQuestion());
                break;
            default:
                console.log('I\'m the best');
        }
        
        //var completeState = Object.assign(newState, assignedValue);;
    }

    setNewQuestion() {
        var currentState = this.checkQuestionValue() + 1; // To-do logic? 
        var newQuestion = this.state.questions[currentState];
        var newLabel = this.state.labels[currentState];
        
        this.setState({
            currentQuestion: newQuestion,
            currentLabel: newLabel,
            answer: ''
        });

        console.log("SetNewQuestionEnd: ", this.state);
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <GeneralButton onPress={this.onButtonPress.bind(this)}>
                Next
            </GeneralButton>
        )
    }
    
    render() {
        return (
            <View style={styles.questionContainer}>
                <Question
                    question={this.state.currentQuestion}
                />
                <UserInput
                    placeHolder={this.state.currentLabel}
                    label={this.state.currentLabel}
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
        fontSize: 12,
        alignSelf: 'center',
        color: 'red'
    },
    questionContainer: {
        backgroundColor: '#091113',
        flex: 1,
        padding: 20
    }
};

export default WelcomeScreen;
