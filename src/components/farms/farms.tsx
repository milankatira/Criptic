import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';
import { useQuery } from 'react-query';
import Loader from '../ui/loader';

function getTimeAgo(dateString: string | number | Date) {
  const providedDate = new Date(dateString);
  const currentDate = new Date();

  //@ts-ignore
  const timeDifference = currentDate - providedDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
}

export default function Farms() {
  const fetchPosts = async () => {
    const url =
      'https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=12';
    const options = {
      method: 'GET',
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '931d381d6amsh8e51610bc31ce58p1b4d51jsn6c9311055d68',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data.value;
  };

  const { data, isFetching, error } = useQuery('news', fetchPosts);
  return (
    <div className="mx-auto w-full">
      {isFetching && (
        <div className="fixed z-50 grid h-full w-full place-content-center">
          <Loader variant="blink" />
        </div>
      )}
      {!isFetching && (
        <>
          <div className="rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8">
            <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
              <h2 className="mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
                Top news
              </h2>
            </div>
          </div>
          <div className="flex flex-row flex-wrap">
            {data &&
              data?.length > 0 &&
              data.map(
                (item: {
                  url: string | undefined;
                  datePublished: string | Date;
                  image: { thumbnail: { contentUrl: any } };
                  name: string;
                  description:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | ReactFragment
                    | ReactPortal
                    | null
                    | undefined;
                  provider: {
                    name: string;
                    image: { thumbnail: { contentUrl: string | undefined } };
                  }[];
                }) => (
                  <div
                    className="p-4 transition-all duration-300 md:w-1/3"
                    key={item.name}
                  >
                    <div className="h-full overflow-hidden  rounded-lg border-2 border-gray-200 border-opacity-60 p-6">
                      <div className="flex flex-row gap-2">
                        <h2 className="title-font mb-1 text-xl font-bold">
                          <a href={item.url} target="_blank" rel="noreferrer">
                            {item.name}
                          </a>
                        </h2>
                        <img
                          className="h-28 w-28 rounded-lg object-cover object-center"
                          src={
                            item?.image?.thumbnail?.contentUrl ||
                            'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
                          }
                          alt="blog"
                        />
                      </div>

                      <div className="pt-6">
                        <p className="mb-3 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap items-center ">
                          <img
                            className="h-12 w-12 object-cover object-center"
                            src={
                              item?.provider[0]?.image?.thumbnail?.contentUrl
                            }
                            alt="blog"
                          />
                          <p className="ml-2">{item?.provider[0]?.name}</p>
                          <p className="ml-auto">
                            {getTimeAgo(item.datePublished)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </>
      )}
    </div>
  );
}
