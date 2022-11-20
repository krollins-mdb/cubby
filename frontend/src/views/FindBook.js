import React, {useState} from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {AppButton} from "../components/AppButton";

export function FindBook({route, navigation}) {
  const originCubby = JSON.parse(route.params.cubby);
  const [isbn, setIsbn] = useState("");
  const [bookInfo, setBookInfo] = useState("");
  const [findBookButtonText, setFindBookButtonText] = useState("Find book");

  const requestBook = async () => {
    // TODO: Test for malformed ISBNs before submitting request.
    // Request book info from Book API: https://openlibrary.org/dev/docs/api/books
    await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
    // fetch(`https://openlibrary.org/isbn/${isbn}.json`)
      .then((response) => response.json())
      .then((response) => JSON.stringify(response))
      .then((jsonString) => JSON.parse(jsonString))
      .then((jsonObject) => {
        setBookInfo(jsonObject[`ISBN:${isbn}`]);

        setFindBookButtonText("Find another book");

        return;
      })
      .catch((error) => {
        Alert.alert(`Failed request: ${error.message}`);
      });
  };

  const Item = ({ title }) => (
    <View>
      <Text>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Enter a book's ISBN and get information about it!</Text>
        <Text selectable={true}> For example: 
          <Text>
            9781250214713
          </Text>
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setIsbn}
          value={isbn}
          placeholder="9781250214713"
          keyboardType="numeric"
        />
        
        <AppButton
          title={findBookButtonText}
          onPress={requestBook}
        />
        
      </View>

      {/* <ScrollView>
        <Text>{JSON.stringify(bookInfo, null, 2)}</Text>
      </ScrollView> */}
      

      {bookInfo &&
        <View style={styles.bookContainer}>
          <View>
            <Image
              style={{
                resizeMode: "cover",
                height: 200,
                width: 125,
                marginRight: 10,
              }}
              source={{
                uri: bookInfo.cover.medium,
              }}
            />
            <AppButton 
              title="Add book to Cubby"
              onPress={() => {
                navigation.navigate("Add a book", {
                  cubby: JSON.stringify(originCubby),
                  book: JSON.stringify(bookInfo)
                });
              }}
            />
          </View>
          <View>
            <Text>
              {bookInfo.title}
            </Text>

            <Text>Author(s)</Text>
            <FlatList
              data={bookInfo.authors}
              renderItem={renderItem}
              keyExtractor={author => author.name}
            />

            <Text>Subjects</Text>
            <FlatList
              data={bookInfo.subjects}
              renderItem={renderItem}
              keyExtractor={subject => subject.url}
            />
          </View>
        </View>
      }
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
  container: {
    flex: 1,
  },
  bookContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});