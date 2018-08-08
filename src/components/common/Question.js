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
        fontSize: 30,
        textAlign: 'center',
        color: 'yellow'
    }
};

export default Question;