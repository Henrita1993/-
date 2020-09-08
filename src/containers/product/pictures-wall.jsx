import React, { Component} from 'react';

import {Upload, Modal, Button, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {reqDeleteImg} from "../../api/index"
import PropTypes from "prop-types"

import { BASE_IMG_URL} from "../../utils/constants.js"

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends Component {
    //接收传入的信息
    static propTypes = {
        imgs: PropTypes.array.isRequired

    }

    state = {
        previewVisible: false, //是否大图显示
        previewImage: '', //大图URL
        previewTitle: '',
        fileList: [
          

        ],
    };
    //自己重新定义
    constructor(props) {
        super(props)
        let fileList = []
        //   如果传入了imgs属性
        const {imgs} = this.props
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index,
                name: img,
                status: 'done',
                url: BASE_IMG_URL + img,

            }))
        }
        //初始化state状态
        this.state = {
            previewVisible: false, //是否大图显示
            previewImage: '', //大图URL
            fileList
        }



    }

    // 获取 已上传图片名数组,返回数组
    getImgs = () => {
        return this.state.fileList.map(c => c.name)
    }

    //取消显示大图
    handleCancel = () => this.setState({
        previewVisible: false
    });
    //点预览区时候回调
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    //实时更新图片数组
    handleChange = async ({file, fileList }) => {
        console.log("hanlechange","file" ,file, "filelist",fileList[fileList.length - 1])
        //一旦上传成功，将返回的name和URL保存到file中，切记，上传成功后，fileList[fileList.length-1]数据没变，只是file上传了并且返回数据。所以要同步本地数据fileList[fileList.length-1]
        if (file.status === "done") {
            const result = file.response //{status:0,data{name: url:}}
            if (result.status === 0) {
                message.success("上传图片是成功！", 1)
                file = fileList[fileList.length - 1]
                file.name = result.data.name
                file.url = result.data.url;
            } else {
                message.error("上传图片失败！", 1)
            }
        } else if (file.status === "removed") { //图片删除
            const {name} = file //{status:0,data{name: url:}}   
            let result = await reqDeleteImg(name) //最重要的是 服务器那边删掉就好了
            if (result.status === 0) {
                message.success("删除成功", 1)
            } else {
                message.error("删除失败", 1)
            }

        }

        this.setState({ fileList})
        // console.log("handleChange",file,fileList)


    };

    render() {
        const {
            previewVisible,
            previewImage,
            fileList,
            previewTitle
        } = this.state;
        const demo = () => {
            const {
                imgs
            } = this.props
            console.log("wall", this,)
        }
        const uploadButton = (
          <div>
            < PlusOutlined />
            <div className="ant-upload-text" > Upload < /div> 
          </div>
        );

        return ( <div className="clearfix" >
                    <Upload action="/manage/img/upload"
                        accept="image/*"
                        listType="picture-card"
                        fileList={ fileList}
                        multiple={true}
                        name="image"
                        onPreview={this.handlePreview } //点击预览图片时候的回调
                        onChange={ this.handleChange} > {fileList.length >= 3 ? null : uploadButton } 
                        </Upload>
                        <Modal visible={ previewVisible }
                        title={ previewTitle }footer={ null }
                        onCancel={this.handleCancel} >
                        < img alt="example"style={ { width: '100%'} } src={ previewImage }/> 
                       </Modal > 
                      <Button onClick={ demo } > 点我 </Button>

            </div>
        );
    }
}