export const isItemAdded = (items:any[], id:number) => {
  return items.some((obj) => Number(obj.id) === Number(id))
}
