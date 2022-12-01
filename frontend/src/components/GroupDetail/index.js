import NaviBar from "../NaviBar"
import { useNavigate } from "react-router-dom";
import Members from "./Members";
import GroupInfo from "./GroupInfo";
import Articles from "./GroupArticles";

const navibar_items=['详细信息','全部成员','全部文章']

export default function Group(props){
    const socket=props.socket;
    const isLogin=props.isLogin;
    const group_name=props.group_name;

    const [item_selected, selectItem]=React.useState(navibar_items[0]);
    const InfoRef=React.useRef({
        group_info:{uid:-1, groupname:group_name},
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
    return(
        <div className="main_page">
            <h1 className="underline">组</h1>
            <div className="flex-row">
                <NaviBar item_selected={item_selected} selectItem={selectItem} items={navibar_items} />
                {item_selected===navibar_items[0]?<GroupInfo/>:
                    item_selected===navibar_items[1]?<Members/>:
                        item_selected===navibar_items[2]?<Articles/>:
                            <div>error</div>}
            </div>
        </div>
    )
}