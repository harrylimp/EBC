import React from 'react';
import {Text} from 'react-native';

const Question = ({ question }) => {
    return (
        <Text style={styles.questionStyle}>
            {question}
        </Text>
    );
};

const styles = {
    questionStyle: {
        fontSize: 55,
        color: 'green'
    }
};

export default Question;