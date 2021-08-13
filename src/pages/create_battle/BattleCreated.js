import React from 'react';
import moment from 'moment';
import {Form, Button, Typography, Row, DatePicker, Result} from 'antd';

import './BattleCreated.less';
const { RangePicker } = DatePicker;
const { Title, Link } = Typography;

class BattleCreated extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startHour: 0,
            startMinute: 0
        }
    }
    render () {
        return (
            <Row className={"center"} align={"middle"} justify={"center"}>
                <Result
                    style={{
                        color: "white"
                    }}
                    status="success"
                    title="Successfully Created Battle"
                    subTitle="Use link midnight.beatbattles.herokuapp.com/15uds8-asdf9348hf to use host controls"
                    extra={[
                        <Button key="buy">Go to battle as host</Button>,
                    ]}
                />
            </Row>

        );
    }
}

export default BattleCreated;