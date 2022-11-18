import React, {useState, useEffect} from "react";
import {useUser} from "@realm/react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {Book} from "../schemas/BookSchema";

import RealmContext from "../RealmContext";
const {useRealm, useQuery} = RealmContext;

export function AddBook({route, navigation}) {
  const originCubby = JSON.parse(route.params.cubby);
  const bookInfo = JSON.parse(route.params.book);

  const realm = useRealm();
  const user = useUser();
  const books = useQuery("Book");
  const destinationCubby = useQuery("Cubby").filtered(`_id == oid(${originCubby._id})`)[0];

  // const [newBook, setNewBook] = useState("");
  const [bookAddedSuccess, setBookAddedSuccess] = useState("");

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Book));
    });
  }, [realm, books]);

  return (
    <SafeAreaView>
      <View>
        <Text> Would you like to add {bookInfo.title} to {originCubby.name}?</Text>

        {/* <Text>{JSON.stringify(newBook)}</Text> */}

        {!bookAddedSuccess ? (
          <View style={styles.fixToText}>
            <Button
              title="Yes!"
              onPress={() => {
                // setTestBook(() => Book.generate(bookInfo, user.id, originCubby));
                
                realm.write(() => {
                  const newBook = realm.create(Book, Book.generate(bookInfo, user.id));
                  
                  console.log(newBook)
                  console.log(destinationCubby)
                  
                  // TODO: Why is a book created, but not available for me to add to the cubby?
                  destinationCubby.books.push(newBook);
                });
              }}
            />

            <Button
              title="No"
              type="clear"
              onPress={() => navigation.goBack()}
            />
          </View>
          ) : (
            <View>
              <Text>Book added to {originCubby.name}!</Text>

              <Button
                title="Return to Cubby"
                type="clear"
                onPress={() => navigation.navigate("Home")}
              />
            </View>
          )
        }

        
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
