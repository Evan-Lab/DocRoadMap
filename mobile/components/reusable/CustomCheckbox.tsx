import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomCheckbox = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}) => (
  <TouchableOpacity
    style={[styles.checkbox, value && styles.checkboxChecked]}
    onPress={() => onValueChange(!value)}
  >
    {value && <Icon name="check" size={14} color="#ffffff" />}
  </TouchableOpacity>
);
export default CustomCheckbox;

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#3498db",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#3498db",
  },
  checkboxLabel: {
    marginLeft: 8,
    color: "#333333",
  },
});
