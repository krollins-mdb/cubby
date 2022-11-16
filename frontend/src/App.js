import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

// TODO: Remove these NewAppScreen imports as the app transforms
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

// View and component imports
import {WelcomeView} from "./views/WelcomeView";
import {CubbyView} from './views/CubbyView';
import {FindBook} from "./views/FindBook";
import {SignoutButton} from './components/SignoutButton';

// Realm imports
import {AppProvider, UserProvider} from "@realm/react";
import {appId, baseUrl} from "../realm";
import RealmContext from "./RealmContext";

const Stack = createNativeStackNavigator();
const {RealmProvider} = RealmContext;

const AppWrapper = () => {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={WelcomeView}>
        <App />
      </UserProvider>
    </AppProvider>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <RealmProvider
        sync={{
          flexible: true,
          initialSubscriptions: {
            update: (subs, realm) => {
              // subscribe to all of the logged in user's items
              subs.add(realm.objects('Cubby'));
            },
          }
        }}
        fallback={() => (
          <View style={styles.activityContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <SignoutButton />
        
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={CubbyView}
              options={{ title: "Let's get Cubby!" }}
            />
            <Stack.Screen
              name="Find a book"
              component={FindBook}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </RealmProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  container: {
    flex: 1,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default AppWrapper;
