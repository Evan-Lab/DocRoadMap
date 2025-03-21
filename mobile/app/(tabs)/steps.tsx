import React, { useState, useEffect, useCallback } from "react";
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
import { useTheme } from "@/components/ThemeContext";
import request from "@/constants/Request";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Step = {
  id: string;
  name: string;
  description: string;
};

export default function StepForProcess() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [processId, setProcessId] = useState<number | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const fetchSteps = useCallback(async () => {
    if (typeof processId !== "number") return;
    setIsLoading(true);
    try {
      const response = await request.stepperID(processId);
      if (response.error) {
        setError(response.error);
      } else {
        setSteps(response.data);
      }
    } catch (error) {
      setError(t("fetch_steps_error"));
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [processId, t]);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);

  const handleCreateStep = useCallback(async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert(t("validation_error_title"), t("validation_error_message"));
      return;
    }

    setIsLoading(true);
    const stepData = {
      name: name.trim(),
      description: description.trim(),
      processId: processId,
    };

    try {
      const response = await request.createStep(stepData);
      if (response.error) {
        setError(response.error);
      } else {
        setName("");
        setDescription("");
        setProcessId(0);
        fetchSteps();
        Alert.alert(t("success_title"), t("step_created_success"));
      }
    } catch (error) {
      setError(t("create_step_error"));
    } finally {
      setIsLoading(false);
    }
  }, [name, description, processId, fetchSteps, t]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -220 : 20}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="document-text"
              size={24}
              color={theme.text}
              style={{ paddingRight: 10 }}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.background,
                  color: theme.text,
                  borderColor: theme.text,
                },
              ]}
              placeholder={t("step_name_placeholder")}
              placeholderTextColor={theme.text}
              value={name}
              onChangeText={setName}
              maxLength={50}
              allowFontScaling={true}
            />
          </View>
          <View style={styles.inputContainer}>
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
                {
                  backgroundColor: theme.background,
                  color: theme.text,
                  borderColor: theme.text,
                },
              ]}
              placeholder={t("step_description_placeholder")}
              placeholderTextColor={theme.text}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
              maxLength={200}
              allowFontScaling={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="document-text"
              size={24}
              color={theme.text}
              style={{ paddingRight: 10 }}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.background,
                  color: theme.text,
                  borderColor: theme.text,
                },
              ]}
              placeholder={t("process_id_placeholder")}
              placeholderTextColor={theme.text}
              value={processId !== null ? processId.toString() : ""}
              onChangeText={(text) => {
                const value = parseInt(text, 10);
                if (!isNaN(value)) {
                  setProcessId(value);
                }
              }}
              maxLength={3}
              allowFontScaling={true}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.customButton,
              (!name.trim() ||
                !description.trim() ||
                processId === null ||
                processId === 0) &&
                styles.buttonDisabled,
              { backgroundColor: theme.primary },
            ]}
            onPress={handleCreateStep}
            disabled={isLoading || !name.trim() || !description.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.text} />
            ) : (
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.buttonText, borderColor: theme.text },
                ]}
                accessibilityLabel={t("create_step_button_accessibility")}
                allowFontScaling={true}
              >
                {t("add_step_button")}
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
    paddingTop: hp("2%"),
  },
  input: {
    width: wp("85%"),
    padding: moderateScale(10),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(5),
    borderWidth: 1,
    color: "#000",
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
    minHeight: hp("10%"),
    textAlignVertical: "top",
  },
  stepItem: {
    backgroundColor: "#fff",
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(8),
  },
  stepName: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#000",
    marginLeft: moderateScale(12),
  },
  stepDescription: {
    fontSize: moderateScale(16),
    color: "#999",
    marginLeft: moderateScale(36),
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: moderateScale(32),
  },
  emptyText: {
    marginTop: moderateScale(12),
    fontSize: moderateScale(16),
    color: "grey",
  },
});
