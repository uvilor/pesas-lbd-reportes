import { Response } from '@uvilor/uvilor-utils';
import { CORS_ORIGIN } from './constants';
type optionsType = { method?: string[], statusCode?: number, headers?: { [k: string]: string | string[] }, setCookie?: string | string[], origin?: string }
export function getResponse(body: any, options?: optionsType) {
    const { method = ['GET', 'POST', 'OPTIONS'], statusCode = 200, headers = {}, setCookie } = options || {}
    const resp: Response<string> & { multiValueHeaders?: { [K: string]: string[] } } = {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': CORS_ORIGIN,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': method.join(',')
        },
        body: JSON.stringify(body)
    }
    if (setCookie) headers['Set-Cookie'] = setCookie
    if (origin) resp.headers['Access-Control-Allow-Origin'] = CORS_ORIGIN.concat(',', origin)
    Object.entries(headers)?.forEach(([key, value]) => {
        if (Array.isArray(value)) resp.multiValueHeaders = { ...resp.multiValueHeaders, [key]: value }
        else resp.headers[key] = value
    })

}