import { Response } from '@uvilor/uvilor-utils';
import { CORS_ORIGIN } from './constants';
type optionsType = { method?: string[], statusCode?: number, headers?: { [k: string]: string | string[] }, setCookies?: string | string[], origin?: string }
export function getResponse(body: any, options?: optionsType) {
    const { method = ['GET', 'POST', 'OPTIONS'], statusCode = 200, headers = {}, setCookies, origin } = options || {}
    const resp: Response<string> & { multiValueHeaders?: { [K: string]: string[] } } = {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': method.join(',')
        },
        body: JSON.stringify(body)
    }
    if (setCookies) headers['Set-Cookie'] = setCookies
    if (origin) resp.headers['Access-Control-Allow-Origin'] = CORS_ORIGIN.includes(origin) || CORS_ORIGIN === '*' ? origin : CORS_ORIGIN
    else resp.headers['Access-Control-Allow-Origin'] = CORS_ORIGIN
    Object.entries(headers)?.forEach(([key, value]) => {
        if (Array.isArray(value)) resp.multiValueHeaders = { ...resp.multiValueHeaders, [key]: value }
        else resp.headers[key] = value
    })
    return resp
}