import {toast} from "../components/Elements/Toast/ToastManager";

export const showToast = (msg: string, type: "error" | "info" | "save", duration = 2000) => {
    toast.show({
        content: msg,
        type: type,
        duration: duration
    });
}
