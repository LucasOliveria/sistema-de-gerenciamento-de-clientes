import xIcon from "../../assets/x-icon.png";
import useStatesContext from '../../hooks/useStatesContext';
import './style.css';

function VisitOrderModal() {
  const { setVisitOrderModalEntrace, clientsVisitationOrder } = useStatesContext();

  return (
    <div className="generic-modal">
      {clientsVisitationOrder.length !== 0 ?
        <div className="visit-order-container fade-in-top">
          <div className="close-icon-title">
            <img src={xIcon} alt="x-icon" onClick={() => setVisitOrderModalEntrace(false)} />
            <h3>Ordem de Visitação</h3>
          </div>
          <div className="ordered-clients-container">
            {clientsVisitationOrder?.map((client, i) => {
              const { id, name, coordinates } = client
              return (
                <div key={id} className="place-container">
                  <h3>#{++i}</h3>
                  <div className="client-and-coord">
                    <h4>{name}</h4>
                    <p><span>X: </span>{coordinates.coord_x}</p>
                    <p><span>Y: </span>{coordinates.coord_y}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        :
        <div className="no-clients fade-in-top">
          <img src={xIcon} alt="x-icon" onClick={() => setVisitOrderModalEntrace(false)} />
          <h4>Você ainda não possui clientes cadastrados. Cadastre alguns clintes para começar!</h4>
        </div>
      }
    </div>
  )
}

export default VisitOrderModal;
