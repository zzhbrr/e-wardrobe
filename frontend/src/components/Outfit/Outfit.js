import React from "react";
import "./Outfit.css"
import cloth_pic from "./cloth.png"
const items=['上衣','下装','外套','鞋子','饰品']

export default function OutfitDetail(props){
    const [outfit_detail, set_outfit_detail] = React.useState({
        message: "Title",
    })

    React.useEffect(() => {
        props.socket.on('getOutfitsSuccess', (res) => {
            set_outfit_detail(res);
            console.log(props);
        })
        props.socket.emit('getOutfits', {askType:"alone", uid: 0, oid: 0});
    }, [])

    return(
        <div>
            <div className="header">
                <h1>搭配详情</h1>
            </div>
            
            <button className="upwear_pos">
                <div className="outfit_content">上衣</div>
                <img src={outfit_detail.upwear.src} className="outfits_img"/>
            </button>
            <button className="downwear_pos">
                <div className="outfit_content">下装</div>
                <img src={outfit_detail.downwear.src} className="outfits_img"/>
            </button>
            <button className="coat_pos">
                <div className="outfit_content">外套</div>
                <img src={outfit_detail.coat.src} className="outfits_img"/>
            </button>
            <button className="shoe_pos">
                <div className="outfit_content">鞋子</div>
                <img src={outfit_detail.shoe.src} className="outfits_img"/>
            </button>
            <button className="decoration_pos">
                <div className="outfit_content">饰品</div>
                <img src={outfit_detail.decoration.src} className="outfits_img"/>
            </button>
        </div>
    )
}