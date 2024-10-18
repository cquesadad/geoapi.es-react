import { useState, useEffect } from 'react';
import './App.css';
import { Cpos, Municipios, Poblaciones } from './data';

interface Municipio {  // Definición de la interfaz
  name: string;
  CMUM: string;
  CPRO?: string;
}

interface Poblacion {  // Definición de la interfaz
  name: string;
  CUN: string;
  CMUM: string
}

interface CPostal {  // Definición de la interfaz
  CP: string,
  CUN: string,
}

const App: React.FC = () => {
  const [municipios, setMunicipios] = useState<Municipio[]>([]); // Estado para almacenar los municipios
  const [poblaciones, setPoblaciones] = useState<Poblacion[]>([]); // Estado para almacenar los municipios
  const [codigosPostales, setCodigosPostales] = useState<CPostal[]>([]);

  const apiKey = import.meta.env.VITE_API_KEY; 
  const baseUrl = import.meta.env.VITE_BASE_URL; 
  const codigoProvincia = "35";
  const codigoMunicipio = "026";
  const urlMunicipio = `${baseUrl}/municipios?CPRO=${codigoProvincia}&key=${apiKey}`;
  const urlPoblacion = `${baseUrl}/poblaciones?CPRO=${codigoProvincia}&CMUM=${codigoMunicipio}&key=${apiKey}`;

  const getMunicipios = async () => {
    try {
      const data: Municipios = await fetch(urlMunicipio).then(response => response.json());

      const municipiosList = data.data.map(item => ({
        name: item.DMUN50,
        CMUM: item.CMUM
      })
      ); // Obtenemos solo los nombres de municipios
      setMunicipios(municipiosList); // Actualizamos el estado con los municipios obtenidos
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getPoblaciones = async () => {
    try {
      const data: Poblaciones = await fetch(urlPoblacion).then(response => response.json());

      const poblacionesList = data.data.map(item => ({
        name: item.NENTSI50,
        CUN: item.CUN,
        CMUM: item.CMUM,
      })
      ); // Obtenemos solo los nombres de municipios
      setPoblaciones(poblacionesList); // Actualizamos el estado con los municipios obtenidos
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getCodigosPostales = async (CUN: string) => {
    const urlCP = `${baseUrl}/cps?CPRO=35&CMUM=026&CUN=${CUN}&key=${apiKey}`; // Usar CMUM para Telde
    try {
      const data: Cpos = await fetch(urlCP).then(response => response.json());
      
      const cpList = data.data.map(item => ({
        CP: item.CPOS,
        CUN: item.CUN,
      })
      ); 
      
      setCodigosPostales(cpList);
    } catch (error) {
      console.error('Error:', error);
    }
  };

    // Ejecuta el fetch cuando el componente se monta
    useEffect(() => {
      getMunicipios();
      getPoblaciones();
    }, []); 
  
    useEffect(() => {
      if (poblaciones.length > 0) {
        // Encuentra el CUN de Telde
        poblaciones.forEach(poblacion => {
          if (poblacion.CMUM === '026') { // Verifica que sea Telde
            getCodigosPostales(poblacion.CUN);  // Llama a la función con el CUN de Telde
          }
        });
      }
    }, [poblaciones]); // Ejecuta solo cuando las poblaciones cambian

  return (
    <>
      <h1>GeoAPI.es React</h1>
      <div className="card">
        <h2>Municipios</h2>
        <ul>
          {municipios.map((municipio, index) => (
            <li key={index}><strong>{municipio.name}</strong> - Código Municipio: {municipio.CMUM}</li>
          ))}
        </ul>
        <h2>Población: TELDE</h2>
        <ul>
          {poblaciones.map((poblacion, index) => (
            <li key={index}><strong>{poblacion.name}</strong> - Código Municipio: {poblacion.CUN}</li>
          ))}
        </ul>
        <h2>Códigos Postales</h2>
        {/* <ul>
          {codigosPostales.map((codigo, index) => (
            <li key={index}>{codigo.CP}</li>
          ))}
        </ul> */}

        <ul>
          {poblaciones.map((poblacion, index) => (
            <li key={index}><strong>{poblacion.name}</strong>
              <ul>  
                {codigosPostales.map((codigo, index) => (
                  <li key={index}>{codigo.CP}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
