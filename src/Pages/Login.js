// Home.js
import React, {useState} from 'react';
import {Button,  Form, Input, Modal, Typography} from "@arco-design/web-react";
import pic from "./../Assets/pngwing.com.png"
import pic1 from "./../Assets/pngwing.com (1).png"
import pic2 from "./../Assets/pngwing.com (2).png"
import {useNavigate } from "react-router-dom";

import items from "../Consts/defaultCharactor"
import handleChatGPT from "../Services/handleChatGPT";

const FormItem = Form.Item;
const TextArea = Input.TextArea;


function Login() {
    const [manual,setManual]=useState(false);
    const [share,setShare]=useState(false);

    const navigate = useNavigate();
    const [form] = Form.useForm();

    function isValidInvitationCode(invitationCode) {
        const invitationCodeRegex = /^121224$/;
        return invitationCodeRegex.test(invitationCode);
    }
    function isValidApiKey(apiKey) {
        const apiKeyRegex = /^sk-[0-9a-zA-Z]{48}$/;
        return apiKeyRegex.test(apiKey);
    }

    return (
        <div className="card-container">
            <div className="card" >
                <div style={{marginLeft: 32, marginRight: 32,overflow:"hidden"}}>
                    <img
                        src={pic1}
                        style={{zIndex: 0,position: "absolute",top:40,right:40,width:300,opacity: 0.7,filter:"contrast(10%)"}}/>
                    <img
                        src={pic}
                        style={{zIndex: 0,position: "absolute",top:20,right:200,width:250,opacity: 0.5,filter:"contrast(10%)"}}/>
                    <img
                        src={pic2}
                        style={{zIndex: 0,position: "absolute",width:"60%",opacity: 0.5,filter:"contrast(30%)"}}/>
                    <div className="card-header">
                        <div className="card-title">
                            Art Synthia
                            Character Generator
                        </div>
                        <div className="card-ID">
                            ID: 000
                        </div>
                    </div>

                    <div className="center">
                        <span className="text-title">WELCOME TO ART SYNTHIA! </span>
                    </div>
                    <pre style={{whiteSpace: 'pre-line'}}>
                    <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 12}} style={{width: "100%"}}
                          onSubmit={async (values) => {
                              localStorage.setItem('api_key', values['openai_api_key']);
                              localStorage.setItem('data', JSON.stringify(items));
                              try{
                                  if(await handleChatGPT("hi,test connect!", 1)){
                                      navigate(`/artsynthia/home/000`)
                                  }
                              }
                              catch (e){
                                  window.alert("API key error, please provide a new one!")
                              }
                          }}
                    >
                        <FormItem field="invitation_code" label={<span className="text-title">INVITATION CODE</span>} rules={[
                            {
                                validator(value, cb) {
                                    if (!isValidInvitationCode(value)) {
                                        return cb('Please enter a valid invitation code');
                                    }
                                    return cb();
                                },
                            },
                        ]}>
                            <TextArea style={{borderRadius: "2em"}} autoSize allowClear placeholder='Please enter 6-digit invitation code'/>
                        </FormItem>
                        <FormItem extra={<div>Visit <a href="https://platform.openai.com/account/api-keys">https://platform.openai.com/account/api-keys</a> to get a OpenAI API key</div>} field="openai_api_key" label={<span className="text-title">OPENAI API KEY</span>} rules={[
                            {
                                validator(value, cb) {
                                    if (!isValidApiKey(value)) {
                                        return cb('API key format: sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                                    }
                                    return cb();
                                },
                            },
                        ]}>
                            <TextArea style={{borderRadius: "2em"}} autoSize allowClear placeholder='API key format: sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'/>
                        </FormItem>

                        <div className="center" style={{flexDirection: "row", gap: "5vw", marginTop: 36}}>
                            <Button status="warning" shape="round" type="text" style={{width:"100%"}} htmlType="submit" ><span className="text-title">ENTER -> </span></Button>
                        </div>
                    </Form></pre>


                </div>
            </div>
            <div className="center" style={{flexDirection:"row",gap:"5vw",height:"calc(10vh + 32px)",margin:0}}>
                <Button status='warning' shape="round"  style={{fontWeight:800, width:"24vw"}} onClick={()=>{setManual(true)}}>User Manual</Button>
                <Button color="lime" shape="round" type="default" style={{fontWeight:800,width:"24vw"}} onClick={()=>{setShare(true)}}>Share Website</Button>
                <Modal
                    simple
                    title={<span className="text-title">User Manual</span>}
                    visible={manual}
                    okText='ok'
                    cancelText='Cancel'
                    cancelButtonProps={{shape:"round",style:{fontWeight:800}}}
                    okButtonProps={{shape:"round"}}
                    onOk={() => setManual(false)}
                    onCancel={() => setManual(false)}
                >
                </Modal>
                <Modal
                    simple
                    title={<span className="text-title">Share Website</span>}
                    visible={share}
                    okText='ok'
                    cancelText='Cancel'
                    cancelButtonProps={{shape:"round",style:{fontWeight:800}}}
                    okButtonProps={{shape:"round"}}
                    onOk={() => setShare(false)}
                    onCancel={() => setShare(false)}
                >
                    <div className="center" style={{alignItems:'center',gap:12}} >
                        <span className="text-title" style={{fontSize:12}}>LINKAGE</span>
                        <Typography.Text copyable>
                            {window.location.href}
                        </Typography.Text>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Login;
