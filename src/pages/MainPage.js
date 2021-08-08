import React from 'react';
import routes from "./routes";
import { Form, Input, Button, Typography, Row } from 'antd';
import './MainPage.less';
const { Title, Link } = Typography;
class MainPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
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
                                    onClick={()=> this.props.history.push(routes.submit)}
                                    htmlType="submit" block>
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
        )
    }
}

export default MainPage;