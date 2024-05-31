'use client';

import InsureLink from '../components/InsureLink';

const AssetsTable = ({ data }) => {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    Blockshield Assets
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Blockshield assets.</p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Symbol
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rating
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Origin
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Due Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Remaining Supply
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Yield (%)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.name}
                            </th>
                            <td className="px-6 py-4">
                                {item.symbol}
                            </td>
                            <td className="px-6 py-4">
                                {item.rating}
                            </td>
                            <td className="px-6 py-4">
                                {item.tokenization_platform}
                            </td>
                            <td className="px-6 py-4">
                                {item.due_date}
                            </td>
                            <td className="px-6 py-4">
                                {item.price.unitary_value} - {item.price.currency}
                            </td>
                            <td className="px-6 py-4">
                                {item.total_supply - item.remaining_supply}
                            </td>
                            <td className="px-6 py-4">
                                {item.price.yield}
                            </td>
                            <td className="px-6 py-4">
                                {item && <InsureLink data={item} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssetsTable;
