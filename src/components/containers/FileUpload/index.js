import React, { Component } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Col from 'antd/es/grid/col';

class FileUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'file',
			action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
			headers: {
				authorization: 'authorization-text',
				},
			}
			this.onChange = this.onChange.bind(this);
	}

	onChange = (info) => {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
			console.log(info);
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	}

	render() {
		const { name, action, headers } = this.state;
		return (
				<Upload name="file" onChange={this.onChange}>
					<Col span={3}>
						<Button className="upload-button">
					<span role="img">
						{/*<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
						{/*		<path fill-rule="evenodd" clip-rule="evenodd" d="M15.4142 1H5C3.89543 1 3 1.89543 3 3V21C3 22.1046 3.89543 23 5 23H19C20.1046 23 21 22.1046 21 21V6.58579L15.4142 1ZM5 3H13V7C13 8.10457 13.8954 9 15 9H19V21H5V3ZM15 7V3.41421L18.5858 7H15ZM13 18V13.4142L14.2929 14.7071L15.7071 13.2929L12 9.58579L8.29289 13.2929L9.70711 14.7071L11 13.4142V18H13Z" fill="#3B7CFF"/>*/}
						{/*</svg>*/}
					</span>
							<UploadOutlined/> File Upload
						</Button>
					</Col>
				</Upload>
	)
	};

}

export default FileUpload;