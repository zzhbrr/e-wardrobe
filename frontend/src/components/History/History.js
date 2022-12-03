// History
import React from "react";
import "./History.css";

export default function HistoryDetail(props){
    // const username = props.username;
    const [history_detail, set_history_detail] = React.useState({
        date: "2022-12-01",
        climate: "晴天",
        situation: "约会",
        top_id: "0",
        bottom_id: "0",
        coat_id: "0",
        shoe_id: "0",
        ornament_id: "0"
    })
    React.useEffect(() => {
        props.socket.on('getAllHistorySuccess', (res) => {
            console.log("sdff");
            set_history_detail(res.histories);
            console.log(res);
        })
        props.socket.emit('getAllHistory', {uid: 0, username: "zz"});
    }, [])


    return(
        <div>
            <div className="History_head">
                <h1 className="History_title">{"zz"}的历史记录</h1>
                <div className="History_around">ddd
                </div>
                <img src={history_detail.img_src} className="cloth_img"/>
            </div>
        </div>
    )
}