import axiosInstance from "./axiosInstance";
import {ILocalitiDistToNearectMC} from "../types/types";

export const getExcelSolutionsLocalities = async (filters: ILocalitiDistToNearectMC) => {
    const {data} = await axiosInstance.get(`/api/uploads/excel/solutions-localities`, {
        params: {...filters},
        responseType: "arraybuffer"
    });

    // Create a Blob from the response data
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'solutions_localities.xlsx';

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);

    return data;
};