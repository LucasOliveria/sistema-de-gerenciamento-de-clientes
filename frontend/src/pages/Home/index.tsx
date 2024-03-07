import Header from '../../components/Header';
import './style.css';
import more from "../../assets/more.png";
import filter from "../../assets/filter.png";
import route from "../../assets/route-icon.png";
import Filter from '../../components/Filter';
import { useEffect, useState } from 'react';
import { api } from '../../api/axios';
import { formatNumberPhone } from '../../helpers/formatNumberPhone';
import RegisterModal from '../../components/RegisterModal';
import useStatesContext from '../../hooks/useStatesContext';
import VisitOrderModal from '../../components/VisitOrderModal';


function Home() {
  const [filterEntrace, setFilterEntrace] = useState<boolean>(false);
  const { registerModalEntrace, setRegisterModalEntrace, clients, setClients, setClientsCopy, clientsCopy, setVisitOrderModalEntrace, visitOrderModalEntrace } = useStatesContext();

  async function getClients() {
    try {
      const response = await api.get("/client");

      setClients(response.data);
      setClientsCopy(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleFilterEntrace() {
    setClients(clientsCopy);
    setFilterEntrace(!filterEntrace);
  }

  async function handleVisitationOrder() {
    setVisitOrderModalEntrace(true);
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="body-home">
      <Header />
      <main className='main-home'>
        <div className='home-table-container'>
          <div className="home-button-container">
            <button onClick={() => setRegisterModalEntrace(!registerModalEntrace)}>
              <div className='img-button'>
                <img src={more} alt="more" />
                <p>Novo Cliente</p>
              </div>
            </button>
            <button onClick={handleFilterEntrace}>
              <div className='img-button'>
                <img src={filter} alt="filter" />
                <p>Filtro</p>
              </div>
            </button>
            <button onClick={handleVisitationOrder}>
              <div className='img-button'>
                <img src={route} alt="route" />
                <p>Ver Rota</p>
              </div>
            </button>
          </div>
          {filterEntrace && <Filter />}
          <div className="home-table">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Coordenadas</th>
                </tr>
              </thead>
              <tbody>
                {clients?.map((client) => {
                  const { id, name, email, phone, coordinates } = client;
                  return (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{formatNumberPhone(phone)}</td>
                      <td><span>X: </span>{`${coordinates.coord_x}`}  <span>Y: </span>{`${coordinates.coord_y}`}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {registerModalEntrace && <RegisterModal />}
      {visitOrderModalEntrace && <VisitOrderModal />}
    </div>
  )
}

export default Home;