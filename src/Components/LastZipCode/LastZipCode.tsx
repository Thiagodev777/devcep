import { CepAPI } from "../../Types";
interface PropsType {
  cep: CepAPI;
}

const LastZipCode = ({ cep }: PropsType) => {
  return (
    <h3 style={{ color: "#fff" }} key={cep.cep}>
      {cep.cep}
    </h3>
  );
};

export default LastZipCode;
