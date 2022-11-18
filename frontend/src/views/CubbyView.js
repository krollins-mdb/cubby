import React, {useState, useEffect} from "react";
import {useUser} from "@realm/react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Component imports
import {AppButton} from "../components/AppButton";

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

  const Item = ({ cubby, title, description, books }) => (
    <View style={styles.cubby}>
      <Text>{title}</Text>
      <Text>{description}</Text>
      <Text>{books.length} books added</Text>

      <View style={styles.buttonGroup}>
        <AppButton 
          style={styles.button}
          title="Add book"
          onPress={() => {
            navigation.navigate("Find a book", {cubby: JSON.stringify(cubby)});
          }}
        />
        <AppButton 
          title="Manage Cubby"
          // onPress={() => {
          //   navigation.navigate("Find a book", {cubby: JSON.stringify(cubby)});
          // }}
        />
        <AppButton 
          bgColor={"#5F2234"}
          title="Delete Cubby"
          onPress={() => {
            realm.write(() => {
              realm.delete(cubby);
            });
          }}
        />
      </View>
      
    </View>
  );

  const renderItem = ({ item }) => (
    <Item cubby={item} title={item.name} description={item.description} books={item.books} />
  );

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects("Cubby"));
    });
  }, [realm, cubbies]);

  return (
    <View style={styles.spreadContainer}>
      <View style={styles.container}>      
        {/* TODO: Need to handle if Realm isn't working and/or Cubbies isn't available. */}
        <View style={styles.container}>
          <Text>My Cubbies ({cubbies.length} total)</Text>

          {/* <Text>{JSON.stringify(cubbies, null, 2)}</Text> */}

          <FlatList
            // columnWrapperStyle={styles.wrap}
            numColumns={2}
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
    // flex: 1,
    width: "45%",
    borderWidth: 1,
    margin: 2,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  spreadContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  wrap: {
    flexWrap: "wrap"
  },
  buttonGroup: {
     flex: 1,
     flexDirection: "row",
     flexWrap: "wrap"
  }
});