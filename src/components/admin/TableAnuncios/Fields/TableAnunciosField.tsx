import { AnunciosType } from "@/src/zod";

export function TableAnunciosField({ data }: { data: AnunciosType }) {


    const DateFormat = (date: string) => {

        const parseada = new Date(date)
        return parseada.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",

        });
    }
    const start = DateFormat(data.start_date)
    const end = DateFormat(data.end_date)
    return (

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
                <img
                    src={data.image ? data.image : "/tienda.png"}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                />
            </td>

            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {data.name}
            </td>

            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {start}
            </td>



            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{end}</td>

        </tr >
    )
}