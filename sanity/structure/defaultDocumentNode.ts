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
      ])      
    default:
      return S.document().views([S.view.form()])
  }
}