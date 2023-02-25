import React, { FormEvent } from "react";
import styles from "./App.module.css";

import Header from "./Components/Header/Header";
import Clock from "./Components/Clock/Clock";
import SearchInput from "./Components/SearchInput/SearchInput";
import Footer from "./Components/Footer/Footer";
import LastZipCode from "./Components/LastZipCode/LastZipCode";
import { CepAPI } from "./Types";
import CepItem from "./Components/CepItem/CepItem";

const App = () => {
  const [cep, setCep] = React.useState("");
  const [data, setData] = React.useState<CepAPI | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [latestSearch, setLatestSearch] = React.useState<CepAPI[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const lastCepStorage = window.localStorage.getItem("lastCEP");
    if (lastCepStorage) {
      const lastCEP = JSON.parse(lastCepStorage);
      setData(lastCEP);
      setCep(lastCEP.cep);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    if (!/^[0-9]{5}-?[0-9]{3}$/.test(cep)) {
      setError("Preencha um CEP válido");
      setLoading(false);
      return;
    }
    const res = await fetch(
      `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
    );
    const json = await res.json();
    if (json.erro) {
      setLoading(false);
      return alert("error");
    }
    setData(json);
    setLatestSearch([...latestSearch, json]);
    window.localStorage.setItem("lastCEP", JSON.stringify(json));
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Header />
      <Clock />
      <h1 className={styles.information}>
        Procure por CEPS de todo Brasil Rapidamente
      </h1>
      <div className={styles.container_form}>
        <form onSubmit={handleSubmit}>
          <SearchInput type={"text"} value={cep} setValue={setCep} name="cep" />
          {error && <p style={{ color: "#fff" }}>{error}</p>}
        </form>
      </div>
      {loading && (
        <h1 style={{ color: "#fff", textAlign: "center" }}>Carregando...</h1>
      )}
      {latestSearch.length > 0 && (
        <>
          <h2 className={styles.information}>Últimos CEPS</h2>
          <div className={styles.container_last}>
            {latestSearch.map((cep) => (
              <LastZipCode key={cep.cep} cep={cep} />
            ))}
          </div>
        </>
      )}
      {data && (
        <>
          <h1 style={{ textAlign: "center", color: "#fff" }}>
            {data.logradouro}, {data.bairro} - {data.localidade} - {data.uf}
          </h1>
          <div className={styles.container_viewer}>
            <CepItem title={"CEP"} value={data.cep} />
            <CepItem title={"Logradouro"} value={data.logradouro} />
            <CepItem title={"Bairro"} value={data.bairro} />
            <CepItem title={"Cidade"} value={data.localidade} />
            <CepItem title={"Estado"} value={data.localidade} />
          </div>
        </>
      )}
      <Footer />
    </React.Fragment>
  );
};

export default App;
