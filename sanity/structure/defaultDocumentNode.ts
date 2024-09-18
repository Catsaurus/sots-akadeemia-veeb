import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import DocumentsPane from 'sanity-plugin-documents-pane'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case 'shortCourse':
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type in ["masterClass", "courseModule"] && references($id)] | order(_type asc)`,
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'}
          })
          .title('Seotud meistri- ja eriklassid'),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type in ["calendar"] && references($id)] | order(startDate asc)`,
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'}
          })
          .title('Seotud sündmused'),
      ])
    case 'masterClass':
    case 'courseModule':
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type in ["calendar"] && references($id)] | order(startDate asc)`,
            params: {id: `_id`},
            options: {perspective: 'previewDrafts'}
          })
          .title('Seotud sündmused'),
          S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type == "teacher" && _id in *[_type == "shortCourse" && _id in $courses._ref].teachers[]._ref]`,
            params: {courses: `courses`},
            options: {perspective: 'previewDrafts'}
          })
          .title('Akadeemikud'),          
      ])      
    default:
      return S.document().views([S.view.form()])
  }
}