import NaviBar from "../NaviBar"
import { useNavigate } from "react-router-dom";
import GroupArticles from "../GroupDetail/GroupArticles";
import React from "react";
import GlobalNaviBar from "../GlobalNaviBar";
import "./index.css"
import UserGroups from "./UserGroups";

const navibar_items=['首页','我的组']
const PAGE_LEN=10;

export default function Group(props){
    const socket=props.socket;
    // const isLogin=props.isLogin;
    const uid=props.uid;

    const [item_selected, selectItem]=React.useState(navibar_items[0]);
    const InfoRef=React.useRef({
        article_list: [],
        article_list_start:0,
        user_lists: {
            '我加入的组':[],
            '我创建的组':[]
        },
        init_state: {
            '首页': false,
            '我的组': false,
            '我创建的组':false,
            '我加入的组':false
        }
    })
    const [on_change,setOnChange]=React.useState(false);

    const navigate = useNavigate()

    function onchange(){
        setOnChange(~on_change);
    }
    function reqWorldEssay(){
        socket.emit('getWorldEssay',{num:PAGE_LEN})
    }
    function reqUserGroupData(){
        socket.emit('getUserGroups',{uid:uid})
        socket.emit('getUserCreatGroups',{uid:uid})
    }
    const reqs={
        '首页':reqWorldEssay,
        '我的组':reqUserGroupData
    }

    if(!props.isLogin){
        navigate('/usercenter')
    }

    React.useEffect(()=>{
        if(!InfoRef.current.init_state[item_selected]){
            reqs[item_selected]();
            InfoRef.current.init_state[item_selected]=true;
        }
    })

    React.useEffect(()=>{
        socket.on('getWorldEssaySuccess',(data)=>{
            InfoRef.current.article_list=data.essays;
            InfoRef.current.article_list_start+=data.num;
            InfoRef.current.init_state.首页=true;
            onchange();
        })
        socket.on('getUserGroupsSuccess',(data)=>{
            InfoRef.current.user_lists.我加入的组=data.groups;
            InfoRef.current.init_state.我加入的组=true;
            if(InfoRef.current.init_state.我加入的组&&InfoRef.current.init_state.我加入的组){
                InfoRef.current.init_state.我的组=true;
            }
            onchange();
        })
        socket.on('getUserCreatGroupsSuccess',(data)=>{
            InfoRef.current.user_lists.我创建的组=data.groups;
            InfoRef.current.init_state.我创建的组=true;
            if(InfoRef.current.init_state.我加入的组&&InfoRef.current.init_state.我加入的组){
                InfoRef.current.init_state.我的组=true;
            }
            onchange();
        })
    })

    return(
        <div className='group_detail'>
            <GlobalNaviBar cur_item='组' />
            <h1 className="underline">组</h1>
            <div className="group-row">
                <NaviBar item_selected={item_selected} selectItem={selectItem} items={navibar_items} />
                {item_selected===navibar_items[0]?<GroupArticles article_list={InfoRef.current.article_list} uid={uid}/>:
                    item_selected===navibar_items[1]?<UserGroups user_lists={InfoRef.current.user_lists}/>:
                        <div>error</div>}
            </div>
        </div>
    )
}