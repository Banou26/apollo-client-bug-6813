import { gql, ApolloClient, InMemoryCache, makeVar } from '@apollo/client'

const cache = new InMemoryCache({})
const client = new ApolloClient({
  cache
})

const createTypedArray = () => new Uint8Array(Array(1_000_000).fill(0).map(v => Math.random() * 255))

const reactiveVar = makeVar<Uint8Array>(createTypedArray());

cache.policies.addTypePolicies({
  Query: {
    fields: {
      foo: {
        read: () => reactiveVar()
      }
    }
  }
})

console.log('AAA', client.query({ query: gql` query { foo @client } ` }))
