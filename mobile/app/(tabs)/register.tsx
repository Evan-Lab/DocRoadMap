import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '@/constants/Request';
import { useRouter } from 'expo-router';
import { BackHandler } from 'react-native';
import { Vibration } from 'react-native';


export default function Register() {
    const [firstname, setFirstname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (error) {
            alert(error);
        }
    
        const onBackPress = () => {
            router.replace('/connexion');
            return true;
        };
    
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        };
    }, [error, router]);
    

    const handleSignUp = useCallback(async () => {
        setError(null);
        const requestBody = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
        };
        console.log('Request Body:', requestBody);
    
        try {
            const registrationResponse = await request.register(requestBody);
            console.log('Registration Response:', registrationResponse);
    
            if (registrationResponse.error) {
                setError(registrationResponse.error);
                return;
            }
    
            setEmail("");
            setPassword("");
            setFirstname("");
            setLastname("");
    
        } catch (error) {
            setError('Erreur, veuillez vérifier vos informations');
        }
    }, [firstname, lastname, email, password]);
    


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -220 : 20}>
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <Ionicons name="person" size={24} color="grey" style={{ paddingRight: 10 }} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Prénom" 
                        placeholderTextColor={COLORS.black} 
                        value={firstname} 
                        onChangeText={setFirstname}
                        accessibilityLabel='Champ de texte pour son prénom' 
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name="person" size={24} color="grey" style={{ paddingRight: 10 }} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Nom de famille" 
                        placeholderTextColor={COLORS.black} 
                        value={lastname} 
                        onChangeText={setLastname} 
                        accessibilityLabel='Champ de texte pour son nom de famille' 
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name="mail" size={24} color="grey" style={{ paddingRight: 10 }} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Email" 
                        placeholderTextColor={COLORS.black} 
                        value={email} 
                        onChangeText={setEmail} 
                        accessibilityLabel='Champ de texte pour son addresse email' 
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed" size={24} color="grey" style={{ paddingRight: 10 }} />
                    <TextInput 
                        style={[styles.input, { paddingRight: 40 }]} 
                        placeholder="Mot de passe" 
                        placeholderTextColor={COLORS.black} 
                        value={password} 
                        onChangeText={setPassword} 
                        secureTextEntry={true} 
                        accessibilityLabel='Champ de texte pour son mot de passe' 
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.customButton} onPress={() => { Vibration.vibrate(100); handleSignUp()}}
                            accessibilityLabel="Boutton pour créer un nouveau compte"
                            accessibilityRole="button"
                            accessible={true}
                    >
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

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
    input: {
        width: '85%',
        padding: 10,
        marginVertical: 10,
        backgroundColor: COLORS.grey,
        borderRadius: 5,
        borderColor: COLORS.black,
        borderWidth: 1,
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        position: 'relative',
    },
    customButton: {
        backgroundColor: '#3498db',
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 40,
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.black,
        fontSize: 18,
    },
});
