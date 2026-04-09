import { DepartamentosType, ListDepartamentosType } from "@/src/zod";
import { Dispatch, SetStateAction } from "react";
import { ModalEditDepartamento } from "./ModalesDepartamento/ModalEditDepartamento";
import { ModalDeleteDepartamento } from "./ModalesDepartamento/ModalDeleteDepartamento";


export function TableDepartamentos({ departamentosdata, setDepartamento }: { departamentosdata: ListDepartamentosType, setDepartamento: Dispatch<SetStateAction<DepartamentosType | undefined>> }) {


    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre</th>

                        </tr>
                    </thead>

                    <tbody>

                        {departamentosdata.map(n => (

                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={n.id}>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white flex">
                                    <button type="button" onClick={() => setDepartamento(n)} className="cursor-pointer w-full text-start ">
                                        {n.name}
                                    </button>
                                    <div className="flex gap-2">
                                        <ModalEditDepartamento n={n} />
                                       <ModalDeleteDepartamento n={n}/>
                                    </div>

                                </td>
                            </tr>

                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    );
}
