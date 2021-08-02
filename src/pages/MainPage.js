import React from 'react';
import {
    Form,
    Select,
    Input,
    Button,
    Typography,
    Row,
} from 'antd';
import './MainPage.less';

const { Option } = Select;
const { Title, Link } = Typography;

const MainPage = () => (
    <>
        <Row className = "front-page-form" justify="center" align="middle">
            <Form justify = "center">
                <Form.Item>
                    <Title style={{ marginBottom: "0px" }}>Midnight Beat Battles </Title>
                </Form.Item>
                <Form.Item>
                    <Input style={{ marginBottom: "0px" }} placeholder="Battle Code" />
                </Form.Item>
                <Form.Item>
                    <Button style={{ marginBottom: "0px" }} htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link href="https://ant.design" target="_blank">
                        create a new battle here
                    </Link>
                </Form.Item>
            </Form>
        </Row>
    </>
);

export default MainPage;