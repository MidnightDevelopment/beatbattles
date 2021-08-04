import {Steps, Button, message, Row, Col, Typography} from 'antd';
import React from 'react';
import './Submission.less';
import BeatSubmissionForm from "./submission-subpages/BeatSubmissionFrom";
import RankBeats from "./submission-subpages/RankBeats";
import Wait from "./submission-subpages/Wait"
const { Title, Link } = Typography;

const { Step } = Steps;

const start = (
    <>
        <Title hello/>
    </>
);

const steps = [
    {
        title: 'Submit',
        content: <BeatSubmissionForm/>,
    },
    {
        title: 'Rank',
        content: <RankBeats/>,
    },
    {
        title: 'Wait',
        content: <Wait/>,
    },
];

const Submission = () => {
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    return (
        <>
            <Row
                className = "submission-form"
                type="flex"
                style={{ alignItems: "center" }}
                justify="center"
                align = "middle">
                <Col span = {10}>
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <div className="steps-content">{steps[current].content}</div>
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <Button onClick={() => next()} block>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button onClick={() => message.success('Processing complete!')} block>
                                Done
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Submission;