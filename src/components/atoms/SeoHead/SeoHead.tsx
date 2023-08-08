import Head from 'next/head';
import React from 'react'

interface HeadProps {
  title    : string;
  author  ?: string;
}

const SeoHead = ({ title, author = '' }: HeadProps) => {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" />
      <title>{title}</title>
      <meta name="google-site-verification" content="_dG-0g557NctHr-Zt6WKBMnTqwOamNM0QenhkD7GSN8" />
      <meta name="description" content={'인터뷰 뱅크'} />
      <meta name="keywords" content={'인터뷰 뱅크, 대기업 면접, 면접, 대기업'} />
      <meta property="og:title" content={title} />
      {/* <meta property="og:image" content={theCute.toString()} /> */}
      {/* <meta property="og:description" content={post.content} /> */}
    </Head>
  )
}

export { SeoHead };