import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator,
  VirtualizedList,
  View,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { UserCard } from "./components/UserCard";
import { UserFields, UserFilter } from "./models/api";
import { useUserData } from "./hooks/useUserData";
import { User } from "./models/user";

const PAGE_SIZE = 20;

export default function App() {
  const [dataStore, setDataStore] = useState<User[]>([]);
  const [apiSeed, setApiSeed] = useState("upduoseed");
  const [currentPage, setCurrentPage] = useState(1);

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
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <VirtualizedList
          style={styles.list}
          data={dataStore}
          initialNumToRender={PAGE_SIZE}
          renderItem={({ item }) => <UserCard user={item} />}
          keyExtractor={(item: User) => item.email}
          getItemCount={(data) => data.length} // TODO: get from the state
          getItem={(data, index) => data[index]}
          // pull to refresh functionality
          refreshing={isLoading}
          onRefresh={onRefresh}
          // infinite scroll functionality
          onEndReached={() => {
            console.log("onEndReached");

            setCurrentPage(currentPage + 1);
          }}
          onEndReachedThreshold={0.5}
          // show activity indicator at the bottom while loading more data
          ListFooterComponent={() => {
            return isLoading ? <ActivityIndicator /> : null;
          }}
        />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
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
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
  },
});
