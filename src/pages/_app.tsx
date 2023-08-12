import Layout from '@/components/templates/Layout/Layout'
import '@/styles/globals.scss';
import '@/styles/register.scss';
import '@/styles/post.scss';
import '@/styles/search.scss';
import type { AppProps } from 'next/app'
import { wrapper } from '../redux/rootReducer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
