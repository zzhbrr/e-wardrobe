import React from "react";
import "./all_outfits.css"

var tmp_list = [];

export default function Outfits({socket, userName, UID}){
    // const default_product={
    //     pid:    0,
    //     src:    "https://www.runoob.com/images/pulpit.jpg"
    // }
    // const default_outfit={
    //     oid:        0,
    //     name:       "default",
    //     upwear:     default_product,
    //     downwear:   default_product,
    //     coat:       default_product,
    //     shoe:       default_product,
    //     decoration: default_product
    // }
    // var outfit_list = [];
    // const [on_change,set_onchange]=React.useState(false);
    // function change(){
    //     set_onchange(!on_change);
    // }
    function view_product(pid)
    {
        
    }

    const [outfit_list, set_outfit_list] = React.useState([]);



    React.useEffect(()=>{
        console.log('emit to ask outfits');
        socket.on('getOutfitsSuccess', (data)=>{
            console.log('get outfits success');
            console.log(data);
            socket.on('PID2urlSuccess', (res)=>{
                tmp_list[res.index][res.type_src]=res.img_src;
                set_outfit_list(tmp_list);
            });
            socket.on('PID2urlFailed', (res)=>{console.log(res.message);});
            for (var i = 0; i < data.outfits.length; i++) {
                console.log('emit to ask product url');
                socket.emit('PID2url', {pid: data.outfits[i].coat_id, type_src: 'coat_src', index: i});
                socket.emit('PID2url', {pid: data.outfits[i].bottom_id, type_src: 'bottom_src', index: i});
                socket.emit('PID2url', {pid: data.outfits[i].shoe_id, type_src: 'shoe_src', index: i});
                socket.emit('PID2url', {pid: data.outfits[i].ornament_id, type_src: 'ornament_src', index: i});
                socket.emit('PID2url', {pid: data.outfits[i].top_id, type_src: 'top_src', index: i});
            }
            tmp_list=data.outfits;
            console.log(tmp_list);
        });
        socket.on('getOutfitsFailed', (data)=>{
            console.log(data.message);
        });
        socket.emit('getOutfits', {askType: 'all', userName: userName, uid: UID});
    },[]);

    return(
        <div className="outfits">
            <h1>全部穿搭</h1>
            <div className="list">
                {outfit_list.map((outfit)=>
                    <div className="outfit_card" key={outfit.oid}>
                        <div className="product_card" onClick={view_product(outfit.top_pid)}>
                            <div className="outfit_content">上衣</div>
                            {/* <img src={outfit.upwear.src} className="outfit_img"/> */}
                            <img src={outfit.top_src} className="outfit_img"/>
                        </div>
                        <div className="product_card" onClick={view_product(outfit.bottom_id)}>
                            <div className="outfit_content">下装</div>
                            {/* <img src={outfit.downwear.src} className="outfit_img"/> */}
                            <img src={outfit.bottom_src} className="outfit_img"/>
                        </div>
                        <div className="product_card" onClick={view_product(outfit.coatid)}>
                            <div className="outfit_content">外套</div>
                            {/* <img src={outfit.coat.src} className="outfit_img"/> */}
                            <img src={outfit.coat_src} className="outfit_img"/>
                        </div>
                        <div className="product_card" onClick={view_product(outfit.shoe_id)}>
                            <div className="outfit_content">鞋子</div>
                            {/* <img src={outfit.shoe.src} className="outfit_img"/> */}
                            <img src={outfit.shoe_src} className="outfit_img"/>
                        </div>
                        <div className="product_card" onClick={view_product(outfit.ornament_id)}>
                            <div className="outfit_content">饰品</div>
                            {/* <img src={outfit.decoration.src} className="outfit_img"/> */}
                            <img src={outfit.ornament_src} className="outfit_img"/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}