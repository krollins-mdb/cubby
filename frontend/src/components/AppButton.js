import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

export function AppButton({ onPress, title, bgColor }) {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer, 
    bgColor ? { backgroundColor: bgColor } : { backgroundColor: "#5A527D" }
    ]}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 4,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    marginVertical: 1,
  },
  appButtonText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});