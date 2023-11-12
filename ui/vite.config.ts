import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import path from 'path'

export default defineConfig({
    plugins: [solid()],
    resolve: {
        alias: {
            '@utils': path.resolve(__dirname, './src/utils/index.ts'),
            '@components': path.resolve(__dirname, './src/components/index.ts')
        }
    }
})
