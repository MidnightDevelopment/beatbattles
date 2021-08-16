import React from 'react';
import {
    Form,
    Select,
    Input,
    Button,
    Typography,
    Row,
} from 'antd';
import '../MainPage.less';

const { Option } = Select;
const { Title, Link } = Typography;

const BeatSubmissionForm = () => (
    <>
        <Row justify="center" align="middle">
            <Form justify = "center">
                <Form.Item>
                    <Title style={{ marginBottom: "0px" }}>Submit Link </Title>
                </Form.Item>
                <Form.Item>
                    <Input style={{ marginBottom: "0px" }} placeholder="Soundcloud Link" />
                </Form.Item>
            </Form>
        </Row>
    </>
);

export default BeatSubmissionForm;