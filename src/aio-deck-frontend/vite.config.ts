
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { componentTagger } from "lovable-tagger";
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 读取 canister IDs 并设置环境变量
function setupCanisterIds() {
  try {
    const canisterIdsPath = resolve(__dirname, '../../.dfx/local/canister_ids.json');
    const canisterIds = JSON.parse(readFileSync(canisterIdsPath, 'utf-8'));
    const backendId = canisterIds['aio-deck-backend']?.local;
    const frontendId = canisterIds['aio-deck-frontend']?.local;
    
    // 设置环境变量（如果未设置）
    if (backendId && !process.env.VITE_BACKEND_CANISTER_ID) {
      process.env.VITE_BACKEND_CANISTER_ID = backendId;
    }
    if (frontendId && !process.env.VITE_FRONTEND_CANISTER_ID) {
      process.env.VITE_FRONTEND_CANISTER_ID = frontendId;
    }
    
    console.log('✅ Canister IDs loaded:', { backend: backendId, frontend: frontendId });
  } catch (error) {
    console.warn('⚠️  无法读取 canister_ids.json，请确保已运行 dfx deploy');
  }
}

setupCanisterIds();

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'buffer': 'buffer',
    }
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  envPrefix: 'VITE_',
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
});
