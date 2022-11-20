import { 
  FlatList, 
  StyleSheet,
  View,
  Text,
} from "react-native";



export function ManageCubby({route, navigation}) {
  const originCubby = JSON.parse(route.params.cubby);

  return (
    <View style={{flex: 1}}>
      <Text>Colors!</Text>

      {/* <View style={Styles.surface1}>
        <Text>Surface 1</Text>
      </View>
      <View style={Styles.surface2}>
        <Text>Surface 2</Text>
      </View>
      <View style={Styles.surface3}>
        <Text>Surface 3</Text>
      </View>
      <View style={Styles.surface4}>
        <Text>Surface 4</Text>
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    flexDirection: "row"
  }
});