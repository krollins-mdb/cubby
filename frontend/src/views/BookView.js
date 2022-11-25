import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useNavigation } from '@react-navigation/native';

import { AppButton } from "../components/AppButton";

export function BookView({bookInfo, sectionInfo}) {
  const navigation = useNavigation();

  const Item = ({ title }) => (
    <View>
      <Text>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

  return (
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
        {/* TODO: Need to get section id here and pass it to AddBook so 
        it's easier to query the section. */}
        <AppButton 
          title="Add book to Cubby"
          onPress={() => {
            navigation.navigate("Add a book", {
              section: JSON.stringify(sectionInfo),
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
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
});