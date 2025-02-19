import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import request from '@/constants/Request';
import { SafeAreaView } from 'react-native-safe-area-context';

type CardProcess = {
  name: string;
  description: string;
  stepsId: number;
  endedAt: string;
};

export default function CreateCardProcess() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [stepsId, setStepsId] = useState<number | null>(null);
  const [endedAt, setEndedAt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleCreateCardProcess = useCallback(async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Erreur de validation', 'Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    const cardProcessData = { 
      name: name.trim(), 
      description: description.trim(),
      userId: userId as number, 
      stepsId: stepsId!,
      endedAt: endedAt.trim(),
      status: "PENDING",
    };

    try {
      const response = await request.create(cardProcessData);
      if (response.error) {
        setError(response.error);
      } else {
        setName("");
        setDescription("");
        setUserId(null);
        setStepsId(null);
        setEndedAt("");
        Alert.alert('Réussite', 'Création de la démarche!');
      }
    } catch (error) {
      setError('Echec lors de la création de la démarche administrative. Veuillez réessayer plus tard');
    } finally {
      setIsLoading(false);
    }
  }, [name, description, stepsId, endedAt, userId]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -220 : 20}>
      <SafeAreaView>
        <View style={styles.container}>
        
          <View style={styles.inputContainer}>
            <Ionicons name="document-text" size={24} color="grey" style={{ paddingRight: 10 }} />
            <TextInput 
              style={styles.input} 
              placeholder="Nom de la démarche administrative" 
              placeholderTextColor={COLORS.black} 
              value={name} 
              onChangeText={setName} 
              maxLength={50}
              allowFontScaling={true}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="clipboard" size={24} color="grey" style={{ paddingRight: 10 }} />
            <TextInput 
              style={[styles.input, styles.descriptionInput]} 
              placeholder="Description de la démarche administrative" 
              placeholderTextColor={COLORS.black} 
              value={description} 
              onChangeText={setDescription} 
              multiline
              numberOfLines={3}
              maxLength={200}
              allowFontScaling={true}
            />
          </View>

          <TouchableOpacity 
            style={[
              styles.customButton, 
              (!name.trim() || !description.trim()) && styles.buttonDisabled
            ]}
            onPress={handleCreateCardProcess}
            disabled={isLoading || !name.trim() || !description.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText} allowFontScaling={true} accessibilityLabel='Boutton pour généer une nouvelle démarche administrative'>Créer la démarche administrative</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const COLORS = {
  primary: '#C49D83',
  secondary: '#BDA18A',
  tertiary: '#E8D5CC',
  grey: '#D3D3D3',
  light: '#F5EFE6',
  white: '#FFF',
  black: '#000000',
  orange: '#ffa500',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#f2f2f2",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  input: {
    width: '85%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: COLORS.grey,
    borderRadius: 5,
    borderColor: COLORS.black,
    borderWidth: 1,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    position: 'relative',
  },
  customButton: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
