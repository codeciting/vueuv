export function mergeClasses (ctx, ...classes) {
  return [ctx.data.staticClass].concat(ctx.data.class).concat(classes)
}
