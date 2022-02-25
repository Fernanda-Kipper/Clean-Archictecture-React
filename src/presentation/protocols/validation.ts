export interface Validation {
  fieldName: string
  fieldValue: string
  validate: (fieldName: string, fieldValue: string) => string
}
