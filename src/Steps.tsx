import React, { ReactElement } from "react";

interface StepsProps {
  children: ReactElement | ReactElement[];
  handleFinish?: () => any;
}

export function Steps(props: StepsProps) {
  const steps = React.Children.toArray(props.children);
  const total = React.Children.count(props.children);
  const [location, setLocation] = React.useState(0);
  let saveTitle = "No title";
  const propsChildren = React.Children.map(props.children, (child, index) => {
    if (!React.isValidElement(child)) return;
    const { title } = child.props as StepProps;
    if (title) {
      return { index, title };
    } else {
      return { title: saveTitle, index };
    }
  });
  let prev = location !== 0;
  let next = location !== total - 1;
  const handleNext = () => setLocation(location + 1);
  const handleBack = () => setLocation(location - 1);
  return (
    <div>
      <div>{location + 1}</div>
      <p>{total}</p>
      <h3>{propsChildren[location].title}</h3>
      {steps[location]}
      {prev && <button onClick={handleBack}>Back</button>}
      {next && <button onClick={handleNext}>Next</button>}
      {location === total - 1 ? (
        <button onClick={props.handleFinish}>Finish</button>
      ) : null}
    </div>
  );
}

export interface StepProps {
  component: React.FunctionComponent<any>;
  title?: string;
}

export function Step(props: StepProps) {
  const { component: Element } = props;
  return <Element />;
}
