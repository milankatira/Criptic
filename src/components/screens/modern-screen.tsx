import TopCurrencyTable from '@/components/top-currency/currency-table';
import TransactionTable from '@/components/transaction/transaction-table';
import OverviewChart from '@/components/ui/chats/overview-chart';
import TopPools from '@/components/ui/top-pools';
import cn from 'classnames';
import { NextSeo } from 'next-seo';

//images
import { useQuery } from 'react-query';

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

  const { data, isLoading, error } = useQuery('posts', fetchPosts);
  console.log(data?.coins, 'data');
  return (
    <>
      <NextSeo
        title="Criptic"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />



      <div className="my-8 sm:my-10">
        {data && data.coins && <TopCurrencyTable currencyChart={data?.coins} />}
      </div>

    </>
  );
}
