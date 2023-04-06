import React, { useRef } from "react";
import { Page } from "@components";
import { Editor } from "@tinymce/tinymce-react";

const Blog = () => {
   const key = "2kzgf5puugnlkc5lm9u1l9juqcaw7q4gro2k592ayyv7uh1g";
   const editorRef = useRef(null);
   const log = () => {
      if (editorRef.current) {
         console.log(editorRef.current.getContent());
      }
   };

   const all_plugins = [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "code",
      "help",
      "wordcount",
   ];

   const current_plugins = ["code"];

   return (
      <Page>
         <main>
            <header className='flex flex-col justify-center items-center py-3'>
               Blog
            </header>
            <section>
               <Editor
                  apiKey={key}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue='<p>This is the initial content of the editor.</p>'
                  init={{
                     height: 500,
                     skin: "oxide-dark",
                     content_css: "dark",
                     menubar: true,
                     plugins: [...current_plugins],
                     toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help | code",
                     content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
               >
                  <button onClick={log}>Log editor content</button>
               </Editor>
            </section>
         </main>
      </Page>
   );
};

export default Blog;
