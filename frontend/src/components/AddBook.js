import React, {useState, useEffect} from "react";
import {BSON} from "realm";
import {useUser} from "@realm/react";
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
  ImageBackground,
  Modal,
  Pressable,
  View,
} from "react-native";

import SelectCubby from "./SelectCubby";

import RealmContext from "../RealmContext";
const {useRealm, useQuery} = RealmContext;

export function AddBook() {
  const realm = useRealm();
  const cubbies = useQuery("Cubby");
  const user = useUser();
  const [isbn, setIsbn] = useState("");
  const [bookInfo, setBookInfo] = useState("");
  const [showCubbySelectModal, setShowCubbySelectModal] = useState(false);
  const [showCreateCubby, setshowCreateCubby] = useState(false);

  let ownCubbies = realm
    .objects("Cubby")
    .filtered(`owner_id == "${user.id}"`);

  useEffect(() => {
    // initialize the subscriptions
    const updateSubscriptions = async () => {
      await realm.subscriptions.update(mutableSubs => {
        // subscribe to all of the logged in user's cubbies
        let ownCubbies = realm
          .objects("Cubby")
          .filtered(`owner_id == "${user.id}"`);
        // use the same name as the initial subscription to update it
        mutableSubs.add(ownCubbies, {name: "ownCubbies"});
      });
    };
    updateSubscriptions();
  }, [realm, user]);

  const requestBook = async () => {
    // Request book info from Book API: https://openlibrary.org/dev/docs/api/books
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
    // fetch(`https://openlibrary.org/isbn/${isbn}.json`)
      .then((response) => response.json())
      .then((response) => JSON.stringify(response))
      .then((jsonString) => JSON.parse(jsonString))
      .then((jsonObject) => {
        setBookInfo(jsonObject[`ISBN:${isbn}`]);

        // TODO: Need to make sure user is available
        bookInfo.owner_id = user.id;

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

  const addBookToRealm = ({cubby}) => {
    // TODO: After getting Realm set up and figuring out schemas, use this to
    // add the book to a cubby.

    // Need to create book object and then add it to the proper cubby

    console.log(cubbies)
    console.log(cubby)
    console.log(bookInfo)

    // if (realm) {
    //   realm.write(() => {
    //     realm.create("Book", BookInfo);
    //   });


    // }
    

    console.log("addBookToRealm ran successfully")

    // TODO: Add confirmation message that the book was added to the cubby.
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
    <SafeAreaView style={styles.container}>
      {!bookInfo ? (
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

          <Button
            title="Find book"
            onPress={onPressRequestBook}
          />
          
        </View>
        ) : (
          // TODO: split into a Book view
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: bookInfo.cover.large,
            }}
          />
          <View>
            <Text>
              {bookInfo.title}
            </Text>

            <Text> Author(s)</Text>
            <FlatList
              data={bookInfo.authors}
              renderItem={renderItem}
              keyExtractor={author => author.name}
            />

            <Text> Subjects </Text>
            <FlatList
              data={bookInfo.subjects}
              renderItem={renderItem}
              keyExtractor={subject => subject.url}
            />
          </View>
          
          <View>
            <Text> Would you like to add {bookInfo.title} to your Cubby?</Text>
            <Button
              title="Yes!"
              onPress={() => setShowCubbySelectModal(true)}
            />
            <Button
              title="No"
              type="clear"
              onPress={() => setBookInfo("")}
            />

            {/* <Modal
              visible={showCubbySelectModal}
              onRequestClose={() => setShowCubbySelectModal(!showCubbySelectModal)}
            >
              <View>
                <Button
                  title="Cancel"
                  type="clear"
                  onPress={() => setShowCubbySelectModal(!showCubbySelectModal)}
                />
                <Text>Select a Cubby for this book</Text>
                {!ownCubbies.length ? (
                  <View>
                    <Text>Looks like you don't have a Cubby yet</Text>
                    <Button
                      title="Create a Cubby"
                      onPress={setshowCreateCubby(true)}
                    />
                  </View>
                ) : (
                  <FlatList
                    data={ownCubbies}
                    renderItem={renderItem}
                    keyExtractor={cubby => cubby.title}
                  />
                )}
                
              </View>
            </Modal> */}
          </View>
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
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
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