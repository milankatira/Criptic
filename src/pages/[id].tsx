import Chart from '@/components/chart/Chart';
import { ChevronDown } from '@/components/icons/chevron-down';
import Loader from '@/components/ui/loader';
import RootLayout from '@/layouts/_root-layout';
import type { NextPageWithLayout } from '@/types';
import { Listbox, Transition } from '@headlessui/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

interface SortOption {
  id: string;
  name: string;
}

const sort: SortOption[] = [
  { id: '24h', name: '24 h' },
  { id: '7d', name: '7 days' },
  { id: '1y', name: '1 year' },
  { id: '5y', name: '5 year' },
];

interface SortListProps {
  selectedItem: SortOption;
  setSelectedItem: React.Dispatch<React.SetStateAction<SortOption>>;
}

const SortList: React.FC<SortListProps> = ({
  selectedItem,
  setSelectedItem,
}) => {
  return (
    <div className="relative">
      <Listbox value={selectedItem} onChange={setSelectedItem}>
        <Listbox.Button className="flex h-10 w-auto items-center justify-between rounded-lg bg-gray-100 px-4 text-xs text-gray-900 dark:bg-gray-800 dark:text-white sm:w-56 sm:text-sm lg:h-11">
          {selectedItem.name}
          <ChevronDown className="ltr:ml-2 rtl:mr-2" />
        </Listbox.Button>
        <Transition
          enter="ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 -translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <Listbox.Options className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white p-3 shadow-large dark:bg-light-dark">
            {sort.map((item) => (
              <Listbox.Option key={item.id} value={item}>
                {({ selected }) => (
                  <div
                    className={`block cursor-pointer rounded-lg px-3 py-2 text-xs font-medium text-gray-900 transition dark:text-white sm:text-sm  ${
                      selected
                        ? 'my-1 bg-gray-100 dark:bg-gray-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.name}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};

const LiquidityPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedItem, setSelectedItem] = useState<SortOption>(sort[0]);

  const fetchPosts = async (selectedItem: SortOption) => {
    //https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?timePeriod=7d
    const url = `https://coinranking1.p.rapidapi.com/coin/${id}/history?timePeriod=${selectedItem.id}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '931d381d6amsh8e51610bc31ce58p1b4d51jsn6c9311055d68',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.history;
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toDateString(); // Adjust the format as needed
  };

  const { data, isFetching, error, refetch } = useQuery('posts', () =>
    fetchPosts(selectedItem)
  );

  useEffect(() => {
    refetch();
  }, [selectedItem]);

  console.log(isFetching, 'isLoading ....');

  const tension = 0.9;
  const reversedData = data && data.length > 0 && [...data].reverse();
  const userData = {
    labels:
      data &&
      data.length > 0 &&
      reversedData?.map((data: { timestamp: number }) =>
        formatDate(data.timestamp)
      ),
    datasets: [
      {
        label: 'Users Gained',
        data:
          data &&
          data.length > 0 &&
          reversedData?.map((data: { price: any }) => data.price),
        backgroundColor: ['rgba(75,192,192,1)'],
        borderColor: 'blue',
        borderWidth: 2,
        tension: tension,
      },
    ],
  };

  if (isFetching) {
    return (
      <div className="fixed z-50 grid h-full w-full place-content-center">
        <Loader variant="blink" />
      </div>
    );
  }

  return (
    <>
      <NextSeo
        title="Liquidity"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />

      <SortList selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      {/* @ts-ignore */}
      {data && <Chart data={userData} />}
    </>
  );
};

LiquidityPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default LiquidityPage;
