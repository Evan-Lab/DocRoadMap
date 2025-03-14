import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { BackHandler } from "react-native";
import { useTheme } from "@/components/ThemeContext";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      alert(error);
    }

    const onBackPress = () => {
      router.replace("/connexion");
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [error, router]);

  const handleSend = () => {
    console.log("Email:", email);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        {t("forgotPassword")}
      </Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: theme.text, backgroundColor: theme.background },
        ]}
        placeholder={t("enterEmail")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor={theme.text}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.customButton, { backgroundColor: theme.primary }]}
          onPress={handleSend}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            {t("sendButton")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "#000000",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "transparent",
  },
  customButton: {
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
  },
});

export default ForgotPassword;
