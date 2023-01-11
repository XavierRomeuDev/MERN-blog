import React from "react";
import { useState } from "react";
import { Global } from "../../helpers/Global";
import { Request } from "../../helpers/Request";
import { useForm } from "../../hooks/useForm";

export const Create = () => {
  const { form, sent, updated } = useForm({});
  const [result, setResult] = useState();

  const saveArticle = async (e) => {
    e.preventDefault();

    let newArticle = form;

    const { data } = await Request(Global.url + "create", "POST", newArticle);

    const fileInput = document.querySelector("#file");

    if (data.status === "Success" && fileInput.files[0]) {
      setResult(true);

      const formData = new FormData();

      formData.append("file", fileInput.files[0]);

      const upload = await Request(
        Global.url + "upload/" + data.savedArticle._id,
        "POST",
        formData,
        true
      );

      if (data.status === "Success") {
        setResult(true);
      } else {
        setResult(false);
      }
    }
  };

  return (
    <div className="jumbo">
      <h1>Create article</h1>

      <strong>{result ? "Article created" : ""}</strong>

      <form className="form" onSubmit={saveArticle}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={updated} />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea type="text" name="content" onChange={updated} />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="file" name="file" id="file" />
        </div>

        <input type="submit" value="Save" className="btn btn-success" />
      </form>
    </div>
  );
};
