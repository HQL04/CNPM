import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import FilterBar from "./FilterBar";
import PrintHistoryTable from "./PrintHistoryTable";

function History({ data }) {
  const { user } = useContext(UserContext);
  const [selectedPrinter, setSelectedPrinter] = useState('default');
 
  const [selectedCustomer, setSelectedCustomer] = useState('');
  
  const printerList = new Set();
  data.forEach((value) => {
    printerList.add(value.printer_name);
  });
  
  const filteredRows = data.filter((value) => {
    return (
      (selectedPrinter === 'default' || value.printer_name === selectedPrinter) &&
      
      (!user.isSPSO || selectedCustomer === '' || value.customer_name.toLowerCase().includes(selectedCustomer.toLowerCase()))
    );
  });
  
  const handleChoosePrinter = (e) => {
    setSelectedPrinter(e.target.value);
  }
  
  
  
  const handleCustomerChange = (e) => {
    setSelectedCustomer(e.target.value);
  }
  
  return (
    <>
      <div className='col-12 my-3'>
        <FilterBar printerList={[...printerList]} handleChoosePrinter={handleChoosePrinter}  handleCustomerChange={handleCustomerChange} />
      </div>
      <div className='col-12 my-3 table-responsive'>
        <PrintHistoryTable dataRows={filteredRows} />
      </div>
    </>
  );
}

export default History;