import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CardDemarcheProps {
  name: string;
  description: string;
  progress: number;

}

const CardDemarche: React.FC<CardDemarcheProps> = ({ name, description, progress}) => {
  // const [progress, setProgress] = useState(30); // 3 out of 10 steps = 30% pr la petite de barre de progression, à rendre dynamique ca pourrait etre cool de le garder.
  const [modalVisible, setModalVisible] = useState(false);

  const handleChatBot = () => {
    console.log("Opening chat bot...");
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Icon name="credit-card" size={24} color="white" />
        <Text style={styles.headerTitle}>{name}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.contentTitle}>{description}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{`${progress}% completed`}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.chatButton} onPress={handleChatBot}>
          <Icon name="message-text" size={16} color="#007AFF" />
          <Text style={styles.chatButtonText}>Chat with Assistant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={() => {setModalVisible(true) }}>
          <Text style={styles.continueButtonText}>{progress < 100 ? 'Continue' : 'Complete'}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>More Details</Text>
            <Text style={styles.modalDescription}>{description}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CardDemarche;


const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 30,
    margin: 6,
  },
  cardHeader: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cardContent: {
    padding: 16,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  cardFooter: {
    padding: 16,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  chatButtonText: {
    color: '#007AFF',
    marginLeft: 8,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});