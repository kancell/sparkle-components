/*
 * @Author: xxxafu
 * @Date: 2022-03-16 08:34:37
 * @LastEditTime: 2022-03-19 16:29:15
 * @LastEditors: xxxafu
 * @Description:
 * @FilePath: \sparkle-components\.umirc.ts
 */
import { defineConfig } from 'dumi';
import tailwindcss from '@tailwindcss/postcss7-compat';

export default defineConfig({
  title: 'Sparkle',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  extraPostCSSPlugins: [
    /* 配置tailwindcss，目前为postcss7.0兼容版本 */
    tailwindcss(),
  ],
  themeConfig: {
    carrier: 'Sparkle', // 设备状态栏左侧的文本内容
    hd: {
      // umi-hd 的 750 高清方案（默认值）
      rules: [{ mode: 'vw', options: [32, 750] }],
    },
  },
});
