interface PropsType {
  title: string;
  value: string;
}

const CepItem = ({ title, value }: PropsType) => {
  return (
    <h2>
      {title}: <span style={{ color: "#17416a" }}>{value}</span>
    </h2>
  );
};

export default CepItem;
