import React, { useState } from 'react';
import { unixToString } from '../../../utils/functions';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Steps,
  TimePicker,
} from 'antd';
import "./styles.css"
import votingLabel from '../../../assets/images/votingFileLabel.svg'
import buttonForVoting from '../../../assets/images/buttonForVoting1.svg'
import datePickerImage from '../../../assets/images/datePicker.svg'
import votingInfoImage from '../../../assets/images/votingInfoImage.svg'
import deleteVariantIcon from '../../../assets/images/deleteVariantIcon.svg';
import deleteUserIcon from '../../../assets/images/revokeAccessIcon.svg';


const format = 'HH:mm';


const { Search } = Input;
const { Step } = Steps;
const { TextArea } = Input;
export const VotingModal = ({ visible, info, close, createVoting, }) => {
  const [state, setState] = useState(
    {
      variants: [],
      excludedUsers: [],
      allUsers: [],
      date: null,
      time: null,
      description: ''
    }
  );
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0)
  const [buttons, setButtons] = useState({
    cancel: "CANCEL",
    next: "NEXT STEP"
  })
  const [tempValues, setTempValues] = useState({ variants: '' })
  const onFinish = async () => {
    const data = {
      fileHash: info.fileData.fileHash,
      variants: state.variants,
      excludedUsers: state.excludedUsers,
      dueDate: prepareTime(state.date, state.time),
      description: state.description
    }
    createVoting(data);
    close();
  };
  const addVariant = () => {
    let checkVariants = true
    for (let i = 0; i < state.variants.length; i++) {
      if (tempValues.variants === state.variants[i]) {
        checkVariants = false
        message.warning('The option already exists')
      }
    }
    if (tempValues.variants.length > 0 && state.variants.length < 5 && checkVariants) {
      const variants = state.variants;
      variants.push(tempValues.variants)
      setState({ ...state, variants })
      setTempValues({ ...tempValues, variants: '' })
    }
    if (state.variants.length === 5) {
      message.info('You can add up to 5 options')
    }
    if (tempValues.variants.length < 1) {
      message.info('The answer option must have a minimum of 1 character and a maximum of 35')
    }
  }
  const onChange = (current) => {
    setCurrent(current);
  };
  const prepareTime = (data, time) => {
    if (data && time) {
      const year = new Date(data).getFullYear()
      const day = new Date(data).getDate()
      const month = new Date(data).getMonth() + 1
      const hours = new Date(time).getHours()
      const minutes = new Date(time).getMinutes()
      return (new Date(`${year}/${month}/${day} ${hours}:${minutes}`).getTime() / 1000)
    }
  }
  const stepTitle = () => {
    return (<Steps size="small" current={current} onChange={onChange}>
      <Step title="Creating" disabled={true}/>
      <Step title="Due Date" disabled={true}/>
      <Step title="Description" disabled={true}/>
      <Step title="List of Voters" disabled={true}/>
    </Steps>)
  }

  const data = () => {
    let users = []
    if (info.fileData.writeUsers && info.fileData.readUsers) {
      for (let i = 0; i < info.fileData.writeUsers.length; i++) {
        users.push(info.fileData.writeUsers[i])
      }
      for (let i = 0; i < info.fileData.readUsers.length; i++) {
        if (users.findIndex(v => v === info.fileData.readUsers[i]) === -1) {
          users.push(info.fileData.readUsers[i])
        }
      }
    }
    return users
  };
  return (
    <Modal
      visible={visible}
      title={stepTitle()}
      style={{ padding: '16px' }}
      bodyStyle={{ padding: '50px 120px' }}
      width={608}
      okText="Confirm"
      cancelText="Cancel"
      closable={false}
      onCancel={() => {
        form.resetFields();
        close();
      }}

      footer={[
        <Button key="back" style={{
          height: "56px",
          width: "265px",
          background: '#FFFFFF',
          borderRadius: '4px',
        }}
                onClick={() => {
                  current === 0 ? close() : setCurrent(current - 1)
                  if (current === 0) setState({
                    variants: [],
                    excludedUsers: [],
                    allUsers: [],
                    date: null,
                    time: null,
                    description: ''
                  })
                  if (current === 1) setButtons({ ...buttons, cancel: "CANCEL" })
                  if (current === 3) setButtons({ ...buttons, next: "NEXT STEP" })
                }}>
          {buttons.cancel}
        </Button>,
        <Button key="submit" type="primary" style={{
          height: "56px",
          width: "265px",
          background: '#007AFF',
          borderRadius: '4px',
        }}
                disabled={state.variants.length < 2 || state.variants.length > 5 || (
                  current === 1 && state.date === null) || (current === 1 && state.time === null) || (
                  current === 1 && prepareTime(state.date,
                  state.time) * 1000 <= Date.now()) || (current === 3 && state.allUsers.length < 1)}
                onClick={() => {
                  current === 3 ? onFinish() : setCurrent(current + 1)

                  if (current === 0) setButtons({ ...buttons, cancel: "BACK" })
                  if (current === 2) setButtons({ ...buttons, next: "START VOTING" })
                  if (current === 2 && state.allUsers.length < 1) setState({
                    ...state,
                    allUsers: data()
                  })
                  if (current === 3) {
                    setState({
                        variants: [],
                        excludedUsers: [],
                        allUsers: [],
                        date: null,
                        time: null,
                        description: ''
                      }
                    )
                    setCurrent(current - 3)
                    setButtons({ ...buttons, next: "NEXT STEP", cancel: "CANCEL" })
                  }
                }}>
          {buttons.next}
        </Button>,
      ]}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onFinish();
          });
      }}
    >
      {current === 0 && info.fileData.versions && (
        <div>
          <Row align={'top'} justify={'center'}>
            <h2 className='modal-title'>Create voting</h2>
          </Row>
          <Row align={'top'} justify={'center'}>
            <h2 className='modal-title'></h2>
          </Row>
          <Row align={'middle'} justify={'start'}>
            <Col push={2}>
              <img src={votingLabel} alt='add' title='add'/>
            </Col>
            <Col push={3}>
              <h3 className='modal-filename-title'>{info.fileData.fileName}</h3>
              <h3
                className='modal-filetime-title'>{unixToString(info.fileData.versions[info.fileData.versions.length - 1].time)}</h3>
            </Col>

          </Row>
          <Row align={'top'} justify={'center'}>
            <h2 className='modal-title'></h2>
          </Row>
          <Row align={'top'} justify={'start'}>
            <label className='modal-label'>Add choices</label>
            <Search maxLength={35} value={tempValues.variants} onChange={(e) => {
              setTempValues({ ...tempValues, variants: e.target.value })
            }}
                    disabled={state.variants.length >= 5}
                    placeholder="input variant"
                    onSearch={addVariant}
                    enterButton={<img src={buttonForVoting}/>}/>
            <h3 className='modal-filetime-title'>{"*Please add at least 2 options."}</h3>
          </Row>
          <Row justify={'center'}>
            <Col>
              {
                state.variants.map((user, i) => (
                  <Row key={user} align={'middle'} className='variants'>
                    <Col className='text-users-name'>
                      {state.variants[i]}
                    </Col>
                    <Col className="revokeAccess">
                      {
                        <img src={deleteVariantIcon} alt="Delete variant"
                             onClick={() => {
                               let newVariants = state.variants;
                               newVariants.splice(i, 1)
                               setState({ ...state, variants: newVariants })
                             }}/>
                      }
                    </Col>
                  </Row>
                ))
              }
            </Col>
          </Row>
        </div>
      )}
      {current === 1 && (<div>
        <h2 className='modal-title'>Pick end date and end time</h2>
        <Row align={'top'} justify={'center'}>
          <Col>
            <Row>
              <label className='modal-label'>Data</label>
            </Row>
            <Row align={'top'} justify={'center'}>
              <DatePicker
                dateRender={current => {
                  const style = {};
                  if (current.date() === 1) {
                    style.border = '1px solid #1890ff';
                    style.borderRadius = '50%';
                  }
                  return (
                    <div className="ant-picker-cell-inner" style={style}>
                      {current.date()}
                    </div>
                  );
                }} onChange={(date) => {
                setState({ ...state, date: new Date(date).getTime() })
              }}/>
            </Row>
          </Col>
          <Row align={'top'} justify={'center'}>

          </Row>
          <Col>
            <Row>
              <label className='modal-label'>Time</label>
            </Row>
            <Row align={'top'} justify={'center'}>
              <TimePicker format={format} onChange={(time) => {
                setState({ ...state, time: new Date(time).getTime() })
              }}
              />
            </Row>
          </Col>
        </Row>
        <Row align={'top'} justify={'center'}>
          <img src={datePickerImage} alt='add' title='add'/>
        </Row>
      </div>)}
      {current === 2 && (<div>
        <Row align={'top'} justify={'center'}>
          <h2 className='modal-title'>Info</h2>
        </Row>
        <Row align={'top'} justify={'start'}>
          <label className='modal-label'>Add description</label>
        </Row>
        <Row align={'top'} justify={'center'}>
          <TextArea maxLength={256} rows={5} placeholder="Enter description" allowClear
                    onChange={(e) => {
                      setState({ ...state, description: e.target.value })
                    }}/>
        </Row>
        <Row align={'top'} justify={'start'}>
          <h3
            className='modal-filetime-title'>{"*There is an optional description filed. Max length 256 characters."}</h3>
        </Row>
        <Row align={'top'} justify={'center'}>
          <img src={votingInfoImage} alt='add' title='add'/>
        </Row>
      </div>)}
      {current === 3 && (<div>
        <Row align={'top'} justify={'center'}>
          <h2 className='modal-title'>Voting participants</h2>
          <h3
            className='modal-filetime-title'>{"*At least 1 user can participate in the vote."}</h3>
        </Row>
        <Row align={'top'} justify={'center'}>
          <Col>
            {state.allUsers.map((user, i) => (
              <Row key={user} className='sharedUser'>
                <Col className="sharedUserName">
                  <div className={"text-users-name"}>{state.allUsers[i]}</div>
                </Col>
                <Col className="revokeAccess">
                  {<img src={deleteUserIcon} alt="Revoke access"
                        onClick={() => {
                          {
                            if (state.allUsers.length > 1) {
                              let excludeUsers = state.excludedUsers;
                              excludeUsers.push(state.allUsers[i])
                              setState({ ...state, excludeUsers })
                              let newAllUsers = state.allUsers;
                              newAllUsers.splice(i, 1)
                              setState({ ...state, allUsers: newAllUsers })
                            }
                          }
                        }}/>}
                </Col>
              </Row>))}
          </Col>
        </Row>
      </div>)}
    </Modal>
  );
};
