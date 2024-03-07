import xIcon from "../../assets/x-icon.png";
import useStatesContext from '../../hooks/useStatesContext';
import './style.css';

function VisitOrderModal() {
  const { setVisitOrderModalEntrace } = useStatesContext();


  return (
    <div className="generic-modal">
      <div className="visit-order-container">
        <img src={xIcon} alt="x-icon" onClick={() => setVisitOrderModalEntrace(false)} />
        <h3>Ordem de Visitação dos Clientes</h3>
      </div>
    </div>
  )
}

export default VisitOrderModal;
