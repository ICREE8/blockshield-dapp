'use client';

import React from 'react';

const SecuredAssetsTable = ({ data }) => {
    // console.log("On sucured asset table....");
    // console.log(data);

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    Assets Secured by Blockshield
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of assets transacted by the connected Wallet.</p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Transaction Hash
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Symbol
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.transaction_hash}
                            </th>
                            <td className="px-6 py-4">
                                {item.symbol}
                            </td>
                            <td className="px-6 py-4">
                                {item.quantity}
                            </td>
                            <td className="px-6 py-4">
                                {item.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SecuredAssetsTable;
