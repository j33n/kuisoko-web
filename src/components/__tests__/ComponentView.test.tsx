import { render } from "@testing-library/react";
import { ComponentView } from "../../components";

describe("ComponentView", () => {

  const componentName = "Box";

  it("should render successfully", () => {
    const { baseElement } = render(<ComponentView componentName={componentName} />);
    expect(baseElement).toBeTruthy();
  });
});
