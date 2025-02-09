import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { StorageLogin } from '../constants/Storage';
import AsyncStorage from "@react-native-async-storage/async-storage"
import  UserContext  from '../constants/Context';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

  function RootLayoutNav() {
    const colorScheme = useColorScheme();
    const [user, setUser] = useState<StorageLogin | null | undefined>(undefined)
  
    useEffect(() => {
      (async () => {
      if (user === undefined ) {
        try {
          const user = await AsyncStorage.getItem("user")
          if (user === null) {
            setUser(null)
          } else {
            setUser(JSON.parse(user))
          }
        } catch (e) {
          setUser(null)
        }}})()
      if (user === null) {
        router.replace("/connexion")
      }
    }, [user])
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        </Stack>
      </ThemeProvider>
      </UserContext.Provider>
    )
  }