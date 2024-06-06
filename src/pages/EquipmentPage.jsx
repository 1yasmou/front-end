import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import EquipmentCard from "../components/EquipmentCard";
import "./EquipmentPage.css";

function EquipmentPage() {
  const [equipments, setEquipments] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [nbrOfPages, setNbrOfPages] = useState(1);
  const [searchPostalCode, setSearchPostalCode] = useState("");

  async function getEquipments(page, searchPostalCode) {
    try {
      const response = await apiHandler.getAllEquipments(
        page,
        searchPostalCode
      );

      setEquipments(response.data.equipments);
      setNbrOfPages(response.data.totalPages);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getEquipments(currentPage, searchPostalCode);
  }, [currentPage]);

  return (
    <div id="equipements">
      <div className="container-one">
        {/*filtrer par CP*/}
        //////////////////////
        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (currentPage == 1) {
              getEquipments(1, searchPostalCode);
            } else {
              setCurrentPage(1);
            }
          }}
        >
          <input
            type="text"
            value={searchPostalCode}
            onChange={(e) => setSearchPostalCode(e.target.value)}
            placeholder="Entrez le code postal"
          />
          <button type="submit">Rechercher</button>
        </form>
        /////////////////////
        <div className="EquipementListPage">
          {equipments.map(
            (
              equipment
              //!!!!EQUIPMENT CARD COMPONENT.
            ) => (
              <EquipmentCard key={equipment.id} equipment={equipment} />

              /*
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
              </div>*/
            )
            //!!!!EQUIPMENT CARD COMPONENT.
          )}
        </div>
      </div>

      {/* pagination */}
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
