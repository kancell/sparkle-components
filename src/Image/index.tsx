import React, { useRef } from 'react';
import { memo, useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import './../style.css';

type ImageProps = {
  src:string,
  className?: string,
  alt?: string,
  fit?: 'contain' | 'cover' | 'fill' | 'scale-down' | 'none',
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom',
  preview?: boolean,
  showLoading?: boolean,
  showError?: boolean,
  loadingIcon?: string | React.ReactElement,
  errorIcon?: string | React.ReactElement,
  iconSize?: number,
  onLoad?: () => void,
  onError?: () => void,
  onClick?: () => void,
}

const extraCalsses = (props: ImageProps) => {
  let classes = '';
  if (props.fit) classes += ` object-${props.fit}`;
  if (props.position) classes += ` object-${props.position}`;
  if (props.className) classes += ` ${props.className}`;
  return classes;
}

const Image:React.FC<ImageProps> = ({ src, className, alt, preview = true, showLoading = true, loadingIcon, showError = true, errorIcon, ...props }) => {
  const imageRef = useRef(null);
  const [visible, setVisible] = useState<boolean>(false)

  const [state, setState] = useState<{
    loading: boolean,
    error: boolean,
  }>({
    loading: showLoading,
    error: false,
  })

  const onLoad = () => {
    props.onLoad && props.onLoad();
    setState({ loading: false, error: false });
  }

  const onError = () => {
    props.onError && props.onError();
    setState({ loading: false, error: true });
  }

  const onClick = () => {
    if (state.loading || state.error) return
    props.onClick && props.onClick();
    preview && setVisible(true);
  }

  const ImageElementFunc = () => {
    if (state.error || !src) return errorElementFunc()

    return <img
      className={extraCalsses({ src, className, alt, preview, ...props })}
      src={src} 
      ref={imageRef}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
      onClick={onClick}
    />
  }
  
  const errorElementFunc = () => {
    if (!errorIcon) {
      return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    } else {
      return typeof errorIcon === 'string' ? <img src={errorIcon} alt={alt} /> : errorIcon;
    }
  }
  
  const loadingElementFunc = () => {
    if (!loadingIcon) {
      return <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
      </svg>
    } else {
      return typeof loadingIcon === 'string' ? <img src={loadingIcon} alt={alt} /> : loadingIcon;
    }
  }
  
  useEffect(() => {
    const RenderOutline = document.createElement("div");
    if (visible && preview) {
      ReactDOM.render(
        <div onClick={
          ()=> {
            setVisible(!visible)
            document.body.removeChild(RenderOutline);
          }} 
          className="z-50 top-0 left-0 fixed w-screen h-screen flex items-center justify-center bg-opacity-60 bg-gray-800"
        >
          <img src={src} className="w-auto h-auto"/>
        </div>, RenderOutline)
      document.body.appendChild(RenderOutline);
    }
  }, [visible]) 


  return (
    <>
      { state.loading && loadingElementFunc() }
      { ImageElementFunc() }
    </>
  )
};

export default memo(Image)