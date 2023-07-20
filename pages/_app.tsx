import { AppProps } from 'next/app';
import './globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { head_title } from '@/function/head_title';
import React from 'react';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`Re:Cine${head_title(router.pathname)}`}</title>
        <meta
          name="description"
          content="다르게 영화 읽기 - 영화비평 & 리뷰 커뮤니티 Re_Cine"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* <meta property="og:title" content="My Page Title" />
        <meta
          property="og:description"
          content="This is a description of my page."
        />
        <meta property="og:image" content="/thumbnail.png" /> */}
      </Head>

      <Layout>
        <Navbar navTextArr={['Home', 'Write']} />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
