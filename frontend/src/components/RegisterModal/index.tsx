import { ChangeEvent, MouseEvent, useEffect, useRef } from 'react';
import './style.css';
import useStatesContext from '../../hooks/useStatesContext';
import xIcon from "../../assets/x-icon.png";




function RegisterModal() {
  const { formRegister, setFormRegister, setRegisterModalEntrace } = useStatesContext();
  const formRef = useRef<any>(null)

  function handleChangeFormRegsiter(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    if ((name === "coord_x" || name === "coord_y" || name === "phone") && isNaN(Number(value))) {
      return;
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

  function handleCloseModal(event: MouseEvent) {
    if (!formRef.current.contains(event.target)) {
      setRegisterModalEntrace(false);
      return
    }
  }

  useEffect(() => {

  }, [])

  return (
    <div className="client-register-modal" onClick={handleCloseModal}>
      <form ref={formRef} action="">
        <img src={xIcon} alt="x-icon" onClick={() => setRegisterModalEntrace(false)} />
        <h3>Cadastrar Cliente</h3>
        <div className="input-register-container">
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" value={formRegister.name} id="name" placeholder='Nome' onChange={handleChangeFormRegsiter} autoComplete='true' />
        </div>
        <div className="input-register-container">
          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" value={formRegister.email} id="email" placeholder='E-mail' onChange={handleChangeFormRegsiter} autoComplete='true' />
        </div>
        <div className="input-register-container">
          <label htmlFor="phone">Telefone</label>
          <input type="text" name="phone" value={formRegister.phone} id="phone" placeholder='Telefone' onChange={handleChangeFormRegsiter} autoComplete='true' />
        </div>
        <div className="input-register-container">
          <label htmlFor="coord_x">Coordenada x</label>
          <input type="text" name="coord_x" value={formRegister.coordinates.coord_x} id="coord_x" placeholder='Ex.: 1.0' onChange={handleChangeFormRegsiter} autoComplete='true' />
        </div>
        <div className="input-register-container">
          <label htmlFor="coord_y">Coordenada y</label>
          <input type="text" name="coord_y" value={formRegister.coordinates.coord_y} id="coord_y" placeholder='Ex.: 1.0' onChange={handleChangeFormRegsiter} autoComplete='true' />
        </div>

        <button>Cadastrar</button>
      </form>
    </div>
  )
}

export default RegisterModal;
