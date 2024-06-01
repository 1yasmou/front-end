import React, { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import "./EquipmentDetailsPage.css";
import { useParams } from "react-router-dom";

function EquipementDetailsPage() {
  const [equipement, setEquipement] = useState(null);
  const { equipementId } = useParams();

  console.log("1*equipementId :", equipementId);

  useEffect(() => {
    async function fetchEquipementDetails() {
      try {
        const response = await apiHandler.getEquipementDetails(equipementId);

        setEquipement(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEquipementDetails();
  }, [equipementId]);

  if (!equipement) {
    return <div>Loading...</div>;
  }

  return (
    <div className="equipement-details">
      <h2>{equipement.inst_nom}</h2>
      <p>
        <strong>ADRESSE:</strong> {equipement.inst_adresse}
      </p>
      <p>
        <strong>OBSERVATIONS:</strong> {equipement.inst_obs}
      </p>
      <p>
        <strong>ARRONDISSEMENT:</strong> {equipement.arrondissement}
      </p>
    </div>
  );
}

export default EquipementDetailsPage;
