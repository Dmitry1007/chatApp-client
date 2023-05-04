import { useState } from "react";
import {
    PaperAirplaneIcon,
    PaperClipIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import Dropzone from "react-dropzone";

function MessageFormUI({
    setAttachment,
    message,
    handleChange,
    handleSubmit,
    appendText,
    handleKeyDown,
}) {
    const [previewAttachment, setPreviewAttachment] = useState("");

    return (
        <div className="message-form-container">
            {previewAttachment && (
                <div className="message-form-preview">
                    <img
                        className="message-form-preview-image"
                        src={previewAttachment}
                        onLoad={() => URL.revokeObjectURL(previewAttachment)}
                        alt="message-form-preview-attachement"
                    />
                    <XMarkIcon
                        className="message-form-icon-x"
                        onClick={() => {
                            setPreviewAttachment("");
                            setAttachment("");
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
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                    />
                    {appendText && (
                        <input
                            className="message-form-assist"
                            type="text"
                            disabled="disabled"
                            value={`${message} ${appendText}`}
                        />
                    )}
                </div>
                <div className="message-form-icons">
                    <Dropzone
                        acceptedFiles=".jpg, .jpeg, .png"
                        multiple={false}
                        noClick={true}
                        onDrop={(acceptedFiles) => {
                            setAttachment(acceptedFiles[0]);
                            setPreviewAttachment(
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
                    <hr className="vertical-line" />
                    <PaperAirplaneIcon
                        className="message-form-icon-airplane"
                        onClick={() => {
                            setPreviewAttachment("");
                            handleSubmit();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default MessageFormUI;
