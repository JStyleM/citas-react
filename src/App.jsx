
import { useState, useEffect } from "react"
import Formulario from './components/Formulario'
import Header from './components/Header'
import ListadoPacientes from './components/ListadoPacientes'

function App() {

  // Objeto que guarda los pacientes
  const [pacientes, setPacientes] = useState([]); // Guardara la lista de pacientes agregados
  const [paciente, setPaciente] = useState({}); // Lo utilizamos para almacenar el paciente a editar y pasarlo por prop al formulario


  // Al cargar la aplicacion verifica los valores de LocalStorage y lo asigna a setPacientes de lo contrario asigna un arreglo vacio
  useEffect(() => {

    const obtenerLS = () => {

      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []
      setPacientes(pacientesLS)

    }

    obtenerLS();

  }, [])


  // Almacena el paciente en el LocalStorage
  useEffect(() => {
    
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
 
  }, [pacientes])
  

  // Funcion que Elimina un paciente del listado, se ejecuta en el componente Paciente
  const eliminarPaciente = (id) => {

    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)

  }

  return (
    <div className='container mx-auto mt-20'>
      <Header />
      <div className='mt-12 md:flex'>
        <Formulario 
          pacientes = {pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes 
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
