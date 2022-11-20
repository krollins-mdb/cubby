import {useState} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {useUser} from "@realm/react";
import {AppButton} from "../components/AppButton";

import {Cubby} from "../schemas/CubbySchema";

import RealmContext from "../RealmContext";
const { useRealm } = RealmContext;

export function AddCubby({navigation}) {
  const user = useUser();
  const realm = useRealm();

  const [cubbyName, setCubbyName] = useState("");
  const [cubbyDescription, setCubbyDescription] = useState("");
  const [writeSuccess, setWriteSuccess] = useState(false);

  return(
    <View style={styles.container}>

      { writeSuccess ? (
        <View style={styles.container}>
          <Text>Cubby added!</Text>

          <AppButton 
            title="Add one more"
            onPress={() => setWriteSuccess(false)}
          />
          <AppButton 
            title="Back to Cubbies"
            onPress={() => navigation.goBack()}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={setCubbyName}
            value={cubbyName}
            placeholder="Amazing Cubby"
          />

          <TextInput
            style={styles.input}
            onChangeText={setCubbyDescription}
            value={cubbyDescription}
            placeholder="What kind of Cubby is this?"
          />

          <View style={styles.buttonGroup}>
            <AppButton
              title="Add new Cubby"
              disabled = {!cubbyName && !cubbyDescription}
              // TODO: Add proper validation
              onPress={() => {
                realm.write(() => {
                  realm.create("Cubby", 
                  Cubby.generate(user.id, cubbyName, cubbyDescription, []));
                });
                setCubbyName("");
                setCubbyDescription("");
                setWriteSuccess(true);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  buttonGroup: {
     flex: 1,
     flexDirection: "row",
     flexWrap: "wrap",
     justifyContent: "center",
     marginVertical: 8,
  }
});