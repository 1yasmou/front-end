import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";

function EquipmentsPage() {
  const [equipments, setEquipments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getEquipments() {
      try {
        const response = await apiHandler.getAllEquipments();

        setEquipments(response.data);
      } catch (error) {
        setError(error.message);
      }
    }

    getEquipments();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}

      {equipments.map((equipment) => {
        return (
          <div className="card light" key={equipment._id}>
            <h2>{equipment.equip_nom}</h2> {/*equip_nom , equip_numero*/}
            <p>{equipment.equip_numero}</p>
          </div>
        );
      })}
    </div>
  );
}

export default EquipmentsPage;
