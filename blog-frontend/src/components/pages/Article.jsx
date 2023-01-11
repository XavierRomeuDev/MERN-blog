import React from "react";
import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { Request } from "../../helpers/Request";
import { useParams } from "react-router-dom";

export const Article = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    retrieveArticle();
  }, []);

  const retrieveArticle = async () => {
    const { data, loading } = await Request(
      Global.url + "article/" + params.id,
      "GET"
    );

    if (data.status === "Success") {
      setArticle(data.articleDetail);
    }

    setLoading(false);
  };

  return (
    <div className="jumbo">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="mask">
            {article.image != "default.png" && (
              <img src={Global.url + "image/" + article.image} />
            )}
            {article.image == "default.png" && (
              <img src="https://imgs.search.brave.com/H83_uDPwFAhA4O2-RK9JF9ugnH9RXsH0OOdEBjLfYRs/rs:fit:1200:1080:1/g:ce/aHR0cDovL3d3dy5n/b29kd29ya2xhYnMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE2LzEwL3JlYWN0/anMucG5n" />
            )}
          </div>
          <h1>{article.title}</h1>
          <span>{article.date}</span>
          <p>{article.content}</p>
        </>
      )}
    </div>
  );
};
