import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class FileInput extends React.Component {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        this.props.change(e.target.files);
    }

    inputField () {
        // @ts-ignore
        return <input className="file-input" type="file" name="resume" webkitdirectory="" onChange={this.handleChange} />
    }

    render () {
        let input = this.inputField();

        return (
            <div className="file">
            <label className="file-label">
                {input}
                <span className="file-cta">
                    <span className="file-icon">
                        <FontAwesomeIcon icon="upload" />
                    </span>
                    <span className="file-label">
                        {this.props.label || "Please select a file or folder."}
                    </span>
                </span>
            </label>
        </div>
        )
    }
}