import React from "react";
import "./all_outfits.css"
import { useNavigate } from "react-router-dom";

const items=['上衣','下装','外套','鞋子','饰品']

export default function Outfits(props){

    const outfit_list=props.outfit_list;
    const reqOutfits=props.reqOutfitList;
    const reqOutfitImg=props.reqOutfitImg;
    const navigate=useNavigate();
    const [on_change,set_onchange]=React.useState(false);
    function change(){
        set_onchange(!on_change);
    }
    function view_product(pid)
    {
        
    }

    React.useEffect(()=>{
        if(outfit_list==false&&!props.init_state){
            console.log("req outfit list");
            reqOutfits()
        }
        // else{
        //     let sign=false;
        //     for(let i in outfit_list){
        //         for(let j in items){
        //             sign=true;
        //             reqOutfitImg(i,items[j],outfit_list[i][items[j]].pid);
        //             console.log("outfits: req img");
        //             break;
        //         }
        //         if(sign) break;
        //     }
        // }
    })

    return(
        <div className="outfits">
            <h1>全部穿搭</h1>
            <div className="list">
                {outfit_list.map((outfit)=>
                    <div className="outfit_card" key={outfit.oid} onClick={()=>navigate("/outfit/"+`${outfit.oid}`)} >
                        {items.map((item)=>{return(
                            <div className="product_card" key={outfit[item].pid} onClick={view_product(outfit[item].pid)}>
                                <div className="outfit_content">{item}</div>
                                <img src={outfit[item].img_src} className="outfit_img"/>
                            </div>
                        )})}
                    </div>
                )}
            </div>
        </div>
    )
}