import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Dropzone from "react-dropzone";

function StandardMessageForm() {
    const [message, setMessage] = useState("");
    const [attachement, setAttachement] = useState("");
    const [previewAttachement, setPreviewAttachement] = useState("");

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <div className="message-form-container">
            {previewAttachement && (
                <div className="message-form-preview">
                    <img
                        className="message-form-preview-image"
                        src={previewAttachement}
                        onLoad={() => URL.revokeObjectURL(previewAttachement)}
                        alt="message-form-preview-attachement"
                    />
                    <XMarkIcon
                        className="message-form-icon-x"
                        onClick={() => {
                            setPreviewAttachement("");
                            setAttachement("");
                        }}
                    />
                </div>
            )}
            <div className="message-form">
                <div className="message-form-input-container">
                    <input
                        className="message-form-input"
                        type="text"
                        value={message}
                        onChange={handleChange}
                        placeholder="Type a message..."
                    />
                </div>
                <div className="message-form-icons">
                    <Dropzone
                        acceptedFiles=".jpg, .jpeg, .png"
                        multiple={false}
                        noClick={true}
                        onDrop={(acceptedFiles) => {
                            setAttachement(acceptedFiles[0]);
                            setPreviewAttachement(
                                URL.createObjectURL(acceptedFiles[0])
                            );
                        }}
                    >
                        {({ getRootProps, getInputProps, open }) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <PaperClipIcon
                                    className="message-form-icon-clip"
                                    onClick={open}
                                />
                            </div>
                        )}
                    </Dropzone>
                </div>
            </div>
        </div>
    );
}

export default StandardMessageForm;

// This is where we could record audio and send it as a message
