import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Article } from "../components/pages/Article";
import { Articles } from "../components/pages/Articles";
import { Create } from "../components/pages/Create";
import { Edit } from "../components/pages/Edit";
import { Home } from "../components/pages/Home";
import { Search } from "../components/pages/Search";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <section id="content" className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/articles" element={<Articles />}></Route>
          <Route path="/create-article" element={<Create />}></Route>
          <Route path="/search/:search" element={<Search />}></Route>
          <Route path="/article/:id" element={<Article />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route
            path="*"
            element={
              <div className="jumbo">
                <h1> ERROR 404</h1>
                <p>Page not found</p>
              </div>
            }
          ></Route>
        </Routes>
      </section>

      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};
