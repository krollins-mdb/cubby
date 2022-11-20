import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Component imports
import { CubbyOverview } from "../components/CubbyOverview";
import { AppButton } from "../components/AppButton";

import RealmContext from "../RealmContext";
const { useRealm, useQuery } = RealmContext;

export function CubbyListView({navigation}) {
  const realm = useRealm();
  const cubbies = useQuery("Cubby");

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects("Cubby"));
    });
  }, [realm, cubbies]);

  return (
    <View style={styles.container}>

      {/* TODO: Need to handle if Realm isn't working and/or 
      Cubbies isn't available. */}
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        { cubbies.map((cubby, index) => {
          return (
            <CubbyOverview 
              key={index}
              cubby={cubby} 
              title={cubby.name} 
              description={cubby.description} 
              books={cubby.books} 
            />
          )
        })}
      </ScrollView>

      <Text>({cubbies.length} Cubbies)</Text>

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
  container: {
    flex: 1,
  },
});