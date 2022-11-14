class ObjectHelper {
    static deleteItemFromArr(item: any, arr: any[], key: string) {
        const foundIndex = arr.findIndex((e: any) => e[key] === item[key])
        if (foundIndex === -1) throw new Error("Cannot delete unexisting element")

        arr.splice(foundIndex,1)

    }
}

export default ObjectHelper