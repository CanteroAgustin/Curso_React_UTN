import { Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character } from "../../interfaces/ListInterface";
import * as CustomService from "../../services/CustomService";

const DetailPage = () => {
  const { id }: { id: string } = useParams();
  const [detail, setDetail] = useState<Character>();

  useEffect(() => {
    CustomService.getSpecificCharacter(id)
      .then((data: any) => {
        setDetail(data);
      }).catch(err => {
        setDetail(undefined);
      })
  }, [id])

  return (
    <>
      <Row>
        <div>
          <h1>{detail?.name}</h1>
        </div>
      </Row>
    </>
  )
}

export default DetailPage;

