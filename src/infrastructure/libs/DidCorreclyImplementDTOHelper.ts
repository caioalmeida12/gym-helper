type Difference<T, U> = T extends U ? never : T;

type UncommonKeys<T, U> = Difference<keyof U, keyof T> | Difference<keyof T, keyof U>;

type DidCorrectlyImplementDTO<T, U> = UncommonKeys<T, U> extends never ? true : UncommonKeys<T, U>;

export type { DidCorrectlyImplementDTO };