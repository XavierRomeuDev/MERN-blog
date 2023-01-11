import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Request } from "../../helpers/Request";
import { List } from "./List";

export const Search = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    retrieveArticles();
  }, [params]);

  useEffect(() => {
    retrieveArticles();
  }, []);

  const retrieveArticles = async () => {
    const { data, loading } = await Request(Global.url + "search/"+ params.search, "GET");

    if (data.status === "success") {
      setArticles(data.articles);
    } else{
      setArticles([]);
    }

    setLoading(loading);
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : articles.length >= 1 ? (
        <List articles={articles} setArticles={setArticles} />
      ) : (
        <h1>There are no articles to show</h1>
      )}
    </>
  );
};
