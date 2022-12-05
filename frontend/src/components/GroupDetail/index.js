import NaviBar from "../NaviBar"
import { useNavigate, useParams } from "react-router-dom";
import Members from "./Members";
import GroupInfo from "./GroupInfo";
import Articles from "./GroupArticles";
import React from "react";
import GlobalNaviBar from "../GlobalNaviBar";
import "./index.css"

const navibar_items=['详细信息','全部成员','全部文章']

export default function GroupDetail(props){
    const socket=props.socket;
    // const isLogin=props.isLogin;
    const params=useParams();
    const gid=params.gid;

    const [item_selected, selectItem]=React.useState(navibar_items[0]);
    const InfoRef=React.useRef({
        group_info:{gid:gid},
        article_list: [],
        member_list: [],
        init_state: {
            '详细信息': false,
            '全部成员': false,
            '全部文章': false,
        }
    })
    const [on_change,setOnChange]=React.useState(false);

    const navigate = useNavigate()

    function onchange(){
        setOnChange(~on_change);
    }
    function reqGroupInfo(){
        socket.emit('getGroupDetail',{gid:gid})
    }
    function reqGroupArticles(){
        socket.emit('getGroupEssay',{gid:gid})
    }
    function reqGroupMembers(){
        socket.emit('getGroupMembers',{gid:gid})
    }
    const reqs={
        '详细信息': reqGroupInfo,
        '全部成员': reqGroupMembers,
        '全部文章': reqGroupArticles
    }

    if(!props.isLogin){
        navigate('/usercenter')
    }

    React.useEffect(()=>{
        if(!InfoRef.current.init_state[item_selected]){
            reqs[item_selected]()
        }
    })

    React.useEffect(()=>{
        socket.on('getGroupDetailSuccess',(data)=>{
            InfoRef.current.group_info={
                gid:gid,
                groupname:data.groupName,
                intro:data.intro, 
                creatorid: data.creatorid
            }
            InfoRef.current.init_state.详细信息=true;
            onchange()
        })
        socket.on('getGroupMembersSuccess',(data)=>{
            InfoRef.current.member_list=data.members;
            InfoRef.current.init_state.全部成员=true;
            onchange()
        })
        socket.on('getGroupEssaySuccess',(data)=>{
            console.log(data)
            InfoRef.current.article_list=data.essays;
            InfoRef.current.init_state.全部文章=true;
            onchange()
        })
    })

    return(
        <div className='group_detail'>
            <GlobalNaviBar cur_item='组' />
            <h1 className="underline">组：{InfoRef.current.group_info.groupname}</h1>
            <div className="group-row">
                <NaviBar item_selected={item_selected} selectItem={selectItem} items={navibar_items} />
                {item_selected===navibar_items[0]?<GroupInfo group_info={InfoRef.current.group_info} socket={socket} uid={params.uid}/>:
                    item_selected===navibar_items[1]?<Members member_list={InfoRef.current.member_list} />:
                        item_selected===navibar_items[2]?<Articles article_list={InfoRef.current.article_list} />:
                            <div>error</div>}
            </div>
        </div>
    )
}