import GeneralDetailTable from "./GeneralDetailTable";

function DocumentDetail({ data }) {
  const documentDetailData = [
    {
      name: 'Tên tài liệu',
      value: data.document_name
    },
    {
      name: 'Định dạng',
      value: data.file_type
    },
    {
      name: 'Số trang ',
      value: data.no_of_pages
    }
  ];
  
  return (
    <section>
      <h3 className='ps-2'>Thông tin tài liệu</h3>
      <GeneralDetailTable data={documentDetailData} />
    </section>
  );
}

export default DocumentDetail;