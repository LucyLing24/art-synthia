import React from "react";
import Draggable from "react-draggable";
import DraggableCard from "../Components/DraggableCard";
import _ from "lodash";
import {Button} from "@arco-design/web-react";

function Family(){
    const data = JSON.parse(localStorage.getItem("data"));

    return (
        <div className="card-container" style={{overflowX: "hidden"}}>
            <div className="center">
                <div className="text-name-big" >
                    <span className="text-title">All Characters' Family</span>
                </div>

            </div>

            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {
                    _.map(data, (item) => {
                        return (
                            <DraggableCard item={item}/>
                        )
                    })
                }

            </div>

        </div>
    );
}

export default Family
