import 'medium-draft/lib/index.css';
import 'medium-draft/lib/basic.css';
import 'font-awesome/css/font-awesome.min.css';

import React,{Component} from 'react';
import {
    Editor,
    createEditorState,
} from 'medium-draft';
import CustomImageSideButton from "./CustomImageSideButton"


class MedumDraft extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: createEditorState(), // for empty content
        };

        /*
        this.state = {
          editorState: createEditorState(data), // with content
        };
        */
        this.sideButtons = [{
            title: 'ImageAAA',
            component: CustomImageSideButton,
        }];

        this.onChange = (editorState) => {
            this.setState({ editorState });
        };
    }

    componentDidMount() {
        this.refs.editor.focus();
    }

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                ref="editor"
                editorState={editorState}
                onChange={this.onChange}
                sideButtons={this.sideButtons}
            />
        );
    }
};

export  default MedumDraft
export {
    MedumDraft
}