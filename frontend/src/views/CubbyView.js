import React, {useState} from "react";
import Realm from "realm";
import {useApp} from "@realm/react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

export function CubbyView({navigation}) {

  return (
    <View>
      <Text>This is the Cubby view!</Text>
      <Text>Not much here at the moment...</Text>
      <Text>But you could try to add a book.</Text>
      <Button 
        title="Add a book"
        onPress={() => {
          navigation.navigate("Find a book");
        }}
      />
    </View>
  );
}