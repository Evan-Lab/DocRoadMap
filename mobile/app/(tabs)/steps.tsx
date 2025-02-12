import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  FlatList, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import request from '@/constants/Request';
import { SafeAreaView } from 'react-native-safe-area-context';

type Step = {
  id: string;
  name: string;
  description: string;
};

export default function StepForProcess() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

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
      setError('Failed to fetch steps. Please try again later.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);

  const handleCreateStep = useCallback(async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Validation Error', 'Please fill in both name and description');
      return;
    }

    setIsLoading(true);
    const stepData = { 
      name: name.trim(), 
      description: description.trim() 
    };

    try {
      const response = await request.createStep(stepData);
      if (response.error) {
        setError(response.error);
      } else {
        setName("");
        setDescription("");
        fetchSteps();
        Alert.alert('Success', 'Step created successfully!');
      }
    } catch (error) {
      setError('Failed to create step. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [name, description, fetchSteps]);

  const stepList = ({ item }: { item: Step }) => (
    <View style={styles.stepItem}>
      <View style={styles.stepHeader}>
        <Ionicons name="checkbox-outline" size={24} color={COLORS.primary} />
        <Text style={styles.stepName}>{item.name}</Text>
      </View>
      <Text style={styles.stepDescription}>{item.description}</Text>
    </View>
  );

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
              placeholder="Step Name" 
              placeholderTextColor={COLORS.black} 
              value={name} 
              onChangeText={setName} 
              maxLength={50}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="clipboard" size={24} color="grey" style={{ paddingRight: 10 }} />
            <TextInput 
              style={[styles.input, styles.descriptionInput]} 
              placeholder="Step Description" 
              placeholderTextColor={COLORS.black} 
              value={description} 
              onChangeText={setDescription} 
              multiline
              numberOfLines={3}
              maxLength={200}
            />
          </View>
          
          <TouchableOpacity 
            style={[
              styles.customButton, 
              (!name.trim() || !description.trim()) && styles.buttonDisabled
            ]}
            onPress={handleCreateStep}
            disabled={isLoading || !name.trim() || !description.trim()}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Add Step</Text>
            )}
          </TouchableOpacity>

          <FlatList
            data={steps}
            keyExtractor={(item) => item.id}
            renderItem={stepList}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchSteps();
            }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="list" size={48} color="grey" />
                <Text style={styles.emptyText}>No steps added yet</Text>
              </View>
            }
          />
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
  stepItem: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: COLORS.black,
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
    color: COLORS.black,
    marginLeft: 12,
  },
  stepDescription: {
    fontSize: 16,
    color: COLORS.grey,
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
