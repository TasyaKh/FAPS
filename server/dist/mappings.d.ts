export default mappings;
declare const mappings: ({
    columnName: string;
    fullQueryName: string;
    queryName: string;
    fieldName: string;
    binary?: undefined;
} | {
    columnName: string;
    fullQueryName: string;
    fieldName: string;
    queryName?: undefined;
    binary?: undefined;
} | {
    columnName: string;
    fullQueryName: string;
    fieldName: string;
    binary: boolean;
    queryName?: undefined;
} | {
    columnName: string;
    fullQueryName: string[];
    fieldName: string;
    queryName?: undefined;
    binary?: undefined;
})[];
