import React from "react";
import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { Request } from "../../helpers/Request";
import { useForm } from "../../hooks/useForm";
import { useParams } from "react-router-dom";

export const Edit = () => {
  const { form, sent, updated } = useForm({});
  const [result, setResult] = useState();
  const [article, setArticle] = useState({});
  const params = useParams();

  useEffect(() => {
    retrieveArticle();
  }, []);

  const retrieveArticle = async () => {
    const { data } = await Request(Global.url + "article/" + params.id, "GET");

    if (data.status === "Success") {
      setArticle(data.articleDetail);
    }
  };

  const editArticle = async (e) => {
    e.preventDefault();

    let newArticle = form;

    const { data } = await Request(Global.url + "edit/" + params.id, "PUT", newArticle);

    if (data.status === "Success") {
      setResult(true);
    } else{
      setResult(false);
    }

    const fileInput = document.querySelector("#file");

    if (data.status === "Success" && fileInput.files[0]) {
      setResult(true);

      const formData = new FormData();

      formData.append("file", fileInput.files[0]);
    
      const upload = await Request(
        Global.url + "upload/" + data.article._id,
        "POST",
        formData,
        true
      );

      if (upload.data.status === "Success") {
        setResult(true);
      } else {
        setResult(false);
      }
    }
  };

  return (
    <div className="jumbo">
      <h1>Edit article: {article.title}</h1>

      <strong>{result ? "Article updated" : ""}</strong>

      <form className="form" onSubmit={editArticle}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            onChange={updated}
            defaultValue={article.title}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            onChange={updated}
            defaultValue={article.content}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <div className="mask">
            {article.image != "default.png" && (
              <img src={Global.url + "image/" + article.image} />
            )}
            {article.image == "default.png" && (
              <img src="https://imgs.search.brave.com/H83_uDPwFAhA4O2-RK9JF9ugnH9RXsH0OOdEBjLfYRs/rs:fit:1200:1080:1/g:ce/aHR0cDovL3d3dy5n/b29kd29ya2xhYnMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE2LzEwL3JlYWN0/anMucG5n" />
            )}
          </div>
          <input type="file" name="file" id="file" />
        </div>

        <input type="submit" value="Save" className="btn btn-success" />
      </form>
    </div>
  );
};
