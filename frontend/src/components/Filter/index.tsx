import { ChangeEvent, FormEvent, useState } from 'react';
import './style.css';
import useStatesContext from '../../hooks/useStatesContext';

function Filter() {
  const { clients, setClients, clientsCopy } = useStatesContext();
  const [filterSelected, setFilterSelected] = useState<string>("name");
  const [formSearch, setFormSearch] = useState({ search: "" });
  const [span, setSpan] = useState<string>("");

  function handleSubmitFilter(event: FormEvent) {
    event.preventDefault();
    const { search } = formSearch;

    if (!search) {
      setSpan("Campo obrigatório!")
      return
    }

    setSpan("");
    const localCLients = clients

    const localCLientsFiltered = localCLients.filter((client) => {
      if (filterSelected === "name") {
        return client.name.toLowerCase().startsWith(search.toLowerCase());
      }

      if (filterSelected === "email") {
        return client.email.toLowerCase().startsWith(search.toLowerCase());
      }
      if (filterSelected === "phone") {
        return client.phone.toLowerCase().startsWith(search.toLowerCase());
      }
    })


    setClients(localCLientsFiltered);
    setFormSearch({ search: "" });
  }

  function handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    setFormSearch({ search: event.target.value })
    setClients(clientsCopy);
  }

  function handleFilterOption(filter: string) {
    setFilterSelected(filter);
  }

  function handleFilterClearing() {
    setFormSearch({ search: "" });
    setFilterSelected("name");
    setClients(clientsCopy);
  }

  return (
    <div className='filter-container'>
      <form onSubmit={handleSubmitFilter}>
        <div className="input-search">
          <input onChange={handleChangeSearch} type="text" name="search" value={formSearch.search} placeholder='Pesquisar...' autoComplete='true' />
          <button className='search-button'>Buscar</button>
        </div>
        <span>{span}</span>
      </form>
      <div className="filters-and-title">
        <h4>Buscar por: </h4>
        <div className="filters">
          <div onClick={() => handleFilterOption("name")} className={`filter-option ${filterSelected === "name" && "filter-selected"}`}>
            <p>Nome</p>
          </div>
          <div onClick={() => handleFilterOption("email")} className={`filter-option ${filterSelected === "email" && "filter-selected"}`}>
            <p>E-mail</p>
          </div>
          <div onClick={() => handleFilterOption("phone")} className={`filter-option ${filterSelected === "phone" && "filter-selected"}`}>
            <p>Telefone</p>
          </div>
          <div className='clear-button-box'>
            <button onClick={handleFilterClearing} className='clear-button'>Limpar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter;
