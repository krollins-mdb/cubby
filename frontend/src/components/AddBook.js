import React, {useState} from "react";
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

export function AddBook() {
  const [isbn, setIsbn] = useState("");

  const requestBook = async () => {
    // Request book info from Book API: https://openlibrary.org/dev/docs/api/books


    // const creds = Realm.Credentials.emailPassword(email, password);
    // await app.logIn(creds);
  };

  const onPressRequestBook = async () => {
    try {
      await requestBook(isbn);
    } catch (error) {
      Alert.alert(`Failed get book info: ${error.message}`);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Enter a book's ISBN and get information about it!</Text>
        <TextInput
          style={styles.input}
          onChangeText={setIsbn}
          value={number}
          placeholder="9780980200447"
          keyboardType="numeric"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});