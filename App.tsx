import {
  StyleSheet,
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
import Filter from "./components/Filter";

const PAGE_SIZE = 20;

interface State {
  users: User[];
  seed?: string;
  page: number;
  filter: UserFilter;
}

export default function App() {
  const [state, setState] = useState<State>({
    seed: "upduoseed",
    users: [],
    page: 1,
    filter: { nat: "us" },
  });

  const fields: UserFields[] = ["name", "email", "picture"];
  const { data, isLoading } = useUserData(
    state.filter,
    fields,
    state.seed,
    state.page,
    PAGE_SIZE
  );

  useEffect(() => {
    if (data) {
      setState({
        ...state,
        users:
          state.page === 1 ? data.results : [...state.users, ...data.results],
      });
    }
  }, [data, state.page]);

  const onRefresh = useCallback(() => {
    setState({
      ...state,
      page: 1,
      seed: `random-seed-${Math.random()}`,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Filter
        onFilterChanged={(key, value) => {
          setState({
            ...state,
            users: [],
            page: 1,
            seed: undefined,
            filter: { ...state.filter, [key]: value },
          });
        }}
      />
      <FlatList
        style={styles.list}
        data={state.users}
        renderItem={({ item, index }) => <UserCard key={index} user={item} />}
        // pull to refresh functionality
        refreshing={isLoading}
        onRefresh={onRefresh}
        // infinite scroll functionality
        onEndReached={(info: { distanceFromEnd: number }) => {
          if (!isLoading) {
            setState({ ...state, page: state.page + 1 });
          }
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
