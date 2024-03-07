import { ChangeEvent, FormEvent } from 'react';
import { api } from '../../api/axios';
import xIcon from "../../assets/x-icon.png";
import useStatesContext from '../../hooks/useStatesContext';
import './style.css';

function RegisterModal() {
  const { formRegister, setFormRegister, setRegisterModalEntrace, setClients, clients, setClientsCopy, clientsCopy } = useStatesContext();

  function handleChangeFormRegister(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    if ((name === "coord_x" || name === "coord_y" || name === "phone") && isNaN(Number(value))) {
      return;
    }

    if (name === "phone" && value.length > 11) {
      return
    }

    if (name === "coord_x" || name === "coord_y") {
      setFormRegister((prevForm) => ({
        ...prevForm,
        coordinates: {
          ...prevForm.coordinates,
          [name]: value,
        },
      }));
      return;
    }
    setFormRegister({ ...formRegister, [name]: value })
  }

  async function handleSubmitRegister(event: FormEvent) {
    event.preventDefault();
    const { name, email, phone, coordinates } = formRegister;
    const { coord_x, coord_y } = coordinates

    if (!name || !email || !phone || !coord_x || !coord_y) {
      return console.log("Preencha todos os campos!");
    }

    try {
      const response = await api.post("/client", {
        name,
        email,
        phone,
        coord_x,
        coord_y
      });

      setClients([...clients, response.data]);
      setClientsCopy([...clientsCopy, response.data]);
      setRegisterModalEntrace(false);
      setFormRegister({ name: "", email: "", phone: "", coordinates: { coord_x: "", coord_y: "" } });

      console.log("Cliente cadastrado com sucesso!");
    } catch (error: any) {
      if (error.response.status !== 500) {
        console.log(error.response.data.message);
        return;
      }
      console.log("Erro interno do servidor. Tente novamente mais tarde!");
    }
  }

  return (
    <div className="generic-modal">
      <form onSubmit={handleSubmitRegister}>
        <img src={xIcon} alt="x-icon" onClick={() => setRegisterModalEntrace(false)} />
        <h3>Cadastrar Cliente</h3>
        <div className="input-register-container">
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" value={formRegister.name} id="name" placeholder='Nome' onChange={handleChangeFormRegister} autoComplete='true' />
        </div>
        <div className="input-register-container">
          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" value={formRegister.email} id="email" placeholder='E-mail' onChange={handleChangeFormRegister} autoComplete='true' />
        </div>
        <div className="input-register-container">
          <label htmlFor="phone">Telefone</label>
          <input type="text" name="phone" value={formRegister.phone} id="phone" placeholder='Telefone' onChange={handleChangeFormRegister} autoComplete='true' />
        </div>
        <div className="input-register-container">
          <label htmlFor="coord_x">Coordenada x</label>
          <input type="text" name="coord_x" value={formRegister.coordinates.coord_x} id="coord_x" placeholder='Ex.: 1.0' onChange={handleChangeFormRegister} autoComplete='true' />
        </div>
        <div className="input-register-container">
          <label htmlFor="coord_y">Coordenada y</label>
          <input type="text" name="coord_y" value={formRegister.coordinates.coord_y} id="coord_y" placeholder='Ex.: 1.0' onChange={handleChangeFormRegister} autoComplete='true' />
        </div>

        <button>Cadastrar</button>
      </form>
    </div>
  )
}

export default RegisterModal;
