export interface Validation {
  input: object
  validate: (input: object) => string
}
