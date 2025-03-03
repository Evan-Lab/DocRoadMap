import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@/components/ThemeContext";
import { router } from "expo-router";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  const handleBackClick = () => {
    router.replace("/profile");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.buttonText}>Changer de thème</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleBackClick}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.buttonText}>Retour au profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default Settings;
