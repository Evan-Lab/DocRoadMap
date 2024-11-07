import React, { useState } from 'react';
import { Image, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

const ProfileCard = () => {
  const MAX_DESCRIPTION_LENGTH = 150;
  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies.'
  );
  const [firstname, setFirstname] = useState('John');
  const [lastname, setLastname] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleEditClick = () => setIsEditMode(true);
  const handleSaveClick = () => setIsEditMode(false);
  const handleDescriptionChange = (text : string) => {
    if (text.length <= MAX_DESCRIPTION_LENGTH) {
      setDescription(text);
    }
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
  };

  const handleExitClick = () => {
    console.log("Exit clicked");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
        />
      </View>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.nameText}>{firstname} {lastname}</Text>
        <Text style={styles.infoText}>
          <FontAwesome name="envelope" size={16} /> {email}
        </Text>
      </Card.Content>
      <Card.Content style={styles.cardContent}>
        {isEditMode ? (
          <View style={styles.editDescriptionContainer}>
            <TextInput
              style={styles.editDescriptionInput}
              value={description}
              onChangeText={handleDescriptionChange}
              multiline
              maxLength={MAX_DESCRIPTION_LENGTH}
              mode="outlined"
            />
            <Button onPress={handleSaveClick} mode="contained" buttonColor="grey" style={styles.saveButton}>
              Save Description
            </Button>
          </View>
        ) : (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{description}</Text>
            <TouchableOpacity onPress={handleEditClick}>
              <Ionicons name="create-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </Card.Content>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={handleSettingsClick}>
          <MaterialIcons name="settings" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleExitClick}>
          <Ionicons name="exit-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardContent: {
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'black',
  },
  nameText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
  },
  editDescriptionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
  editDescriptionInput: {
    fontSize: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    maxHeight: 100,
    width: '100%',
  },
  saveButton: {
    marginTop: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default ProfileCard;
