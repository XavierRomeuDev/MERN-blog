import React from "react";
import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { Request } from "../../helpers/Request";
import { List } from "./List";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    retrieveArticles();
  }, []);

  const retrieveArticles = async () => {
    const { data, loading } = await Request(Global.url + "articles", "GET");

    if (data.status === "success") {
      setArticles(data.articles);
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
