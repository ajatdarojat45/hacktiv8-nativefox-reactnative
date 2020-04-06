import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";

import Constants from "expo-constants";

export default function App() {
  const [pokemons, setPokemon] = useState([]);

  const fetchData = useCallback(async () => {
    const res = await fetch(
      "https://api.pokemontcg.io/v1/cards?supertype=pokemon&pageSize=5&page=1"
    );
    const pockemon = await res.json();
    setPokemon(pockemon.cards);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
      <View style={styles.statusBar} />
      <Text>Test</Text>
      <Button
        title="press me"
        onPress={() => {
          alert("yeay");
        }}
      />
      {/* <View>
        <Text>ScrollView</Text>
        <ScrollView>
          {pokemons.map((pokemon) => {
            return (
              <View style={styles.item}>
                <Text>{pokemon.name}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View> */}
      <View style={{ width: "100%" }}>
        <Text>FlatList</Text>
        <FlatList
          data={pokemons}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              key={item.id}
              onPress={() => alert("yeay")}
            >
              <View>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <TextInput
        onChangeText={(text) => {
          console.log(text, "input value");
        }}
        style={styles.inputContainer}
      />
      <Image
        source={{
          uri:
            "https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg",
          height: 90,
          width: 90,
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    width: "100%",
    marginBottom: 20,
    height: 50,
  },
  item: {
    backgroundColor: "red",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  statusBar: {
    backgroundColor: "green",
    height: Constants.statusBarHeight,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
