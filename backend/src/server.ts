import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from "fastify";
import fastifyCors from '@fastify/cors'
import {createCulture} from './router/createCulture'
import {getCulture} from './router/getCulture'

export const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

app.register(fastifyCors, {
  origin: '*'
})

app.register(createCulture)
app.register(getCulture)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log("HTTP Serber running!")
})