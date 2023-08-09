import React, { useState } from 'react';
import _ from "lodash";
import {Tag} from "@arco-design/web-react";

function handleDisplayJson(value, key, indent = 0) {
    if (Array.isArray(value)) { // is array
        return (
            <div style={{marginLeft:`calc( ${indent} * 5vw )`}}>
                <span className="text-title">{key}: </span>
                {
                    _.map(value, (son_value) => {
                        return (
                            <Tag  style={{margin: '0 16px 0px 0 ',fontWeight: 800}}>{son_value}</Tag>
                        )})
                }
            </div>
        )
    } else {
        if (typeof value === "object") { // is object
            {
                return (
                    <div>
                        <span className="text-title">{key}: </span>
                        {
                            _.map(value, (son_value, son_key) => {
                                return handleDisplayJson(son_value, son_key, indent + 1);
                            })
                        }
                    </div>
                )
            }
        } else {
            return (
                <div style={{marginLeft:`calc( ${indent} * 5vw )`}}>
                    <span className="text-title">{key}: </span>
                    {value}
                </div>
            )
        }
    }
}
export default handleDisplayJson;

