import React from "react"
import NaviBar from "../NaviBar"
import UserInfo from "./components/UserInfo"
import Articles from "./components/Articles"
import Outfits from "./components/Outfits"
import Clothes from "./components/Clothes"
import UserCenterInfoMgr from "./UserCenterInfoMgr"
import "./index.css"
import {useNavigate} from "react-router-dom";
import GlobalNaviBar from "../GlobalNaviBar"

const navibar_items=['个人信息','我的穿搭','我的文章','我的衣服'];

export default function UserCenter(props){
    const socket=props.socket;
    const isLogin=props.isLogin;
    const userName=props.userName;

    const [item_selected, selectItem]=React.useState(navibar_items[0]);
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
    const navigate = useNavigate()

    const info_mgr=new UserCenterInfoMgr({
        socket: socket,
        InfoRef: InfoRef,
        onChange: {
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
            <GlobalNaviBar cur_item='个人中心' />
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