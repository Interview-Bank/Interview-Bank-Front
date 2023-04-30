import { Modal } from '@/components/molecules/Modal';
import { Footer } from '@/components/organisms/Footer/Footer';
import { Header } from '@/components/organisms/Header/Header';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux';

interface LayOutProps {
  children: ReactNode;
}

const Layout = ({children} :LayOutProps) => {
  const router = useRouter();
  const modal = useSelector((state: any) => state.modal);

  useEffect(() => {

  }, [])

  return (
    <div>
      <Header />
      <main className={router.pathname.includes('/detail') ? `main background-gray` : `main`}>
        {children}
      </main>
      <Footer />
      {modal.active && <Modal />}
    </div>
  )
}

export default Layout;