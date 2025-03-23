import PDFDocumentWithTables from "pdfkit-table";
import { RowProps } from "../../../aws/lambda/type";
import { PassThrough } from 'node:stream';


export type RowPropsValue = number | boolean | string | undefined | RowProps | RowProps[];


export function getValue(objeto: RowProps, texto: string): RowPropsValue {
    if (!texto) return "";
    const keys = texto.split(".");
    let valor: RowPropsValue = objeto;
    for (const key of keys) {
        if (typeof valor !== "object" || valor === null) return "";
        valor = (valor as RowProps)[key];
    }
    return valor;
}

type titlesProps = Record<string, { name: string }>

export function generalPdf(passThrough: PassThrough, titles: titlesProps, headers: string[] | undefined, data: RowProps[], titulo: string) {
    const doc = new PDFDocumentWithTables()
    doc.compress = true
    doc.pipe(passThrough)
    doc.fontSize(20).text(titulo, { align: 'center' });
    doc.moveDown();
    if (!headers) headers = Object.keys(titles)
    const json = {
        headers: headers.map(key => ({ label: titles[key].name, property: key })),
        datas: data.map(visita => {
            const row: Record<string, string> = {}
            headers.forEach(h => {
                const valor = getValue(visita, h)
                if (valor) row[h] = String(valor);
                else row[h] = ''
            });
            return row;
        })
    };
    doc.table(json, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
        prepareRow: () => doc.font("Helvetica").fontSize(12),
    });
    doc.end()
}