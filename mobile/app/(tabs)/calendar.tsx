import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as Calendar from "expo-calendar";
import * as Notifications from "expo-notifications";
import { Calendar as CalendarView } from "react-native-calendars";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import { useTranslation } from "react-i18next";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CalendarScreen = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Calendar.Event[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarId, setCalendarId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const setup = async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission refusée", "Accès au calendrier nécessaire.");
        return;
      }

      const { status: notifStatus } =
        await Notifications.requestPermissionsAsync();
      if (notifStatus !== "granted") {
        Alert.alert("Permission refusée", "Notifications désactivées.");
        return;
      }

      const calendars = await Calendar.getCalendarsAsync();
      const defaultCalendar = calendars.find((c) => c.allowsModifications);
      setCalendarId(defaultCalendar?.id ?? null);

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.HIGH,
        });
      }
    };
    setup();
  }, []);

  const handleDayPress = async (day: any) => {
    setSelectedDate(day.dateString);
    if (!calendarId) return;

    const start = new Date(day.dateString);
    const end = new Date(day.dateString);
    end.setHours(23, 59, 59);

    const dayEvents = await Calendar.getEventsAsync([calendarId], start, end);
    setEvents(dayEvents);
  };

  const scheduleNotification = async (eventDate: Date) => {
    const triggerDate = new Date(eventDate.getTime() - 10 * 60 * 1000);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "⏰ Rappel",
        body: "Ton événement commence bientôt !",
      },
      trigger: {
        type: "date",
        date: triggerDate,
      } as Notifications.NotificationTriggerInput,
    });
  };

  const notifyEventAdded = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "📅 Événement ajouté",
        body: "Tu as ajouté un événement à ton calendrier. Vérifie sur ton vrai calendrier !",
      },
      trigger: {
        seconds: 1,
      } as Notifications.NotificationTriggerInput,
    });
  };

  const addEvent = async () => {
    if (!calendarId || !selectedDate) return;

    const startDate = new Date(selectedDate);
    startDate.setHours(0, 43, 0);
    const endDate = new Date(selectedDate);
    endDate.setHours(11, 0, 0);

    try {
      await Calendar.createEventAsync(calendarId, {
        title: "💡 Rappel : tâche importante",
        startDate,
        endDate,
        timeZone: "Europe/Paris",
        location: "Chez toi",
      });

      await scheduleNotification(startDate);
      await notifyEventAdded();

      Alert.alert(
        "Tu as ajouté un événement à ton calendrier. Vérifie sur ton vrai calendrier !",
      );
      handleDayPress({ dateString: selectedDate });
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible d’ajouter l’événement.");
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => router.replace("/settings")}
        style={styles.closeButton}
      >
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>

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

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(20),
  },
  closeButton: {
    alignSelf: "flex-start",
    padding: moderateScale(10),
    marginLeft: moderateScale(10),
    marginTop: moderateScale(10),
  },
  button: {
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginTop: moderateScale(15),
    minWidth: wp("45%"),
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
});

export default CalendarScreen;
