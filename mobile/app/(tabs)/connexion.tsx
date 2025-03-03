import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomCheckbox from "../../components/reusable/CustomCheckbox";
import request from "@/constants/Request";
import { useRouter } from "expo-router";
import { Vibration } from "react-native";
import { useTheme } from "@/components/ThemeContext";

export default function ConnectionPage() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayConnected, setStayConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    setError(null);
    const requestBody = {
      email: email,
      password: password,
    };
    const regexpassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial
    const regexemail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // adresse email valide genre email@test.com

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

      if (registrationResponse.error) {
        setError(registrationResponse.error);
        return;
      }

      setEmail("");
      setPassword("");
      router.replace("/home");
    } catch (error) {
      setError(
        "Erreur de requête: Erreur de connexion internet. Veuillez réessayer plus tard.",
      );
    }
  }, [email, password]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Bienvenue !</Text>
      <Text
        style={[styles.welcometxt, { color: theme.text }]}
        allowFontScaling={true}
      >
        Veuillez vous connecter.
      </Text>
      <View style={styles.inputContainer}>
        <Icon
          name="user"
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
          autoCapitalize="none"
          accessibilityLabel="Champ de texte pour saisir son email"
          allowFontScaling={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon
          name="lock"
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
          placeholder="Mot de passe"
          placeholderTextColor={theme.text}
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Champ de texte pour saisir son mot de passe"
          allowFontScaling={true}
          // secureTextEntry //pr cacher le mot de passe
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CustomCheckbox
          value={stayConnected}
          onValueChange={setStayConnected}
        />
        <Text style={[styles.checkboxLabel, { color: theme.text }]}>
          Se souvenir de moi
        </Text>
      </View>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: theme.primary }]}
          onPress={() => {
            Vibration.vibrate(100);
            handleLogin();
          }}
          accessibilityLabel="Boutton pour se connecter à l'application"
          accessibilityRole="button"
          accessible={true}
        >
          <Text style={[styles.loginButtonText, { color: theme.buttonText }]}>
            Connexion
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.push("/forgottenPassword")}>
        <Text style={{ color: theme.text }} allowFontScaling={true}>
          Mot de passe oublié ?
        </Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={{ color: theme.text }} allowFontScaling={true}>
            Création d'un compte
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
  },
  welcometxt: {
    fontSize: 15,
    marginBottom: 80,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  loginButtonContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center",
  },
  loginButton: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
