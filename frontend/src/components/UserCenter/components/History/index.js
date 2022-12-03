// History
import React from "react";
import "./all_history.css";

const items=['上衣','下装','外套','鞋子','饰品']

export default function History(props){
    const history_list=props.history_list;
    const reqHistories=props.reqHistories;

    React.useEffect(()=>{
        if(history_list==false&&!props.init_state){
            reqHistories();
        }
    });

    return(
        <div className="histories">
            <h1>我的穿搭历史</h1>
            <div className="history_list">
                {history_list.map((history)=>{return (
                    <div className="history_block">
                        <h3 className="history_time">{history.h_year}-{history.h_month}-{history.h_day}&nbsp;&nbsp;{history.climate}</h3>
                        <div className="history_time">今天去的场景：{history.situation}</div>
                        {items.map((item)=>{return(
                            <div className="history_product_card">
                                <div className="history_content">{item}</div>
                                <img src={history[item]} className="history_img"/>
                            </div>
                        )})}
                    </div>
                )})}
            </div>
        </div>
    )
}