import { ConfirmModal } from '@/components/molecules/ConfirmModal';
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
  const confirmModal = useSelector((state: any) => state.confirmModal);
  // const token = useSelector((state: any) => state.token);

  return (
    <div>
      <Header />
      <main className={router.pathname.includes('/detail') ? `main background-gray` : `main`}>
        {children}
      </main>
      <Footer />
      {modal.active && <Modal />}
      {confirmModal.active && <ConfirmModal />}
    </div>
  )
}

export default Layout;