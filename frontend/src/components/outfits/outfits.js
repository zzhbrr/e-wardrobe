import React from "react";
import "./outfits.css"
import cloth_pic from "./cloth.png"

export default function Outfits(props){
    const default_product={
        pid:    0,
        src:    cloth_pic
    }
    const default_outfit={
        oid:        0,
        name:       "default",
        upwear:     default_product,
        downwear:   default_product,
        coat:       default_product,
        shoe:       default_product,
        decoration: default_product
    }

    return(
        <div>
            <div className="header">
                <h1>搭配详情</h1>
            </div>

            {/* <div className="special_product_card"> */}
                <button className="coat_pos">
                    <div className="outfit_content">外套</div>
                    <img src={default_outfit.coat.src} className="outfits_img"/>
                </button>
                <button className="upwear_pos">
                    <div className="outfit_content">上衣</div>
                    <img src={default_outfit.upwear.src} className="outfits_img"/>
                </button>
                <button className="downwear_pos">
                    <div className="outfit_content">下装</div>
                    <img src={default_outfit.downwear.src} className="outfits_img"/>
                </button>
                <button className="shoe_pos">
                    <div className="outfit_content">鞋子</div>
                    <img src={default_outfit.shoe.src} className="outfits_img"/>
                </button>
                <button className="decoration_pos">
                    <div className="outfit_content">饰品</div>
                    <img src={default_outfit.decoration.src} className="outfits_img"/>
                </button>
            {/* </div> */}
        </div>
        /* <div className="outfits">
            <h1>全部穿搭</h1>
            <div className="list">
                {outfit_list.map((outfit)=>
                    <div className="outfit_card" key={outfit.oid}>
                        <div className="product_card">
                            <div className="outfit_content">上衣</div>
                            <img src={outfit.upwear.src} className="outfit_img"/>
                        </div>
                        <div className="product_card">
                            <div className="outfit_content">下装</div>
                            <img src={outfit.downwear.src} className="outfit_img"/>
                        </div>
                        <div className="product_card">
                            <div className="outfit_content">外套</div>
                            <img src={outfit.coat.src} className="outfit_img"/>
                        </div>
                        <div className="product_card">
                            <div className="outfit_content">鞋子</div>
                            <img src={outfit.shoe.src} className="outfit_img"/>
                        </div>
                        <div className="product_card">
                            <div className="outfit_content">饰品</div>
                            <img src={outfit.decoration.src} className="outfit_img"/>
                        </div>
                    </div>
                )}
            </div>
        </div> */
    )
}