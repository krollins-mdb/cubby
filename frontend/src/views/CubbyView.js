import { 
  StyleSheet,
  View,
  Text,
} from "react-native";

import RealmContext from "../RealmContext";
const {useRealm, useQuery} = RealmContext;

export function CubbyView({route, navigation}) {
  const cubby = route.params.cubby;
  const realm = useRealm();

  return (
    <View style={{flex: 1}}>
      <Text>{cubby.name}</Text>

      {/* <View style={styles.buttonGroup}>
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
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    flexDirection: "row"
  }
});