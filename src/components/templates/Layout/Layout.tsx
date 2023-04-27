// import Modal from '@/components/molecules/Modal/Modal';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Header } from '@/components/organisms/Header/Header';
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
      <Footer />
      {/* <Modal /> */}
    </div>
  )
}

export default Layout;