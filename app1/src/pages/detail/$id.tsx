import { useParams } from "umi";

const Detail = () => {
  const params = useParams();
  return (<div>{params?.id}</div> );
}
 
export default Detail;
