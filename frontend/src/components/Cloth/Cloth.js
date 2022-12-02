// cloth
import React from "react";
import "./Cloth.css";

export default function ClothDetail(props){
    const [cloth_detail, set_cloth_detail] = React.useState({
        img_src: "https://ts1.cn.mm.bing.net/th/id/R-C.64e3a39dabdc64ab5ca9f0f5535a597d?rik=Qo%2f0pUpy%2byIJmQ&riu=http%3a%2f%2fpic50.photophoto.cn%2f20190317%2f0017031054873654_b.jpg&ehk=mLll4UknAZT%2b1DEDWk%2bkzef5s7ybPhLpfx0dMjU8qls%3d&risl=&pid=ImgRaw&r=0",
        season: "春",
        climate: "晴天",
        situation: "约会",
        band:  "Nike",
        texture: "纯棉"
    })
    const [comment_list, set_comment_list] = React.useState([{
        time: "2022-12-01",
        content_src: "good good good.",
        uid:      0,
        username: "Tom",
    }])

    React.useEffect(() => {
        props.socket.on('getClothesDetailSuccess', (res) => {
            set_cloth_detail(res);
            console.log(res);
        })
        props.socket.emit('getClothesDetail', {pid: 12});
    }, [])
    React.useEffect(() => {
        console.log("adfsfs");
        props.socket.on('getClothesCommentsSuccess', (res) => {
            set_comment_list(res.comments);
            console.log(res);
        })
        props.socket.emit('getClothesComments', {pid: 0});
    }, [])


    return(
        <div>
            <div className="Cloth_head">
                <div className="Cloth_around">
                    <bottom className="Cloth_season">
                        季节:&nbsp;{cloth_detail.season}
                    </bottom>&nbsp;&nbsp;&nbsp;
                    <bottom className="Cloth_climate">
                        适宜天气:&nbsp;{cloth_detail.climate}
                    </bottom>&nbsp;&nbsp;&nbsp;
                    <bottom className="Cloth_situation">
                        适宜场景:&nbsp;{cloth_detail.situation}
                    </bottom>&nbsp;&nbsp;&nbsp;
                    <bottom className="Cloth_band">
                        品牌:&nbsp;{cloth_detail.band}
                    </bottom>&nbsp;&nbsp;&nbsp;
                    <bottom className="Cloth_texture">
                        材质:&nbsp;{cloth_detail.texture}
                    </bottom>
                </div>
                <img src={cloth_detail.img_src} className="cloth_img"/>
            </div>
            <div>
                <h2>相关评论</h2>
                {comment_list.map((comment)=>{return (
                    <div className="Comment_block" key={comment.pid}>
                        <p className="Comment_username">{comment.username}&nbsp;编辑于&nbsp;{comment.time}</p>
                        <div className="Comment_content">{comment.content}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}