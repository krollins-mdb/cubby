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
import {WelcomeView} from "./views/WelcomeView";
import {CubbyView} from './views/CubbyView';
import {FindBook} from "./views/FindBook";
import {AddBook} from "./views/AddBook";
import {ManageCubby} from "./views/ManageCubby";
import {SignoutButton} from './components/SignoutButton';
import Theme from "./Theme";

// Realm imports
import {AppProvider, UserProvider, useApp} from "@realm/react";
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
        )}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={colors.surface1}
        />
        
        <NavigationContainer theme={NavigatorTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={CubbyView}
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
              name="Add a book"
              component={AddBook}
            />
            {/* TODO: Add Cubby management screen */}
            <Stack.Screen
              name="Manage cubby"
              component={ManageCubby}
            />
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
