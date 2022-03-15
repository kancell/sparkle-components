import React, { useRef, CSSProperties, useMemo, memo, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated, config } from '@react-spring/web';

import { addUnit, isDef } from '../utils';
import './../style.css';

type ImageProps = {
  /**
   * @description       图片对应链接
   */
  src?: string;
  /**
   * @description       图片的css类名，可已在此定义图片背景色
   */
  className?: string;
  /**
   * @description       同原生img标签的alt
   */
  alt?: string;
  /**
   * @description       限定高宽度时，图片的填充模式
   */
  fit?: 'contain' | 'cover' | 'fill' | 'scale-down' | 'none';
  /**
   * @description       限定高宽度时，图片的显示模式
   */
  position?:
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'left-top'
    | 'right-top'
    | 'left-bottom'
    | 'right-bottom';
  /**
   * @description       是否支持点击方法预览，默认为true
   */
  preview?: boolean;
  /**
   * @description       是否在加载中显示loading图标，默认为true
   */
  showLoading?: boolean;
  /**
   * @description       是否在加载失败时显示error图标，默认为true
   */
  showError?: boolean;
  /**
   * @description       加载中图标，支持src或者React.ReactElement，默认为loading图标
   */
  loadingIcon?: string | React.ReactElement;
  /**
   * @description       加载失败图标，支持src或者React.ReactElement，默认为error图标
   */
  errorIcon?: string | React.ReactElement;
  /**
   * @description       图标大小
   */
  iconSize?: number;
  /**
   * @description       样式
   */
  style?: CSSProperties;
  /**
   * @description       宽度，支持数字与字符串（如24px、16vw等）
   */
  width?: number | string;
  /**
   * @description       高度，支持数字与字符串（如24px、16vh等）
   */
  height?: number | string;
  /**
   * @description 图片加载成功事件
   */
  onLoad?: () => void;
  /**
   * @description 图片加载失败事件
   */
  onError?: () => void;
  /**
   * @description 图片点击事件
   */
  onClick?: () => void;
};

const extraCalsses = (props: ImageProps) => {
  let classes = '';
  if (props.fit) classes += ` object-${props.fit}`;
  if (props.position) classes += ` object-${props.position}`;
  if (props.className) classes += ` ${props.className}`;
  return classes;
};

const Image: React.FC<ImageProps> = ({
  src,
  className,
  alt = '',
  fit = 'fill',
  position = 'center',
  preview = true,
  showLoading = true,
  loadingIcon,
  showError = true,
  errorIcon,
  iconSize,
  style,
  width,
  height,
  onLoad,
  onError,
  onClick,
}) => {
  const imageStyle = useMemo(() => {
    const internalStyle: CSSProperties = { ...style };
    if (isDef(width)) {
      internalStyle.width = addUnit(width);
    }

    if (isDef(height)) {
      internalStyle.height = addUnit(height);
    }
    return internalStyle;
  }, [style]);

  const imageRef = useRef(null);
  const [state, setState] = useState<{
    loading: boolean;
    error: boolean;
  }>({
    loading: true,
    error: false,
  });

  const imageOnLoad = () => {
    onLoad && onLoad();
    setState({ loading: false, error: false });
  };

  const imageOnError = () => {
    onError && onError();
    setState({ loading: false, error: true });
  };

  const imageOnClick = () => {
    if (state.loading || state.error) return;
    onClick && onClick();
    preview && setVisible(true);
  };

  const ImageElementFunc = () => {
    if (state.error || !src) return errorElementFunc();
    /*     const attrs = {
      style: {
        objectFit: fit,
      },
    }; */
    return (
      <img
        className={extraCalsses({ fit, position, className })}
        src={src}
        ref={imageRef}
        alt={alt}
        style={imageStyle}
        onLoad={imageOnLoad}
        onError={imageOnError}
        onClick={imageOnClick}
      />
    );
  };

  const errorElementFunc = () => {
    if (!showError) return null;
    if (!errorIcon) {
      return (
        <div className="flex justify-center items-center bg-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    } else {
      return typeof errorIcon === 'string' ? (
        <div>
          <img src={errorIcon} alt={alt} />
        </div>
      ) : (
        errorIcon
      );
    }
  };

  const loadingElementFunc = () => {
    if (!showLoading) return null;
    if (!loadingIcon) {
      return (
        <div className="flex justify-center items-center bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
            />
          </svg>
        </div>
      );
    } else {
      return typeof loadingIcon === 'string' ? (
        <div>
          <img src={loadingIcon} alt={alt} />
        </div>
      ) : (
        loadingIcon
      );
    }
  };

  const [visible, setVisible] = useState<boolean>(false);

  const styles = useSpring({
    loop: false,
    from: { opacity: visible ? 0 : 1 },
    to: { opacity: visible ? 1 : 0 },
    config: config.gentle,
  });

  useEffect(() => {
    if (visible && preview) {
      const RenderOutline = document.createElement('div');
      document.body.appendChild(RenderOutline);
      ReactDOM.render(
        <animated.div style={styles}>
          <div
            onClick={() => {
              setVisible(!visible);
              document.body.removeChild(RenderOutline);
            }}
            className="z-50 top-0 left-0 fixed w-screen h-screen flex items-center justify-center bg-opacity-90 bg-gray-800"
          >
            <img src={src} className="w-auto h-auto" />
          </div>
        </animated.div>,
        RenderOutline,
      );
    }
  }, [visible]);

  return (
    <>
      {state.loading && loadingElementFunc()}
      {ImageElementFunc()}
    </>
  );
};

export default memo(Image);
