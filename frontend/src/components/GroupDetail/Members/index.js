import React from "react";
import "./index.css"

export default function Members(props){    
    const menber_list=props.menber_list;
    const reqMembers=props.reqMembers;

    React.useEffect(()=>{
        if(menber_list==false&&!props.init_state){
            reqMembers();
        }
    });
    
    return(
        <div className="members">
            <h1></h1>
            <div className="list">
                {menber_list.map((article)=>{return (
                    <div className="article_block" key={article.eid}>
                        <h3 className="title">{article.title}</h3>
                        <div className="author">{article.time.substr(0,10)}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}