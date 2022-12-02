// cloth
import React from "react";
import "./History.css";

export default function HistoryDetail(props){
    const [history_detail, set_history_detail] = React.useState({
        date: "2022-12-01",
        climate: "晴天",
        situation: "约会",
        top_id: "0"
    })
    React.useEffect(() => {
        props.socket.on('getAllHistorySuccess', (res) => {
            set_history_detail(res.histories);
            console.log(res);
        })
        props.socket.emit('getAllHistory', {uid: 0, username: "zz"});
    }, [])


    return(
        <div>
            <div className="History_head">
                <div className="History_around">
                    <bottom className="History_season">
                        季节:&nbsp;{cloth_detail.season}
                    </bottom>
                </div>
                <img src={cloth_detail.img_src} className="cloth_img"/>
            </div>
        </div>
    )
}