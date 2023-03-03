import type { ReactNode} from "react";
import { forwardRef } from "react";

import { ClientOnly } from "remix-utils";

import { FallbackComponent } from "~/components/fallback-component";
import { TextEditor } from "~/components/textEditor.client";

import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { StyledForm } from "./Builder.styled";

import { CiAirportSign1 } from "react-icons/ci";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const textEditorValue = form.get("textEditor");
  return json({ textEditorValue });
};

interface Props {
  children?: ReactNode;
  type: "submit" | "button";
  onClick: () => void;
  hidden?: boolean;
}

export type BuilderProps = {
  onSubmit: () => void,
  onChange: any,
  value: string,
};

export type Ref = HTMLButtonElement;

export const TriggerComponent = forwardRef<Ref, Props>((props, ref) => (
  <button
    {...props}
    ref={ref}
    aria-label="Customise options"
    onClick={props.onClick}
    hidden={props.hidden}
    style={{ visibility: "hidden" }}
  >
    <CiAirportSign1 />
  </button>
));

TriggerComponent.displayName = "TriggerComponent";

export const Builder = ({ onSubmit, onChange, value }: BuilderProps) => {
  return (
    <StyledForm method="post">
      <ClientOnly fallback={<FallbackComponent />}>
        {() => (
          <TextEditor
            theme="snow"
            placeholder="Store description"
            onChange={onChange}
            value={value}
            onBlur={onSubmit}
          />
        )}
      </ClientOnly>
    </StyledForm>
  );
};

export default Builder;
