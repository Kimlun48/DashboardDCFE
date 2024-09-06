import { format } from "date-fns";

const FormatTime = () => {
    const formatTime = (dateTime , dateFormat ='HH:mm:ss') => {
        return format (new Date(dateTime), dateFormat);
    };
    return { formatTime};
}

export default FormatTime;