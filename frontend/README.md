# Welcome to Cubby!

This React Native application serves as a digital library. Beyond tracking your
reading, With cubby, you'll be able to customize various aspects of your digital 
library to make it look and feel exactly how you want it to.

Currently, this app is in development and lacking many features planeed for v1.0.

## What makes it work?

Cubby uses [MongoDB Realm](https://www.mongodb.com/docs/realm/introduction/) 
and [Realm React](https://github.com/realm/realm-js/tree/master/packages/realm-react#readme)
to create an Android app (iOS coming later) that syncs user data across devices.

## How do I run the app?

Because this is a React Native application, you'll need to do a fair amount of
preparation before you can run the app locally.

### Prerequisites

- Set up your dev environment for React Native development. Check out the 
[React Native docs](https://reactnative.dev/docs/environment-setup) for guidance.
- Install the [React Native SDK](https://www.mongodb.com/docs/realm/sdk/react-native/install/) for Realm.
- Install [Realm React](https://www.npmjs.com/package/@realm/react), a library for using the React Native SDK.

### Running the app

After you've set up the prerequisites (no small feat), run the following commands
in the `frontend` directory:

``` sh
npm install
npm run android
```

