import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import RowRecord from "./RowRecord";

function PrintHistoryTable({ dataRows }) {
  const { user } = useContext(UserContext);
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse bg-white" id='history-table'>
      <thead>
        <tr className="bg-gray-100">
          <th scope="col p-3 text-left font-semibold border-b w-16">ID</th>
          {user.isSPSO && <th scope="col">Người đặt in</th>}
          <th scope="col p-3 text-left font-semibold border-b">Tên tài liệu</th>
          <th scope="col p-3 text-left font-semibold border-b">Máy in</th>
          <th scope="col p-3 text-left font-semibold border-b">Trạng thái</th>
          <th scope="col p-3 text-left font-semibold border-b">Xem chi tiết</th>
        </tr>
      </thead>
      <tbody>
        {dataRows.map((data, index) =>
        <RowRecord key={index} data={data} />
        )}
      </tbody>
    </table>
    </div>
    
  );
}

export default PrintHistoryTable;