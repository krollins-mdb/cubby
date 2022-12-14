import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  View,
} from "react-native";

// View and component imports
import { WelcomeView } from "./views/WelcomeView";
import { CubbyListView } from './views/CubbyListView';
import { FindBook } from "./views/FindBook";
import { AddBook } from "./views/AddBook";
import { CubbyView } from "./views/CubbyView";
import { AddCubby } from "./components/AddCubby";
import { SignoutButton } from './components/SignoutButton';
import Theme from "./Theme";

// Realm imports
import  {AppProvider, UserProvider } from "@realm/react";
import  {appId, baseUrl } from "../realm";
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

const App = (route) => {
  const isDarkMode = useColorScheme() === "dark";
  const colors = isDarkMode ? Theme.dark : Theme.light;

  const NavigatorTheme = {
    dark: isDarkMode,
    colors: {
      primary: colors.main,
      background: colors.surface1,
      card: colors.surface2,
      text: colors.text2,
      border: colors.text2,
      notification: colors.surface2,
    },
  };

  return (
    <RealmProvider
        sync={{
          flexible: true,
          initialSubscriptions: {
            update: (subs, realm) => {
              subs.add(realm.objects("Cubby"));
              subs.add(realm.objects("Section"));
              subs.add(realm.objects("Book"));
            },
          },
          error: (_session, error) => {
            (error) => {
              console.log(error.name, error.message);
            };
          },
        }}
        fallback={() => (
          <View style={styles.activityContainer}>
            {/* TODO: Add text indicating status */}
            <Text>Syncing your data...</Text>
            <ActivityIndicator size="large" />
          </View>
        )}
      >
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={colors.surface1}
        />
        
        <NavigationContainer theme={NavigatorTheme}>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="Home"
                component={CubbyListView}
                options={{ 
                  title: "Let's get Cubby!",
                  cardStyle:{
                    backgroundColor: colors.surface2
                  }
                }}
              />
              <Stack.Screen
                name="Find a book"
                component={FindBook}
              />
              <Stack.Screen
                name="Manage cubby"
                component={CubbyView}
                options={({ route }) => ({ title: route.params.name })}
              />
            </Stack.Group>
            {/* Stack group of modal screens */}
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen 
                name="Add Cubby" 
                component={AddCubby} 
              />
              <Stack.Screen
                name="Add a book"
                component={AddBook}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>

        <SignoutButton />

      </SafeAreaView>
    </RealmProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppWrapper;
