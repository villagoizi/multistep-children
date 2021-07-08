import React from "react";
import "./App.css";
import { Steps, Step } from "./Steps";

type InfoPersonalState = {
  name: string;
  lastname: string;
};

type SaveInfoPersonal = InfoPersonalState[] | [];
function InfoPersonal() {
  const initialStateChange = {
    lastname: "",
    name: "",
  };
  const [change, setChange] = React.useState<InfoPersonalState>(
    initialStateChange
  );

  const [saveInfo, setSaveInfo] = React.useState<SaveInfoPersonal>([]);

  const handleSave = () => {
    setSaveInfo([...saveInfo, change]);
    setChange(initialStateChange);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChange({ ...change, [e.target.name]: e.target.value });
  };

  return (
    <form>
      {(saveInfo as InfoPersonalState[]).map((values, i: number) => (
        <div key={i.toString()}>
          <p>{values.name}</p>
          <p>{values.lastname}</p>
        </div>
      ))}
      <input value={change.name} name="name" onChange={handleChange} />
      <input value={change.lastname} name="lastname" onChange={handleChange} />
      <button type="button" onClick={handleSave}>
        Save
      </button>
    </form>
  );
}

function OtherComponent() {
  return <div>Other Component</div>;
}

function App() {
  return (
    <div className="App">
      <Steps handleFinish={() => console.log("Finish")}>
        <Step title="Information Personal" component={InfoPersonal} />
        {/* <Step title="Information" component={OtherComponent} /> */}
      </Steps>
    </div>
  );
}

export default App;
