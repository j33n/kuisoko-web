import {
  StyledLabel,
  StyledSwitchRoot,
  StyledSwitchThumb,
} from "./ToggleInput.styled";

const ToogleInput = ({ labelText }: { labelText: string }) => (
  <form>
    <div style={{ display: "flex", alignItems: "center" }}>
      {labelText && (
        <StyledLabel
          className="Label"
          htmlFor="airplane-mode"
          style={{ paddingRight: 15 }}
        >
          {labelText}
        </StyledLabel>
      )}
      <StyledSwitchRoot id="airplane-mode">
        <StyledSwitchThumb />
      </StyledSwitchRoot>
    </div>
  </form>
);

export default ToogleInput;
