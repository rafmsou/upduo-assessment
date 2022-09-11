import { StyleSheet, Text, View, Image } from "react-native";
import { User } from "../models/user";

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
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 10,
    width: "100%",
  },
  thumb: {
    marginRight: 15,
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
