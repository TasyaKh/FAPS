import React, {useEffect} from "react";
import "./Toast.scss"

export interface ToastProps {
    id: string;
    destroy: () => void;
    content: string;
    type: "error" | "info" | "save"
    duration?: number; //ms
}

const Toast: React.FC<ToastProps> = (props) => {
    const {destroy, content, duration = 2000, type = "info", id} = props;

    useEffect(() => {
        if (!duration) return;

        const timer = setTimeout(() => {
            destroy();
        }, duration);

        return () => clearTimeout(timer);
    }, [destroy, duration]);

    return (
        <div className={`toast-custom ${type}`}>
            <div className={"toast-header"}>
                <button onClick={destroy}>X</button>
            </div>
            <div className={"toast-body"}>{content}</div>
        </div>
    );
};

export default Toast;
