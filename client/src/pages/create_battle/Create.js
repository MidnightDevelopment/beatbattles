import React from 'react';
import moment from 'moment';
import {Form, Button, Typography, Row, DatePicker, message} from 'antd';
import '../MainPage.less';
import { withRouter } from 'react-router-dom';
import routes from "../routes";
import {state} from "pg/lib/native/query";

const { RangePicker } = DatePicker;
const { Title } = Typography;
class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
        }
        this.onCalendarChange = this.onCalendarChange.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
    }

    makeid(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


    onCalendarChange (dates, dateStrings, info) {
        console.log('hello')
        console.log(dateStrings)

        this.setState({
            startDate: dateStrings[0],
            endDate: dateStrings[1]
        })
    }

    handleSubmit  = async e => {
        if (this.state.startDate === null || this.state.endDate === null) {
            message.error('Range is invalid!');
            return;
        }

        const body = {
            "id": this.makeid(6),
            "startDate": this.state.startDate,
            "endDate": this.state.endDate
        };

        const response = await fetch("http://localhost:5000/battles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        this.props.history.push(routes.battleCreated);
    }

    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledDate(current) {
        return current < moment().endOf('day');
    }

    render () {
        return (
            <>
                <Row className="front-page-form" justify="center" align="middle">
                    <Form justify="center">
                        <Form.Item>
                            <Title style={{marginBottom: "0px"}}>Create Beat Battle </Title>
                        </Form.Item>
                        <Form.Item>
                            <RangePicker
                                onCalendarChange={this.onCalendarChange}
                                disabledDate={this.disabledDate}
                                showTime={{
                                    hideDisabledOptions: true,
                                    defaultValue: [moment('00:00', 'HH:mm'), moment('00:00', 'HH:mm')],
                                }}
                                format="YYYY-MM-DD HH:mm"
                            />

                        </Form.Item>
                        <Form.Item>
                            <Button style={{marginBottom: "0px"}}
                                    htmlType="submit" block onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </>
        );
    }
}

export default withRouter(Create)
