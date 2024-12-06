import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSend = () => {
    console.log('Email:', email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View>
          <TouchableOpacity onPress={() => router.push('/connexion')}>
              <Text >Go back</Text>
          </TouchableOpacity>
        </View>
       <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.customButton} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:"#f2f2f2"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.black,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: COLORS.white,
    backgroundColor: COLORS.grey,
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

export default ForgotPassword;
