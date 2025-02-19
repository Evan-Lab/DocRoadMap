import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import CardDemarche from '../../components/card/CardDemarche';
import ChatInterface from '../../components/chat/ChatInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { SwaggerProcessPerIdList } from '@/constants/Swagger';
import request from '@/constants/Request';

export default function HomePage() {
  const [cards, setCards] = useState<SwaggerProcessPerIdList[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchCards = useCallback(async () => {
    const response = await request.processperID();
    console.log('API Response:', response);
    if ('data' in response && response.data) {
      setCards(response.data);
    } else {
      Alert.alert("Erreur", response.error || "Impossible de récupérer les cartes des démarches administratives. Veuillez réessayer");
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const createCard = useCallback(async () => {

    const requestBody = {
      name: "Test",
            description: "Test description",
            status: "Test status",
            userId: 7,
            stepsId: 2,
            endedAt: "2022-12-31",
    };

    try {
        const registrationResponse = await request.create(requestBody);
        console.log('Registration Response:', registrationResponse);

        if (registrationResponse.error) {
            setError(registrationResponse.error);
            return;
        }
    } catch (error) {
        setError('Erreur, veuillez vérifier vos information');
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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchCards();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
                <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle} allowFontScaling={true} >DocRoadmap</Text>
        </View>

        <ScrollView style={styles.content} refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }>
          <View style={styles.buttonsArea}>
            <TouchableOpacity style={styles.button} onPress={handleGenerateRoadmap}>
                <Text style={styles.buttonText} allowFontScaling={true} accessibilityLabel='Boutton pour généer une nouvelle roadmap administrative' >Générer une nouvelle roadmap</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleReminders} accessibilityLabel='Boutton pour accéder aux rappels'>
                <Text style={styles.buttonText} allowFontScaling={true} >Mes rappels</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal={true}>
            {cards.map((card, index) => (
              <View key={index} style={{ marginRight: 16 }}>
                <CardDemarche
                  name={card.name}
                  description={card.description}
                  progress={Math.floor(Math.random() * 100)} // Placeholder progress
                />
                <View>
                  {card.steps && card.steps.length > 0 ? (
                    card.steps.map((step) => (
                      <View>
                        <Text style={{ fontWeight: 'bold' }} allowFontScaling={true}>{step.name}</Text>
                        <Text>{step.description}</Text>
                      </View>
                    ))
                  ) : (
                    null
                  )}
                </View>
              </View>
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