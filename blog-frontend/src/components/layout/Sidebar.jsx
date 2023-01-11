import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {

  const [find, setFind] = useState("");
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();

    let userSearch = e.target.search_field.value;
  
    navigate("/search/"+userSearch);
  }

  return (
    <aside className="lateral">
      <div className="search">
        <h3 className="title">Finder</h3>
        <form onSubmit={search}>
          <input type="text" name="search_field" />
          <input type="submit" id="search"/>
        </form>
      </div>
    </aside>
  );
};
