// src/components/DraggableCard.js
import React, {useRef} from 'react';
import {Card, Avatar, Typography, Space} from '@arco-design/web-react';
import {IconThumbUp, IconShareInternal, IconMore} from '@arco-design/web-react/icon';
import Draggable from "react-draggable";
import logo from "../Assets/logo.png";
const {Meta} = Card;

const DraggableCard = (data) => {
    const {item}=data
    const draggleRef = useRef(null);
    const onStart = (_event, uiData) => {
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
    };
    return (
        <Draggable nodeRef={draggleRef}
                   onStart={(event, uiData) => onStart(event, uiData)}
        >
            <div ref={draggleRef}
                 style={{ margin:24 }}>
                <Card

                    bordered={false}
                    style={{width: 240,borderRadius:36}}
                    cover={
                            <img src={item?.picture?.[2] ?? logo} style={{width: 240,borderRadius:"36px 36px 0px 0px"}}/>
                    }
                    actions={[
                        <span className='icon-hover'>
                            <IconShareInternal/>
                        </span>,
                        <span className='icon-hover'>
                             <IconMore/>
                         </span>,
                    ]}
                >
                    <Meta
                        avatar={
                            <Space>
                                <Avatar size={24}><img src={item?.picture?.[2] ?? logo} width="100%"/></Avatar>
                                <span className="text-title-small">{item?.name}</span>
                            </Space>
                        }
                    />
                </Card>
            </div>
        </Draggable>
    );
};

export default DraggableCard;


