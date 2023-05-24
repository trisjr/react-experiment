import { nestedData } from "./constants/data.ts";
import NestedCheckbox from "./components/NestedCheckbox.tsx";
import { ConvertedNestedItem } from "./constants/types.ts";

function App() {
  const originalData = nestedData;

  const handleSelect = (data: ConvertedNestedItem[]) => {
    console.log(data);
  };

  return (
    <div style={{ height: "100vh" }}>
      <NestedCheckbox items={originalData} onSubmit={handleSelect} />
    </div>
  );
}

export default App;
