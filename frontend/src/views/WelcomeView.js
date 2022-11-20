import React, {useState} from "react";
import Realm from "realm";
import {useApp} from "@realm/react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {AppButton} from "../components/AppButton";

export function WelcomeView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // state values for toggable visibility of features in the UI
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isInSignUpMode, setIsInSignUpMode] = useState(true);

  // Initialize @realm/react to connect App Services App
  const app = useApp();

  // signIn() uses the emailPassword authentication provider to log in
  const signIn = async () => {
    const creds = Realm.Credentials.emailPassword(email, password);
    await app.logIn(creds);
  };

  // onPressSignIn() uses the emailPassword authentication provider to log in
  const onPressSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  // onPressSignUp() registers the user and then calls signIn to log the user in
  const onPressSignUp = async () => {
    try {
      await app.emailPasswordAuth.registerUser({email, password});
      signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Welcome to Cubby</Text>
        <Text> Create an account or sign in to get started</Text>
        
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          onChangeText={setPassword}
          secureTextEntry={passwordHidden}
        />
        {!isInSignUpMode ? (
          <>
            <View style={styles.buttonGroup}>
              <AppButton
                title="Create account"
                buttonStyle={styles.mainButton}
                onPress={onPressSignUp}
              />
              <AppButton
                title="Sign in"
                type="clear"
                onPress={() => setIsInSignUpMode(!isInSignUpMode)}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.buttonGroup}>
              <AppButton
                title="Sign in"
                buttonStyle={styles.mainButton}
                onPress={onPressSignIn}
              />
              <AppButton
                title="Create account"
                type="clear"
                onPress={() => setIsInSignUpMode(!isInSignUpMode)}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  container: {
    flex: 1,
  },
});
