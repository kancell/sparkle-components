/*
 * @Author: xxxafu
 * @Date: 2022-03-15 08:38:56
 * @LastEditTime: 2022-03-16 14:28:27
 * @LastEditors: xxxafu
 * @Description:
 * @FilePath: \sparkle-components\src\Foo\index.tsx
 */
import { useSpring, animated, config, useTransition } from '@react-spring/web';
import React, { useState } from 'react';

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
