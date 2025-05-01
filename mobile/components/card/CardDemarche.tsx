import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import request from "@/constants/Request";
import { useTheme } from "@/components/ThemeContext";
import { useTranslation } from "react-i18next";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface CardDemarcheProps {
  name: string;
  description: string;
  progress: number;
  id: number;
}

type Step = {
  id: string;
  name: string;
  description: string;
  completed?: boolean;
};

const CardDemarche: React.FC<CardDemarcheProps> = ({
  name,
  description,
  progress,
  id,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSteps = useCallback(async () => {
    if (typeof id !== "number") return;
    setIsLoading(true);
    try {
      const response = await request.stepperID(id);
      if (response.error) {
        setError(response.error);
      } else {
        setSteps(response.data);
      }
    } catch (error) {
      setError(t("errorFetchingSteps"));
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [id, t]);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);

  const StepItem = ({ item }: { item: Step }) => (
    <View
      style={[
        styles.stepItem,
        { backgroundColor: theme.background, borderColor: theme.text },
      ]}
    >
      <View style={styles.stepHeader}>
        <Ionicons
          name={item.completed ? "checkbox-outline" : "help-outline"}
          size={24}
          color={item.completed ? theme.primary : "#D3D3D3"}
        />
        <Text
          style={[styles.stepName, { color: theme.text }]}
          allowFontScaling={true}
        >
          {item.name}
        </Text>
      </View>
      <Text
        style={[styles.stepDescription, { color: theme.text }]}
        allowFontScaling={true}
      >
        {item.description}
      </Text>
    </View>
  );

  const handleChatBot = () => {
    console.log(t("openingChatBot"));
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.background, borderColor: theme.text },
      ]}
    >
      <View
        style={[
          styles.cardHeader,
          { backgroundColor: theme.primary, borderColor: theme.text },
        ]}
      >
        <Icon name="credit-card" size={24} color="white" />
        <Text
          style={[styles.headerTitle, { color: "white", maxWidth: wp("50%") }]}
          allowFontScaling={true}
        >
          {name}
        </Text>
        {id && (
          <Text
            style={[styles.headerTitle, { color: "white" }]}
            allowFontScaling={true}
          >
            {" "}
            ({id})
          </Text>
        )}
      </View>
      <View style={styles.cardContent}>
        <ScrollView style={styles.scrollContainer}>
          <Text
            style={[
              styles.contentTitle,
              { color: theme.text, maxWidth: wp("50%") },
            ]}
            allowFontScaling={true}
          >
            {description}
          </Text>
        </ScrollView>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${progress}%`, backgroundColor: theme.primary },
            ]}
          />
        </View>
        <Text
          style={[styles.progressText, { color: theme.text }]}
          allowFontScaling={true}
        >{`${progress}% ${t("completed")}`}</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: theme.primary }]}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.continueButtonText} allowFontScaling={true}>
            {progress < 100 ? t("continue") : t("complete")}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={[styles.modalTitle, { color: theme.text }]}
              allowFontScaling={true}
            >
              {t("moreDetails")}
            </Text>
            <FlatList
              data={steps}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <StepItem item={item} />}
              refreshing={isLoading}
              onRefresh={() => {
                setRefreshing(true);
                fetchSteps();
              }}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="list" size={48} color="grey" />
                  <Text
                    style={[styles.emptyText, { color: theme.text }]}
                    allowFontScaling={true}
                  >
                    {t("noStepsAvailable")}
                  </Text>
                </View>
              }
            />
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: theme.primary }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText} allowFontScaling={true}>
                {t("close")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CardDemarche;

const styles = StyleSheet.create({
  card: {
    borderRadius: moderateScale(20),
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 30,
    margin: hp("0.75%"),
    color: "#000",
    flex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: hp("2%"),
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginLeft: wp("2%"),
  },
  cardContent: {
    padding: hp("2%"),
    height: hp("15%"),
    overflow: "hidden",
    flex: 1,
    justifyContent: "space-between",
  },
  contentTitle: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  progressBarContainer: {
    height: hp("1%"),
    backgroundColor: "#E0E0E0",
    borderRadius: moderateScale(4),
    marginBottom: hp("1%"),
  },
  progressBar: {
    height: hp("1%"),
    borderRadius: moderateScale(4),
  },
  progressText: {
    fontSize: moderateScale(14),
  },
  cardFooter: {
    padding: hp("2%"),
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  chatButtonText: {
    marginLeft: wp("2%"),
  },
  continueButton: {
    padding: hp("1.5%"),
    borderRadius: moderateScale(4),
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: moderateScale(8),
    padding: hp("2.5%"),
    width: wp("80%"),
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginBottom: hp("1.5%"),
  },
  closeButton: {
    padding: hp("1.2%"),
    borderRadius: moderateScale(4),
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  stepItem: {
    backgroundColor: "#FFF",
    padding: hp("2%"),
    borderRadius: moderateScale(12),
    marginBottom: hp("1.5%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(2),
    elevation: 2,
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  stepName: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    marginLeft: wp("3%"),
  },
  stepDescription: {
    fontSize: moderateScale(16),
    marginLeft: wp("9%"),
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: hp("4%"),
  },
  emptyText: {
    marginTop: hp("1.5%"),
    fontSize: moderateScale(16),
  },
  scrollContainer: {
    flex: 1,
  },
});
