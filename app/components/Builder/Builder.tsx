import { useState } from "react";

import { StyledContainer } from "./Builder.styled";

// import stylesheetQuill from "react-quill/dist/quill.snow.css";
import { ClientOnly } from "remix-utils";

import { FallbackComponent } from "~/components/fallback-component";
import { TextEditor } from "~/components/textEditor.client";

import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const textEditorValue = form.get("textEditor");
  return json({ textEditorValue });
};

export const Builder = () => {
  const [textEditor, setTextEditor] = useState("");

  return (
      <Form method="post">
        <ClientOnly fallback={<FallbackComponent />}>
          {() => (
            <TextEditor
              name="textEditor"
              theme="snow"
              placeholder="Write description"
              onChange={setTextEditor}
              value={textEditor}
            />
          )}
        </ClientOnly>
        <input type="hidden" name="textEditor" value={textEditor} />
        <br />
        <button type="submit">Submit</button>
      </Form>
  );
};

export default Builder;
