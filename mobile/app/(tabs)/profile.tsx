import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import UserContext from "@/constants/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import request from "@/constants/Request";
import { Vibration } from "react-native";
import { useTheme, themes } from "@/components/ThemeContext";
import { useTranslation } from "react-i18next";

const ProfileCard = () => {
  const { t } = useTranslation();
  const MAX_DESCRIPTION_LENGTH = 150;
  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState(t("profile.description"));
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const userCtx = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleEditClick = () => setIsEditMode(true);
  const handleSaveClick = () => setIsEditMode(false);
  const handleDescriptionChange = (text: string) => {
    if (text.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(text);
    }
  };

  const handleSettingsClick = () => {
    router.push("/settings");
  };

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem("user", () => {
      userCtx.setUser(null);
      router.replace("/connexion");
    });
  }, [userCtx.user]);

  const updateProfile = useCallback(async () => {
    setError(null);

    try {
      const registrationResponse = await request.infoProfile();
      console.log("Registration Response:", registrationResponse);

      if (registrationResponse.error) {
        setError(registrationResponse.error);
        return;
      }
      const userProfile = registrationResponse.data;
      setEmail(userProfile.email);
      setFirstname(userProfile.firstName);
      setLastname(userProfile.lastName);
    } catch (error) {
      setError("Erreur, veuillez vérifier vos informations");
    }
  }, [firstname, lastname, email]);

  useEffect(() => {
    updateProfile();
  }, [error]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: "https://www.w3schools.com/howto/img_avatar.png" }}
        />
      </View>
      <Card.Content
        style={[styles.cardContent, { backgroundColor: theme.background }]}
      >
        <Text
          style={[styles.nameText, { color: theme.text }]}
          allowFontScaling={true}
        >
          {firstname} {lastname}
        </Text>
        <Text
          style={[styles.infoText, { color: theme.text }]}
          allowFontScaling={true}
        >
          <FontAwesome name="envelope" size={16} /> {email}
        </Text>
      </Card.Content>
      <Card.Content
        style={[styles.cardContent, { backgroundColor: theme.background }]}
      >
        {isEditMode ? (
          <View style={styles.editDescriptionContainer}>
            <TextInput
              style={[
                styles.editDescriptionInput,
                { color: theme.text, borderColor: theme.text },
              ]}
              value={description}
              onChangeText={handleDescriptionChange}
              multiline
              maxLength={MAX_DESCRIPTION_LENGTH}
              mode="outlined"
              allowFontScaling={true}
            />
            <Button
              onPress={() => {
                handleSaveClick();
                Vibration.vibrate(100);
              }}
              mode="contained"
              buttonColor={theme.primary}
              style={styles.saveButton}
              accessibilityLabel={t("profile.saveDescription")}
              accessibilityRole="button"
            >
              {t("profile.saveDescription")}
            </Button>
          </View>
        ) : (
          <View style={styles.descriptionContainer}>
            <Text
              style={[styles.descriptionText, { color: theme.text }]}
              allowFontScaling={true}
            >
              {description}
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleEditClick();
                Vibration.vibrate(100);
              }}
              accessibilityLabel={t("profile.editDescription")}
              accessibilityRole="button"
            >
              <Ionicons name="create-outline" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        )}
      </Card.Content>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={handleSettingsClick}>
          <MaterialIcons name="settings" size={28} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="exit-outline" size={28} color={theme.text} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  cardContent: {
    alignItems: "center",
    marginBottom: 15,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "black",
  },
  nameText: {
    fontSize: 20,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
  },
  editDescriptionContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
  },
  editDescriptionInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    maxHeight: 100,
    width: "100%",
  },
  saveButton: {
    marginTop: 10,
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default ProfileCard;
