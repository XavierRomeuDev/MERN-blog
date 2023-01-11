import React from 'react'
import { Global } from '../../helpers/Global';
import { Request } from '../../helpers/Request';
import { Link } from "react-router-dom";

export const List = ({ articles, setArticles }) => {

  const deleteArticle = async(articleId) =>{

    let { data } = await Request(Global.url+"article/"+articleId, "DELETE");

    if(data.status === "Success"){
      let articlesUpdated = articles.filter(article => article._id !== articleId);
      setArticles(articlesUpdated);
    }
  }

  return (
    articles.map((article) => {
        return (
          <article key={article._id} className="article-item">
            <div className="mask">
              { article.image != "default.png" && <img src={Global.url + "image/" + article.image} />}
              { article.image == "default.png" && <img src="https://imgs.search.brave.com/H83_uDPwFAhA4O2-RK9JF9ugnH9RXsH0OOdEBjLfYRs/rs:fit:1200:1080:1/g:ce/aHR0cDovL3d3dy5n/b29kd29ya2xhYnMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE2LzEwL3JlYWN0/anMucG5n" />}
            </div>
            <div className="data">
              <h3 className="title"><Link to={"/article/"+article._id}>{article.title}</Link></h3>
              <p className="description">{article.content}</p>

              <Link to={"/edit/"+article._id} className="edit">Editar</Link>
              <button className="delete" onClick={() =>{
                deleteArticle(article._id);
              }}>Borrar</button>
            </div>
          </article>
        );
      })
  )
}
