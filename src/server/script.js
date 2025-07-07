import { promises as fs } from 'fs';
import path from 'path';

export default async () => {
  const jsonPath = path.resolve('public/assets/data.json');
  const jsonData = { message: 'Criado com vite-node!', timestamp: new Date().toISOString() };
  
  await fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2));
  return { status: 'JSON criado com sucesso!' };
};