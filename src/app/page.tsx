import FilterInput from "../components/FilterInput";
import Table from "../components/Table";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-2xl mt-[20px] mb-[20px] font-bold text-center">
        Planetas Star Wars
      </h1>
      <FilterInput />
      <Table />
    </div>
  );
}
