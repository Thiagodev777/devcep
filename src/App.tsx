import React from "react";
import styles from "./App.module.css";

import Header from "./Components/Header/Header";
import Clock from "./Components/Clock/Clock";
import SearchInput from "./Components/SearchInput/SearchInput";

const App = () => {
  const [cep, setCep] = React.useState("");
  return (
    <React.Fragment>
      <Header />
      <Clock />
      <h1 className={styles.information}>
        Procure por CEPS de todo Brasil Rapidamente
      </h1>
      <div className={styles.container_form}>
        <form>
          <SearchInput type={"text"} value={cep} setValue={setCep} name="cep" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default App;
