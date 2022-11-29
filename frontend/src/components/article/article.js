import React from "react";
import "./article.css"

export default function Article(props){
    const default_article={
        eid:    0,
        title:  "Title",
        author: "Tom",
        url:    "https://www.baidu.com/"
    }

    return(
        <div>
            <div className="title">
                <h1>{default_article.title}</h1>
                <h2>{default_article.author}</h2>
            </div>
            <div>
                <iframe src={default_article.url} width="800" height="400" name="content"></iframe>
                <p><a href={default_article.url} target="content">{default_article.url}</a></p>
            </div>
        </div>
    )
}