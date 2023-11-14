import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RegistrationFormScreenProps = {
  navigation: StackNavigationProp<{}>;
};

const RegistrationFormScreen: React.FC<RegistrationFormScreenProps> = ({ navigation }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [studentNumberError, setStudentNumberError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleRegister = () => {
    setEmailError('');
    setPasswordError('');
    setStudentNumberError('');
    
    if (!studentNumber || !email || !password) {
      // Check if any field is empty
      Alert.alert('Error', 'Please fill in all fields.');
    } else if (!isValidEmail(email)) {
      // Check if email is valid
      setEmailError('Please enter a valid email address.');
    } else {
      // Implement your logic to create a supervisor account here
      // This is where you would make an API request or perform any necessary actions
      // After successfully creating the account, you can navigate to another screen
      // For example, you can navigate back to the Supervisor Home Screen
      navigation.navigate('LoginForm' as keyof {});
    }
  };

  const isValidEmail = (email: string) => {
    // Basic email validation regex (you can use a more robust one)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStudentNumber = (text: string) => {
    // Use a regular expression to allow only numbers
    const numericText = text.replace(/[^0-9]/g, '');
    setStudentNumber(numericText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Register Student</Text>

      <TextInput
        style={styles.input}
        placeholder="Student Number"
        onChangeText={validateStudentNumber} // Enforce only numbers
        value={studentNumber}
        keyboardType="numeric" // Open numeric keyboard
      />
      <Text style={styles.errorText}>{studentNumberError}</Text> {/* Display error message here */}

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address" // This will open the email keyboard
      />
      <Text style={styles.errorText}>{emailError}</Text> {/* Display error message here */}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Text style={styles.errorText}>{passwordError}</Text> {/* Display error message here */}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%', // Adjust padding for smaller screens
  },
  headerText: {
    fontSize: 24,
    marginBottom: '5%', // Adjust margin for smaller screens
  },
  input: {
    width: '90%', // Adjust input width
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: '3%', // Adjust margin for smaller screens
  },
  errorText: {
    color: 'red',
    marginBottom: '3%', // Adjust margin for smaller screens
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: '3%', // Adjust button height
    paddingHorizontal: '10%', // Adjust button width
    borderRadius: 5,
    marginVertical: '5%', // Adjust margin for smaller screens
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrationFormScreen