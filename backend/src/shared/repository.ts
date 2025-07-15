
//Comento esto porque me hace conflicto en mi crud con bd

export interface Repository<T> {
  findAll(): Promise<T[] | undefined>
  findOne(item: { id: string }): Promise<T | undefined>
  add(item: T): Promise<T | undefined>
  update(id: string, item: T): Promise<T | undefined>
  delete(item: { id: string }): Promise<T | undefined>
}

/*
export interface Repository<T> {
  findAll(): T[] | undefined
  findOne(item: { id: string }): T | undefined
  add(item: T): T | undefined
  update(item: T): T | undefined
  delete(item: { id: string }): T | undefined
} */