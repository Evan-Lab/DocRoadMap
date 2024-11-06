import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CardDemarche from '../../components/CardDemarche';
import ChatInterface from '../../components/ChatInterface';



export default function HomePage() {

  const handleMenuPress = () => {
    console.log('Menu/profile button pressed');
  };

  const handleGenerateRoadmap = () => {
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
            <Text style={styles.headerTitle}>My App</Text>
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
                <CardDemarche />
                <CardDemarche />
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