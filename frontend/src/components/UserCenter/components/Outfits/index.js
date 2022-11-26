import React from "react";
import "./all_outfits.css"

export default function Outfits(props){
    const default_product={
        pid:    0,
        src:    "https://www.runoob.com/images/pulpit.jpg"
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
    var outfit_list=[default_outfit,default_outfit,default_outfit,default_outfit,default_outfit,default_outfit,default_outfit];
    const [on_change,set_onchange]=React.useState(false);
    function change(){
        set_onchange(!on_change);
    }
    function view_product(pid)
    {
        
    }

    return(
        <div className="outfits">
            <h1>全部穿搭</h1>
            <div className="list">
                {outfit_list.map((outfit)=>
                    <div className="outfit_card" key={outfit.oid}>
                        <div className="product_card" onClick={view_product(outfit.upwear.pid)}>
                            <div className="outfit_content">上衣</div>
                            <img src={outfit.upwear.src} className="outfit_img"/>
                        </div>
                        <div className="product_card" onClick={view_product(outfit.downwear.pid)}>
                            <div className="outfit_content">下装</div>
                            <img src={outfit.downwear.src} className="outfit_img"/>
                        </div>
                        <div className="product_card" onClick={view_product(outfit.coat.pid)}>
                            <div className="outfit_content">外套</div>
                            <img src={outfit.coat.src} className="outfit_img"/>
                        </div>
                        <div className="product_card" onClick={view_product(outfit.shoe.pid)}>
                            <div className="outfit_content">鞋子</div>
                            <img src={outfit.shoe.src} className="outfit_img"/>
                        </div>
                        <div className="product_card" onClick={view_product(outfit.decoration.pid)}>
                            <div className="outfit_content">饰品</div>
                            <img src={outfit.decoration.src} className="outfit_img"/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}