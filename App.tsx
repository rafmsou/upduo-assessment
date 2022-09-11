import {
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { UserCard } from "./components/UserCard";
import { UserFields, UserFilter } from "./models/api";
import { useUserData } from "./hooks/useUserData";
import { User } from "./models/user";

const PAGE_SIZE = 20;

export default function App() {
  const [dataStore, setDataStore] = useState<User[]>([]);
  const [apiSeed, setApiSeed] = useState("upduoseed");
  const [currentPage, setCurrentPage] = useState(1);

  const flatListRef = React.useRef<FlatList>(null);
  const latestYOffset = React.useRef(0);

  const filter: UserFilter = { nat: "us" };
  const fields: UserFields[] = ["name", "email", "picture"];
  const { data, isLoading, hasError } = useUserData(
    filter,
    fields,
    apiSeed,
    currentPage,
    PAGE_SIZE
  );

  useEffect(() => {
    if (data) {
      setDataStore(
        currentPage === 1 ? data.results : [...dataStore, ...data.results]
      );
    }
  }, [data, currentPage]);

  const onRefresh = useCallback(() => {
    setCurrentPage(1);
    setApiSeed(Math.random().toString(36).substring(7));
  }, []);

  if (hasError) {
    return <Text>An error ocurred, try again later.</Text>;
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          ref={flatListRef}
          style={styles.list}
          data={dataStore}
          renderItem={({ item }) => <UserCard user={item} />}
          // pull to refresh functionality
          refreshing={isLoading}
          onRefresh={onRefresh}
          // infinite scroll functionality
          onEndReached={(info: { distanceFromEnd: number }) => {
            console.log("onEndReached", info.distanceFromEnd);
            setCurrentPage(currentPage + 1);
          }}
          onEndReachedThreshold={0.5}
          // maintain scroll position after adding more items
          onContentSizeChange={(_, height: number) => {
            console.log("onContentSizeChange", height);
            if (latestYOffset.current > 0) {
              // flatListRef.current?.scroll
            }
          }}
          onScroll={(event) => {
            latestYOffset.current = event.nativeEvent.contentOffset.y;
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    marginTop: 30,
    width: "95%",
    height: Dimensions.get("window").height - 30,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
  },
});
