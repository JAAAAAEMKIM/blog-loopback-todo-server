import {Entity, model, property} from '@loopback/repository';

@model()
export class Foo extends Entity {
  constructor(data?: Partial<Foo>) {
    super(data);
  }
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;
}

export interface FooRelations {
  // describe navigational properties here
}

export type FooWithRelations = Foo & FooRelations;
