import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, ScrollView } from 'react-native';
import * as Calendar from 'expo-calendar';
import { Calendar as CalendarView } from 'react-native-calendars';

const CalendarScreen = () => {
  const [events, setEvents] = useState<Calendar.Event[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarId, setCalendarId] = useState<string | null>(null);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendar = calendars.find(c => c.allowsModifications);
        setCalendarId(defaultCalendar?.id ?? null);
      } else {
        Alert.alert("Permission refusée", "Accès au calendrier nécessaire.");
      }
    };
    getPermissions();
  }, []);

  const handleDayPress = async (day: any) => {
    setSelectedDate(day.dateString);
    if (!calendarId) return;

    const start = new Date(day.dateString);
    const end = new Date(day.dateString);
    end.setHours(23, 59, 59);

    const events = await Calendar.getEventsAsync([calendarId], start, end);
    setEvents(events);
  };

  const addEvent = async () => {
    if (!calendarId || !selectedDate) return;

    const startDate = new Date(selectedDate);
    startDate.setHours(10, 0, 0);
    const endDate = new Date(selectedDate);
    endDate.setHours(11, 0, 0);

    try {
      await Calendar.createEventAsync(calendarId, {
        title: '💡 Rappel : tâche importante',
        startDate,
        endDate,
        timeZone: 'Europe/Paris',
        location: 'Chez toi',
      });
      Alert.alert('Événement ajouté !');
      handleDayPress({ dateString: selectedDate });
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Impossible d’ajouter l’événement.');
    }
  };

  return (
    <ScrollView>
      <CalendarView
        onDayPress={handleDayPress}
        markedDates={{ [selectedDate]: { selected: true } }}
      />
      <Button
        title="Ajouter un événement"
        onPress={addEvent}
        disabled={!selectedDate}
      />
      {events.length > 0 && (
        <View style={{ padding: 10 }}>
          <Text>Événements du jour :</Text>
          {events.map((e) => (
            <Text key={e.id}>
              • {e.title} ({new Date(e.startDate).toLocaleTimeString()})
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default CalendarScreen;
