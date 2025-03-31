import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 💡 스프링 서버 주소 & 포트
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // 경로 유지
      },
    },
  },
});
