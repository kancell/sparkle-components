import { defineConfig } from 'dumi';
import tailwindcss from '@tailwindcss/postcss7-compat';

export default defineConfig({
  title: 'Sparkle',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  links: ['https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'],
  extraPostCSSPlugins: [
    /* 配置tailwindcss，目前为postcss7.0兼容版本 */
    tailwindcss(),
  ],
  styles: [],
  // more config: https://d.umijs.org/config
});
