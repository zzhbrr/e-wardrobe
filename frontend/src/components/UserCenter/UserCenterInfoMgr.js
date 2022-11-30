import cloth_pic from './materials/cloth.jpg'

const be_type={
    '上衣':'top',
    '下装':'bottom',
    '外套':'coat',
    '鞋子':'shoe',
    '饰品':'ornament'
}
const fe_type={
    'top':      '上衣',
    'bottom':   '下装',
    'coat':     '外套',
    'shoe':     '鞋子',
    'ornament': '饰品'
}
const default_outfit={
    oid:0,
    ing_src:cloth_pic
}
const default_outfits=[default_outfit,default_outfit]

export default class UserCenterInfoMgr{
    states;
    sets;
    socket;
    outfits_ref;

    constructor(props){
        this.socket=props.socket;
        this.sets=props.sets;
        this.states=props.states;
        this.outfits_ref=props.outfits_ref;
        this.socket.on('userInfoAskSuccess',this.handleUserInfo)
        this.socket.on('userInfoChangeSuccess',this.handleUserInfoChange)
        this.socket.on('getOutfitsSuccess',this.handleOutfits)
        this.socket.on('getOutfitsRetURLSuccess',this.handelOutfitImg)
        this.socket.on('getAllClothesSuccess',this.handleAllClothes)
        this.socket.on('getAllArticlesSuccess',this.handleAllArticles)
    }

    reqArticles=()=>{
        this.socket.emit('getAllArticles',{
            uid:        this.states.user_info.UID,
            username:   this.states.user_info.username
        });
    }
    reqClothes=(type)=>{
        this.socket.emit('getAllClothes',{
            uid:        this.states.user_info.UID,
            username:   this.states.user_info.username,
            type:       be_type[type]
        })
    }
    reqUserInfo=(username)=>{
        console.log("username: "+username)
        this.socket.emit('userInfoAsk',{userName:username})
    }
    reqUserInfoChange=(data)=>{
        const tmp = {
            uid:        this.user_info.uid,
            username:   this.user_info.username,
            gender:     data.gender, 
            age:        data.age,
            profession: data.profession
        }
        this.sets.setUserInfo(tmp)
        this.socket.emit('userInfoChange',tmp)
    }
    reqOutfitList=()=>{
        this.socket.emit('getOutfits',{
            askType:'all',
            uid:this.states.user_info.UID,
            oid:-1
        })
        //test code
        // console.log("outfits req")
        // this.handleOutfits({outfits:default_outfits})
    }
    reqOutfitImg=(index,type,pid)=>{
        if(this.outfits_ref.current[index][type].img_src==''){
            console.log(`req img: ${pid} ${type}`)
            this.socket.emit('PID2url',{
                pid:pid,
                type_src:be_type[type],
                index:index
            })
        }
        
        // console.log(this.states.outfit_list)
        // if(this.states.outfit_list==false||this.states.cur_img>=this.states.outfit_list.length) return;
        // // console.log(this.states.outfit_list)
        // let cur=this.states.cur_img;
        // console.log("req img: "+cur)
        // let i;
        // for(i in be_type){
        //     if(this.states.outfit_list[cur][i].img_src===''){
        //         this.socket.emit('PID2url',{
        //             pid:        this.states.outfit_list[cur][i].pid,
        //             type_src:   be_type[i],
        //             index:      cur
        //         });
        //         break;
        //     }
        // }
        // if(i==='饰品'){
        //     this.sets.setCurImg(cur+1)
        // } 
    }

    handelOutfitImg=(data)=>{
        console.log(`rcv img:${data.index} ${data.type} `)
        if(this.outfits_ref.current==false){
            console.log('outfit list null')
            return;
        }
        // console.log(this.states.outfit_list)
        // let outfit_list=this.states.outfit_list;
        // console.log(this.states)
        this.outfits_ref.current[data.index][fe_type[data.type_src]].img_src=data.img_src;
        console.log(this.outfits_ref.current)
        this.sets.onchange()
        // this.sets.setOutfits(outfit_list)
    }

    handleUserInfo=(data)=>{
        // console.log(this.states)
        console.log('rcv userinfo')
        this.sets.setUserInfo(data.userInfo)
    }
    handleUserInfoChange=(data)=>{
        alert(data.messege);
    }
    handleAllArticles=(data)=>{
        this.sets.setArticles(data.articles)
    }
    handleAllClothes=(data)=>{
        this.sets.clothes_sets[fe_type[data.type]](data.clothes)
    }
    handleOutfits=(data)=>{
        this.outfits_ref.current=data.outfits.map((outfit)=>{return({
            oid:    outfit.oid,
            '上衣': {pid: outfit.top_id,      img_src: ''},
            '下装': {pid: outfit.bottom_id,   img_src: ''},
            '外套': {pid: outfit.coat_id,     img_src: ''},
            '鞋子': {pid: outfit.shoe_id,     img_src: ''},
            '饰品': {pid: outfit.ornament_id, img_src: ''}
        })})
        this.sets.onchange();
        // this.sets.setOutfits(tmp_outfit_list)
    }
}