import { type SchemaTypeDefinition } from 'sanity'
import orderSchema from './order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [orderSchema],
}
