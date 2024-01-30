import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // 수정된 부분
import "../assets/styles/ckeditorStyles.css";
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import React, { PropsWithChildren } from 'react';

interface EditorProps {
    content: string,
    setContent: Function,
}


function Editor({content, setContent}:PropsWithChildren<EditorProps>) {
    return (
        <div>
        <CKEditor
            editor={ClassicEditor}
            data={content}
            config={{
                placeholder: "오늘의 미션 과정과 결과를 자유롭게 작성해 주세요.",
                plugins: [Paragraph, Bold, Italic, Essentials]
            }}

            onReady = { (editor) => {
                console.log("Editor is ready to use", editor);
            }}
            onChange = { (event, editor) => {
                const data = editor.getData();
                setContent(data);
                console.log({event, editor, data});
            }}
            onBlur = {(event, editor) => {
                console.log("Blur", editor);
            }}
            onFocus = { (event, editor) => {
                console.log("Focus", editor);
            }}
            />
        </div>

    );
}

export default Editor;