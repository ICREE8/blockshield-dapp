import React from 'react';

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
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default AssetsTable;
