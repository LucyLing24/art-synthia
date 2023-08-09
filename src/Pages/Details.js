// Details.js
import React, {useEffect, useRef, useState} from 'react';
import {Button, Switch, Tag, Tooltip, Typography, Grid, Input, Form, Select, Modal} from "@arco-design/web-react";
import logo from "../Assets/logo.png";
import _ from "lodash";
import {useNavigate, useParams} from "react-router-dom";
import html2canvas from "html2canvas";
import handleDisplayJson from "../Services/handleDisplayJson";

function Details() {
    const options = JSON.parse(localStorage.getItem("data"));
    const [item,setItem]=useState(_.find(options,["id",'000']))
    const [share,setShare]=useState(false);
    console.log(options,111)
    const navigate = useNavigate();

    const {id}=useParams()
    useEffect(()=>{
        if(id){
            setItem(_.find(options,["id",id]));
        }
    },[])

    // download
    const containerRef = useRef(null);
    const handleDownload = () => {
        const container = containerRef.current;

        // 使用 html2canvas 将容器绘制为图片
        html2canvas(container).then((canvas) => {
            // 将 canvas 转换为图片的数据 URL
            const imageURI = canvas.toDataURL("image/png");

            // 创建下载链接
            const downloadLink = document.createElement("a");
            downloadLink.href = imageURI;
            downloadLink.download = "CharacterProfile.png";
            downloadLink.click();
        });
    };

return (
        <div className="card-container-def">
            <div className="card-def" ref={containerRef}>
                <div style={{marginLeft: 32, marginRight: 32, marginBottom: 32, overflow: "hidden"}}>

                    {/*header*/}
                    <div className="card-header">
                        <div className="card-title">
                            Art Synthia
                            Character Generator
                        </div>
                        <div className="card-ID">
                            ID: {item?.id}
                        </div>
                    </div>

                    {/*title*/}
                    <div className="center">
                        <span className="text-title-big">{item?.name}'s Profile</span>
                    </div>


                    {/*pic*/}
                    <div className="center" style={{gap: 48}}>
                        <div className="img-container">
                            <img src={item?.picture ?? logo} width="100%" />
                        </div>
                    </div>


                    {/*other info*/}
                    <div style={{marginLeft: 72, marginRight: 72, marginBottom: 108}}>
                        <pre style={{whiteSpace: 'pre-line'}}>

                            {/*details*/}

                            {
                                item?.settings ?
                                    <div>
                                        <div className="text-name" style={{margin: 32}}>
                                            <span className="text-title">SETTINGS</span>
                                        </div>
                                        {
                                            _.map(item?.settings, (value, key) => {
                                                return (
                                                    handleDisplayJson(value, key, 0)
                                                )
                                            })
                                        }
                                    </div>:null
                            }

                            {
                                item?.details ?
                                    <div>
                                        <div className="text-name" style={{margin: 32}}>
                                            <span className="text-title">DETAILS</span>
                                        </div>
                                        {
                                            _.map(item?.details, (value, key) => {
                                                return (
                                                    handleDisplayJson(value, key, 0)
                                                )
                                            })
                                        }
                                    </div> : null
                            }


                            {
                                item?.summary?.length>0 ?
                                    <div>
                                        <div className="text-name" style={{margin: 32}}>
                                            <span className="text-title">SUMMARY</span>
                                        </div>
                                        <div className="text">
                                            {item?.summary}
                                        </div>
                                    </div> : null
                            }
                        </pre>

                        {/*keywords*/}

                        <div className="text-name" style={{margin: 32}}>
                            <span className="text-title">KEYWORDS</span>
                        </div>
                        <div className="text" style={{marginBottom: 48,flexWrap:"wrap"}}>
                                {
                                    _.map(item?.keywords, (value) => {
                                        return (
                                            <Tag style={{margin: '0 16px 16px 0 ', fontWeight: 800}}
                                                 color="lime">
                                                {value}
                                            </Tag>
                                        )
                                    })
                                }
                        </div>
                    </div>

                </div>
            </div>

            <div className="center" style={{flexDirection: "row", gap: "5vw", height: "calc(10vh + 32px)", margin: 0}}>
                <Button status='warning' shape="round" style={{fontWeight: 800, width: "20vw"}}
                        onClick={() => {navigate(`/home/${id}`)}}>
                    Back
                </Button>
                <Button shape="round" type="primary" style={{width: "20vw"}} onClick={()=>{navigate(`/edit/${id}`)}}>Edit</Button>
                <Button color="lime" shape="round" type="default" style={{width: "20vw",fontWeight:800}} onClick={()=>{setShare(true)}}>Share & Download</Button>
            </div>
            <Modal
                simple
                title={<span className="text-title">Share Character</span>}
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
                    <span className="text-title" style={{fontSize:12}}>PICTURE</span>
                    <Button status='warning' shape="round"  style={{fontWeight:800}} onClick={handleDownload}>Download Role Profile</Button>
                </div>
            </Modal>
        </div>
    )
}


export default Details;
