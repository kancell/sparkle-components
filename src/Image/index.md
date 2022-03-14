---
nav:
  title: Components
  path: /components

group:
  title: Image
 
---

# Image

Demo:

```tsx
import React from 'react';
import { Image } from 'sparkle';
// 常规用法，开启点击全屏预览，等同于原生img显示模式，宽度为父元素最大宽度

export default () => <div className="flex flex-col">

  <Image src="https://cdn.pi萨达撒.jpg" /> 
 <Image src="https://cdn.pixabay.com/photo/2014/09/07/21/34/child-438373_960_720.jpg" className='w-8 h-16' fit="cover"/> 
</div>;
```
