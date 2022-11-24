import { 
  StyleSheet,
  View,
  Text,
  ScrollView
} from "react-native";

import { useNavigation } from '@react-navigation/native';

import { BookOverview } from "../components/BookOverview";
import { AppButton } from "../components/AppButton";

import RealmContext from "../RealmContext";
const {useQuery} = RealmContext;

export function CubbySection({sectionId}) {
  const navigation = useNavigation();
  const id = JSON.parse(sectionId);
  const section = useQuery("Section").filtered(`_id == oid(${id})`)[0];

  const sectionStyles = {
    marginVertical: 8,
    marginHorizontal: 10,
    borderWidth: 4,
    borderColor: section.colors.highlight,
    backgroundColor: section.colors.main
  }

  return (
    <View style={sectionStyles}>
      <Text>{section.name}</Text>

      <AppButton 
        fullWidth={true}
        title="Add book"
        onPress={() => {
          navigation.navigate("Find a book", {
            section: JSON.stringify({
              id: section._id, 
              name: section.name
            })
          });
        }}
      />

      {/* TODO: Need to handle if Realm isn't working and/or 
      cubby isn't available. */}
      {/* TODO: Check if there are any books. show "add book" if not */}
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        { section.books.map((book, index) => {
          return (
            <BookOverview 
              key={index}
              bookId={JSON.stringify(book._id)} 
            />
          )
        })}
      </ScrollView>
    </View>
  );
}