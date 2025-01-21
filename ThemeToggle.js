import React, { useContext } from "react";
import { View, Button, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";  // Adjust path if necessary

const ThemeToggle = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Button
        title={`Switch to ${isDarkTheme ? "Light" : "Dark"} Mode`} // Corrected string interpolation
        onPress={toggleTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
});

export default ThemeToggle;
