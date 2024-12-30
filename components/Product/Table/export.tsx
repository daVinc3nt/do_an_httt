import { columns } from "./column";
import { DataTable } from "./datatable";
// import { FindingStudentInfoByAdmin, StudentOperation, token } from "@/ambLib/amb";
import { ProductOperation } from "@/do_an-library/main";
// const conditions: FindingStudentInfoByAdmin[] = [];
async function getData(criteria ,value): Promise<any> {

  const ProdAction = new ProductOperation()
  if (criteria == "search")
  {
    console.log(value)
    const res = await ProdAction.searchelt(value)
    console.log(res)
    return res.data;
  }
  const res = await ProdAction.search(criteria, value)
  console.log(res)
  // const data = await res.json();
  console.log()
  return res.data;
}
export default async function DemoPage(criteria:string, value:string, reloadData:any) {
  // const test = useContext(UserContext)
  const data = await getData(criteria, value);
  const columnsWdata = await columns(reloadData);
  if (data)
    return(
      <div>
        <DataTable columns={columnsWdata} data={data} reload={reloadData}/>
      </div>
    )
  else 
    return(
      <div className="text-xl flex items-center">
        Lỗi xảy ra vui lòng thử lại!
      </div>
  )
}
