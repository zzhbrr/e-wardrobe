import React from "react";
import "./Outfit.css"
import { useNavigate, useParams } from "react-router-dom";
import cloth_pic from "./cloth.png"
const items=['上衣','下装','外套','鞋子','饰品']

export default function OutfitDetail(props){
    const params=useParams();
    const oid=params.oid;
    const username=params.username;
    const uid=params.uid;
    const [outfit_detail, set_outfit_detail] = React.useState({
        oid: oid,
        top_id: -1,
        bottom_id: -1,
        coat_id: -1,
        shoe_id: -1,
        ornament_id: -1,
        uid: uid,
        username: username
    })
    // var outfit_tmp = outfit_detail;

    React.useEffect(() => {
        props.socket.on('getOutfitsSuccess', (res) => {
            // outfit_tmp = res.outfits;
            set_outfit_detail(res.outfits);
            console.log(res);
        })
        props.socket.emit('getOutfits', {askType:"alone", uid: uid, oid: oid});
    }, [])
    React.useEffect(() => {
        props.socket.on('getOutfitsRetURLSuccess', (res) => {
            var outfit_tmp = outfit_detail;
            outfit_tmp[res.type+'_src'] = res.img_src;
            set_outfit_detail(outfit_tmp);
            console.log(res);
        })
    }, [])

    return(
        <div>
            <div className="header">
                <h1 className="outfit_head">{outfit_detail.username}的搭配详情 </h1>
                <div className="oid">oid：{outfit_detail.oid}&nbsp;&nbsp;uid：{outfit_detail.uid}</div>
            </div>
            <button className="upwear_pos">
                <div className="outfit_content">上衣</div>
                <img src={outfit_detail.top_src} className="outfits_img"/>
            </button>
            <button className="downwear_pos">
                <div className="outfit_content">下装</div>
                <img src={outfit_detail.bottom_src} className="outfits_img"/>
            </button>
            <button className="coat_pos">
                <div className="outfit_content">外套</div>
                <img src={outfit_detail.coat_src} className="outfits_img"/>
            </button>
            <button className="shoe_pos">
                <div className="outfit_content">鞋子</div>
                <img src={outfit_detail.shoe_src} className="outfits_img"/>
            </button>
            <button className="decoration_pos">
                <div className="outfit_content">饰品</div>
                <img src={outfit_detail.ornament_src} className="outfits_img"/>
            </button>
        </div>
    )
}