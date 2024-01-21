import { useNavigate } from "react-router-dom"

export const TeacherList = ({teachers}) => {
    const navigate = useNavigate();

    return(
        <div>
            <div className="w-[100%] overflow-x-scroll text-black">
                <table className="w-[100%]">
                    <thead className="bg-gray-200 border-2 border-gray-300">
                        <tr className="hover: cursor-pointer shadow-sm font-bold">
                            <th className="text-center px-2">Name</th>
                            <th className="text-center px-2">Subject</th>
                            <th className="text-center px-2">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers?.map((teacher) => (
                            <tr key={teacher?._id} onClick={() => navigate(`/teachers/${teacher?._id}`)} className="bg-gray-200 text-center px-2">
                                <td className="hover: cursor-pointer font-bold">{teacher?.name}</td>
                                <td className="hover: cursor-pointer font-bold">{teacher?.subject}</td>
                                <td className="hover: cursor-pointer font-bold">{teacher?.contact}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}