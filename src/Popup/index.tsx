/*
 * @Author: xxxafu
 * @Date: 2022-03-18 16:18:21
 * @LastEditTime: 2022-03-19 16:27:16
 * @LastEditors: xxxafu
 * @Description:
 * @FilePath: \sparkle-components\src\Popup\index.tsx
 */
import React, {
  useRef,
  CSSProperties,
  useMemo,
  memo,
  useState,
  useEffect,
  useCallback,
  forwardRef,
} from 'react';
import { useTransition, animated, config, SpringValue } from '@react-spring/web';

import { addUnit, isDef } from '../utils';
import './../style.css';

type PopupProps = {
  children: React.ReactElement;
  title?: string;
  visible: boolean;
  onClose?: () => void;
  onShow?: () => void;
};

const Popup: React.FC<PopupProps> = forwardRef(({ children, title, visible, onClose, onShow }) => {
  return <></>;
});
