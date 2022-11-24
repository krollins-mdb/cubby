import React, { useState, useEffect } from "react";
import { useUser } from "@realm/react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Section, Book } from "../schemas/AllSchemas";
import { AppButton } from "../components/AppButton";

import RealmContext from "../RealmContext";
const { useRealm, useQuery } = RealmContext;

export function AddBook({ route, navigation }) {
  const originInfo = {
    section: JSON.parse(route.params.section),
    book: JSON.parse(route.params.book)
  };

  const realm = useRealm();
  const user = useUser();
  const books = useQuery("Book");
  // const destinationCubby = useQuery("Cubby")
  //   .filtered(`_id == oid(${originInfo.cubby.id})`)[0];
  const destinationSection = useQuery("Section")
    .filtered(`_id == oid(${originInfo.section.id})`)[0];
  const parentCubby = destinationSection.assignee[0];

  const [bookAddedSuccess, setBookAddedSuccess] = useState("");

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Book));
      mutableSubs.add(realm.objects(Section));
    });
  }, [realm, books]);

  return (
    <SafeAreaView>
      <View>
        <Text> Would you like to add {originInfo.book.title} to {parentCubby.name}?</Text>

        {!bookAddedSuccess ? (
          <View style={styles.fixToText}>
            <AppButton
              title="Yes!"
              onPress={() => {
                // console.log(originInfo.book)
                realm.write(() => {
                  const newBook = realm.create(Book, Book.generate(originInfo.book, user.id));

                  destinationSection.books.push(newBook);
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
              <Text>Book added to {parentCubby.name}!</Text>

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
