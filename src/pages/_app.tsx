import Layout from '@/components/templates/Layout/Layout'
import '@/styles/globals.css';
import '@/styles/register.scss';
import '@/styles/post.scss';
import type { AppProps } from 'next/app'
import { wrapper } from '../redux/rootReducer';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(App);
