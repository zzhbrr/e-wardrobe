// History界面
import React from "react";
import "./all_history.css";
import { useNavigate, useParams } from "react-router-dom";
import AddHistory from "./AddHistory";

const items=['上衣','下装','外套','鞋子','饰品']

export default function History(props){
    const params=useParams();
    const history_list=props.history_list;
    const reqHistories=props.reqHistories;
    const uid=props.uid;

    React.useEffect(()=>{
        if(history_list==false&&!props.init_state){
            reqHistories();
        }
    });
    // 删除对应历史记录
    function handleDeleteHistory(HID) {
        console.log('删除历史 hid:' + HID);
        // console.log('hid: ' + HID);
        props.socket.off('deleteHistorySuccess');
        props.socket.on('deleteHistorySuccess', (res) => {
            console.log(res);
            reqHistories();
            // alert('删除成功');
        })
        props.socket.emit('deleteHistory', {uid: uid, hid: HID});
    }

    return(
        <div className="histories">
            <h1>我的穿搭历史</h1>
            <AddHistory reqAddHistory={props.reqAddHistory} reqClothes={props.reqClothes} clothes={props.clothes} reqHistories={reqHistories} socket={props.socket}/>
            <div className="history_list">
                {history_list.map((history)=>
                    <div className="history_block">
                        <div className="history_time">
                            {history.h_year}-{history.h_month}-{history.h_day}&nbsp;&nbsp;{history.climate}&nbsp;&nbsp;&nbsp;&nbsp;
                            <div onClick={()=>handleDeleteHistory(history.hid)}>删除历史</div>
                            {/* <a onClick={handleDeleteHistory}>删除历史</a> */}
                            {/* {Number(params.uid) === history.uid && <a onClick={handleDeleteHistory}>删除历史</a>} */}
                        </div>
                        {items.map((item)=>{return(
                            <div className="history_product_card">
                                <div className="history_content">{item}</div>
                                <img src={history[item]} className="history_img"/>
                            </div>
                        )})}
                        <div className="history_situation">穿搭场景：{history.situation}</div>
                    </div>
                )}
            </div>
        </div>
    )
}