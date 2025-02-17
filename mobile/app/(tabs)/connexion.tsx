import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomCheckbox from '../../components/reusable/CustomCheckbox';
import request from '@/constants/Request';
import { useRouter } from 'expo-router';
import { Vibration } from 'react-native';


export default function ConnectionPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayConnected, setStayConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    setError(null);
    const requestBody = {
        email: email,
        password: password,
    };
    const regexpassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;//au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial
    const regexemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//adresse email valide genre email@test.com
    
    /*if (!regexemail.test(email)) {
        alert("The username must be a valid email address.");
        return;
    }*/

    /* Uncomment and use this if you want password validation
    if (!regexPassword.test(password)) {
        alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
        return;
    }
    */

        try {
            const registrationResponse = await request.login(requestBody);
            console.log('Registration Response:', registrationResponse);
    
            if (registrationResponse.error) {
                setError(registrationResponse.error);
                return;
            }
    
            setEmail("");
            setPassword("");
            router.replace('/home');
        } catch (error) {
            setError('Erreur de requête: Erreur de connexion internet. Veuillez réessayer plus tard.');
        }
    }, [email, password]);


  return (
    <View style={styles.container}>
        <Text style={styles.title} accessibilityLabel="Bienvenue sur l'application DocRoadMap. 
            Il s'agit d'une appication pour aider et faciliter les démarches administratrives !" >Bienvenue ! </Text>
        <Text style={styles.welcometxt}>Veuillez vous connecter.</Text>
        <View style={styles.inputContainer}>
            <Icon
            name="user"
            size={20}
            color="grey"
            style={styles.icon}
            />
            <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#D3D3D3"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            accessibilityLabel='Champ de texte pour saisir son email' 
            />
        </View>
        <View style={styles.inputContainer}>
            <Icon 
            name="lock"
            size={20}
            color="grey"
            style={styles.icon}
            />
            <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#D3D3D3"
            value={password}
            onChangeText={setPassword}
            accessibilityLabel='Champ de texte pour saisir son mot de passe' 
            // secureTextEntry //pr cacher le mot de passe
            />
        </View>
        <View style={styles.checkboxContainer}>
            <CustomCheckbox value={stayConnected} onValueChange={setStayConnected} />
            <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
        </View>
       <View style={styles.loginButtonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={() => { Vibration.vibrate(100); handleLogin()}}
                            accessibilityLabel="Boutton pour se connecter à l'application"
                            accessibilityRole="button"
                            accessible={true}
            >
            <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push('/forgottenPassword')}>
            <Text>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <View>
            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text >Creation d'un compte</Text>
            </TouchableOpacity>
         </View>
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
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#3498db',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#3498db',
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