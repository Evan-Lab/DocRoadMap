import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';

const EmailConfirmation = () => {
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleConfirm = () => {
    console.log('Confirmation Code:', confirmationCode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Confirmation</Text>
      <Text style={styles.instruction}>
        Please enter the confirmation code sent to your email.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter confirmation code"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
        keyboardType="number-pad"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.customButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const COLORS = {
    primary: '#C49D83',
    secondary: '#BDA18A',
    tertiary: '#E8D5CC',
    grey: '#D3D3D3',
    light: '#F5EFE6',
    white: '#FFF',
    black: '#000000',
    orange: '#ffa500',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f2f2f2",
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.grey,
  },
  customButton: {
    backgroundColor: COLORS.grey,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },
});

export default EmailConfirmation;
