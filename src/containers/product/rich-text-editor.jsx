import React,{Component} from 'react';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from "prop-types"
import {Button} from 'antd'

export default class EditorConvertToHTML extends Component{
    // demo=()=>{
    //     console.log("editorState",this.state.editorState)
    //  }
    state = {
        editorState: EditorState.createEmpty(),
      }
       uploadImageCallBack=(file) =>{
        return new Promise(
          (resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/manage/img/upload');
            xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
            const data = new FormData();
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
              const response = JSON.parse(xhr.responseText);
            //   const url=response.data.url
              resolve(response);
            });
            xhr.addEventListener('error', () => {
              const error = JSON.parse(xhr.responseText);
              reject(error);
            });
          }
        );
      }
    

      //接收传进来的参数
      static propTypes ={
          detail:PropTypes.string.isRequired
      }
    //   将传入的HTML文本转变成所需editorstate格式
    constructor(props) {
        super(props);
        const html = this.props.detail
        if(html){//detail有值
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }else{//detail没值
            this.state = {
                editorState: EditorState.createEmpty(),
              }
        }     
      }

      onEditorStateChange: Function = (editorState) => {
        this.setState({
          editorState,
        });
        
      };
     // 得到描述细节htm格式
    getDetail=()=>{
         return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
     }
    
      render() {
        const { editorState } = this.state;
        return (
          <div>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorStyle={{border:"1px solid black",minHeight:"200px", paddingLeft:"10px"}}
              onEditorStateChange={this.onEditorStateChange}
              toolbar={{
                image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
              }}
            />
           
          </div>
        );
      }
// 上传图片





}