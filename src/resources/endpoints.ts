interface URLS {
    API: string;
}

const IDEMPRESA: number = 1;
const ENTORNO: string = 'DEV'; // 'DEV' or 'PROD'
const URLS: Record<string, URLS> = {
    DEV: {
        API: 'http://localhost:7001',
    },
    PROD: {
        API: 'https://api.canaldenuncias.com',
    },
}

export default {
    URL: URLS[ENTORNO].API,
    IDEMPRESA: IDEMPRESA,
}

