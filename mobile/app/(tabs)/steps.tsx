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

type Step = {
  id: string;
  name: string;
  description: string;
};

export default function StepForProcess() {
  const { theme } = useTheme();
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
      setError("Echec de la récupération des étapes. Ressayez plus tard !");
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [processId]);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);

  const handleCreateStep = useCallback(async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert(
        "Erreur de validation",
        "Veuillez remplir à la fois le nom et la description de l étape",
      );
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
        Alert.alert("Succès", "L étape a été crée");
        console.log(response);
      }
    } catch (error) {
      setError("Failed to create step. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [name, description, processId, fetchSteps]);

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
              placeholder="Nom de l'étape"
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
              placeholder="Description de l'étape"
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
              placeholder="Ton process id"
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
                accessibilityLabel="Boutton pour généer une nouvelle étape administrative"
                allowFontScaling={true}
              >
                Ajouter l'étape
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  input: {
    width: "85%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    color: "#000",
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
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  stepItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stepName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginLeft: 12,
  },
  stepDescription: {
    fontSize: 16,
    color: "#999",
    marginLeft: 36,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "grey",
  },
});
