import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
} from "react-native";

export default function App() {
  const [meal, setMeal] = useState("");
  const [mealsList, setMealsList] = useState([]);

  async function fetchMealByName() {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      const data = await response.json();
      setMealsList(data.meals);
    } catch (error) {
      console.error("Error while fetching meals:", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={mealsList}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <View style={styles.mealContainer}>
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.mealImage}
              />
              <Text style={styles.mealText}>{item.strMeal}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          textAlign={"center"}
          keyboardType="default"
          placeholder="Meal name"
          onChangeText={(text) => setMeal(text)}
          value={meal}
        />
        <Button style={styles.button} onPress={fetchMealByName} title="Find" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  button: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  mealContainer: {
    backgroundColor: "lightgray",
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  mealImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  mealText: {
    flex: 1,
  },
});
