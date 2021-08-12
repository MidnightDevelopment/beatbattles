import React from 'react';

import { Form, Input, Button, Typography, Row } from 'antd';
import './MainPage.less';
import { useHistory } from 'react-router-dom';
import routes from './routes.js';
const { Title, Link } = Typography;
const MainPage = () => {

    const history = useHistory();

    const handleSubmit = () => {
        history.push(routes.submitBeat);
    }

    const handleCreate = () => {
        history.push(routes.create);
    }

    return (
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
                        <Button style={{ marginBottom: "0px" }}
                                onClick={handleSubmit}
                                htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link onClick={handleCreate} target="_blank">
                            create a new battle here
                        </Link>
                    </Form.Item>
                </Form>
            </Row>
        </>
    );
}

export default MainPage;