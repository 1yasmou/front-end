import React from "react";
import { Link } from "react-router-dom";
import "./EquipmentCard.css";
function EquipmentCard({ equipment }) {
  return (
    <div
      key={equipment.id}
      className="Equipement-item card"
      style={{ width: "18rem" }}
    >
      <div className="card-body">
        <h5 className="card-title">{equipment.inst_nom} </h5>
        <p>{equipment.equip_type_name}</p>
        <p className="card-text">
          {equipment.inst_adresse} - {equipment.inst_cp}
        </p>
        <Link
          className="btn btn-primary"
          to={`/equipments/${equipment._id.toString()}`}
        >
          En savoir +
        </Link>
      </div>
    </div>
  );
}

export default EquipmentCard;
