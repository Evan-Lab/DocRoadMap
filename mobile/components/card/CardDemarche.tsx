import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import request from '@/constants/Request';

interface CardDemarcheProps {
  name: string;
  description: string;
  progress: number;
}

type Step = {
  id: string;
  name: string;
  description: string;
  completed?: boolean;
};

const CardDemarche: React.FC<CardDemarcheProps> = ({ name, description, progress}) => {
  // const [progress, setProgress] = useState(30); // 3 out of 10 steps = 30% pr la petite de barre de progression, à rendre dynamique ca pourrait etre cool de le garder.
  const [modalVisible, setModalVisible] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSteps = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await request.stepList();
      if (response.error) {
        setError(response.error);
      } else {
        setSteps(response.data);
      }
    } catch (error) {
      setError('Echec de la récupération des étapes. Ressayez plus tard !');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);

  const StepItem = ({ item }: { item: Step }) => (
    <View style={styles.stepItem}>
      <View style={styles.stepHeader}>
        <Ionicons name={item.completed ? "checkbox-outline" : "help-outline"} size={24} color={item.completed ? '#007AFF' : '#D3D3D3'} />
        <Text style={styles.stepName}>{item.name}</Text>
      </View>
      <Text style={styles.stepDescription}>{item.description}</Text>
    </View>
  );

  const handleChatBot = () => {
    console.log("Ouverture chat bot...");
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
          <Text style={styles.chatButtonText}>Discute avec l'Assistant</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={() => { setModalVisible(true) }}>
          <Text style={styles.continueButtonText}>{progress < 100 ? 'Continuer' : 'Compléter'}</Text>
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
            <Text style={styles.modalTitle}>Plus de details</Text>
            <FlatList
              data={steps}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <StepItem item={item} />}
              refreshing={isLoading}
              onRefresh={() => {
                setRefreshing(true);
                fetchSteps();
              }}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="list" size={48} color="grey" />
                  <Text style={styles.emptyText}>Aucune étape disponible pour le moment</Text>
                </View>
              }
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
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
  stepItem: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
  },
  stepDescription: {
    fontSize: 16,
    color: '#D3D3D3',
    marginLeft: 36,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "grey",
  },
});
