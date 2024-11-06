import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CustomCheckbox from '../../components/CustomCheckbox';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ConnectionPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [stayConnected, setStayConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const regexusername = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!regexusername.test(username)) {
      alert("Le nom d'utilisateur doit être une adresse email valide.");
      return;
    }

    const userData = {
      email: username,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:3000/users/login', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('Login successful:', response.data);
        alert('Logged In!');
      }
    }  catch (error: any) {
        if (error.response) {
          if (error.response.status === 400) {
            console.warn('Login failed: Bad Request');
            alert('Bad Request. Please check the data and try again.');
          } else if (error.response.status === 404) {
            console.warn('Login failed: Invalid Credentials');
            alert('Invalid Credentials. Please check your email and password.');
          } else {
            console.warn('Unexpected error:', error.response.status);
            alert('Unexpected error.');
          }
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('Network error. Please try again later.');
        } else {
          console.error('Error setting up request:', error.message);
          alert('Error setting up the request. Please try again.');
        }
      }
      
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue !</Text>
      <Text style={styles.welcometxt}>Veuillez vous connecter.</Text>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="grey" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#D3D3D3"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="grey" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#D3D3D3"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CustomCheckbox value={stayConnected} onValueChange={setStayConnected} />
        <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
      </View>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 10,
  },
  welcometxt: {
    fontSize: 15,
    color: '#333333',
    marginBottom: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#333333',
  },
  loginButtonContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
