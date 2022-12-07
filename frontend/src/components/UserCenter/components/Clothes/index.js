import React from "react";
import ClothBar from "../../../NaviBar2";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./index.css"
import { useNavigate } from "react-router-dom";
import AddClothes from "./AddClothes";

const items=['上衣','下装','外套','鞋子','饰品']

export default function Clothes(props){    
    // const [cloth_list,setClothes]=React.useState(defalut_cloth_list);
    const clothes_lists=props.clothes_lists;
    const reqClothes=props.reqClothes;
    const navigate=useNavigate();

    const [item_selected,selectItem]=React.useState(items[0]);
    // if(clothes_lists[item_selected]==null){
    //     reqClothes(item_selected);
    // }
    React.useEffect(()=>{
        if(clothes_lists[item_selected]==false&&!props.init_state[item_selected]){
            reqClothes(item_selected);
        }
    })

    function handleAddClothes(data) {
        props.reqAddClothes(data);
    }

    function handleDeleteClothes(data) {
        props.reqClothes(data.item);
    }

    return(
        <div className="clothes">
            <h1>我的衣服</h1>
            <AddClothes className="button" socket={props.socket} handleAddClothes={handleAddClothes}>
                添加衣服
                <AddCircleIcon style={{float:"left",marginRight:"5px"}} />
            </AddClothes>
            <ClothBar item_selected={item_selected} selectItem={selectItem} items={items} />
            <div className="clothlist">
                {clothes_lists[item_selected].map((cloth,index)=>{
                    return(
                        <div className="cloth" title={"pid: "+cloth.pid.toString()}
                        key={index} onClick={()=>window.open(`/cloth/${cloth.pid}/${props.uid}`)}>
                            <img src={cloth.img_src} className="img" />
                        </div>
                )})}
            </div>
        </div>
    )
}