import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/components/ThemeContext";
import { useTranslation } from "react-i18next";
import request from "@/constants/Request";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type CardProcess = {
  name: string;
  description: string;
  stepsId: number;
  endedAt: string;
};

export default function CreateCardProcess() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [stepsId, setStepsId] = useState<number | null>(null);
  const [endedAt, setEndedAt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleCreateCardProcess = useCallback(async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert(t("validationError"), t("fillAllFields"));
      return;
    }
    setIsLoading(true);
    const cardProcessData = {
      name: name.trim(),
      description: description.trim(),
      userId: userId as number,
      stepsId: stepsId!,
      endedAt: endedAt.trim(),
      status: "PENDING",
    };

    try {
      const response = await request.create(cardProcessData);
      if (response.error) {
        setError(response.error);
      } else {
        setName("");
        setDescription("");
        setUserId(null);
        setStepsId(null);
        setEndedAt("");
        Alert.alert(t("success"), t("processCreated"));
      }
    } catch (error) {
      setError(t("creationFailed"));
    } finally {
      setIsLoading(false);
    }
  }, [name, description, stepsId, endedAt, userId, t]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -220 : 20}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <View style={[styles.inputContainer]}>
            <Ionicons
              name="document-text"
              size={24}
              color={theme.text}
              style={{ paddingRight: 10 }}
            />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.background, borderColor: theme.text },
              ]}
              placeholder={t("processNamePlaceholder")}
              placeholderTextColor={theme.text}
              value={name}
              onChangeText={setName}
              maxLength={50}
              allowFontScaling={true}
            />
          </View>

          <View style={[styles.inputContainer]}>
            <Ionicons
              name="clipboard"
              size={24}
              color={theme.text}
              style={{ paddingRight: 10 }}
            />
            <TextInput
              style={[
                styles.input,
                styles.descriptionInput,
                { backgroundColor: theme.background, borderColor: theme.text },
              ]}
              placeholder={t("processDescriptionPlaceholder")}
              placeholderTextColor={theme.text}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              maxLength={200}
              allowFontScaling={true}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.customButton,
              (!name.trim() || !description.trim()) && styles.buttonDisabled,
              { backgroundColor: theme.primary },
            ]}
            onPress={handleCreateCardProcess}
            disabled={isLoading || !name.trim() || !description.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.text} />
            ) : (
              <Text
                style={[styles.buttonText, { color: theme.buttonText }]}
                allowFontScaling={true}
                accessibilityLabel={t("createProcessButton")}
              >
                {t("createProcessButtonText")}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: hp(5),
  },
  input: {
    width: wp("85%"),
    padding: moderateScale(10),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(5),
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp("95%"),
    position: "relative",
  },
  customButton: {
    borderRadius: moderateScale(5),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(40),
    marginVertical: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: moderateScale(18),
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  descriptionInput: {
    minHeight: hp(8),
    textAlignVertical: "top",
  },
});
