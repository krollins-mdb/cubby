import {Alert} from 'react-native';
import {AppButton} from "../components/AppButton";
import {useUser} from '@realm/react';

export function SignoutButton() {
  const user = useUser();

  // The signOut function calls the @realm/react logOut function on the currently
  // logged in user and then navigates to the welcome screen
  const signOut = () => {
    if (user) {
      user.logOut();
    }
  };

  return (
    <AppButton 
      title="Sign out"
      onPress={() => {
        Alert.alert("Do you want to sign out?", null, [
          {
            text: "Yes, sign out",
            style: "destructive",
            onPress: () => signOut(),
          },
          {
            text: "No, cancel",
            style: "cancel"
          }
        ])
      }}
    />
  );
}