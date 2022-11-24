import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import {AppButton} from "../components/AppButton";

export function CubbyOverview({ cubbyId, name, description, books }) {
  const navigation = useNavigation();

  return (
    <View style={styles.cubby}>
      <View style={styles.infoContainer}>
        <Text>{name}</Text>
        <Text>{description}</Text>
        {/* TODO: Figure out how to sum up all books from all sections */}
        {/* TODO: Make pluaral dynamic. Just "book" if there's only 1 */}
        {/* <Text>{books.length} books added</Text> */}
      </View>

      <AppButton 
      style={styles.button}
        fullWidth={true}
        title="Go to Cubby"
        onPress={() => {
          navigation.navigate("Manage cubby", {cubbyId, name});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cubby: {
    flex: 1,
    flexDirection: "row",
    borderWidth: .25,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  buttonGroup: {
    flex: 1,
    margin: -.25,
    justifyContent: "center",
  },
  infoContainer: {
    flex: 2,
    marginHorizontal: 10,
    marginVertical: 8,
  }
});