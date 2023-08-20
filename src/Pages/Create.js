// Details.js
import React, {useEffect, useState} from 'react';
import {Button, Switch, Tag, Tooltip, Typography, Grid, Input, Form, Select, Modal} from "@arco-design/web-react";
import logo from "../Assets/logo.png";
import _ from "lodash";
import {IconPlus} from "@arco-design/web-react/icon";
import {useNavigate, useParams} from "react-router-dom";
import renderStyle from "../Consts/renderStyle"
import gameType from "../Consts/gameType";
import handleChatGPT from "../Services/handleChatGPT";
import handleDALLE2 from "../Services/handleDALLE2";
import handleDisplayJson from "../Services/handleDisplayJson";

const TextArea = Input.TextArea;
const FormItem = Form.Item;

function Create() {
    const [generated,setGenerated]=useState(false);

    const [form] = Form.useForm();
    const [add_tag] = Form.useForm();

    const [summary, setSummary] = useState('');
    const [details, setDetails] = useState([]);
    const [picture, setPicture] = useState([]);
    const [keyword, setKeyword] = useState([]);

    const navigate = useNavigate();

    const handleGenerate = async (userInput) => {
        setGenerated(true);
        try {
            const raw_summary = await handleChatGPT("Please analyze the following character information for a game, the information only includs rich and imaginative details about character's 'name, age, dressing style, weapoon, background stroy, separated by commas. return a very brief paragraph of plain text content,"+JSON.stringify(userInput),1);
            setSummary(raw_summary);

            const raw_details = await handleChatGPT("Please extract character's 'name, age, dressing style, weapoon, background stroy from the following text, please help me to give more rich details about each of them and return it in JSON format"+raw_summary,0);
            setDetails(JSON.parse(raw_details?.split(",")));

            const raw_keyword = await handleChatGPT("Please identify 10 critical keywords about the character in these content, including the gender of the character, the artstyle, the dressing style and the main characteristic of the character， especially noun and adj, I want to search for reference images based on the keywords, you only need to answer 10 keywords, separated by commas:"+raw_summary,0);
            setKeyword(raw_keyword?.split(","));


            const raw_picture = await handleDALLE2("a fully-body portrait of game character in style"+form.getFieldsValue("render_style")?.render_style+raw_keyword)
            setPicture(raw_picture.data.data);

        } catch (error) {
            console.error('Error fetching response from the server:', error);
        }
    };

    const swapPicItems = (index1, index2) => {
        const updatedList = [...picture];
        const temp = updatedList[index1];
        updatedList[index1] = updatedList[index2];
        updatedList[index2] = temp;
        setPicture(updatedList);
    };



return (
        <div className="card-container-def">
            <div className="card-def">
                <div style={{marginLeft: 32, marginRight: 32, marginBottom: 32, overflow: "hidden"}}>

                    {/*header*/}
                    <div className="card-header">
                        <div className="card-title">
                            Art Synthia
                            Character Generator
                        </div>
                        <div className="card-ID">
                            <Form form={form} labelCol={{span: 5}} wrapperCol={{span: 18}} style={{width: "100%"}}
                                  onSubmit={(values)=>{handleGenerate(values)}}
                            >
                                <FormItem field="id" label={<span className="text-title">ID</span>}>
                                    <Input style={{borderRadius: "2em"}} allowClear
                                           placeholder='Please Enter ID' />
                                </FormItem>
                            </Form>
                        </div>
                    </div>

                    {/*title*/}
                    <div className="center" style={{marginBottom:24}}>
                        <span className="text-title-big">CHARACTER RELATED SETTINGS</span>
                    </div>

                    {/*form & button*/}
                    <div>
                        <Form form={form} labelCol={{span: 5}} wrapperCol={{span: 18}} style={{width: "100%"}}
                              onSubmit={(values)=>{handleGenerate(values)}}
                        >
                            <pre style={{whiteSpace: 'pre-line'}}>
                                <FormItem field="name" label={<span className="text-title">CHARACTER_NAME</span>}>
                                    <Input style={{borderRadius: "2em"}} allowClear
                                           placeholder='Please Enter ' />
                                </FormItem>

                            <FormItem field="character_details"
                                      label={<span className="text-title">CHARACTER_DETAILS</span>}>
                                <TextArea style={{borderRadius: "2em"}} autoSize allowClear autoSize={{ minRows: 2}}
                                          placeholder='Please Enter'/>
                            </FormItem>
                            <FormItem field="game_type" label={<span className="text-title">GAME_TYPE</span>}>
                                <Select
                                    placeholder='Please Select or Input'
                                    style={{ width: "100%" ,borderRadius:"5em"}}
                                    allowClear
                                    labelInValue
                                    allowCreate
                                    options={gameType}
                                >
                                </Select>
                            </FormItem>
                            <FormItem field="render_style"
                                      label={<span className="text-title">RENDER_STYLE</span>}>
                                <Select
                                    placeholder='Please Select or Input'
                                    style={{ width: "100%" ,borderRadius:"5em"}}
                                    allowClear
                                    labelInValue
                                    allowCreate
                                    options={renderStyle}
                                >
                                </Select>
                            </FormItem>
                            <FormItem field="background_story"
                                      label={<span className="text-title">BACKGROUND_STORY</span>}>
                                <TextArea style={{borderRadius: "2em"}} autoSize allowClear autoSize={{ minRows: 2}}
                                          placeholder='Please Enter'/>
                            </FormItem>
                                </pre>
                                <div className="center" style={{flexDirection: "row", gap: "5vw", marginTop: 0}}>
                                    <Button status='warning' shape="round"
                                            style={{fontWeight: 800, width: "20vw"}} >Clear</Button>
                                    <Button shape="round" type="primary" style={{width: "20vw"}} htmlType="submit" >Generate</Button>
                                </div>

                        </Form>



                    </div>

                </div>
            </div>


            {
                generated?

            <div className="card-def">
                <div style={{marginLeft: 32, marginRight: 32, overflow: "hidden"}}>
                    <div className="center" style={{gap: 24, margin: 72}}>
                        <span className="text-title-big">AI GENERATED RESULTS</span>
                    </div>

                    <div className="center" style={{gap: 48, margin: 108}}>
                        {
                            picture.length > 0 ? (
                                    <div className="img-stack">
                                        <div className="img" onClick={()=>swapPicItems(0,2)}>
                                            <img src={picture[0]?.url} height="100%"/>
                                        </div>
                                        <div className="img" onClick={()=>swapPicItems(1,2)}>
                                            <img src={picture[1]?.url} height="100%"/>
                                        </div>
                                        <div className="img" onClick={()=>swapPicItems(2,2)}>
                                            <img src={picture[2]?.url} height="100%"/>
                                        </div>
                                        <div className="img" onClick={()=>swapPicItems(3,2)}>
                                            <img src={picture[3]?.url} height="100%"/>
                                        </div>
                                        <div className="img" onClick={()=>swapPicItems(4,2)}>
                                            <img src={picture[4]?.url} height="100%"/>
                                        </div>
                                    </div>
                                ) :
                                <div className="img-stack">
                                    <div className="img">
                                        <img src={logo} height="100%"/>
                                    </div>
                                    <div className="img">
                                        <img src={logo} height="100%"/>
                                    </div>
                                    <div className="img">
                                        <img src={logo} height="100%"/>
                                    </div>
                                    <div className="img">
                                        <img src={logo} height="100%"/>
                                    </div>
                                    <div className="img">
                                        <img src={logo} height="100%"/>
                                    </div>
                                </div>
                        }
                    </div>

                    <div className="generate-results">




                        {/*details*/}
                        <div className="text-name" style={{margin: 32}}>
                            <span className="text-title">DETAILS</span>
                        </div>
                        <Typography.Paragraph
                            style={{width:"100%",display:'block'}}>
                            <pre style={{ whiteSpace: 'pre-line' }}>
                                {
                                    _.map(details, (value, key) => {
                                        return (
                                            handleDisplayJson(value, key, 0)
                                        )
                                    })
                                }
                            </pre>
                        </Typography.Paragraph>

                        {/*summary*/}
                        <div className="text-name" style={{margin:32}}>
                            <span className="text-title">SUMMARY</span>
                        </div>
                        <div className="text">
                            <Typography.Paragraph style={{width:"100%",display:'block'}}>
                                <pre style={{ whiteSpace: 'pre-line' }}>{summary}</pre>
                            </Typography.Paragraph>
                        </div>


                        {/*keywords*/}
                        <div className="text-name"  style={{margin:32}}>
                            <span className="text-title">KEYWORDS</span>
                        </div>
                        <div className="text" style={{marginBottom: 96, flexWrap: "wrap"}}>
                            {
                                _.map(keyword, (value) => {
                                    return (
                                        <Tag closable={true} style={{margin: '0 16px 16px 0 ', fontWeight: 800}}
                                             color="lime"
                                        >
                                            {value}
                                        </Tag>
                                    )
                                })
                            }

                            <Tag icon={<IconPlus/>}
                                 style={{margin: '0 16px 16px 0 ', fontWeight: 800, cursor: 'pointer',}}
                                 onClick={()=> Modal.success({
                                     title: 'Add Tag',
                                     content:<Form form={add_tag}
                                                   wrapperCol={{span: 24}}
                                                   style={{width: "100%"}}
                                     >
                                         <FormItem field="tag" >
                                             <TextArea style={{borderRadius: "2em"}} autoSize allowClear
                                                       placeholder='Please Enter'/>
                                         </FormItem>
                                     </Form>,
                                     okText:"Confirm",
                                     closable:true,
                                     onOk:()=>{
                                         setKeyword([...keyword, add_tag.getFieldsValue("tag")["tag"]])
                                     }
                                 })
                                 }
                            >
                                Add Tag
                            </Tag>
                        </div>


                    </div>
                </div>
            </div>:null}

            {
                generated?
                <div className="center" style={{flexDirection: "row", gap: "5vw", height: "calc(10vh + 32px)", margin: 0}}>
                    <Button status='warning' shape="round" style={{fontWeight: 800, width: "20vw"}} onClick={()=>handleGenerate(form.getFields())}>Regenerate</Button>
                    <Button shape="round" type="primary" style={{width: "20vw"}}
                            onClick={() => {
                                const new_data=[...JSON.parse(localStorage.getItem('data')),
                                    {
                                        id:form.getFieldsValue("id")?.id ?? "000",
                                        name:form.getFieldsValue("name")?.name ?? "unidentified",
                                        picture:picture[2]?.url ?? logo,
                                        settings:form.getFields() ?? [],
                                        details:details ?? [],
                                        keywords:keyword ?? [],
                                        summary:summary ??"",
                                    }
                                ]
                                localStorage.setItem('data',JSON.stringify(new_data))
                                navigate(`/artsynthia/home/${form.getFieldsValue("id")?.id ?? "000"}`)
                            }}
                    >Save & Back</Button>
                </div> : null
            }

        </div>
    )
}


export default Create;
