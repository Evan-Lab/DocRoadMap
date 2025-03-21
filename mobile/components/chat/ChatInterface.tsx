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
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    padding: hp("2%"),
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
  },
  closeText: {
    fontSize: moderateScale(20),
  },
  chatContainer: {
    flex: 1,
    padding: hp("2%"),
  },
  userMessage: {
    alignSelf: "flex-end",
    padding: hp("1.5%"),
    borderRadius: moderateScale(20),
    marginBottom: hp("1.5%"),
  },
  botMessage: {
    alignSelf: "flex-start",
    padding: hp("1.5%"),
    borderRadius: moderateScale(20),
    marginBottom: hp("1.5%"),
  },
  messageText: {
    fontSize: moderateScale(16),
  },
  inputContainer: {
    flexDirection: "row",
    padding: hp("1.5%"),
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: moderateScale(20),
    padding: hp("1.5%"),
    fontSize: moderateScale(16),
  },
  sendButton: {
    borderRadius: moderateScale(20),
    padding: hp("1.5%"),
    marginLeft: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    fontSize: moderateScale(20),
  },
  floatingButton: {
    position: "absolute",
    right: wp("5%"),
    bottom: hp("3%"),
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: moderateScale(4),
  },
});
