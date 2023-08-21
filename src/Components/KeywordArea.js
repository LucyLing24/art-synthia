import _ from "lodash";
import {Tag} from "@arco-design/web-react";
import React from "react";

function KeywordArea(data){
    const {item}=data
    return(
            <div  style={{maxWidth:"40vw"}}>
                {
                    _.map(item, (value) => {
                        return (
                            <Tag style={{margin: '0 10px 0px 0 ', fontWeight: 800}}
                                 color="lime">
                                {value}
                            </Tag>
                        )
                    })
                }
            </div>
    )
}

export default KeywordArea
