'use client';

import React from 'react';
import Link from 'next/link'

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
                                <Link 
                                    href={{  pathname: `https://amoy.polygonscan.com/tx/${item.transaction_hash}` }} 
                                    target="_blank"
                                >
                                    <p className="pointer-events-none text-blue-600 dark:text-blue-500">
                                        {item.transaction_hash}
                                        {/* <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg> */}
                                    </p>
                                </Link>
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
