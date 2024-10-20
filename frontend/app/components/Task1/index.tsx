import CombineRules from "./CombineRules";
import CreateRule from "./CreateRule";
import EvaluateRule from "./EvaluateRule";

const index = () => {
  return (
    <>
      <CreateRule />
      <CombineRules />
      <EvaluateRule />
    </>
  );
};

export default index;
