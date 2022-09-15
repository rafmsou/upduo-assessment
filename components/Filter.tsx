import { Platform, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function ({
  onFilterChanged,
}: {
  onFilterChanged: (key: string, value: string) => void;
}) {
  const [selectedGender, setSelectedGender] = useState<string | undefined>(
    "all"
  );

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <Text style={styles.text}>Gender</Text>
        <Picker
          style={
            Platform.OS === "ios"
              ? styles.pickerIOS
              : Platform.OS === "android"
              ? styles.pickerAndroid
              : {}
          }
          selectedValue={selectedGender}
          onValueChange={(itemValue) => {
            setSelectedGender(itemValue);
            onFilterChanged("gender", itemValue);
          }}
        >
          <Picker.Item style={{ fontSize: 18 }} label="All" value="all" />
          <Picker.Item style={{ fontSize: 18 }} label="Male" value="male" />
          <Picker.Item style={{ fontSize: 18 }} label="Female" value="female" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flexGrow: 1,
    height: 30,
  },
  filter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  pickerAndroid: {
    color: "#fff",
    width: 150,
    marginTop: -15,
  },
  pickerIOS: {
    color: "#fff",
    width: 200,
    marginTop: -100,
  },
  text: {
    fontSize: 18,
    marginRight: 10,
    color: "#fff",
  },
});
