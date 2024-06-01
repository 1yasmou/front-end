import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import "./EquipmentPage.css";
import { Link, useNavigate, useParams } from "react-router-dom";

function EquipmentPage() {
  const [equipments, setEquipments] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nbrOfPages, setNbrOfPages] = useState(1);

  useEffect(() => {
    async function getEquipments(page) {
      try {
        const response = await apiHandler.getAllEquipments(page);

        setEquipments(response.data.equipments);
        setNbrOfPages(response.data.totalPages);
      } catch (error) {
        setError(error.message);
      }
    }

    getEquipments(currentPage);
  }, [currentPage]);

  return (
    /* <div>
      {error && <div>{error}</div>}

      {equipments.map((equipment) => {
        return (
          <div className="card light" key={equipment._id}>
            <h2>{equipment.equip_nom}</h2> 
            <p>{equipment.equip_numero}</p>
          </div>
        );
      })}
    </div>*/

    /*********************************** */

    <div id="equipements">
      <div className="container-one">
        {/*<Link to="/new-Equipement" className="button-add">
          + Nouvel équipement
    </Link>*/}
        <div className="EquipementListPage">
          {equipments.map(
            (
              equipment // Utilisation de la variable equipments
            ) => (
              <div
                key={equipment.id}
                className="Equipement-item card"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    {equipment.inst_nom}{" "}
                    {/*<span className="handicap-icon">
                      <RenderIcon
                        isHandicapped={equipment.inst_acc_handi_bool === "true"}
                      />
                    </span>*/}
                  </h5>
                  <p>{equipment.equip_type_name}</p>
                  <p className="card-text">
                    {equipment.inst_adresse} - {equipment.inst_cp}
                  </p>
                  <Link
                    className="btn btn-primary"
                    to={`/equipments/${equipment._id.toString()}`}
                  >
                    En savoir + ({equipment._id.toString()})
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="container-two">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              aria-label="Aller à la première page"
            >
              1
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Page précédente"
            >
              &laquo;
            </button>
          </li>

          <li className="page-item active">
            <span className="page-link-pagination">{currentPage}</span>
          </li>

          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === nbrOfPages}
              aria-label="Page suivante"
            >
              &raquo;
            </button>
          </li>

          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage(nbrOfPages)}
              disabled={currentPage === nbrOfPages}
              aria-label="Aller à la dernière page"
            >
              {nbrOfPages}
            </button>
          </li>
        </ul>
      </div>
    </div>

    /************************************ */
  );
}

export default EquipmentPage;
