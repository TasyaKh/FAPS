import axiosInstance from "./axiosInstance";
import {ILocalitiDistToNearectMC, IMedicalCenter} from "types/types";
import {ISearchMedicalCenter} from "../types/types-search";

const prepareLink = async (data: any, fileName: string, type: string) => {
    // Create a Blob from the response data
    const blob = new Blob([data], {type: type});

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // Append the link to the document and trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}
export const getExcelSolutionsLocalities = async (filters: ILocalitiDistToNearectMC) => {
    const {data} = await axiosInstance.get(`/api/uploads/excel/solutions-localities`, {
        params: {...filters},
        responseType: "arraybuffer"
    });

    await prepareLink(data, 'localities.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    return data;
};

export const getExcelSolutionsMCS = async (filters: ISearchMedicalCenter) => {
    const {data} = await axiosInstance.get(`/api/uploads/excel/solutions-mcs`, {
        params: {...filters},
        responseType: "arraybuffer"
    });

    await prepareLink(data, 'mcs.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    return data;
};
