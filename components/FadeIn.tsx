import { Fade } from '@mui/material';
import { NextPage } from 'next';
import { ReactElement } from 'react';

type FadeInProps = {
  children: ReactElement;
  index: number;
};

const FadeIn: NextPage<FadeInProps> = ({ children, index }) => {
  return (
    <Fade
      in
      timeout={500}
      style={{
        transitionDelay: `${500 * index}ms`,
      }}
    >
      {children}
    </Fade>
  );
};

export default FadeIn;
