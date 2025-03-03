import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Vibration,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/components/ThemeContext";
import request from "@/constants/Request";

export default function Register() {
  const { theme } = useTheme();
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleBackClick = () => {
    router.replace("/connexion");
  };

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

    try {
      const registrationResponse = await request.register(requestBody);

      if (registrationResponse.error) {
        setError(registrationResponse.error);
        return;
      }

      setEmail("");
      setPassword("");
      setFirstname("");
      setLastname("");
    } catch (error) {
      setError("Erreur, veuillez vérifier vos informations");
    }
  }, [firstname, lastname, email, password]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -220 : 20}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="person"
            size={24}
            color={theme.text}
            style={{ paddingRight: 10 }}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                borderColor: theme.text,
                color: theme.text,
              },
            ]}
            placeholder="Prénom"
            placeholderTextColor={theme.text}
            value={firstname}
            onChangeText={setFirstname}
            accessibilityLabel="Champ de texte pour son prénom"
            allowFontScaling={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="person"
            size={24}
            color={theme.text}
            style={{ paddingRight: 10 }}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                borderColor: theme.text,
                color: theme.text,
              },
            ]}
            placeholder="Nom de famille"
            placeholderTextColor={theme.text}
            value={lastname}
            onChangeText={setLastname}
            accessibilityLabel="Champ de texte pour son nom de famille"
            allowFontScaling={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="mail"
            size={24}
            color={theme.text}
            style={{ paddingRight: 10 }}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                borderColor: theme.text,
                color: theme.text,
              },
            ]}
            placeholder="Email"
            placeholderTextColor={theme.text}
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="Champ de texte pour son addresse email"
            allowFontScaling={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed"
            size={24}
            color={theme.text}
            style={{ paddingRight: 10 }}
          />
          <TextInput
            style={[
              styles.input,
              {
                paddingRight: 40,
                backgroundColor: theme.background,
                borderColor: theme.text,
                color: theme.text,
              },
            ]}
            placeholder="Mot de passe"
            placeholderTextColor={theme.text}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            accessibilityLabel="Champ de texte pour son mot de passe"
            allowFontScaling={true}
          />
        </View>
        <View>
          <TouchableOpacity
            style={[styles.customButton, { backgroundColor: theme.primary }]}
            onPress={() => {
              Vibration.vibrate(100);
              handleSignUp();
            }}
            accessibilityLabel="Boutton pour créer un nouveau compte"
            accessibilityRole="button"
            accessible={true}
          >
            <Text
              style={[styles.buttonText, { color: theme.buttonText }]}
              allowFontScaling={true}
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={handleBackClick}
            style={[styles.customButton, { backgroundColor: theme.primary }]}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              Retour à l'écran d'accueil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "85%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    position: "relative",
  },
  customButton: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
  },
});
