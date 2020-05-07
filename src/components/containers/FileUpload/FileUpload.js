import React, { Component } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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
	}

	onChange = (info) => {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
			}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		}
	}

	render() {
		const { name, action, headers } = this.state;
		<Upload {...props}>
			<Button>
				<UploadOutlined /> Click to Upload
			</Button>
		</Upload>,
			mountNode,
	}
}
export default FileUpload;