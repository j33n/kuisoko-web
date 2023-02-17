import { useState } from "react";

import { ClientOnly } from "remix-utils";

import { FallbackComponent } from "~/components/fallback-component";
import { TextEditor } from "~/components/textEditor.client";

import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { StyledForm } from "./Builder.styled";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const textEditorValue = form.get("textEditor");
  return json({ textEditorValue });
};

export const Builder = () => {
  const [textEditor, setTextEditor] = useState("");

  return (
      <StyledForm method="post">
        <ClientOnly fallback={<FallbackComponent />}>
          {() => (
            <TextEditor
              theme="bubble"
              placeholder="Type / for block suggestions"
              onChange={setTextEditor}
              value={textEditor}
            />
          )}
        </ClientOnly>
        <input type="hidden" name="textEditor" value={textEditor} />
        <br />
        <button type="submit" hidden>Submit</button>
      </StyledForm>
  );
};

export default Builder;
