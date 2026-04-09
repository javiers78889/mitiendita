import { ListAnunciosType } from "@/src/zod";
import { TableAnunciosField } from "./Fields/TableAnunciosField";


export function TableAnuncios({ anuncios }: { anuncios: ListAnunciosType }) {


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Fecha Inicio</th>
                            <th scope="col" className="px-6 py-3">Fecha Finalizacion</th>
                        </tr>
                    </thead>

                    <tbody>
                        {anuncios.map(n => (

                            <TableAnunciosField data={n} key={n.id} />

                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}
