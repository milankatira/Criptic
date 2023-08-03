import { ChevronDown } from '@/components/icons/chevron-down';
import Scrollbar from '@/components/ui/scrollbar';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import Link from 'next/link';
import React from 'react';
import {
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { LongArrowLeft } from '../icons/long-arrow-left';
import { LongArrowRight } from '../icons/long-arrow-right';
import Button from '../ui/button/button';

function convertToArrayOfObjects(array: []) {
  const resultArray = [];
  const numericArray = array.map((value) => parseFloat(value));
  const minValue = Math.min(...numericArray);
  const maxValue = Math.max(...numericArray);
  const normalizedData = numericArray.map(
    (value) => (value - minValue) / (maxValue - minValue)
  );
  for (let i = 0; i < normalizedData.length; i++) {
    const obj = {
      name: i + 1,
      value:(normalizedData[i]),
    };
    resultArray.push(obj);
  }

  return resultArray;
}

const COLUMNS = [
  {
    Header: '#',
    accessor: 'rank',
    minWidth: 60,
    maxWidth: 80,
  },
  {
    Header: 'Name',
    accessor: 'name',
    // @ts-ignore
    Cell: ({ cell: { value, row } }) => (
      <div className="mb-5 grid grid-cols-3 gap-4 text-sm text-gray-900 last:mb-0 dark:text-white">
        <div className="col-span-2 flex items-center gap-2">
          <Link href={`/${row.original.uuid}`}>
            <a className="w-6 shrink-0">{value}</a>
          </Link>
        </div>
      </div>
    ),
    minWidth: 140,
    maxWidth: 260,
  },
  {
    Header: () => (
      <div className="ltr:ml-auto ltr:text-right rtl:mr-auto rtl:text-left">
        Price
      </div>
    ),
    accessor: 'price',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">${value}</div>
    ),
    minWidth: 100,
    maxWidth: 140,
  },
  {
    Header: () => (
      <div className="ltr:ml-auto ltr:text-right rtl:mr-auto rtl:text-left">
        24H Change
      </div>
    ),
    accessor: 'change',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div
        className={`ltr:text-right rtl:text-left ${
          value > 0 ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {value}%
      </div>
    ),
    minWidth: 100,
    maxWidth: 140,
  },
  {
    Header: () => (
      <div className="ltr:ml-auto ltr:text-right rtl:mr-auto rtl:text-left">
        24H Volume
      </div>
    ),
    accessor: '24hVolume',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-right rtl:text-left">${value}</div>
    ),
    minWidth: 100,
    maxWidth: 140,
  },
  {
    Header: () => (
      <div className="ltr:ml-auto ltr:text-right rtl:mr-auto rtl:text-left">
        Market Cap
      </div>
    ),
    accessor: 'marketCap',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="flex items-center justify-end">${value}</div>
    ),
    minWidth: 100,
    maxWidth: 140,
  },
  {
    Header: () => (
      <div className="ltr:ml-auto ltr:text-right rtl:mr-auto rtl:text-left">
        7D Chart
      </div>
    ),
    accessor: 'sparkline',
    // @ts-ignore
    Cell: ({ cell: { value } }) => {
      return (
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={convertToArrayOfObjects(value)}>
            <Line
              scale="log"
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    },
    minWidth: 200,
    maxWidth: 300,
  },
];

export default function TopCurrencyTable({
  currencyChart,
}: {
  currencyChart: [any];
}) {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const data = React.useMemo(() => currencyChart, []);
  const columns = React.useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    state,
    headerGroups,
    page,
    prepareRow,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );

  const { pageIndex } = state;

  return (
    <div className="">
      <div className="rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8">
        <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
          <h2 className="mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
            Top Cryptocurrency
          </h2>
        </div>
      </div>
      <div className="-mx-0.5">
        <Scrollbar style={{ width: '100%' }} autoHide="never">
          <div className="px-0.5">
            <table
              {...getTableProps()}
              className="transaction-table w-full border-separate border-0"
            >
              <thead className="text-sm text-gray-500 dark:text-gray-300">
                {headerGroups.map((headerGroup, idx) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                    {headerGroup.headers.map((column, idx) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={idx}
                        className="group bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
                      >
                        <div className="flex items-center">
                          {column.render('Header')}
                          {column.canResize && (
                            <div
                              {...column.getResizerProps()}
                              className={`resizer ${
                                column.isResizing ? 'isResizing' : ''
                              }`}
                            />
                          )}
                          <span className="ltr:ml-1 rtl:mr-1">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ChevronDown />
                              ) : (
                                <ChevronDown className="rotate-180" />
                              )
                            ) : (
                              <ChevronDown className="rotate-180 opacity-0 transition group-hover:opacity-50" />
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="text-xs font-medium text-gray-900 dark:text-white 3xl:text-sm"
              >
                {page.map((row, idx) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={idx}
                      className="mb-3 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
                    >
                      {row.cells.map((cell, idx) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={idx}
                            className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Scrollbar>
      </div>
      <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-5 py-4 text-sm shadow-card dark:bg-light-dark lg:py-6">
        <div className="flex items-center gap-5">
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            title="Previous"
            shape="circle"
            variant="transparent"
            size="small"
            className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
          >
            <LongArrowLeft className="h-auto w-4 rtl:rotate-180" />
          </Button>
          <div>
            Page{' '}
            <strong className="font-semibold">
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </div>
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            title="Next"
            shape="circle"
            variant="transparent"
            size="small"
            className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
          >
            <LongArrowRight className="h-auto w-4 rtl:rotate-180 " />
          </Button>
        </div>
      </div>
    </div>
  );
}
