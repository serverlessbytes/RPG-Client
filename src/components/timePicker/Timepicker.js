import { Col, Form, Row, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import React, { useEffect, useState } from 'react'

const Timepicker = ({ getdata , value}) => {

    const [state, setState] = useState({
        hours: "",
        minutes: "",
        second: "",
    })

    const onChangeHandle = (e, name) => {
        setState({ ...state, [name]: e })
    }

    useEffect(() => {
        if (state.second !== '') {
            getdata(`${state.hours}:${state.minutes}:${state.second}`)
        }
    }, [state])

    useEffect(() => {
        if (value) {
            setState({ ...state, hours: value.split(":")[0],minutes:  value.split(":")[1], second: value.split(":")[2] }) 
        }
    }, [value])

    return (
        <Col lg={11} md={11} sm={24} xs={24} className="addpartnercourses">
            <Form>
                <Row gutter={[16, 24]}>
                    <Col lg={8}>
                        <Select value={state.hours} name="hours" onChange={(e) => onChangeHandle(e, "hours")} >
                            {
                                new Array(121).fill(null).map((item, i) =>
                                    // <Option value={`${i + 1}`}>{i < 10 ? `0${i}` : i}</Option>
                                    // <Option value={`${i + 1}`}>{i < 10 ? `0${i}` : i}</Option>
                                    <Option value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</Option>
                                )
                            }
                        </Select>
                    </Col>
                    <Col lg={8}>
                        <Select size="large" className="sDash_width-select" value={state.minutes} name="minutes" onChange={(e) => onChangeHandle(e, "minutes")}>
                            {
                                new Array(61).fill(null).map((item, i) =>
                                    <Option value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</Option>
                                )
                            }
                        </Select>
                    </Col>
                    <Col lg={8}>
                        <Select size="large" className="sDash_width-select" value={state.second} name="second" onChange={(e) => onChangeHandle(e, "second")}>
                            {
                                new Array(61).fill(null).map((item, i) =>
                                    <Option value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</Option>
                                )
                            }
                        </Select>
                    </Col>
                </Row>
            </Form>
        </Col>
    )
}

export default Timepicker