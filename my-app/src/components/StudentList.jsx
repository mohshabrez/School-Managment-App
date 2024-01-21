import { useNavigate } from "react-router-dom"

export const StudentList = ({ students}) => {
    const navigate = useNavigate()
    return(
        <div>
            <div className="w-[100%] overflow-x-scroll text-black">
                <table className="w-[100%]">
                    <thead className="bg-gray-200 border-2 border-gray-300">
                        <tr className="hover: cursor-pointer shadow-sm font-bold">
                            <th className="text-center px-2">Name</th>
                            <th className="text-center px-2">Age</th>
                            <th className="text-center px-2">Grade</th>
                            <th className="text-center px-2">Gender</th>
                            <th className="text-center px-2">Attendance</th>
                            <th className="text-center px-2">Marks</th>
                            <th className="text-center px-2">Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.data ? students?.data?.map((student) => (
                            <tr key={student?._id} onClick={() => navigate(`/students/${student?._id}`)} className="bg-gray-200 text-center px-2">
                                <td className="hover: cursor-pointer font-bold">{student?.name}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.age}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.grade}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.gender}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.attendance}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.marks}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.class}</td>
                            </tr>
                        )): students?.map((student) => (
                            <tr key={student?._id} onClick={() => navigate(`/students/${student?._id}`)} className="bg-gray-200 text-center px-2">
                                <td className="hover: cursor-pointer font-bold">{student?.name}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.age}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.grade}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.gender}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.attendance}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.marks}</td>
                                <td className="hover: cursor-pointer font-bold">{student?.class}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}