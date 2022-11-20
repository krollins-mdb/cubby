import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Component imports
import { CubbyOverview } from "../components/CubbyOverview";
import { AppButton } from "../components/AppButton";
import { AddCubby } from "../components/AddCubby";

import RealmContext from "../RealmContext";
const { useRealm, useQuery } = RealmContext;

export function CubbyView({navigation}) {
  const realm = useRealm();
  const cubbies = useQuery("Cubby");

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

      {/* TODO: Need to handle if Realm isn't working and/or Cubbies isn't available. */}
      <View style={styles.container}>
        <Text>My Cubbies ({cubbies.length} total)</Text>

        <FlatList
          data={cubbies}
          renderItem={renderItem}
          keyExtractor={cubby => cubby._id}
        />

      </View>

      <AppButton
        title="Add new Cubby"
        onPress={() => {
          navigation.navigate("Add Cubby");
        }}
      />
        
    </View>
  );
}

const styles = StyleSheet.create({
  cubby: {
    borderWidth: 1,
    marginVertical: 6,
    marginHorizontal: 10,
    padding: 10,
  },
  container: {
    flex: 1,
  },
});