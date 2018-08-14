import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Question from '../common/Question';
import UserInput from '../common/UserInput';
import GeneralButton from '../buttons/GeneralButton';

export default class WelcomeScreen extends Component {
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
            message: ''
        };
    }

    componentWillUnmount() {
        this.storeUserInformation();
        console.log("Storing user info - I APPARENTLY SHOULDNT BE GETTING CALLED");
    }

    // Gets index value for the question for the specified label
    getQuestionIndex(label) {
        let index = -1;

        if (label === "name") {
            index = 0;
        } else if (label === "companyName") {
            index = 1;
        } else if (label === "occupation") {
            index = 2;
        } else if (label === "email") {
            index = 3;
        } else if (label === "phoneNumber") {
            index = 4;
        } else if (label === "optionalQuestion") {
            index = 5;
        } else if (label === "address") {
            index = 6; // Optional Question is index = 5
        } else if (label === "companyLogo") {
            index = 7;
        } else if (label === "website") {
            index = 8;
        } else if (label === "selectedTemplate") {
            index = 9;
        } else if (label === "password") {
            index = 10; // Selected Template is index = 9?
            // At this point, all user parameters have been set!!
        } 

        return index;
    }

    setUserInformation(label, value) {        
        switch(label) {
            case 'name':
                this.setState({ name: value });
                break;
            case 'companyName':
                this.setState({ companyName: value });
                break;
            case 'occupation':
                this.setState({ occupation: value });
                break;
            case 'email':
                this.setState({ email: value });
                break;
            case 'phoneNumber':
                this.setState({ phoneNumber: value, message: 'skip' });
                break;
            case 'optionalQuestion':
                this.setState({ optionalQuestions: true }); // To-Do, just true for now
                break;
            case 'address':
                this.setState({ address: value });
                break;
            case 'companyLogo':
                this.setState({ companyLogo: value });
                break;
            case 'website':
                this.setState({ website: value, optionalQuestions: false, message: '' });
                break;
            case 'selectedTemplate':
                this.setState({ selectedTemplate: value });
                break;
            case 'password':
                this.setState({ password: value });
                this.storeUserInformation(); // Had to set here as component doesn't seem to unmount??
                break;
            default:
                console.log('I\'m the best');
        }
        
        let questionIndex = this.getQuestionIndex(label) + 1;
        
        this.setNewQuestion(questionIndex);
    }

    setNewQuestion(index) {
        if (index === 11) {
            Actions.mainScreen();
        } else {        
            let newQuestion = this.state.questions[index];
            let newLabel = this.state.labels[index];
            
            this.setState({
                currentQuestion: newQuestion,
                currentLabel: newLabel,
                answer: ''
            });
        }
    }

    storeUserInformation = async() => {
        console.log("Calling storeUserInformation");
        try {
            console.log(this.state.address);
            await AsyncStorage.setItem("UserInformation", this.createUserInfoObject());
        } catch (error) {
            console.log("Error Saving Data");
        }
    }

    createUserInfoObject() {
        const userInfo = {
            name: this.state.name,
            companyName: this.state.companyName,
            occupation: this.state.occupation,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            companyLogo: this.state.companyLogo,
            website: this.state.website,
            selectedTemplate: this.state.selectedTemplate,
            password: this.state.password   
        }

        return JSON.stringify(userInfo);
    }

    onOptionalButtonPress() {
        let index = 6;

        this.setNewQuestion(index);
    }

    onSkipMessagePress() {
        let index = 9;
        
        this.setNewQuestion(index);
        this.setState({ message: '' });
    }

    onButtonPress() {
        let label = this.state.currentLabel;
        let value = this.state.answer; 

        this.setUserInformation(label, value); // calls setState
    }
 
    renderOptionalQuestionsButton() {
        if (this.state.currentLabel === "optionalQuestion") {
            return (
                <GeneralButton onPress={this.onOptionalButtonPress.bind(this)}>
                    Yes
                </GeneralButton>
            );
        }

        return null;
    }

    renderButton() {
        if (this.state.currentLabel === "optionalQuestion") {
            return null;
        }

        return (
            <GeneralButton onPress={this.onButtonPress.bind(this)}>
                Next
            </GeneralButton>
        );
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
                {this.renderOptionalQuestionsButton()}
                {this.renderButton()}
                <Text style={styles.messageTextStyle} onPress={() => this.onSkipMessagePress()}>
                    {this.state.message}
                </Text>
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
    },
    messageTextStyle: {
        color: 'grey',
        fontSize: 20,
        padding: 30,
        alignSelf: 'center',
        textDecorationLine: 'underline'
    }
};
