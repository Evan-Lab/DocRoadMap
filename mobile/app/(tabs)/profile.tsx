import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Image, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import UserContext from '@/constants/Context';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import request from '@/constants/Request';


const ProfileCard = () => {
  const MAX_DESCRIPTION_LENGTH = 150;
  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies.'
  );
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const userCtx = useContext(UserContext)
  const [error, setError] = useState<string | null>(null);

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

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem("user", () => {
      userCtx.setUser(null)
      router.replace("/connexion")
    })
  }, [userCtx.user])

  const updateProfile = useCallback(async () => {
    setError(null);

    try {
        const registrationResponse = await request.infoProfile();
        console.log('Registration Response:', registrationResponse);

        if (registrationResponse.error) {
            setError(registrationResponse.error);
            return;
        }
        const userProfile = registrationResponse.data;
        setEmail(userProfile.email);
        setFirstname(userProfile.firstName);
        setLastname(userProfile.lastName);

    } catch (error) {
        setError('There is an error, please check your information');
    }
  }, [firstname, lastname, email]);

  useEffect(() => {
    updateProfile();
  }, [error])


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
              <Ionicons name="create-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </Card.Content>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={handleSettingsClick}>
          <MaterialIcons name="settings" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="exit-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:"#f2f2f2"
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cardContent: {
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor:"#f2f2f2"
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
    color: 'black',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },
  editDescriptionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
  editDescriptionInput: {
    fontSize: 16,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
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
    color: 'black',
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
