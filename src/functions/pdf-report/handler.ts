import { Context, ProxyRESTApiGatewayEvent } from "@uvilor/uvilor-utils";
import { BUCKET, PDF } from "../../utility/constants";
import LambdaProvider from "../../aws/lambda/LambdaProvider";
import S3 from "../../aws/S3/S3";
import { createHash } from "node:crypto"
import { generalPdf } from "./createPDF/generic-table/pdf";
import { PDF_TABLES_GENERIC } from "./createPDF/generic-table/constants";
import { getResponse } from "../../utility/utils";
console.log(createHash('sha256').update(JSON.stringify({ hola: 1 })));

export async function handler(event: ProxyRESTApiGatewayEvent, context: Context) {
    const { nombre } = event.pathParameters
    let url;
    const lambdaProvider = new LambdaProvider()
    const { queryStringParameters, body, requestContext, headers } = event
    const authorizer = requestContext.authorizer as { ctid: string, setCookies: string }
    const fileName = createHash('sha256').update(JSON.stringify({ ctid: authorizer.ctid, queryStringParameters, body, name: nombre })).digest('hex')
    const param = {
        Bucket: BUCKET.PESAS_REPORT || '',
        Key: BUCKET.DESTINATION_FOLDER.concat(authorizer.ctid, '/', fileName, '.pdf')
    }
    const s3 = new S3()

    const { passThrough, uploadPromise } = s3.createStreamUpload(param.Bucket, param.Key, 'application/pdf')
    switch (nombre) {
        case PDF.PESOS.NAME:
            const date = new Date().toISOString()
            if (!date.includes(queryStringParameters.fechaFin)) url = await s3.getPreSignedUrlIfExists(param)
            if (!url) {
                const pesos = await lambdaProvider.getPesos(authorizer, queryStringParameters, headers)
                let labes: string[] = queryStringParameters.labes && JSON.parse(queryStringParameters.labes)
                const reporte = queryStringParameters.reporte as keyof typeof PDF_TABLES_GENERIC.PESO
                generalPdf(passThrough, PDF_TABLES_GENERIC.PESO[reporte].TITLES, labes, pesos.data, PDF_TABLES_GENERIC.PESO[reporte].TITLE)
                await uploadPromise
                url = await s3.getPreSignedUrl(param)
            }
            break;
        default:
            break;
    }
    const origin = (event.headers.origin || '').includes('.uvilorapps.com') ? event.headers.origin : ''
    return getResponse(
        { message: 'URL generada con éxito', url },
        { setCookies: authorizer.setCookies, origin }
    )

}