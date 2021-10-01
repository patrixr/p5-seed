export type Maybe<T> = T | null;

export type AnyFunction = (...args: any[]) => any

export type VoidFunction = (...args: any[]) => any

export type Arguments<T extends AnyFunction> = T extends (...args: (infer A)[]) => any ? A : never;
