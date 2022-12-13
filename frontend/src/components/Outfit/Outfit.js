import React from "react";
import "./Outfit.css"
import { useNavigate, useParams } from "react-router-dom";
import cloth_pic from "./cloth.png"
import LogoutIcon from '@mui/icons-material/Logout';

const items=['上衣','下装','外套','鞋子','饰品']


export default function OutfitDetail(props){
    const params=useParams();
    const navigate = useNavigate();
    const oid=params.oid;
    const username=params.username;
    const uid=params.uid;
    const outfit_ref=React.useRef({
        oid: oid,
        top_id: -1,
        top_src:'a',
        bottom_id: -1,
        bottom_src: 'b',
        coat_id: -1,
        coat_src: 'c',
        shoe_id: -1,
        shoe_src: 'd',
        ornament_id: -1,
        ornament_src:'e',
        uid: uid,
        username: username
    })
    const [onchange,set_onchange]=React.useState(false);
    const [outfit_detail, set_outfit_detail] = React.useState(outfit_ref.current)
    // var outfit_tmp = outfit_detail;
    // console.log(outfit_ref.current)
    let rcvOutfits=(res) => {
        // outfit_tmp = res.outfits;
        const outfits=outfit_ref.current;
        const tmp_items=['bottom_id','coat_id','oid','ornament_id','shoe_id','top_id','uid','username'];
        for(let i in tmp_items){
            outfits[tmp_items[i]]=res.outfits[tmp_items[i]];
        }
        outfit_ref.current=outfits;
        set_onchange(!onchange)
        // set_outfit_detail(outfits);
        console.log(res);
    }
    let rcvImgUrl=(res) => {
        outfit_ref.current[res.type+'_src']=res.img_src;
        set_onchange(!onchange)
        // set_outfit_detail(outfit_ref.current);
        console.log(res);
        console.log('rcv img')
    }
    React.useEffect(() => {
        props.socket.off('getOutfitsSuccess')
        props.socket.on('getOutfitsSuccess', rcvOutfits)
        props.socket.off('getOutfitsRetURLSuccess')
        props.socket.on('getOutfitsRetURLSuccess', rcvImgUrl)
        
    })
    React.useEffect(() => {
        props.socket.emit('getOutfits', {askType:"alone", uid: uid, oid: oid});
    },[])
    // set_onchange(!onchange)

    const handleClickDeleteOutfit=()=>{
        console.log('in delete outfit');
        props.socket.off('deleteOutfitSuccess');
        props.socket.on('deleteOutfitSuccess', (res) => {
            console.log(res);
            alert('删除成功');
            window.close();
        });
        props.socket.emit('deleteOutfit', {uid: uid, oid: oid});
    }

    return(
        <div className="outfit_page">
            <div >
                <h1 className="center">{outfit_ref.current.username}的搭配详情 </h1>
                <button className="change_btn left inline" onClick={handleClickDeleteOutfit}>
                    <LogoutIcon style={{float:"left",marginRight:"5px"}}></LogoutIcon>
                        删除穿搭
                </button>
            </div>
            <div className="oid">oid：{outfit_ref.current.oid}&nbsp;&nbsp;uid：{outfit_ref.current.uid}</div>
            <div className="float_left">
                <button className="cloth_pos">
                    <div className="outfit_content">上衣</div>
                    <img src={outfit_ref.current.top_src} className="outfits_img"/>
                </button>
                <button className="cloth_pos">
                    <div className="outfit_content">下装</div>
                    <img src={outfit_ref.current.bottom_src} className="outfits_img"/>
                </button>
                <button className="cloth_pos">
                    <div className="outfit_content">外套</div>
                    <img src={outfit_ref.current.coat_src} className="outfits_img"/>
                </button>
                <button className="cloth_pos">
                    <div className="outfit_content">鞋子</div>
                    <img src={outfit_ref.current.shoe_src} className="outfits_img"/>
                </button>
                <button className="cloth_pos">
                    <div className="outfit_content">饰品</div>
                    <img src={outfit_ref.current.ornament_src} className="outfits_img"/>
                </button>
            </div>
            {/* <button className="upwear_pos">
                <div className="outfit_content">上衣</div>
                <img src={outfit_ref.current.top_src} className="outfits_img"/>
            </button>
            <button className="downwear_pos">
                <div className="outfit_content">下装</div>
                <img src={outfit_ref.current.bottom_src} className="outfits_img"/>
            </button>
            <button className="coat_pos">
                <div className="outfit_content">外套</div>
                <img src={outfit_ref.current.coat_src} className="outfits_img"/>
            </button>
            <button className="shoe_pos">
                <div className="outfit_content">鞋子</div>
                <img src={outfit_ref.current.shoe_src} className="outfits_img"/>
            </button>
            <button className="decoration_pos">
                <div className="outfit_content">饰品</div>
                <img src={outfit_ref.current.ornament_src} className="outfits_img"/>
            </button> */}
            
        </div>
    )
}