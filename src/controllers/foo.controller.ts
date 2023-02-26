import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Foo} from '../models';
import {TodoRepository} from '../repositories';

export class FooController {
  constructor(
    @repository(TodoRepository)
    public todoRepository : TodoRepository,
  ) {}

  @post('/foos')
  @response(200, {
    description: 'Foo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Foo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foo, {
            title: 'NewFoo',
            exclude: ['id'],
          }),
        },
      },
    })
    foo: Omit<Foo, 'id'>,
  ): Promise<Foo> {
    return this.todoRepository.create(foo);
  }

  @get('/foos/count')
  @response(200, {
    description: 'Foo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Foo) where?: Where<Foo>,
  ): Promise<Count> {
    return this.todoRepository.count(where);
  }

  @get('/foos')
  @response(200, {
    description: 'Array of Foo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Foo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Foo) filter?: Filter<Foo>,
  ): Promise<Foo[]> {
    return this.todoRepository.find(filter);
  }

  @patch('/foos')
  @response(200, {
    description: 'Foo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foo, {partial: true}),
        },
      },
    })
    foo: Foo,
    @param.where(Foo) where?: Where<Foo>,
  ): Promise<Count> {
    return this.todoRepository.updateAll(foo, where);
  }

  @get('/foos/{id}')
  @response(200, {
    description: 'Foo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Foo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Foo, {exclude: 'where'}) filter?: FilterExcludingWhere<Foo>
  ): Promise<Foo> {
    return this.todoRepository.findById(id, filter);
  }

  @patch('/foos/{id}')
  @response(204, {
    description: 'Foo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foo, {partial: true}),
        },
      },
    })
    foo: Foo,
  ): Promise<void> {
    await this.todoRepository.updateById(id, foo);
  }

  @put('/foos/{id}')
  @response(204, {
    description: 'Foo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() foo: Foo,
  ): Promise<void> {
    await this.todoRepository.replaceById(id, foo);
  }

  @del('/foos/{id}')
  @response(204, {
    description: 'Foo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoRepository.deleteById(id);
  }
}
