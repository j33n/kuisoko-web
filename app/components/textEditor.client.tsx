import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";

import type { ComponentProps } from "react";

type ReactQuillProps = ComponentProps<typeof ReactQuill>;
export type TextEditorProps = Pick<
  ReactQuillProps,
  "onChange" | "placeholder" | "theme" | "value" | "onBlur"
>;

const toolBarOptions = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

// TODO: handle image and video addition ["link", "image", "video"]

export const TextEditor = (props: TextEditorProps) => {
  const { placeholder, onBlur } = props;

  const textEditorRef = useRef<ReactQuill>(null);

  useEffect(() => {
    const ref = textEditorRef.current?.getEditor();
    if (ref) {
      ref.root.dataset.placeholder = placeholder || "";
    }
  }, [textEditorRef, placeholder]);

  return (
    <ReactQuill
      ref={textEditorRef}
      {...props}
      modules={toolBarOptions}
      onBlur={onBlur}
    />
  );
};
