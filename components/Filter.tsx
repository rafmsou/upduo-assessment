import { StyleSheet, Text, View } from "react-native";
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
          selectedValue={selectedGender}
          onValueChange={(itemValue) => {
            setSelectedGender(itemValue);
            onFilterChanged("gender", itemValue);
          }}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexGrow: 1,
    height: 30,
  },
  filter: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    marginRight: 10,
    color: "#fff",
  },
});
