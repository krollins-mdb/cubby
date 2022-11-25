import { 
  StyleSheet,
  View,
  Text,
  ScrollView
} from "react-native";

import { AppButton } from "../components/AppButton";
import { CubbySection } from "../components/CubbySection";

import RealmContext from "../RealmContext";
const {useRealm, useQuery} = RealmContext;

export function CubbyView({route, navigation}) {
  const cubbyId = JSON.parse(route.params.cubbyId);
  const realm = useRealm();

  const cubby = useQuery("Cubby").filtered(`_id == oid(${cubbyId})`)[0];
  const sections = cubby.sections;

  // console.log(sections)

  return (
    <View style={{flex: 1}}>
      <Text>{cubby.description}</Text>

      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        { cubby.sections.map((section, index) => {
          return (
            <CubbySection
              key={index}
              sectionId={JSON.stringify(section._id)} 
            />
          )
        })}
      </ScrollView>

      <View style={styles.buttonGroup}>
        {/* <AppButton 
          fullWidth={true}
          title="Add book"
          onPress={() => {
            navigation.navigate("Find a book", {cubby: JSON.stringify(
              {id: cubby._id, name: cubby.name}
            )});
          }}
        /> */}
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
      </View>

      <AppButton 
        title="Back to Cubbies"
        onPress={() => navigation.goBack()}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 8,
 }
});