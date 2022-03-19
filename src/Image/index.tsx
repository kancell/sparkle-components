import React, { useRef, CSSProperties, useMemo, memo, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useTransition, animated, config, SpringValue } from '@react-spring/web';
import { Loading, Error } from '@icon-park/react';

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
  const wrapStyle = useMemo(() => {
    const internalStyle: CSSProperties = { ...style };
    if (isDef(width)) {
      internalStyle.width = addUnit(width);
    }

    if (isDef(height)) {
      internalStyle.height = addUnit(height);
    }
    return internalStyle;
  }, [style]);

  const imageClasses = `w-full h-full object-${fit} object-${position}`;
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

  const ImageRender = () => {
    if (state.error || !src) return null;

    return (
      <img
        src={src}
        ref={imageRef}
        alt={alt}
        className={imageClasses}
        onLoad={imageOnLoad}
        onError={imageOnError}
        onClick={imageOnClick}
      />
    );
  };

  const errorRender = () => {
    if (!errorIcon) {
      return <Error style={{ fontSize: iconSize }} />;
    } else {
      return typeof errorIcon === 'string' ? (
        <img src={errorIcon} alt={alt} className={imageClasses} />
      ) : (
        errorIcon
      );
    }
  };

  const loadingRender = () => {
    if (!loadingIcon) {
      return <Loading style={{ fontSize: iconSize }} />;
    } else {
      return typeof loadingIcon === 'string' ? (
        <img src={loadingIcon} alt={alt} className={imageClasses} />
      ) : (
        loadingIcon
      );
    }
  };

  const placeholderRender = () => {
    if (state.loading && showLoading) {
      return loadingRender();
    }
    if (state.error && showError) {
      return errorRender();
    }
    return null;
  };

  const [visible, setVisible] = useState<boolean>(false);

  const transitions = useTransition(visible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.gentle,
  });

  const previewRef = useCallback((node) => {
    if (node && node.querySelector('img')) {
      if (
        node.querySelector('img').getBoundingClientRect().height <
        document.documentElement.clientHeight
      ) {
        node.classList.add('flex', 'items-center', 'justify-center');
      }
    }
  }, []);

  const previewRender = () => {
    const PreviewImage = (
      <div
        onClick={() => {
          setVisible(false);
        }}
        className="z-50 top-0 left-0 fixed w-screen h-screen bg-black"
      >
        <div ref={previewRef} className="w-screen h-screen overflow-y-auto">
          <img src={src} className="w-full" />
        </div>
      </div>
    );

    return ReactDOM.createPortal(
      transitions(
        (styles: { opacity: SpringValue }, item: boolean) =>
          item && <animated.div style={styles}>{PreviewImage}</animated.div>,
      ),
      document.body,
    );
  };

  return (
    <div style={wrapStyle} className={`${className ?? ''}`}>
      {ImageRender()}
      {placeholderRender()}
      {previewRender()}
    </div>
  );
};

export default memo(Image);
