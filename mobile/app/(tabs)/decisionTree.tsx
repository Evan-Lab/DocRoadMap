import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { ScaledSheet, moderateScale } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import tree from "../../locales/decision-tree/decisionTree.json";

const decisionTree = tree as Record<string, any>;
type HistoryEntry =
  | { type: "question"; key: string }
  | { type: "answer"; label: string };

export default function DecisionTree() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "question", key: "start" },
  ]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [steps, setSteps] = useState<{ step_title: string; answer: string }[]>([]);
  const [showSteps, setShowSteps] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [history, showSteps]);

  const getProcessAnswersKey = (key: string): string | null => {
    if (key === "dem_answers") return "dem_answers";
    if (key === "aide_logement_answers") return "aide_logement_answers";
    if (key === "independance_answers") return "independance_answers";
    if (key === "emploi_answers") return "emploi_answers";
    return null;
  };

  const getStepsForProcess = (
    processAnswers: Record<string, any>,
    userAnswers: Record<string, string>
  ): { step_title: string; answer: string }[] => {
    const steps: { step_title: string; answer: string }[] = [];
    for (const step of Object.values(processAnswers)) {
      if (step.step_question) {
        const userValue = userAnswers[step.step_question];
        const option = step.options.find(
          (opt: any) => opt.label === userValue
        );
        if ((step.status === "mandatory" || step.status === "optional") && option?.answer) {
          steps.push({ step_title: step.step_title, answer: option.answer });
        }
      } else {
        const option = step.options[0];
        if (option?.answer) {
          steps.push({ step_title: step.step_title, answer: option.answer });
        }
      }
    }
    return steps;
  };

  const handleOptionPress = (nextKey: string, label: string) => {
    const lastQuestionEntry = [...history].reverse().find((e) => e.type === "question") as
      | { type: "question"; key: string }
      | undefined;
    const newAnswers = { ...userAnswers };
    if (lastQuestionEntry) {
      newAnswers[lastQuestionEntry.key] = label;
    }

    const processAnswersKey = getProcessAnswersKey(nextKey);
    if (processAnswersKey && decisionTree[processAnswersKey]) {
      const processAnswers = decisionTree[processAnswersKey] as Record<string, any>;
      const filteredSteps = getStepsForProcess(processAnswers, newAnswers);
      setSteps(filteredSteps);
      setUserAnswers(newAnswers);
      setShowSteps(true);
      setHistory([...history, { type: "answer", label }]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      { type: "answer", label },
      { type: "question", key: nextKey },
    ]);
    setUserAnswers(newAnswers);
  };

  const restartChat = () => {
    setHistory([{ type: "question", key: "start" }]);
    setUserAnswers({});
    setShowSteps(false);
    setSteps([]);
  };

  const lastEntry = history[history.length - 1];
  let currentOptions: { label: string; next: string }[] = [];
  if (lastEntry?.type === "question") {
    const node = decisionTree[lastEntry.key];
    if (node && "options" in node) {
      currentOptions = node.options;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef}>
        {history.map((entry, index) => {
          if (entry.type === "question") {
            const node = decisionTree[entry.key];
            if ("question" in node) {
              return (
                <View key={index} style={styles.botBubble}>
                  <Text style={styles.botText}>{node.question}</Text>
                </View>
              );
            }
          } else if (entry.type === "answer") {
            return (
              <View key={index} style={styles.userBubble}>
                <Text style={styles.userText}>{entry.label}</Text>
              </View>
            );
          }
          return null;
        })}

        {showSteps && (
          <View style={styles.botBubble}>
            <Text style={[styles.botText, { fontWeight: "bold" }]}>Étapes à suivre :</Text>
            {steps.map((step, idx) => (
              <View key={idx} style={{ marginTop: 8 }}>
                <Text style={[styles.botText, { fontWeight: "bold" }]}>{step.step_title}</Text>
                <Text style={styles.botText}>
                  {step.answer.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                    part.match(/^https?:\/\//) ? (
                      <Text key={i} style={styles.link} onPress={() => Linking.openURL(part)}>
                        {part}
                      </Text>
                    ) : (
                      <Text key={i}>{part}</Text>
                    )
                  )}
                </Text>
              </View>
            ))}
            <TouchableOpacity style={styles.restartButton} onPress={restartChat}>
              <Text style={styles.restartText}>🔁 Recommencer</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {!showSteps && currentOptions.length > 0 && (
        <ScrollView horizontal contentContainerStyle={styles.optionsBar}>
          {currentOptions.map(({ label, next }, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.optionBubbleHorizontal}
              onPress={() => handleOptionPress(next, label)}
            >
              <Text style={styles.optionText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    padding: wp(4),
    gap: 10,
    paddingBottom: hp(10),
  },
  botBubble: {
    backgroundColor: "#FFFFFF",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: moderateScale(30),
    alignSelf: "flex-start",
    maxWidth: "70%",
  },
  botText: {
    fontSize: moderateScale(16),
  },
  optionBubbleHorizontal: {
    backgroundColor: "#FFFFFF",
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: moderateScale(30),
    marginHorizontal: wp(2),
    justifyContent: "center",
    alignItems: "center", 
  },
  optionText: {
    fontSize: moderateScale(15),
    textAlign: "center",
  },
  optionsBar: {
    padding: wp(4),
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap", 
    overflow: "hidden",
  },
  userBubble: {
    backgroundColor: "#FFFFFF",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: moderateScale(30),
    alignSelf: "flex-end",
    maxWidth: "70%",
  },
  userText: {
    fontSize: moderateScale(16),
    color: "#000",
  },
  restartButton: {
    marginTop: hp(2),
    alignSelf: "center",
  },
  restartText: {
    color: "#007AFF",
    fontSize: moderateScale(15),
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
    fontSize: moderateScale(15),
  },
});
