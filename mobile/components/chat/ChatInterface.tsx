import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity,
        StyleSheet, SafeAreaView, ScrollView, Image, Modal,} from 'react-native';

export default function ChatInterface() {
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleFloatingButton = () => {
    setModalVisible(true);
    console.log('Floating button pressed');
  };

  const handleClose = () => {
    setModalVisible(false);
    console.log('Close button pressed');
  };

  const handleSend = () => {
    console.log('Send message:', message);
    setMessage(message);
  };

  return (
    <View>
      <TouchableOpacity style={styles.floatingButton} onPress={handleFloatingButton}>
        <Image source={require('../../assets/images/chatbot.png')} style={{width: 45, height: 45}} />
      </TouchableOpacity>
      
        <Modal animationType="slide" transparent={false} visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
              <Image source={require('../../assets/images/chatbot.png')} style={{width: 45, height: 45}} />
              </View>
              <Text style={styles.headerTitle}>Donna</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => handleClose()}
            >
              <Text style={styles.closeText}>✖</Text>
            </TouchableOpacity>
          </View>

          {/* Chat Messages */}
          <ScrollView style={styles.chatContainer}>
            <View style={styles.assistantMessage}>
              <Text style={styles.messageText}>
                Bonjour, je suis Donna, votre assistant personnel.
              </Text>
            </View>
            
            <View style={styles.assistantMessage}>
              <Text style={styles.messageText}>
                Quelle est votre problème ?
              </Text>
            </View>

            <View style={styles.userMessage}>
              <Text style={styles.userMessageText}>
                Quelles sont les justificatifs de domicile valide ?
              </Text>
            </View>

            <View style={styles.assistantMessage}>
              <Text style={styles.messageText}>
                Les justificatifs de domicile valident sont:
              </Text>
              <View style={styles.bulletList}>
                <Text style={styles.bulletItem}>• Facture téléphonique</Text>
                <Text style={styles.bulletItem}>• Facture d'internet</Text>
                <Text style={styles.bulletItem}>• Facture d'électricité</Text>
                <Text style={styles.bulletItem}>• Quittances de loyer</Text>
              </View>
            </View>

            <View style={styles.assistantMessage}>
              <Text style={styles.messageText}>
                Avez vous d'autre questions ?
              </Text>
            </View>

            <View style={styles.userMessage}>
              <Text style={styles.userMessageText}>Non</Text>
            </View>
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ecrivez votre message ici..."
              placeholderTextColor="#D3D3D3"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>→</Text>
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
    backgroundColor: '#E8E8E8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'grey',
    width: 60,
    height: 60,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    fontSize: 24,
    color: '#ffffff',
  },
  backButton: {
    padding: 5,
  },
  backArrow: {
    fontSize: 24,
    color: '#666',
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 20,
    color: '#666',
  },
  chatContainer: {
    flex: 1,
    padding: 15,
  },
  assistantMessage: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    maxWidth: '80%',
    marginBottom: 10,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 20,
    maxWidth: '80%',
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  userMessageText: {
    fontSize: 16,
    color: '#fff',
  },
  bulletList: {
    marginTop: 5,
  },
  bulletItem: {
    fontSize: 16,
    color: '#000',
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});