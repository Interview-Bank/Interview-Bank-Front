import Layout from '@/components/templates/Layout/Layout'
import '@/styles/globals.css';
import '@/styles/register.scss';
import '@/styles/post.scss';
import type { AppProps } from 'next/app'
import { wrapper } from '../redux/rootReducer';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default wrapper.withRedux(App);
