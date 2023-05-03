import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function StandardMessageForm() {
    const [message, setMessage] = useState("");
    const [attachement, setAttachement] = useState("");
    const [previewAttachement, setPreviewAttachement] = useState("");

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
            <div>Message Form</div>
        </div>
    );
}

export default StandardMessageForm;

// This is where we could record audio and send it as a message
