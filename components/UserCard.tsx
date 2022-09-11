import { StyleSheet, Text, View, Image } from "react-native";
import { User } from "../models/user";

export const CARD_SIZE = 80;

export const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.thumb}>
        <Image
          source={{ uri: user.picture.thumbnail }}
          style={styles.thumb.image}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.info.username}>
          {`${user.name.first} ${user.name.last}`}
        </Text>
        <Text>{user.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
    width: "100%",
    height: CARD_SIZE,
  },
  thumb: {
    marginRight: 20,
    image: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
  },
  info: {
    display: "flex",
    justifyContent: "space-evenly",
    username: {
      fontSize: 15,
      fontWeight: "bold",
    },
  },
});
