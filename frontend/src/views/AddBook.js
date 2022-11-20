import React, {useState, useEffect} from "react";
import {useUser} from "@realm/react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {Book} from "../schemas/BookSchema";
import {AppButton} from "../components/AppButton";

import RealmContext from "../RealmContext";
const {useRealm, useQuery} = RealmContext;

export function AddBook({route, navigation}) {
  const originCubby = JSON.parse(route.params.cubby);
  const bookInfo = JSON.parse(route.params.book);

  const realm = useRealm();
  const user = useUser();
  const books = useQuery("Book");
  const destinationCubby = useQuery("Cubby").filtered(`_id == oid(${originCubby.id})`)[0];

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

        {!bookAddedSuccess ? (
          <View style={styles.fixToText}>
            <AppButton
              title="Yes!"
              onPress={() => {
                realm.write(() => {
                  const newBook = realm.create(Book, Book.generate(bookInfo, user.id));

                  destinationCubby.books.push(newBook);
                });

                // TODO: make testing more robust to confirm book was added
                setBookAddedSuccess(true);
              }}
            />

            <AppButton
              title="No"
              type="clear"
              onPress={() => navigation.goBack()}
            />
          </View>
          ) : (
            <View>
              <Text>Book added to {originCubby.name}!</Text>

              <AppButton
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
