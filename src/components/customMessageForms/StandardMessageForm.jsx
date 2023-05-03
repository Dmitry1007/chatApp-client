import {
    PaperAirplaneIcon,
    PaperClipIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Dropzone from "react-dropzone";

function StandardMessageForm({ props, activeChat }) {
    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    const [previewAttachment, setPreviewAttachment] = useState("");

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async () => {
        const date = new Date()
            .toISOString()
            .replace("T", " ")
            .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
        const at = attachment
            ? [{ blob: attachment, file: attachment.name }]
            : [];
        const form = {
            attachments: at,
            created: date,
            sender_username: props.username,
            text: message,
            activeChatId: activeChat.id,
        };

        props.onSubmit(form);
        setMessage("");
        setAttachment("");
    };

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
                        placeholder="Type a message..."
                    />
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

export default StandardMessageForm;

// This is where we could record audio and send it as a message
