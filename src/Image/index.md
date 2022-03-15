---
nav:
  title: 组件
  path: /components

group:
  title: Image 图片
---

# Image 图片

## 介绍

增强版的 img 标签，提供多种图片填充模式，支持加载中提示、加载失败提示。

## 引入

```tsx | pure
import React from 'react';
import { Image } from 'sparkle';
```

## 演示

### 基础用法

提供点击图片全屏预览，如需阻止预览，请将组件的 preview 属性设为 false

```tsx
import React from 'react';
import { Image } from 'sparkle';

export default () => (
  <Image src="https://cdn.pixabay.com/photo/2014/09/07/21/34/child-438373_960_720.jpg" />
);
```

### 错误占位

提供加载失败时的默认占位图标

```tsx
import React from 'react';
import { Image } from 'sparkle';

export default () => <Image src="https://error.jpg" />;
```

### 自定义错误图标

可以自定义错误图标，需传入 src 或者 React.ReactElement

```tsx
import React from 'react';
import { Image } from 'sparkle';

const errImage = 'https://cdn.pixabay.com/photo/2020/06/15/17/35/me-nots-5302712_960_720.jpg';

const errElement = <div>error！</div>;

const imgElement = () => (
  <>
    <Image src="https://error.jpg" errorIcon={errImage} />

    <Image src="https://error.jpg" errorIcon={errElement} />
  </>
);

export default imgElement;
```

### 调整填充模式

限制图片高宽度的情况下，调整图片在有限位置内的填充效果

```tsx
import React from 'react';
import { Image } from 'sparkle';

const imgElement = () => (
  <div className="grid grid-cols-2">
    <Image
      className="w-12 h-12 mx-auto"
      src="https://cdn.pixabay.com/photo/2014/09/07/21/34/child-438373_960_720.jpg"
    />
    <Image
      className="w-12 h-12 mx-auto"
      src="https://cdn.pixabay.com/photo/2014/09/07/21/34/child-438373_960_720.jpg"
      fit="cover"
    />
    <Image
      className="w-12 h-12 mx-auto"
      src="https://cdn.pixabay.com/photo/2014/09/07/21/34/child-438373_960_720.jpg"
      fit="scale-down"
    />
    <Image
      className="w-12 h-12 mx-auto"
      src="https://cdn.pixabay.com/photo/2014/09/07/21/34/child-438373_960_720.jpg"
      fit="contain"
    />
  </div>
);

export default imgElement;
```

<API></API>
