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
                    title="Successfully Purchased Cloud Server ECS!"
                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                        <Button key="buy">Buy Again</Button>,
                    ]}
                />
            </Row>

        );
    }
}

export default BattleCreated;