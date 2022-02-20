export interface ISingerData {
    id: number
    pseudonym: string
}

export interface ISingerRows {
    count: number
    rows: ISingerData[]
}

export interface ISinger {
    singer: ISingerRows
}
