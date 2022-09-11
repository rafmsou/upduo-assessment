import useSWR from "swr";
import { RandomUserAPIResponse, UserFields, UserFilter } from "../models/api";
import staticData from "./staticUserData";

// const BASE_URL = "https://randomuser.me/api/";
const BASE_URL = "http://localhost:3000/api/";

const fetcher = (input: RequestInfo | URL) =>
  fetch(input).then((res) => res.json());

export function useUserData(
  filter: UserFilter,
  fields: UserFields[],
  seed: string,
  page: number,
  pageSize: number
): { data: RandomUserAPIResponse; isLoading: boolean; hasError: boolean } {
  // add page offset and size
  const url = new URL(BASE_URL);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("results", pageSize.toString());

  // add seed to get consistent results
  url.searchParams.append("seed", seed);

  // add requested fields
  url.searchParams.append("inc", fields.join(","));

  // add filters
  Object.entries(filter).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const { data, error } = useSWR(url.toString(), fetcher);

  return {
    // data: staticData as RandomUserAPIResponse,
    data,
    isLoading: !error && !data,
    // isLoading: false,
    hasError: error,
    // hasError: false,
  };
}
