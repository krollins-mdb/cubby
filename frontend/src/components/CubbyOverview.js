import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import {AppButton} from "../components/AppButton";

import RealmContext from "../RealmContext";
const {useRealm, useQuery} = RealmContext;

export function CubbyOverview({ cubby, title, description, books }) {
  const navigation = useNavigation();
  const realm = useRealm();

  return (
    <View style={styles.cubby}>
      <View style={styles.infoContainer}>
        <Text>{title}</Text>
        <Text>{description}</Text>
        {/* TODO: Make pluaral dynamic. Just "book" if there's only 1 */}
        <Text>{books.length} books added</Text>
      </View>

      <View style={styles.buttonGroup}>
        <AppButton 
          style={styles.button}
          fullWidth={true}
          title="Add book"
          onPress={() => {
            navigation.navigate("Find a book", {cubby: JSON.stringify(
              {id: cubby._id, name: cubby.name}
            )});
          }}
        />
        <AppButton 
          title="Manage Cubby"
          fullWidth={true}
          // TODO: Navigate to the Manage Cubby screen
          onPress={() => {
            navigation.navigate("Manage cubby", {cubby: JSON.stringify(
              {id: cubby._id, name: cubby.name}
            )});
          }}
        />
        <AppButton 
          bgColor={"#5F2234"}
          title="Delete Cubby"
          fullWidth={true}
          onPress={() => {
            realm.write(() => {
              realm.delete(cubby);
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cubby: {
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