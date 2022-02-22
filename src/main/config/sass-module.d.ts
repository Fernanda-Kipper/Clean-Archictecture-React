// para entender as extensões do sass como classes

declare module '*.sass' {
  const content: {[classname: string]: string}
  export = content
}
