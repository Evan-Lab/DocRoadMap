import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CardDemarche from '../../components/card/CardDemarche';
import ChatInterface from '../../components/chat/ChatInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { SwaggerProcessList } from '@/constants/Swagger';
import request from '@/constants/Request';

export default function HomePage() {
  const [cards, setCards] = useState<SwaggerProcessList[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      const response = await request.processList();
      
      if ('data' in response && response.data) {
        setCards(response.data);
      } else {
        Alert.alert("Error", response.error || "Failed to fetch cards");
      }
    };
    fetchCards();
  }, []);

  const createCard = useCallback(async () => {

    const requestBody = {
      name: "Test",
            description: "Test description",
            status: "Test status",
            userId: 1,
            stepsId: 1,
            endedAt: "2022-12-31",
    };
    console.log('Request Body:', requestBody);

    try {
        const registrationResponse = await request.create(requestBody);
        console.log('Registration Response:', registrationResponse);

        if (registrationResponse.error) {
            setError(registrationResponse.error);
            return;
        }
    } catch (error) {
        setError('There is an error, please check your information');
    }
}, []);

  
  const handleMenuPress = () => {
    console.log('Menu/profile button pressed');
  };

  const handleGenerateRoadmap = () => {
    createCard();
    console.log('Generate new roadmap pressed');
  };

  const handleReminders = () => {
    console.log('My reminders pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
                <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>DocRoadmap</Text>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.buttonsArea}>
            <TouchableOpacity style={styles.button} onPress={handleGenerateRoadmap}>
                <Text style={styles.buttonText}>Générer une nouvelle roadmap</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleReminders}>
                <Text style={styles.buttonText}>Mes rappels</Text>
            </TouchableOpacity>
          </View>

            <ScrollView horizontal={true}>
              {cards.map((card, index) => (
              <CardDemarche
                key={index}
                name={card.name}
                description={card.description}
                progress={Math.floor(Math.random() * 100)} // Placeholder progress
              />
            ))}
            </ScrollView>
        </ScrollView>
        <ChatInterface /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
  },
  menuButtonText: {
    fontSize: 24,
    color: '#ffffff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  buttonsArea: {
    marginVertical: 40,

  },
  button: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});