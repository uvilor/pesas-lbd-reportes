export type PesosRp = {
    metadata: PaginationRsProps & { resumen: { producto: string; total_format: number; unidad: string; total: number }[] };
    data: RowProps[];
}
export type RowProps = {
    [key: string]: RowPropsValue
};
export type RowPropsValue = number | boolean | string | undefined | RowProps | RowProps[];
export type PaginationRsProps = {
    total: number;
    limit: number | undefined;
    offset: number | undefined;
}