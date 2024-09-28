import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from "fastify";
import fastifyCors from '@fastify/cors'
import {createCulture} from './router/createCulture'
import {getCulture} from './router/getCulture'
import { deleteCulture } from './router/deleteCulture';
import { getUniqueCulture } from './router/getUniqueCulture';
import { editCulture } from './router/editCulture';

export const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

app.register(fastifyCors, {
  origin: '*'
})

app.register(createCulture)
app.register(getCulture)
app.register(deleteCulture)
app.register(getUniqueCulture)
app.register(editCulture)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log("HTTP Serber running!")
})