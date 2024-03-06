import { ChangeEvent, FormEvent, useState } from 'react';
import './style.css';

function Filter() {
  const [filterSelected, setFilterSelected] = useState<string>("name");
  const [formSearch, setFormSearch] = useState({ search: "" });
  const [span, setSpan] = useState<string>("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { search } = formSearch;

    if (!search) {
      setSpan("Campo obrigatório!")
      return
    }
    setSpan("");
    console.log(search);

  }

  function handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    setFormSearch({ search: event.target.value })
  }

  function handleFilterOption(filter: string) {
    setFilterSelected(filter);
  }

  return (
    <div className='filter-container'>
      <form onSubmit={handleSubmit}>
        <div className="input-search">
          <input onChange={handleChangeSearch} type="text" name="search" value={formSearch.search} placeholder='Pesquisar...' />
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
        </div>
      </div>
    </div>
  )
}

export default Filter;
