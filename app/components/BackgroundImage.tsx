// components/BackgroundImage.tsx
'use client';

import React, { CSSProperties, ReactNode } from 'react';

interface BackgroundImageProps {
  imageUrl: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  imageUrl,
  children,
  className = '',
  style = {}
}) => {
  const divStyle: CSSProperties = {
    ...style,
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <div className={className} style={divStyle}>
      {children}
    </div>
  );
};

export default BackgroundImage;
