import React, {useState} from 'react';
import {
  StyleSheet, 
  View,
  Pressable
} from 'react-native';

export function SelectCubby(cubbies, book) {
  // TODO: Add const that gets all current cubbies

  return (
    <Modal
      visible={showCubbySelectModal}
      onRequestClose={() => setShowCubbySelectModal(!showCubbySelectModal)}
    >
      <View>
        <Button
          title="Cancel"
          type="clear"
          onPress={() => setShowCubbySelectModal(!showCubbySelectModal)}
        />
        <Text>Select a Cubby for this book</Text>
        {!ownCubbies.length ? (
          <View>
            <Text>Looks like you don't have a Cubby yet</Text>
            <Button
              title="Create a Cubby"
              onPress={setshowCreateCubby(true)}
            />
          </View>
        ) : (
          <FlatList
            data={ownCubbies}
            renderItem={renderItem}
            keyExtractor={cubby => cubby.title}
          />
        )}
        
      </View>
    </Modal>
  );
  
}