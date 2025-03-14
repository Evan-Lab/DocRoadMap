import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { useTheme } from "@/components/ThemeContext";
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";

export default function ChatInterface() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    [],
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.EXPO_PUBLIC_GPT_KEY;

  const handleFloatingButton = () => setModalVisible(true);
  const handleClose = () => setModalVisible(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessages = [...messages, { text: message, sender: "user" }];
    setMessages(newMessages);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
          }),
        },
      );

      const data = await response.json();
      const botMessage =
        data.choices[0]?.message?.content || t("error_occurred");

      setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
    } catch (error) {
      console.error(t("api_error"), error);
      setMessages([
        ...newMessages,
        { text: t("connection_error"), sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: theme.primary }]}
        onPress={handleFloatingButton}
      >
        <Image
          source={require("../../assets/images/chatbot.png")}
          style={{ width: 45, height: 45 }}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <SafeAreaView
          style={[styles.container, { backgroundColor: theme.background }]}
        >
          <View style={[styles.header, { borderBottomColor: theme.text }]}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              {t("chatbot_name")}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={[styles.closeText, { color: theme.text }]}>✖</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.chatContainer}>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  msg.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage,
                  {
                    backgroundColor:
                      msg.sender === "user" ? theme.primary : theme.primary,
                  },
                ]}
              >
                <Text style={[styles.messageText, { color: theme.text }]}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View
            style={[
              styles.inputContainer,
              { backgroundColor: theme.background },
            ]}
          >
            <TextInput
              style={[styles.input, { borderColor: theme.text }]}
              placeholder={t("ask_question")}
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={handleSend}
              placeholderTextColor={theme.text}
            />
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: theme.primary }]}
              onPress={handleSend}
              disabled={loading}
            >
              <Text style={[styles.sendButtonText, { color: theme.text }]}>
                {loading ? "..." : "→"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeText: {
    fontSize: 20,
  },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  userMessage: {
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  botMessage: {
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    fontSize: 20,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
