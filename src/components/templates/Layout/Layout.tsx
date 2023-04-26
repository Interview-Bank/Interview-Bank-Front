import Header from '@/components/organisms/Header/Header';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react'

interface LayOutProps {
  children: ReactNode;
}

const Layout = ({children} :LayOutProps) => {
  const router = useRouter();
  return (
    <div>
      <Header />
      <main className={router.pathname.includes('/detail') ? `main background-gray` : `main`}>
        {children}
      </main>
      {/* <Modal /> */}
    </div>
  )
}

export default Layout;