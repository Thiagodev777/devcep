import React from "react";
import styles from "./style.module.css";

interface PropsType {
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  name: string;
}

const SearchInput = ({ type, value, setValue, name }: PropsType) => {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={({ target }) => setValue(target.value)}
      name={name}
      required
      placeholder="informe o CEP para realizar a consulta"
    />
  );
};

export default SearchInput;
