import React, { useState } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Steps,
  TimePicker,
  Typography,
} from 'antd';
import votingLabel from '../../../assets/images/votingFileLabel.svg'
import datePickerImage from '../../../assets/images/datePicker.svg'
import votingInfoImage from '../../../assets/images/votingInfoImage.svg'
import moment from 'moment';
import "./styles.css"
import revokeAccessIcon from '../../../assets/images/revokeAccessIcon.svg';
import { unixToString } from '../../../utils/functions';


const format = 'HH:mm';


const { Search } = Input;
const { Title } = Typography;
const { Step } = Steps;
const { TextArea } = Input;
export const VotingModal = ({ visible, info, close, createVoting, }) => {
  const [state, setState] = useState(
    {
      variants: [],
      excludedUsers: [],
      date: null,
      time: null,
      description: null
    }
  );
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0)
  const [tempValues, setTempValues] = useState({ variants: '' })
  const onFinish = async () => {
    const data = {
      fileHash: info.fileData.fileHash,
      variants: state.variants,
      excludedUsers: state.excludedUsers,
      dueDate: prepareTime(state.date, state.time),
      description: state.description
    }
    console.log()
    createVoting(data);
    close();
  };
  const addVariant = () => {
    const variants = state.variants;
    variants.push(tempValues.variants)
    setState({ ...state, variants })
    setTempValues({ ...tempValues, variants: '' })
  }
  const onChange = (current) => {
    setCurrent(current);
  };
  const prepareTime = (data, time) => {
    const year = new Date(data).getFullYear()
    const day = new Date(data).getDate()
    const month = new Date(data).getMonth() + 1
    const hours = new Date(time).getHours()
    const minutes = new Date(time).getMinutes()
    return (new Date(`${year}/${month}/${day} ${hours}:${minutes}`).getTime() / 1000)
  }
  const stepTitle = () => {
    return (<Steps
      size="small"
      current={current}
      onChange={onChange}
    >
      <Step
        title="Creating"
        disabled={true}
      />
      <Step
        title="Due Date"
        disabled={true}

      />
      <Step
        title="Description"
        disabled={true}
      />
      <Step
        title="List of Voters"
        disabled={true}
      />
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
                }}>
          CANCEL
        </Button>,
        <Button key="submit" type="primary" style={{
          height: "56px",
          width: "265px",
          background: '#007AFF',
          borderRadius: '4px',
        }}
                disabled={state.variants.length<2 || state.variants.length>5 || (current === 1 && state.time === null) || (current === 1 && state.date === null) || (current === 1 && state.time <= Date.now())}
                onClick={() => {
                  current === 3 ? onFinish() : setCurrent(current + 1)
                }}>
           NEXT STEP
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
            <Search value={tempValues.variants}
                    onChange={(e) => {
              setTempValues({ ...tempValues, variants: e.target.value })
            }}
                    disabled={state.variants.length>=5}
                    placeholder="input variant"
                    onSearch={addVariant}
                    enterButton/>
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
                        <img src={revokeAccessIcon} alt="Revoke access"
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
                }}
                onChange={(date) => {
                  setState({ ...state, date: new Date(date).getTime() })
                }}
              />
            </Row>
          </Col>
          <Row align={'top'} justify={'center'}>

          </Row>
          <Col>
            <Row>
              <label className='modal-label'>Time</label>
            </Row>
            <Row align={'top'} justify={'center'}>
              <TimePicker
                format={format}
                onChange={(time) => {setState({ ...state, time: new Date(time).getTime() })
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
          <TextArea rows={5} placeholder="Enter description" allowClear onChange={(e) => {
            setState({ ...state, description: e.target.value })
          }}/>
        </Row>
        <Row align={'top'} justify={'start'}>
          <h3 className='modal-filetime-title'>{"*There is an optional description filed"}</h3>
        </Row>
        <Row align={'top'} justify={'center'}>
          <img src={votingInfoImage} alt='add' title='add'/>
        </Row>
      </div>)}
      {current === 3 && (<div>
        <Row align={'top'} justify={'center'}>
          <h2 className='modal-title'>Voting participants</h2>
        </Row>
        <Row align={'top'} justify={'center'}>
          <Col>
            {
              data().map((user, i) => (
                <Row key={user} className='sharedUser'>
                  <Col className="sharedUserName">
                    <div className={"text-users-name"}>{data()[i]}</div>
                  </Col>
                  <Col className="revokeAccess">
                    {
                      <img src={revokeAccessIcon} alt="Revoke access"
                           onClick={() => {
                             {
                               let excludeUsers = state.excludedUsers;
                               excludeUsers.push(data()[i])
                               setState({ ...state, excludeUsers })
                             }
                           }
                           }/>
                    }
                  </Col>
                </Row>
              ))
            }
          </Col>
        </Row>
      </div>)}
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Modal>
  );
};

