import { 
  StyleSheet,
  View,
  Text,
  ScrollView
} from "react-native";

import { AppButton } from "../components/AppButton";

import RealmContext from "../RealmContext";
const {useRealm, useQuery} = RealmContext;

export function CubbyView({route, navigation}) {
  const cubbyId = JSON.parse(route.params.cubbyId);
  const realm = useRealm();

  const cubby = useQuery("Cubby").filtered(`_id == oid(${cubbyId})`)[0];

  return (
    <View style={{flex: 1}}>
      <Text>{cubby.description}</Text>

      {/* TODO: Need to handle if Realm isn't working and/or 
      cubby isn't available. */}
      {/* TODO: Check if there are any books. show "add book" if not */}
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        { cubby.books.map((book, index) => {
          return (
            <Text>{book.title}</Text>
            // <CubbyOverview 
            //   key={index}
            //   cubbyId={JSON.stringify(cubby._id)} 
            //   name={cubby.name} 
            //   description={cubby.description} 
            //   books={cubby.books} 
            // />
          )
        })}
      </ScrollView>

      {/* <View style={styles.buttonGroup}>
        <AppButton 
          style={styles.button}
          fullWidth={true}
          title="Add book"
          onPress={() => {
            navigation.navigate("Find a book", {cubby: JSON.stringify(
              {id: cubby._id, name: cubby.name}
            )});
          }}
        />
        <AppButton 
          title="Manage Cubby"
          fullWidth={true}
          // TODO: Navigate to the Manage Cubby screen
          onPress={() => {
            navigation.navigate("Manage cubby", {cubby: JSON.stringify(
              {id: cubby._id, name: cubby.name}
            )});
          }}
        />
        <AppButton 
          bgColor={"#5F2234"}
          title="Delete Cubby"
          fullWidth={true}
          onPress={() => {
            realm.write(() => {
              realm.delete(cubby);
            });
          }}
        />
      </View> */}

      <AppButton 
        title="Back to Cubbies"
        onPress={() => navigation.goBack()}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    flexDirection: "row"
  }
});