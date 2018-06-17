import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const Stats = (props)=>{
    return(
        <div className="stats">
            <h3>Total {props.total}€</h3>
            <div className="graph">
                <Sparklines data={props.checkOuts}>
                    <SparklinesLine color="blue" />
                </Sparklines>
            </div>
        </div>
    );
};

export default Stats;