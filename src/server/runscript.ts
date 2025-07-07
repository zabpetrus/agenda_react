/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import type { Plugin, ViteDevServer } from 'vite';
import { ViteNodeServer } from 'vite-node/server';
import { ViteNodeRunner } from 'vite-node/client';

export default function viteNodePlugin(): Plugin {
  let viteNodeServer: ViteNodeServer;

  return {
    name: 'vite-plugin-vitenode',
    configureServer(server: ViteDevServer) {
      viteNodeServer = new ViteNodeServer(server);

      server.middlewares.use('/api/run-vitenode', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Método não permitido');
          return;
        }

        const runner = new ViteNodeRunner({
          root: server.config.root,
          fetchModule: (id: string) => viteNodeServer.fetchModule(id),
          resolveId: (id: string, importer?: string) => viteNodeServer.resolveId(id, importer),
        });

        try {
          const module = await runner.executeId('./script.js');
          const result = await module.default();
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ output: result }));
        } catch (error: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ output: `Erro ao executar: ${error.message}` }));
        }
      });
    },
  };
}