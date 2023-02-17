import type { ComponentProps} from "react";
import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";

type ReactQuillProps = ComponentProps<typeof ReactQuill>;
type Props = Pick<
  ReactQuillProps,
  "onChange" | "placeholder" | "theme" | "value"
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
    ["link", "image", "video"],
    ["clean"],
  ],
};

export const TextEditor = (props: Props) => {
  const { placeholder } = props;

  const textEditorRef = useRef<ReactQuill>(null);

  useEffect(() => {
    const ref = textEditorRef.current?.getEditor();
    if (ref) {
      ref.root.dataset.placeholder = placeholder || "";
    }
  }, [textEditorRef, placeholder]);

  return <ReactQuill ref={textEditorRef} {...props} modules={toolBarOptions} />;
}
