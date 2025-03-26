// server/routes/index.js

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const srcPath = path.join(__dirname);

console.log("srcPath:", srcPath);

fs.readdirSync(srcPath).forEach(async forder => {
    const apiPath = path.join(srcPath, forder, `${forder}.js`);
    console.log("apiPath:", apiPath);
    if(fs.existsSync(apiPath)){
        console.log("apiPath exist!", apiPath);
        try {
            const fileUrl = pathToFileURL(apiPath).toString();
            const apiFunctionsModule = await import(fileUrl);
            const apiFunctions = apiFunctionsModule.default || apiFunctionsModule;

            Object.keys(apiFunctions).forEach(key => {
                const routePath = `/${forder}/${key}`;
                router.get(routePath, apiFunctions[key]);
            });
        }
        catch(error) {
            console.log(`[fail] loading module: ${apiPath}`, error);
        }        
    }
});

export default router;