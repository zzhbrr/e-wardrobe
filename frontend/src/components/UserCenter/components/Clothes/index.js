import React from "react";
import cloth_pic from "../../materials/cloth.jpg"
import ClothBar from "./ClothBar";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./index.css"

const items=['上衣','下装','外套','鞋子','饰品']

export default function Clothes(props){
    const default_cloth={
        pid:     0,
        img_src: cloth_pic
    }
    const defalut_cloth_list=[default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth,default_cloth];
    
    const [cloth_list,setClothes]=React.useState(defalut_cloth_list);
    const [item_selected,selectItem]=React.useState(items[0])

    return(
        <div className="clothes">
            <h1>我的衣服</h1>
            <button className="button">
                添加衣服
                <AddCircleIcon style={{float:"left",marginRight:"5px"}} />
            </button>
            <ClothBar item_selected={item_selected} selectItem={selectItem} items={items}></ClothBar>
            <div className="clothlist">
                {cloth_list.map((cloth,index)=>{
                    return(
                        <div className="cloth" title={"pid: "+cloth.pid.toString()} key={index} >
                            <img src={cloth.img_src} className="img" />
                        </div>
                )})}
            </div>
        </div>
    )
}