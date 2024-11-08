import React, { useState, useEffect, useCallback, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '@/constants/Request';


export default function Register() {
    const [firstname, setFirstname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

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
            setError('There is an error, please check your information');
        }
    }, [firstname, lastname, email, password]);
    


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -220 : 20}>
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <Ionicons name="person" size={24} color={COLORS.white} style={{ paddingRight: 10 }} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="First Name" 
                        placeholderTextColor={COLORS.black} 
                        value={firstname} 
                        onChangeText={setFirstname} 
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name="person" size={24} color={COLORS.white} style={{ paddingRight: 10 }} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Last Name" 
                        placeholderTextColor={COLORS.black} 
                        value={lastname} 
                        onChangeText={setLastname} 
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name="mail" size={24} color={COLORS.white} style={{ paddingRight: 10 }} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Email" 
                        placeholderTextColor={COLORS.black} 
                        value={email} 
                        onChangeText={setEmail} 
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed" size={24} color="white" style={{ paddingRight: 10 }} />
                    <TextInput 
                        style={[styles.input, { paddingRight: 40 }]} 
                        placeholder="Password" 
                        placeholderTextColor={COLORS.black} 
                        value={password} 
                        onChangeText={setPassword} 
                        secureTextEntry={true} 
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.customButton} onPress={() => handleSignUp()}>
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
        width: '95%',
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
        backgroundColor: COLORS.grey,
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 40,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.black,
        fontSize: 18,
    },
});
