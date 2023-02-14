
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


export default function itemsRoute() {
    // const items = useLoaderData<typeof loader>();
  return (
    <div>
      {/* Render items with tailwind classes */}
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Role
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* {items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img className="w-10 h-10 rounded-full" src={item.image} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {item.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.title}</div>
                                            <div className="text-sm text-gray-500">{item.department}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {item.role}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                            <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

      {/* <itemView teams={useLoaderData<typeof loader>()} /> */}
    </div>
  );
}
