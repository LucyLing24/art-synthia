import {
    Button,
    Card,
    Input, Modal,
    PageHeader, Select,
    Tag,
} from "@arco-design/web-react";
import React, {useEffect, useState} from "react";
import ChatDialogue from "../Components/ChatDialogue";
import chatBot from "../Assets/logo.png"
import chatMan from "../Assets/logo.png"
import {useNavigate, useParams} from "react-router-dom";
import _ from "lodash";
import KeywordArea from "../Components/KeywordArea";

function Chat(){
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [select,setSelect]=useState(false);

    const options = JSON.parse(localStorage.getItem("data"));
    const [item,setItem]=useState({})

    const navigate = useNavigate();
    const {id}=useParams()

    useEffect(()=>{
        if(id){
            setItem(_.find(options,["id",id]) ?? _.find(options,["id","0"]));
        }
        else {
            setItem(_.find(options,["id","0"]));
        }
    },[id])

    // const handleSendMessage = () => {
    //     if (inputText.trim() !== '') {
    //         const newMessage = {
    //             message: inputText,
    //             isLeft: false,
    //             avatar: chatBot,
    //         };
    //
    //         // @ts-ignore
    //         setMessages([...messages, newMessage]);
    //         setInputText('');
    //         localStorage.setItem('messages',JSON.stringify([...messages, newMessage]));
    //
    //         postIdeaValidation({user_input:inputText}).then((res) => {
    //             setOutputText(res?.data ?? "")
    //             setWaiting(false)
    //         }).catch((e)=>{
    //             console.log(e)
    //             setOutputText("Sorry something went wrong. Please try it again.");
    //         })
    //     }
    // };

    const handleReplyMessage = (reply) => {
        if (reply.trim() !== '') {
            const newMessage = {
                message: reply,
                isLeft: true,
                avatar: chatMan,
            };

            // @ts-ignore
            setMessages([...messages, newMessage]);
            localStorage.setItem('messages',JSON.stringify([...messages, newMessage]));
        }
    };

    const handleInputChange = (data) => {
        setInputText(data);
    };
    const handleRestart = (data) => {
        localStorage.setItem('messages',JSON.stringify([]));
        setMessages([]);
    };

    const handleSendMessage = () => {
        if (inputText.trim() !== '') {
            console.log("WebSocket send message:",inputText)
            setInputText('');
        }
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <div  className="card-container" style={{overflowX: "hidden"}}>

        <Card bordered={false} className="content-card" >
            <PageHeader
                style={{background: 'var(--color-bg-2)'}}
                title={
                    <div className="text-name">
                        <span className="text-title">Chat With Character</span>
                    </div>
                }
                subTitle={
                    <div className="text-name">
                        <span className="text-title-small" >{item?.name}</span>
                        <div style={{marginLeft:24}}>

                            <KeywordArea item={item?.keywords}/>

                        </div>
                    </div>
                }
                extra={
                    <div>

                    </div>
                }
            >
            </PageHeader>
            <div>
                <div style={{height: " calc( 100vh - 380px )",overflowY:"scroll"}}>
                    {messages.map((message, index) => (
                        <ChatDialogue
                            key={index}
                            message={message.message}
                            isLeft={message.isLeft}
                            avatar={message.isLeft? chatBot:chatMan}
                        />
                    ))}
                </div>
                <div className="step-btn" style={{marginBottom:40,marginTop:40,position: 'absolute', bottom: 0,
                    width: " calc( 100% - 50px )", height: 100}}>
                    <Input.TextArea
                        autoSize={{minRows: 2, maxRows: 2}}
                        className="chat-input"
                        value={inputText}
                        placeholder="Type your message..."
                        onChange={handleInputChange}
                    />
                    <Button
                        onClick={handleSendMessage}
                        shape='round'
                        type='primary'
                    >Send</Button>
                    <Button
                        onClick={handleRestart}
                        shape='round'
                        style={{marginLeft:12,fontWeight:700}}
                    >Re-start</Button>
                </div>
            </div>
        </Card>
            <div className="center" style={{flexDirection:"row",gap:"5vw",height:"calc(10vh + 32px)",margin:0}}>
                <Button status='warning' shape="round"  style={{fontWeight:800}} onClick={()=>{setSelect(true)}}>Select Another Character</Button>
                <Button color="lime" shape="round" type="default" style={{fontWeight:800}} onClick={()=>{navigate(`/artsynthia/home/${item?.value}`)}}>Back</Button>
                <Modal
                    simple
                    title={<span className="text-title">Select Another Character</span>}
                    visible={select}
                    okText='ok'
                    cancelText='Cancel'
                    cancelButtonProps={{shape:"round",style:{fontWeight:800}}}
                    okButtonProps={{shape:"round"}}
                    onOk={() => setSelect(false)}
                    onCancel={() => setSelect(false)}
                >
                    <Select
                        value={id}
                        placeholder='Please select'
                        style={{ width: "100%" ,borderRadius:"2em"}}
                        allowClear
                        labelInValue
                        options={_.map(options,(option)=>{
                            return {value:option?.id,label:option?.name+" ("+option?.id+")",item:option}
                        })}
                        onChange={(item)=>{setItem(_.find(options,["id",item?.value]));navigate(`/artsynthia/chat/${item?.value}`)}}
                    >
                    </Select>
                </Modal>
            </div>
        </div>
    );
}
export default Chat
