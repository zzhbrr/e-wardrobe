import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Drawer, Radio, Space } from 'antd';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import { Input } from 'antd';
import ChooseRelatedGroups from './chooseRelatedGroups';
const qiniuserver = require('../../../../../qiniuserver/uploadToQiniu'); 


const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function AddArticle({handleAddArticle, socket, uid}) {

    var mdEditor = undefined;
    
    const [open, setOpen] = useState(false);
    var title = "";
    var mdvalue = "";
    var relatedGoups = [];

    const handleChooseGroup = (list) => {
        console.log('checked = ', list);
        relatedGoups = list;
    }

    function onChangeTitle(e) {
        title = e.target.value;
    }
    const showDrawer = () => {
        setOpen(true);
    };
    var observer = {
        next (res) {
            console.log (res.total.percent)
        },
        error (err) {
            console.log (err)
        },
        complete (res) {
            console.log("http://rm4z8n129.hn-bkt.clouddn.com/" + res.key);
            console.log('complete!');
            var relatedGoups_obj = []
            for (let i = 0; i < relatedGoups.length; i++) {
                relatedGoups_obj.push({gid: relatedGoups[i]});
            }
            const data = {content_src: "http://rm4z8n129.hn-bkt.clouddn.com/" + res.key, title:title, uid:uid, relatedGroups:relatedGoups_obj};
            console.log(data);
            setOpen(false);
            handleAddArticle(data);
        }
    }
    const handleSubmit = () => {
        // setOpen(false);
        var blob = new Blob([mdvalue]);
        var file = new File([blob], 'test.md');
        console.log('md file:');console.log(file);

        socket.emit('getToken');
        socket.off('getTokenSuccess');
        socket.on('getTokenSuccess', function (res) {
            console.log(res);
            qiniuserver.uploadfile(file, 'essays/', res.token, observer); 
        });
    };
    function handleEditorChange({html, text}) {    
        console.log('handleEditorChange', html, text)
        mdvalue = text;
    }

    return (
        <div> 
            <div>
                <button className='change_btn' onClick={showDrawer}>
                    <EditIcon style={{float:"left",marginRight:"5px"}}/>
                    新建文章
                </button>
            </div>
            <Drawer title="新建文章" placement={'bottom'} height={'80%'} onClose={()=>setOpen(false)} open={open} 
                extra={
                <Space>
                    <Button onClick={()=>setOpen(false)}>Cancel</Button>
                    <Button type="primary" onClick={handleSubmit}> Submit </Button>
                </Space> }>
                <div>Related Clothes</div>
                <div>
                    <ChooseRelatedGroups socket={socket} uid={uid} handleChooseGroup={handleChooseGroup}>
                        选择相关组
                    </ChooseRelatedGroups>
                </div>
                <h2> Title </h2>
                <Input placeholder="title" onChange={onChangeTitle}/>
                <br></br><br></br>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                
            </Drawer>

        </div>
)}
