
import queryClient from '@/components/queryClient';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import type { NextPageWithLayout } from '@/types';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { QueryClientProvider } from 'react-query';

import '@/assets/css/globals.css';
import '@/assets/css/scrollbar.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip
} from 'chart.js';
Chart.register(
  ArcElement,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);


function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <title>Criptic - React Next Web3 NFT Crypto Dashboard Template</title>
      </Head>
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="dark"
      >
          <QueryClientProvider client={queryClient}>
            {getLayout(<Component {...pageProps} />)}
            <SettingsButton />
            <SettingsDrawer />
          </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
