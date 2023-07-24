// Details.js
import React, {useEffect, useState} from 'react';
import {Button, Switch, Tag, Tooltip, Typography, Grid, Input, Form} from "@arco-design/web-react";
import logo from "../Assets/logo.png";
import _ from "lodash";
import {IconPlus} from "@arco-design/web-react/icon";
import items from "../Consts";
import {useNavigate, useParams} from "react-router-dom";
import format from "../Consts/form"

const Row = Grid.Row;
const Col = Grid.Col;
const TextArea = Input.TextArea;
const FormItem = Form.Item;

function Details() {
    const [gen,setGen]=useState(false);
    const options = items;
    const [item,setItem]=useState()

    const navigate = useNavigate();

    const {id}=useParams()
    useEffect(()=>{
        if(id){
            const newItem=_.find(options,["id",id]);
            setItem(newItem);
        }
    },[])
    console.log(item)

    return (
        <div className="card-container-def">
            <div className="card-def">
                <div style={{marginLeft: 32, marginRight: 32, marginBottom: 32, overflow: "hidden"}}>

                    {/*header*/}
                    <div className="card-header">
                        <div className="card-title">
                            Arcana Forge
                            Character Generator
                        </div>
                        <div className="card-ID">
                            ID: <Input style={{width: 300, borderRadius: "2em"}} allowClear
                                       placeholder='Please Enter ID' value={item?.id}/>
                        </div>
                    </div>

                    {/*title*/}
                    <div className="center">
                        <span className="text-title">CHARACTER RELATED SETTINGS</span>
                    </div>

                    {/*form & button*/}
                    <div>
                        <Form labelCol={{span: 4}} style={{width: "100%"}} autoComplete='off'>
                            {
                                _.map(format, (value, key) => {
                                    return (
                                        <div className="text">
                                            <FormItem label={<span>{key.toUpperCase()}:</span>} >
                                                <TextArea style={{borderRadius: "2em"}} autoSize allowClear
                                                          placeholder='Please Enter'  />
                                            </FormItem>
                                        </div>
                                    )
                                })
                            }
                        </Form>

                        <div className="center" style={{flexDirection: "row", gap: "5vw", marginTop: 0}}>
                            <Button status='warning' shape="round"
                                    style={{fontWeight: 800, width: "20vw"}}>Clear</Button>
                            <Button shape="round" type="primary" style={{width: "20vw"}} onClick={()=>{setGen(true)}}>Generate</Button>
                        </div>
                    </div>

                </div>
            </div>


            {
                gen?

            <div className="card-def">
                <div style={{marginLeft: 32, marginRight: 32, overflow: "hidden"}}>
                    <div className="center" style={{gap: 24, margin: 72}}>
                        <span className="text-title">AI GENERATED RESULTS</span>
                    </div>
                    <div className="center" style={{gap: 48, margin: 72}}>
                        <div className="img-stack">
                            <div className="img">
                                <img src={logo} width="100%"/>
                            </div>
                            <div className="img">
                                <img src={logo} width="100%"/>
                            </div>
                            <div className="img">
                                <img src={logo} width="100%"/>
                            </div>
                            <div className="img">
                                <img src={logo} width="100%"/>
                            </div>
                            <div className="img">
                                <img src={logo} width="100%"/>
                            </div>
                        </div>

                        <div className="text-name">
                            <span className="text-title">NAME:</span>
                            <Typography.Text
                                editable
                                copyable>
                                {item.name}
                            </Typography.Text>
                        </div>
                    </div>

                    <div className="generate-results">
                        {
                            _.map(item?.details, (value, key) => {
                                return (
                                    <div className="text">
                                        <span className="text-title">{key.toUpperCase()}:</span>
                                        <Typography.Paragraph
                                            editable
                                            copyable>
                                            {value}
                                        </Typography.Paragraph>
                                    </div>
                                )
                            })
                        }
                        <div className="text">
                            <span className="text-title">KEYWORDS:</span>
                            {
                                _.map(item?.keywords, (value) => {
                                    return (
                                        <Tag closable={true} style={{margin: '0 16px 16px 0 ', fontWeight: 800}}
                                             color="lime">
                                            {value}
                                        </Tag>
                                    )
                                })
                            }
                            <Tag icon={<IconPlus/>}
                                 style={{margin: '0 16px 16px 0 ', fontWeight: 800, cursor: 'pointer',}}>
                                Add Tag
                            </Tag>
                        </div>
                    </div>
                </div>
            </div>:null}

            {
                gen?
                <div className="center" style={{flexDirection: "row", gap: "5vw", height: "calc(10vh + 32px)", margin: 0}}>
                    <Button status='warning' shape="round" style={{fontWeight: 800, width: "20vw"}}>Cancel</Button>
                    <Button shape="round" type="primary" style={{width: "20vw"}} onClick={() => {navigate(`/home/${id}`)
                    }}>Save & Back</Button>
                </div>:null
            }

        </div>
    )
}


export default Details;
