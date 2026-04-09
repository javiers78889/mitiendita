import { ClipLoader } from "react-spinners";

export function Spinner({ size }: { size?: number }) {
    return (
        <div className="flex items-center justify-center">
            <ClipLoader size={size ? size : 20} color="#3b82f6" />
        </div>
    )
}