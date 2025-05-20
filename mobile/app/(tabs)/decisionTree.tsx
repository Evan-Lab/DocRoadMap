import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";

type TreeKey =
  | "start"
  | "dem"
  | "logement"
  | "independance"
  | "pole_emploi"
  | "dem_adresse"
  | "dem_admin"
  | "logement_aide"
  | "logement_pas_aide"
  | "indep_carte"
  | "indep_mutuelle"
  | "pole_deja"
  | "pole_pas";

type TreeNode =
  | {
      question: string;
      options: { label: string; next: TreeKey }[];
    }
  | {
      answer: string;
    };

const decisionTree: Record<TreeKey, TreeNode> = {
  start: {
    question: "Quelle démarche souhaites-tu effectuer ?",
    options: [
      { label: "Déménagement", next: "dem" },
      { label: "Aides au logement", next: "logement" },
      {
        label: "Prouver que tu n’es plus lié à tes parents",
        next: "independance",
      },
      { label: "Pôle emploi", next: "pole_emploi" },
    ],
  },
  dem: {
    question: "Que veux-tu faire concernant ton déménagement ?",
    options: [
      { label: "Changer d’adresse officielle", next: "dem_adresse" },
      { label: "Informer les administrations", next: "dem_admin" },
    ],
  },
  dem_adresse: {
    answer:
      "Tu peux faire ton changement d'adresse via https://www.service-public.fr/particuliers/vosdroits/R11193",
  },
  dem_admin: {
    answer:
      "Tu dois informer la CAF, l’assurance maladie, ton assurance habitation, ta banque et les impôts.",
  },
  logement: {
    question: "As-tu un contrat de location signé ?",
    options: [
      { label: "Oui", next: "logement_aide" },
      { label: "Non", next: "logement_pas_aide" },
    ],
  },
  logement_aide: {
    answer:
      "Tu peux demander l’APL sur https://www.caf.fr/. Il te faudra : ton bail, ton RIB, ta pièce d'identité et ton numéro d’allocataire (si tu en as un).",
  },
  logement_pas_aide: {
    answer:
      "Tu dois d’abord signer un bail pour être éligible à l’APL. Pense à chercher un logement éligible aux aides.",
  },
  independance: {
    question: "Quelle preuve souhaites-tu obtenir ?",
    options: [
      { label: "Carte vitale indépendante", next: "indep_carte" },
      { label: "Mutuelle étudiante", next: "indep_mutuelle" },
    ],
  },
  indep_carte: {
    answer:
      "Tu dois contacter la CPAM via ameli.fr pour demander une carte vitale à ton nom si tu es majeur·e.",
  },
  indep_mutuelle: {
    answer:
      "Tu peux souscrire à une mutuelle individuelle étudiante ou jeune actif sur des sites comme Heyme, LMDE, etc.",
  },
  pole_emploi: {
    question: "Es-tu déjà inscrit·e à Pôle Emploi ?",
    options: [
      { label: "Oui", next: "pole_deja" },
      { label: "Non", next: "pole_pas" },
    ],
  },
  pole_deja: {
    answer:
      "Tu peux actualiser ta situation chaque mois sur https://www.pole-emploi.fr/ pour continuer à recevoir tes aides.",
  },
  pole_pas: {
    answer:
      "Tu peux t’inscrire en ligne sur https://www.pole-emploi.fr/. Prépare ton CV, ta pièce d’identité et ton numéro de sécu.",
  },
};

type HistoryEntry =
  | { type: "question"; key: TreeKey }
  | { type: "answer"; label: string };

export default function DecisionTree() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "question", key: "start" },
  ]);

  const handleOptionPress = (nextKey: TreeKey, label: string) => {
    const nextNode = decisionTree[nextKey];
    if (!nextNode) return;
    setHistory((prev) => [
      ...prev,
      { type: "answer", label },
      { type: "question", key: nextKey },
    ]);
  };

  const restartChat = () => {
    setHistory([{ type: "question", key: "start" }]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {history.map((entry, index) => {
        if (entry.type === "question") {
          const node = decisionTree[entry.key];
          if ("question" in node) {
            return (
              <View key={index} style={styles.botBubble}>
                <Text style={styles.botText}>{node.question}</Text>
                <View style={styles.optionsContainer}>
                  {node.options.map((opt, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.optionBubble}
                      onPress={() => handleOptionPress(opt.next, opt.label)}
                    >
                      <Text style={styles.optionText}>{opt.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          } else if ("answer" in node) {
            return (
              <View key={index} style={styles.botBubble}>
                <Text style={styles.botText}>
                  {node.answer.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                    part.match(/https?:\/\/[^\s]+/) ? (
                      <Text
                        key={i}
                        style={styles.link}
                        onPress={() => Linking.openURL(part)}
                      >
                        {part}
                      </Text>
                    ) : (
                      <Text key={i}>{part}</Text>
                    ),
                  )}
                </Text>

                <TouchableOpacity
                  style={styles.restartButton}
                  onPress={restartChat}
                >
                  <Text style={styles.restartText}>🔁 Recommencer</Text>
                </TouchableOpacity>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  botBubble: {
    backgroundColor: "#E6E6FA",
    padding: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  botText: {
    fontSize: 16,
  },
  optionsContainer: {
    marginTop: 8,
    flexDirection: "column",
    gap: 6,
  },
  optionBubble: {
    backgroundColor: "#D0F0C0",
    padding: 10,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  optionText: {
    fontSize: 15,
  },
  userBubble: {
    backgroundColor: "#ADD8E6",
    padding: 12,
    borderRadius: 16,
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  userText: {
    fontSize: 16,
    color: "#000",
  },
  restartButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  restartText: {
    color: "#007AFF",
    fontSize: 15,
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
