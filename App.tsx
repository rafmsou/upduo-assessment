import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { UserCard, CARD_SIZE } from "./components/UserCard";
import { UserFields, UserFilter } from "./models/api";
import { useUserData } from "./hooks/useUserData";
import { User } from "./models/user";
import Filter from "./components/Filter";

const PAGE_SIZE = 20;

export default function App() {
  const [dataStore, setDataStore] = useState<User[]>([]);
  const [apiSeed, setApiSeed] = useState<string | undefined>("upduoseed");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<UserFilter>({ nat: "us" });

  const fields: UserFields[] = ["name", "email", "picture"];
  const { data, isLoading } = useUserData(
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
  }, [data, filter, currentPage]);

  const onRefresh = useCallback(() => {
    setCurrentPage(1);
    setApiSeed(`random-seed-${Math.random()}`);
  }, []);

  return (
    <View style={styles.container}>
      <Filter
        onFilterChanged={(key, value) => {
          setDataStore([]);
          setCurrentPage(1);
          setApiSeed(undefined);
          setFilter({ ...filter, [key]: value });
        }}
      />
      <FlatList
        style={styles.list}
        data={dataStore}
        renderItem={({ item }) => <UserCard user={item} />}
        // pull to refresh functionality
        refreshing={isLoading}
        onRefresh={onRefresh}
        // infinite scroll functionality
        onEndReached={(info: { distanceFromEnd: number }) => {
          setCurrentPage(currentPage + 1);
        }}
        onEndReachedThreshold={0.5}
        // show a loading indicator when more items are being loaded
        ListFooterComponent={() => {
          return isLoading ? (
            <ActivityIndicator style={{ margin: 20 }} />
          ) : null;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A4380",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    marginTop: 10,
    width: "95%",
    height: Dimensions.get("window").height - 30,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
  },
});
