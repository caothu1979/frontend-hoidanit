import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {


    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
    }

    render() {
        // console.log("Check all users:",this.props.listUsers);

        return (
            <div className='user-container'>
                This is manage doctor page
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={() => this.handleEditorChange} />

            </div>
        );
    }

}
const mapStateToProps = state => {
    return {

    };
};
const mapDispatchToProps = dispatch => {

    return {


    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
