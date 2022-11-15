import React, {useState} from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  ScrollView,
  View,
} from "react-native";

export function AddBook() {
  const [isbn, setIsbn] = useState("");
  const [bookInfo, setBookInfo] = useState("");

  const requestBook = async () => {
    // Request book info from Book API: https://openlibrary.org/dev/docs/api/books
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
    // fetch(`https://openlibrary.org/isbn/${isbn}.json`)
      .then((response) => response.json())
      .then((response) => JSON.stringify(response))
      .then((jsonString) => JSON.parse(jsonString))
      .then((jsonObject) => {
        setBookInfo(jsonObject[`ISBN:${isbn}`]);

        return;
      })
      .catch((error) => {
        Alert.alert(`Failed request: ${error.message}`);
      });

    // const creds = Realm.Credentials.emailPassword(email, password);
    // await app.logIn(creds);
  };

  const onPressRequestBook = async () => {
    try {
      await requestBook(isbn);
    } catch (error) {
      Alert.alert(`Couldn't get book info: ${error.message}`);
    }
  };

  const addBookToRealm = async () => {

  }

  const Item = ({ title }) => (
    <View>
      <Text>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

  return (
    <SafeAreaView>
      {!bookInfo ? (
        <View>
          <Text>Enter a book's ISBN and get information about it!</Text>
          <TextInput
            style={styles.input}
            onChangeText={setIsbn}
            value={isbn}
            placeholder="9781250214713"
            keyboardType="numeric"
          />

          <Button
            title="Find book"
            onPress={onPressRequestBook}
          />
          
        </View>
        ) : (
        <View>
          <Image
            style={styles.logo}
            source={{
              uri: bookInfo.cover.large,
            }}
          />
          <Text>
            {bookInfo.title}
          </Text>
          <Text> Author(s)</Text>
          <FlatList
            data={bookInfo.authors}
            renderItem={renderItem}
            keyExtractor={author => author.name}
          />

          <Text> Would you like to add {bookInfo.title} to your Cubby?</Text>
          <Button
            title="Yes!"
            // onPress={onPressSignUp}
          />
          <Button
            title="No"
            type="clear"
            onPress={() => setBookInfo("")}
          />
        </View>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  logo: {
    width: 300,
    height: 200,
  },
});