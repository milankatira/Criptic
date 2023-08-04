import TopCurrencyTable from '@/components/top-currency/currency-table';
import { NextSeo } from 'next-seo';

import { useQuery } from 'react-query';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Loader from '../ui/loader';
export default function ModernScreen() {
  const fetchPosts = async () => {
    const url =
      'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a0bab34edcmsh4171d1ee73ce367p16ec29jsn77bd4df6c4b6',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      },
    };

    const response = await fetch(url, options);
    const dat = await response.json();
    return dat.data;
  };

  const { data, isFetching } = useQuery('posts', fetchPosts);

  function formatNumber(number: string) {
    if (parseInt(number) >= 1e12) {
      return (parseInt(number) / 1e12).toFixed(1) + 'T';
    } else if (parseInt(number) >= 1e9) {
      return (parseInt(number) / 1e9).toFixed(1) + 'B';
    } else if (parseInt(number) >= 1e3) {
      return (parseInt(number) / 1e3).toFixed(1) + 'K';
    } else {
      return parseInt(number).toString();
    }
  }

  return (
    <>
      <NextSeo
        title="Criptic"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />

      <div className="my-8 sm:my-10">
        {isFetching && (
          <div className="fixed z-50 grid h-full w-full place-content-center">
            <Loader variant="blink" />
          </div>
        )}
        {!isFetching && <div className="mb-12">
          <h2 className="mb-8 text-xl">Global Crypto Stats</h2>
          <div className="mt-4 flex w-full flex-row">
            <div className="w-1/2">
              <p className="text-gray-500">Total Cryptocurrencies</p>
              <p className="font-semibold">{data?.stats?.totalCoins}</p>
            </div>

            <div className="w-1/2">
              <p className="text-gray-500">Total Exchanges</p>
              <p className="font-semibold">
                {formatNumber(data?.stats?.totalExchanges)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex w-full flex-row">
            <div className="w-1/2">
              <p className="text-gray-500">Total Market Cap</p>
              <p className="font-semibold">
                {formatNumber(data?.stats?.totalMarketCap)}
              </p>
            </div>

            <div className="w-1/2">
              <p className="text-gray-500">Total 24h Volume</p>
              <p className="font-semibold">
                {formatNumber(data?.stats?.total24hVolume)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex w-full flex-row">
            <div className="w-1/2">
              <p className="text-gray-500">Total Markets</p>
              <p className="font-semibold">
                {formatNumber(data?.stats?.totalMarkets)}
              </p>
            </div>
          </div>
        </div>
        }

        {data && data.coins && <TopCurrencyTable currencyChart={data?.coins} />}
      </div>
    </>
  );
}
