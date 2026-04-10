import fs from 'fs';
import path from 'path';

// __dirname equivalent in ES modules
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readLoginData(fileName) {
    const filePath = path.join(__dirname, '..', 'data', fileName);

    const data = fs.readFileSync(filePath, 'utf-8');

    return data.split('\n').map(line => {
        const [email, password, role] = line.split(',');
        return { email, password, role };
    });
}