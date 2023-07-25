import { IoMdClose } from "react-icons/io";

interface TagProps {
  value: string;
  onDelete: () => void;
}

export default function Tag({ value, onDelete }: TagProps) {
  return (
    <div className="flex items-center h-7 border rounded p-1 mr-1 mt-1">
      <IoMdClose
        size={18}
        onClick={onDelete}
        className="cursor-pointer text-red-500"
      />
      <span>#{value}</span>
    </div>
  );
}
