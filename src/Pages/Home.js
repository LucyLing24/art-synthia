// Home.js
import React, {useEffect, useRef, useState} from 'react';
import {Button, Card, Grid, Modal, Popover, Select, Tag, Typography} from "@arco-design/web-react";
import logo from "./../Assets/logo.png"
import pic from "./../Assets/pngwing.com.png"
import pic1 from "./../Assets/pngwing.com (1).png"
import pic2 from "./../Assets/pngwing.com (2).png"
import _ from "lodash";
import html2canvas from "html2canvas";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import handleDisplayJson from "../Services/handleDisplayJson";
const Row = Grid.Row;
const Col = Grid.Col;


function Home() {
    const [select,setSelect]=useState(false);
    const [share,setShare]=useState(false);

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
            navigate(`/sketchar/home/0`)
        }
    },[id])

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
            downloadLink.download = "CharacterCard.png";
            downloadLink.click();
        });
    };

    return (
        <div className="card-container">
            <div className="card" ref={containerRef}>
                <div style={{marginLeft: 32, marginRight: 32,overflow:"hidden",maxHeight:"calc( 90vh - 64px)"}}>
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
                            ID: {item.id}
                        </div>
                    </div>
                    <pre style={{whiteSpace: 'pre-line'}}>
                    <Row >
                        <Col span={8}>
                            <div className="center">
                                <img src={item?.picture?.[2]?.url ?? logo} width="100%" />
                                <div className="text-name" style={{marginTop:24}}>
                                    <span className="text-title">NAME: {item.name}</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={16} >
                            <div style={{marginTop: 64}}>
                                <div style={{overflow: "scroll", maxHeight: "calc( 90vh - 444px)"}}>

                                    {
                                        _.map(item?.details, (value, key) => {
                                            return (
                                                handleDisplayJson(value, key, 0)
                                            )
                                        })
                                    }
                                </div>
                                <div className="text" style={{flexWrap:"wrap",maxHeight:"68px",overflow:'scroll'}}>
                                    <span className="text-title">KEYWORDS:</span>
                                    {
                                        _.map(item?.keywords, (value) => {
                                            return (
                                                <Tag style={{ margin: '0 16px 16px 0 ' ,fontWeight:800}} color="lime">
                                                    {value}
                                                </Tag>
                                            )
                                        })
                                    }
                                </div>
                                <Button style={{background:"rgba(255,255,255,0.5)",marginRight:12}} status="warning" shape="round" type="text"  onClick={()=>{navigate(`/sketchar/profile/${id}`)}}><span className="text-title">view profile -> </span></Button>
                                <Button style={{background:"rgba(255,255,255,0.5)",marginRight:12}} status="warning" shape="round" type="text"  onClick={()=>{navigate(`/sketchar/chat/${id}`)}}><span className="text-title">chat with character -> </span></Button>
                                <Button style={{background:"rgba(255,255,255,0.5)"}} status="warning" shape="round" type="text"  onClick={()=>{navigate(`/sketchar/family/${id}`)}}><span className="text-title">family tree -> </span></Button>
                            </div>
                        </Col>
                    </Row>
                    </pre>
                </div>
            </div>
            <div className="center" style={{flexDirection:"row",gap:"5vw",height:"calc(10vh + 32px)",margin:0}}>
                <Button status='warning' shape="round"  style={{fontWeight:800}} onClick={()=>{setSelect(true)}}>Select Another Character</Button>
                <Button shape="round" type="primary" style={{width:"30vw"}} onClick={()=>{navigate(`/sketchar/create`)}}>Create A New Character</Button>
                <Button color="lime" shape="round" type="default" style={{fontWeight:800}} onClick={()=>{setShare(true)}}>Share</Button>
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
                        onChange={(item)=>{setItem(_.find(options,["id",item?.value]));navigate(`/sketchar/home/${item?.value}`)}}
                    >
                    </Select>
                </Modal>
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
                        <Button status='warning' shape="round"  style={{fontWeight:800}} onClick={handleDownload}>Download</Button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Home;
