import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useTheme } from "@/components/ThemeContext";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        onPress={toggleTheme}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.buttonText}>{t("change_theme")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.buttonText}>{t("switch_language")}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.container}>
          <View
            style={[styles.container, { backgroundColor: theme.background }]}
          >
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={handleLanguageChange}
              style={{ width: 200 }}
            >
              <Picker.Item label={t("fr")} value="fr" />
              <Picker.Item label={t("es")} value="es" />
              <Picker.Item label={t("en")} value="en" />
            </Picker>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[
                styles.button,
                { backgroundColor: theme.primary, marginTop: 10 },
              ]}
            >
              <Text style={styles.buttonText}>{t("close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={() => router.replace("/profile")}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.buttonText}>{t("back_to_profile")}</Text>
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
  button: {
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    minWidth: 180,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Settings;
