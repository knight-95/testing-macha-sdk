"use client";
import Image from "next/image";
import { SearchSDK } from "@metaworklabs/search-sdk/lib";
import SearchInterface from "@metaworklabs/search-sdk/lib";
import { useEffect, useState } from "react";
export default function Home() {
  const machaDevClient = new SearchSDK(process.env.NEXT_PUBLIC_API_KEY!);
  const [searchString, setSearchString] = useState<any>();
  const [searchResults, setSearchResults] = useState<any>();

  async function performSearch(searchText: string) {
    try {
      const searchOptions = {
        searchQuery: searchText,
        // category: "",
        // slug: "lens_post",
        // owner: "",
        limit: 10,
        page: 1,
        next: false,
      };

      const results = await machaDevClient.search(searchOptions);
      console.log("Search Results: from MACHA SDK", results);
      setSearchResults(results);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-row">
        <input
          type="text"
          onChange={(e: any) => {
            setSearchString(e.target.value);
          }}
        ></input>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            performSearch(searchString);
          }}
        >
          Search
        </button>
       
      </div>
      
      <div className="flex flex-row flex-wrap">
        {searchResults ? (
          searchResults?.data?.metas?.map((meta: any, index: any) => (
            <div
              key={index}
              className="m-4 h-25 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {meta?.meta?.data?.modified?.meta_title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {meta?.meta?.data?.modified?.meta_description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h3>Try Searching</h3>
        )}
      </div>
    </main>
  );
}
