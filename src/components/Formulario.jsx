import { useState, useEffect } from "react"
import Error from "./Error"


const Formulario = ({ setPacientes, pacientes, paciente, setPaciente }) => {

	// Data del Formulario
	const [nombre, setNombre] = useState('')
	const [propietario, setPropietario] = useState('')
	const [email, setEmail] = useState('')
	const [fecha, setFecha] = useState('')
	const [sintomas, setSintomas] = useState('')


	// Agregar los valores al formulario al click en el boton editar
	useEffect(() => {

		if (Object.keys(paciente).length > 0) {
			setNombre(paciente.nombre)
			setPropietario(paciente.propietario)
			setEmail(paciente.email)
			setFecha(paciente.fecha)
			setSintomas(paciente.sintomas)
		}

	}, [paciente])


	// Manejo del Errores en el Formulario
	const [error, setError] = useState(false)

	const generarId = () => {

		const random = Math.random().toString(36).slice(2)
		const fecha = Date.now().toString(36)

		return random + fecha

	}

	// Manejador del Submit del Formulario
	const handleSubmit = (e) => {

		e.preventDefault()

		// Concidicional del Error
		if ([nombre, propietario, email, fecha, sintomas].includes('')) {
			setError(true)
			return
		}

		const objetoPaciente = {
			nombre,
			propietario,
			email,
			fecha,
			sintomas,
		}

		if (paciente.id) {

			// Editar Paciente
			objetoPaciente.id = paciente.id

			// Recorrere la lista ya agregada de pacientes y al encontrar el id , guarda los cambios en esa posicion y guarda todo el arreglo nuevamente en la variable pacientesActualizados y posteriormente se agrega a la lista de pacientes del state para el renderizado
			const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

			setPacientes(pacientesActualizados)
			setPaciente({}) // Limpiar el formulario borrando Paciente actual

		} else {

			// Crear Paciente
			objetoPaciente.id = generarId()
			setPacientes([...pacientes, objetoPaciente])

		}

		// Limpiar el Formulario
		setNombre('')
		setPropietario('')
		setEmail('')
		setFecha('')
		setSintomas('')

		// Establecer el Error en false
		setError(false)

	}

	return (
		<div className="md:w-1/2 lg:w-2/5 mx-5">
			<h2 className="font-black text-3xl text-center">
				Seguimiento Pacientes</h2>

			<p className="text-lg mt-5 text-center mb-10">
				Añade Pacientes y {''}
				<span className="text-indigo-600 font-bold">Administralos</span>
			</p>

			<form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
				{error &&
					<Error><p>Todos los campos son Obligatorios</p></Error>
				}
				<div className="mb-5">
					<label
						htmlFor="mascota"
						className="block text-gray-700 uppercase font-bold">
						Nombre Mascota
					</label>

					<input
						id="mascota"
						type="text"
						className="border-2 rounded-md w-full p-2 mt-2 placeholder-gray-400"
						placeholder="Ingrese Nombre de la Mascota"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="propietario"
						className="block text-gray-700 uppercase font-bold">
						Nombre Propietario
					</label>
					<input
						id="propietario"
						type="text"
						className="border-2 rounded-md w-full p-2 mt-2 placeholder-gray-400"
						placeholder="Ingrese Nombre del Propietario"
						value={propietario}
						onChange={(e) => setPropietario(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="email"
						className="block text-gray-700 uppercase font-bold">
						Correo Electronico
					</label>
					<input
						id="email"
						type="email"
						className="border-2 rounded-md w-full p-2 mt-2 placeholder-gray-400"
						placeholder="Ingrese Correo Electronico"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="alta"
						className="block text-gray-700 uppercase font-bold">
						Fecha de Alta
					</label>
					<input
						id="alta"
						type="date"
						className="border-2 rounded-md w-full p-2 mt-2 placeholder-gray-400"
						value={fecha}
						onChange={(e) => setFecha(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="alta"
						className="block text-gray-700 uppercase font-bold">
						Sintomas
					</label>
					<textarea
						id="sintomas"
						className="border-2 rounded-md w-full p-2 mt-2 placeholder-gray-400"
						placeholder="Describe los sintomas"
						value={sintomas}
						onChange={(e) => setSintomas(e.target.value)}
					/>
				</div>

				<input
					type="submit"
					className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 transition-all"
					value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' } />

			</form>

		</div>
	)
}

export default Formulario