import { ModalEditProduct } from "@/src/components/tienda-details/ModalesProducto/ModalEditProduct";
import { ProductType } from "@/src/zod";
import IonIcon from "@reacticons/ionicons";
import { ModalDeleteProduct } from "../../ModalesProducto/ModalDeleteProduct";

export function TableProductsFields({ n }: { n: ProductType }) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
            <td className="p-4">
                <img
                    src={`${n.image ? (n.image) : ('/tienda.png')}`}
                    className="w-16 md:w-32 max-w-full max-h-100"
                    alt="Apple Watch"
                />
            </td>

            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {n.name}
            </td>



            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{n.quantity}</td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{n.description.slice(0, 10)}...</td>

            <td className="px-6 py-4 space-x-2">
                <div className="flex gap-2 justify-center items-center">

                    <ModalEditProduct n={n} />
                    <ModalDeleteProduct n={n} />
                    <button className="font-medium  hover:underline hover:text-blue-400 cursor-pointer">
                        <IonIcon name="eye-outline" size="large" />
                    </button>
                </div>
            </td>
        </tr>
    )
}