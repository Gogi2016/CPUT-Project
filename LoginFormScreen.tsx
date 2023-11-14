import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';


type LoginFormScreenProps = {
  navigation: StackNavigationProp<{}>;
};

const LoginFormScreen: React.FC<LoginFormScreenProps> = ({ navigation }) => {
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);

  const handleLoginPress = () => {
    // Implement your login logic here
    // This is where you would validate the student number and password
    // and navigate to the appropriate screen upon successful login
    // For demonstration purposes, we'll just show an alert

    // After successful login, navigate to the CreateLogBookScreen
    navigation.navigate('CreateLogBook' as keyof {});
  };

  const handleForgotPasswordPress = () => {
    // Navigate to the ForgotPasswordScreen when the user clicks "Forgot Password?"
    navigation.navigate('ForgotPassword' as keyof {});
  };

  const handleStudentNumberChange = (text: string) => {
    // Filter out non-numeric characters using a regular expression
    const numericText = text.replace(/[^0-9]/g, '');
    setStudentNumber(numericText);
    validateInputs(numericText, password);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validateInputs(studentNumber, text);
  };

  const validateInputs = (studentNumber: string, password: string) => {
    // Enable the "Login" button only if both fields are filled
    setIsLoginDisabled(!studentNumber || !password);
  };

  return (
    <View style={styles.container}>
      <Text>Student Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Student Number"
        value={studentNumber}
        onChangeText={handleStudentNumberChange}
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />

      <Button title="Login" onPress={handleLoginPress} disabled={isLoginDisabled} />

      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  forgotPasswordText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginFormScreen;

