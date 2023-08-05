// import DrawersContainer from '@/components/drawer-views/container';
import queryClient from '@/components/queryClient';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';
import { WalletProvider } from '@/lib/hooks/use-connect';
import type { NextPageWithLayout } from '@/types';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { QueryClientProvider } from 'react-query';
// base css file
import '@/assets/css/globals.css';
import '@/assets/css/scrollbar.css';
import 'swiper/css';

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
  //could remove this if you don't need to page level layout
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <title>Criptic - React Next Web3 NFT Crypto Dashboard Template</title>
      </Head>
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        <WalletProvider>
          <QueryClientProvider client={queryClient}>
            {getLayout(<Component {...pageProps} />)}
            <SettingsButton />
            <SettingsDrawer />
            {/* <DrawersContainer /> */}
          </QueryClientProvider>
        </WalletProvider>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
