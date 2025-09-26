import { log } from 'apify';

export interface Logger {
    info(message: string, data?: any): void;
    warn(message: string, data?: any): void;
    error(message: string, data?: any): void;
    debug(message: string, data?: any): void;
}

export function getLogger(options?: {
    logLevel?: 'debug' | 'info' | 'warn' | 'error';
    outputTransport?: 'sse' | 'stdio';
}): Logger {
    const logLevel = options?.logLevel || 'info';

    return {
        info: (message: string, data?: any) => {
            log.info(message, data);
        },
        warn: (message: string, data?: any) => {
            log.warning(message, data);
        },
        error: (message: string, data?: any) => {
            log.error(message, data);
        },
        debug: (message: string, data?: any) => {
            if (logLevel === 'debug') {
                log.debug(message, data);
            }
        },
    };
}
