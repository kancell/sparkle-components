/*
 * @Author: xxxafu
 * @Date: 2022-03-15 08:38:56
 * @LastEditTime: 2022-03-19 16:27:33
 * @LastEditors: xxxafu
 * @Description:
 * @FilePath: \sparkle-components\src\Foo\index.tsx
 */
import { useSpring, animated, config, useTransition } from '@react-spring/web';
import React, { useState } from 'react';

import './../style.css';

function Mount() {
  const [show, set] = useState(false);
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
    config: config.molasses,
  });
  return (
    <>
      <div onClick={() => set(!show)}>111</div>
      <svg className="h-4 w-4 text-blue-500" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
      {transitions(
        (styles, item) =>
          item && (
            <div>
              <animated.div style={styles}>✌️</animated.div>
            </div>
          ),
      )}
    </>
  );
}

export default Mount;
