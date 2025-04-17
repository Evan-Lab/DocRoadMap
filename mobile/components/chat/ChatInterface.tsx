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
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@/components/ThemeContext";
import { useTranslation } from "react-i18next";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import request from "@/constants/Request";

export default function ChatInterface() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    [],
  );
  const [demandes, setDemandes] = useState<
    { name: string; collection_name: string }[]
  >([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );
  const [choixVisible, setChoixVisible] = useState(false);

  const handleCollection = async () => {
    setChoixVisible(true);
    console.log("Ouverture de la liste des démarches administratives...");
    try {
      const res = await request.listProcessAdministrative();
      console.log("Réponse de la liste des démarches : ", res);
      if (res?.data) {
        setDemandes(res.data);
      }
    } catch (err) {
      console.error("Erreur chargement démarches", err);
    }
  };

  const handleClose = () => {
    console.log("Fermeture du modal du chatbot");
    setModalVisible(false);
    setMessages([]);
    setSelectedCollection(null);
  };

  const handleProcess = async (collectionName: string) => {
    console.log("Collection choisie : ", collectionName);
    setSelectedCollection(collectionName);
    setChoixVisible(false);
    setModalVisible(true);
    setLoading(true);

    try {
      const res = await request.aiConversation(collectionName);
      console.log("Réponse de l'API lors du choix de la démarche : ", res);
      if (res?.data?.response) {
        console.log("Réponse initiale du bot : ", res.data.response);
        setMessages([{ text: res.data.response, sender: "bot" }]);
      } else {
        console.log("Pas de réponse dans la réponse de l'API.");
        setMessages([{ text: t("error_occurred"), sender: "bot" }]);
      }
    } catch (error) {
      console.error("Erreur lors du choix de la démarche", error);
      setMessages([{ text: t("server_error"), sender: "bot" }]);
    } finally {
      setLoading(false);
      console.log("Chargement terminé pour la démarche choisie");
    }
  };

  const handleSend = async () => {
    console.log("Message envoyé par l'utilisateur : ", message);
    if (!message.trim() || !selectedCollection) return;

    const newMessages = [...messages, { text: message, sender: "user" }];
    setMessages(newMessages);
    setMessage("");
    setLoading(true);

    try {
      const res = await request.aiQuery(selectedCollection, message);
      console.log("Réponse de l'API IA : ", res);
      if (res?.data) {
        const { is_roadmap, response } = res.data;
        const reply = is_roadmap ? t("roadmap_generated") : response;
        console.log("Réponse du bot : ", reply);
        setMessages([...newMessages, { text: reply, sender: "bot" }]);
      } else {
        console.log("Pas de données dans la réponse de l'API.");
        setMessages([
          ...newMessages,
          { text: t("connection_error"), sender: "bot" },
        ]);
      }
    } catch (error) {
      console.error("Erreur IA", error);
      setMessages([...newMessages, { text: t("server_error"), sender: "bot" }]);
    } finally {
      setLoading(false);
      console.log("Chargement terminé après l'envoi du message");
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.floatingButton, { backgroundColor: theme.primary }]}
        onPress={handleCollection}
      >
        <Image
          source={require("../../assets/images/chatbot.png")}
          style={{ width: 45, height: 45 }}
        />
      </TouchableOpacity>

      <Modal visible={choixVisible} transparent animationType="slide">
        <View
          style={[styles.modalOverlay, { backgroundColor: theme.background }]}
        >
          <Text
            style={[
              styles.headerTitle,
              { color: theme.text, marginBottom: 20 },
            ]}
          >
            {t("Choisie la procédure que tu souhaites commencer")}
          </Text>
          {demandes.map((d, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleProcess(d.collection_name)}
            >
              <Text style={[styles.demarcheItem, { color: theme.primary }]}>
                {d.name}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setChoixVisible(false)}>
            <Text style={[styles.closeText, { color: theme.text }]}>✖</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
                  { backgroundColor: theme.primary },
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
              {loading ? (
                <ActivityIndicator color={theme.text} />
              ) : (
                <Text style={[styles.sendButtonText, { color: theme.text }]}>
                  →
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: hp("3%"),
  },
  demarcheItem: {
    fontSize: moderateScale(18),
    marginVertical: hp("1%"),
  },
});
