import { Context, ProxyRESTApiGatewayEvent } from "@uvilor/uvilor-utils";
import { BUCKET, PDF } from "../../utility/constants";
import LambdaProvider from "../../aws/lambda/LambdaProvider";
import S3 from "../../aws/S3/S3";
import { createHash } from "node:crypto"
import { generalPdf } from "./createPDF/general";
console.log(createHash('sha256').update(JSON.stringify({ hola: 1 })));

export async function handler(event: ProxyRESTApiGatewayEvent, context: Context) {
    const { name } = event.pathParameters
    let url;
    const lambdaProvider = new LambdaProvider()
    const { queryStringParameters, body, requestContext } = event
    const authorizer = requestContext.authorizer as { ctid: string, setCookies: string }
    const fileName = createHash('sha256').update(JSON.stringify({ ctid: authorizer.ctid, queryStringParameters, body, name })).digest('hex')
    const param = {
        Bucket: BUCKET.PESAS_REPORT || '',
        Key: BUCKET.DESTINATION_FOLDER.concat(authorizer.ctid, '/', fileName, '.pdf')
    }
    const s3 = new S3()
    const { passThrough, uploadPromise } = s3.createStreamUpload(param.Bucket, param.Key, 'application/pdf')
    switch (name) {
        case PDF.PESOS_DETALLADO.NAME:
        case PDF.PESO_DESTINO.NAME:
        case PDF.PESO_DESTINO_FECHA.NAME:
        case PDF.PESO_PROVEEDOR.NAME:
        case PDF.PESO_PROVEEDOR_FECHA.NAME:
            const isExist = await s3.checkIfFileExists(param)
            if (isExist) url = await s3.getPreSignedUrl(param)
            else {
                const pesos = await lambdaProvider.getPesos(event)
                let labes: string[] = queryStringParameters.labes && JSON.parse(queryStringParameters.labes)
                generalPdf(passThrough, PDF[name.toUpperCase() as keyof typeof PDF].TITLES, labes, pesos.data, 'Detalle de pesos')
                await uploadPromise
                url = await s3.getPreSignedUrl(param)
            }
            break;
        default:
            break;
    }
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': authorizer.setCookies
        },
        body: JSON.stringify({ message: 'URL generada con éxito', url }),
    }

}

async function uploadS3() {

}