import React, { useEffect,  useState} from "react";
import axios from "axios";
import moment from 'moment'

export const Covid = () => {
  const [title, setTitle] = useState("Global");
  const [dataDate, setDataDate] = useState("");
  const [stats, setStats] = useState({});
  const [countries, setCountries] = useState([]);
  const [select,setSelect]=useState(0);
  const [ loading,setLoading]= useState("")


  useEffect(() => {
    getDataCovid();
  }, []);

  const getDataCovid = async () => {
      setLoading(true)
    const {data} = await axios.get("https://api.covid19api.com/summary");
    setTitle("Global");
    setLoading(false);
    setSelect(0)
    setDataDate(moment(data.Date).format('MMMM Do YYYY, h:mm:ss a'));
    setStats(data.Global);
    setCountries(data.Countries);
};

const onChange =(e) =>{
 setSelect(e.target.value)
    const country= countries.find(item=>item.ID=== e.target.value)
   setStats(country)
   setTitle(country.Country)
}
 
const numberWithCommas = (x) =>{
    if(typeof x!== "undefined"){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
}

  return (
    <div>
      <header
        className="text-center text-white p-4 mb-5"
        style={{ backgroundColor: "#1e40af" }}
      >
        <div className="fw-bold fs-1"></div>
        <i className="fa fa-viruses"></i>
        <h2> COVID-19 TRACKER</h2>
        <p>
          {" "}
          API By
          <a
            href="https://api.covid19api.com"
            target="_blank"
            rel="noreferrer"
            className="text-white"
          >
            {""}
            Covid19api.com
          </a>
        </p>
      </header>
{loading?(
<div className="spinner-border" role="status">
  <span className="visually-hidden">Loading...</span>
</div>):(

      <div className="container">
        <div className="text-center">
          <h2 className="fw-bold">{title}</h2>
          <div className="my-4">{dataDate}</div>
        </div>

        <div className="row g-4">
          {/* box1 */}
          <div className="col-md-6">
            <div className="card text-center p-5">
              <h3 className="fw-bold mb-4" style={{ color: "#1e3a8a" }}>
                {" "}
                Muertos por covid
              </h3>
              <div className="mb-4 fs-4">
                <span className="fw-bold"> Nuevos: </span>
               {numberWithCommas(stats.NewDeaths)}
              </div>
              <div className="mb-4 fs-4">
                <span className="fw-bold"> Total: </span>
                {numberWithCommas(stats.TotalDeaths)}
              </div>
            </div>
        </div>
        {/* box2 */}
        <div className="col-md-6">
          <div className="card text-center p-5">
            <h3 className="fw-bold mb-4" style={{ color: "#1e3a8a" }}>
              {" "}
              Casos Confirmados
            </h3>
            <div className="mb-4 fs-4">
              <span className="fw-bold"> Nuevos: </span>
              {numberWithCommas( stats.NewConfirmed)}
            </div>
            <div className="mb-4 fs-4">
              <span className="fw-bold"> Total: </span>
              {numberWithCommas( stats.TotalConfirmed)}
            </div>
          </div>
        </div>
      </div>

      <select
        className="my-3 col-12 py-3 border"
        value={select}
        onChange={(e) => onChange(e)}
      >
        <option value="0"> Seleccione un pais por favor</option>
        {countries.map((item) => (
          <option key={item.ID} value={item.ID}>
            {item.Country}
          </option>
        ))}
      </select>

      {stats.Country && (
        <button className="btn btn-success" onClick={() => getDataCovid()}>
          {" "}
          Borrar pais
        </button>
      )}
    </div>
)}
    </div>
  );
};
