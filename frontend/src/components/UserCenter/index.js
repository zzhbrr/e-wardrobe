import React from "react"
import NaviBar from "../NaviBar"
import UserInfo from "./components/UserInfo"
import Articles from "./components/Articles"
import Outfits from "./components/Outfits"
import Clothes from "./components/Clothes"
import UserCenterInfoMgr from "./UserCenterInfoMgr"
import cloth_pic from "./materials/cloth.jpg"
import "./index.css"
import {useNavigate} from "react-router-dom";

const navibar_items=['个人信息','我的穿搭','我的文章','我的衣服'];

const default_outfit={
    oid:    0,
    '上衣': {pid: 1, img_src: ''},
    '下装': {pid: 2, img_src: ''},
    '外套': {pid: 3, img_src: ''},
    '鞋子': {pid: 4, img_src: ''},
    '饰品': {pid: 5, img_src: ''}
}
const default_outfits=[default_outfit,default_outfit]

const default_article={
    title:  "Default Title",
    eid:    0
}
const defalut_article_list=[default_article,default_article,default_article,default_article];

const default_cloth={
    pid:     0,
    img_src: cloth_pic
}
const defalut_clothes_lists={
    '上衣': [default_cloth],
    '下装': [default_cloth,default_cloth],
    '外套': [default_cloth,default_cloth,default_cloth],
    '鞋子': [default_cloth,default_cloth,default_cloth,default_cloth],
    '饰品': [default_cloth,default_cloth,default_cloth,default_cloth,default_cloth]
}

const default_userinfo={
    uid:        0,
    name:       "User",
    gender:     "Unknown",
    age:        0,
    profession: "Unknown"
}



export default function UserCenter(props){
    const socket=props.socket;
    const isLogin=props.isLogin;
    const userName=props.userName;

    const [item_selected, selectItem]=React.useState(navibar_items[0]);

    // const [user_info,setUserInfo]=React.useState({username:userName, UID:-1});
    // // const [outfit_list,setOutfits]=React.useState([]);
    // const [article_list,setArticles]=React.useState([]);

    // const [upwear_list,setUpwears]=React.useState([]);
    // const [downwaer_list,setDownwears]=React.useState([]);
    // const [coat_list,setCoats]=React.useState([]);
    // const [shoe_list,setShoes]=React.useState([]);
    // const [decoration_list,setDecorations]=React.useState([]);
    const InfoRef=React.useRef({
        user_info:{uid:-1, username:userName},
        outfit_list: [],
        article_list: [],
        clothes_lists: {
            '上衣': [],
            '下装': [],
            '外套': [],
            '鞋子': [],
            '饰品': []
        },
        init_state: {
            '个人信息': false,
            '我的穿搭': false,
            '我的文章': false,
            '我的衣服': {
                '上衣': false,
                '下装': false,
                '外套': false,
                '鞋子': false,
                '饰品': false
            }
        }
    })
    const [on_change,setOnChange]=React.useState(false);
    // const [cur_img,setCurImg]=React.useState(0)
    // const clothes_lists={
    //     '上衣': upwear_list,
    //     '下装': downwaer_list,
    //     '外套': coat_list,
    //     '鞋子': shoe_list,
    //     '饰品': decoration_list
    // }
    // const clothes_sets={
    //     '上衣': setUpwears,
    //     '下装': setDownwears,
    //     '外套': setCoats,
    //     '鞋子': setShoes,
    //     '饰品': setDecorations
    // }
    // const states={
    //     user_info:user_info,
    //     // outfit_list:outfit_list,
    //     article_list:article_list,
    //     clothes_lists:clothes_lists,
    //     // cur_img:cur_img
    // }
    // const sets={
    //     setArticles:setArticles,
    //     // setOutfits:setOutfits,
    //     setUserInfo:setUserInfo,
    //     clothes_sets:clothes_sets,
    //     // setCurImg:setCurImg
    //     onchange:onchange
    // }

    // const outfits_ref=React.useRef([])

    const navigate = useNavigate()

    const info_mgr=new UserCenterInfoMgr({
        socket:     socket,
        InfoRef:    InfoRef,
        onChange:   {
            value:  on_change,
            set     :setOnChange
        }
    })

    React.useEffect(()=>{
        socket.on("autoLoginFailed", ()=>{
            // console.log('usercenter: autologinFailed');init_state
            navigate('/login');
        });
        socket.on('autoLoginSuccess', ()=>{
        });
    }, [])

    React.useEffect(()=>{
        if (isLogin) {
            console.log('already login');
        } else {
            console.log('usercenter: userName:', userName);
            console.log('usercenter: isLogin:', isLogin);
            socket.emit('autoLogin', {username:userName})
        }
    }, [])

    return(
        <div className="main_page">
            <h1 className="underline">个人中心</h1>
            <div className="flex-row">
                <NaviBar item_selected={item_selected} selectItem={selectItem} items={navibar_items} />
                {item_selected===navibar_items[0]?<UserInfo user_info={InfoRef.current.user_info} reqUserInfo={info_mgr.reqUserInfo} handleChangeInfo={info_mgr.reqUserInfoChange} init_state={InfoRef.current.init_state[navibar_items[0]]} />:
                    item_selected===navibar_items[1]?<Outfits outfit_list={InfoRef.current.outfit_list} reqOutfitList={info_mgr.reqOutfitList} init_state={InfoRef.current.init_state[navibar_items[1]]}/>:
                        item_selected===navibar_items[2]?<Articles article_list={InfoRef.current.article_list} reqArticles={info_mgr.reqArticles} init_state={InfoRef.current.init_state[navibar_items[2]]}/>:
                            item_selected===navibar_items[3]?<Clothes clothes_lists={InfoRef.current.clothes_lists} reqClothes={info_mgr.reqClothes} init_state={InfoRef.current.init_state[navibar_items[3]]}/>:
                                <div className="user_info">error</div>}
            </div>
        </div>
    )
}