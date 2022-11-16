import React, {useState} from "react";
import {BSON} from "realm";
import Realm from "realm";
import {useApp} from "@realm/react";
import {useUser} from "@realm/react";
import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

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

  const Item = ({ title, description, books }) => (
    <View style={styles.cubby}>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <Text>{books.length} books added</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.name} description={item.description} books={item.books} />
  );

  return (
    <View style={styles.container}>
      <Text>This is the Cubby view!</Text>
      <Text>Not much here at the moment...</Text>
      <Text>But you could try to add a book.</Text>
      <Button 
        title="Add a book"
        onPress={() => {
          navigation.navigate("Find a book");
        }}
      />

      <Separator />
      
      {/* TODO: Need to handle if Realm isn't working and/or Cubbies isn't available. */}
      <View style={styles.container}>
        <Text>My Cubbies ({cubbies.length} total)</Text>

        <FlatList
          style={styles.flexWrap}
          data={cubbies}
          renderItem={renderItem}
          keyExtractor={cubby => cubby._id}
        />

      </View>

      <Separator />

      <View>
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

        <Button
          title="Add new Cubby"
          disabled = {!cubbyName && !cubbyDescription}
          onPress={() => {
            realm.write(() => {
              realm.create("Cubby", 
              Cubby.generate(user.id, cubbyName, cubbyDescription, []));
            });
            setCubbyName("");
            setCubbyDescription("");
          }}
        />

        <Text>{cubbyName}</Text>
        <Text>{cubbyDescription}</Text>
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
    width: 100,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  flexWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  }
});