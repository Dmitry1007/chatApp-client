import { useState, useEffect } from "react";
import MessageFormUI from "./MessageFormUI";
import { usePostAiCompletionMutation } from "@/state/api";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

function AiCompletion({ props, activeChat }) {
    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    const [triggerCompletion, resultAssist] = usePostAiCompletionMutation();
    const [appendText, setAppendText] = useState("");

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

    // wait 2 seconds before sending the message to the AI
    const debouncedValue = useDebounce(message, 2000);

    useEffect(() => {
        if (debouncedValue) {
            const form = { text: message };
            triggerCompletion(form);
        }
    }, [debouncedValue]); // eslint-disable-line

    const handleKeyDown = (e) => {
        // enter or tab adds the suggested text
        if (e.keyCode === 9 || e.keyCode === 13) {
            e.preventDefault();
            setMessage(`${message} ${appendText}`);
        }
        // escape or any other key removes the suggested text
        setAppendText("");
    };

    useEffect(() => {
        if (resultAssist.data?.text) {
            setAppendText(resultAssist.data?.text);
        }
    }, [resultAssist]); // eslint-disable-line

    return (
        <MessageFormUI
            setAttachment={setAttachment}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            appendText={appendText}
            handleKeyDown={handleKeyDown}
        />
    );
}

export default AiCompletion;
