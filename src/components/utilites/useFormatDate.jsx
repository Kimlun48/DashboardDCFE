import { format } from "date-fns";

const useFormatDate = () => {
    const formatDate = (date , dateFormat ='dd/MM/yyyy') => {
        return format (new Date(date), dateFormat);
    };
    return { formatDate};
}

export default useFormatDate;