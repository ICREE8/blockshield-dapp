import React from 'react';
import Link from 'next/link';

const AssetsTable = ({ data }) => (
    <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Blockshield Assets
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Blockshield assets.</p>
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Symbol
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Rating
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Origin
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Due Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Yield (%)
                    </th>
                    <th scope="col" class="px-6 py-3">
                        #
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.name}
                        </th>
                        <td class="px-6 py-4">
                            {item.symbol}
                        </td>
                        <td class="px-6 py-4">
                            {item.rating}
                        </td>
                        <td class="px-6 py-4">
                            {item.tokenization_platform}
                        </td>
                        <td class="px-6 py-4">
                            {item.due_date}
                        </td>
                        <td class="px-6 py-4">
                            {item.price.unitary_value} - {item.price.currency}
                        </td>
                        <td class="px-6 py-4">
                            {item.price.yield}
                        </td>
                        <td class="px-6 py-4">
                            <Link href={{ pathname: '/buy', query: { asset: JSON.stringify(item) } }}>
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                    </svg>
                                    Buy now
                                </button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default AssetsTable;
