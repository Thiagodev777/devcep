import React, { CElement, FormEvent } from "react";
import styles from "./App.module.css";

import Header from "./Components/Header/Header";
import Clock from "./Components/Clock/Clock";
import SearchInput from "./Components/SearchInput/SearchInput";

interface CepAPI {
  cep: string;
  logradouro: string;
  completemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

const App = () => {
  const [cep, setCep] = React.useState("");
  const [data, setData] = React.useState<CepAPI | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [latestSearch, setLatestSearch] = React.useState<CepAPI[]>([]);

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
    setError(null);
    if (!/^[0-9]{5}-?[0-9]{3}$/.test(cep)) {
      setError("Preencha um CEP válido");
      return;
    }
    const res = await fetch(
      `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
    );
    const json = await res.json();
    if (json.erro) {
      return alert("error");
    }
    setData(json);
    setLatestSearch([...latestSearch, json]);
    window.localStorage.setItem("lastCEP", JSON.stringify(json));
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
      <h2 className={styles.information}>Últimos CEPS</h2>
    </React.Fragment>
  );
};

export default App;
