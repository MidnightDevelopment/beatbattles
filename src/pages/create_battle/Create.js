import React from 'react';
import moment from 'moment';
import {Form, Button, Typography, Row, DatePicker} from 'antd';
import '../MainPage.less';
import { withRouter } from 'react-router-dom';
import routes from "../routes";

const { RangePicker } = DatePicker;
const { Title } = Typography;
class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startHour: 0,
            startMinute: 0
        }
        this.disabledDate = this.disabledDate.bind(this);
    }

    handleSubmit = () => {
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
