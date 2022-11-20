import React, {useState, useEffect} from "react";
import {useUser} from "@realm/react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Component imports
import {AppButton} from "../components/AppButton";
import { CubbyOverview } from "../components/CubbyOverview";

import {Cubby} from "../schemas/CubbySchema";
import RealmContext from "../RealmContext";
const {useRealm, useQuery} = RealmContext;

export function CubbyView({navigation}) {
  const realm = useRealm();
  const cubbies = useQuery("Cubby");
  const user = useUser();

  const [cubbyName, setCubbyName] = useState("");
  const [cubbyDescription, setCubbyDescription] = useState("");

  const Separator = () => (
    <View style={styles.separator} />
  );

  const renderItem = ({ item }) => (
    <CubbyOverview cubby={item} title={item.name} description={item.description} books={item.books} />
  );

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects("Cubby"));
    });
  }, [realm, cubbies]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>      
        {/* TODO: Need to handle if Realm isn't working and/or Cubbies isn't available. */}
        <View style={styles.container}>
          <Text>My Cubbies ({cubbies.length} total)</Text>

          <FlatList
            data={cubbies}
            renderItem={renderItem}
            keyExtractor={cubby => cubby._id}
          />

        </View>

        <Separator />

        <View style={styles.container}>
          <Text>Add a new Cubby</Text>

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
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cubby: {
    borderWidth: 1,
    marginVertical: 6,
    marginHorizontal: 10,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  wrap: {
    flexWrap: "wrap"
  },
  buttonGroup: {
     flex: 1,
     flexDirection: "row",
     flexWrap: "wrap",
     justifyContent: "center",
     marginVertical: 8,
  }
});