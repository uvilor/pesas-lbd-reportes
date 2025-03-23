export const PDF = {
    PESOS_DETALLADO: {
        NAME: 'pesos_detallado',
        TITLES: {
            proveedor: { name: 'Proveedor' },
            documento_proveedor: { name: 'Documento proveedor' },
            producto: { name: 'Producto' },
            conductor: { name: 'Conductor' },
            documento_conductor: { name: 'Documento conductor' },
            entrada: { name: 'Peso de entrada' },
            salida: { name: 'Peso de salida' },
            total: { name: 'Peso totál' },
            total_format: { name: 'Totál en unidad' },
            precio: { name: 'Precio unitario' },
            pago: { name: 'Pago' },
            subsidio: { name: 'Subsidio' },
            pago_subsidio: { name: 'Pago subsidio' },
            fecha: { name: 'fecha' }
        }
    },
    PESO_PROVEEDOR: {
        NAME: 'peso_proveedor',
        TITLES: {
            proveedor: { name: 'Proveedor' },
            documento_proveedor: { name: 'Documento proveedor' },
            producto: { name: 'Producto' },
            entrada: { name: 'Peso de entrada' },
            salida: { name: 'Peso de salida' },
            total: { name: 'Peso totál' },
            total_format: { name: 'Totál en unidad' },
            precio: { name: 'Precio unitario' },
            pago: { name: 'Pago' },
            subsidio: { name: 'Subsidio' },
            pago_subsidio: { name: 'Pago subsidio' }
        }
    },
    PESO_PROVEEDOR_FECHA: {
        NAME: 'peso_proveedor_fecha',
        TITLES: {
            proveedor: { name: 'Proveedor'},
            documento_proveedor: { name: 'Documento proveedor'},
            producto: { name: 'Producto'},
            entrada: { name: 'Peso de entrada'},
            salida: { name: 'Peso de salida'},
            total: { name: 'Peso totál' },
            total_format: { name: 'Totál en unidad'},
            precio: { name: 'Precio unitario' },
            pago: { name: 'Pago' },
            subsidio: { name: 'Subsidio' },
            pago_subsidio: { name: 'Pago subsidio' },
            fecha: { name: 'fecha' },
        }
    },
    PESO_DESTINO: {
        NAME: 'peso_destino',
        TITLES: {
            destino: { name: 'Destino'},
            producto: { name: 'Producto'},
            entrada: { name: 'Peso de entrada'},
            salida: { name: 'Peso de salida'},
            total: { name: 'Peso totál' },
            total_format: { name: 'Totál en unidad'},
            precio: { name: 'Precio unitario' },
            pago: { name: 'Pago' },
            subsidio: { name: 'Subsidio' },
            pago_subsidio: { name: 'Pago subsidio' },
        }
    },
    PESO_DESTINO_FECHA: {
        NAME: 'peso_destino_fecha',
        TITLES: {
            destino: { name: 'Destino'},
            producto: { name: 'Producto'},
            entrada: { name: 'Peso de entrada'},
            salida: { name: 'Peso de salida'},
            total: { name: 'Peso totál' },
            total_format: { name: 'Totál en unidad'},
            precio: { name: 'Precio unitario' },
            pago: { name: 'Pago' },
            subsidio: { name: 'Subsidio' },
            pago_subsidio: { name: 'Pago subsidio' },
            fecha: { name: 'fecha' },
        }
    }
}

export const LAMBDA = {
    GET_PESOS: process.env.LAMBDA_GET_PESOS || ''
}

export const BUCKET = {
    PESAS_REPORT: process.env.BUCKET_PESAS_REPORT,
    DESTINATION_FOLDER: 'pdf/'
}