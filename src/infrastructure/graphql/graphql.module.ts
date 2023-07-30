import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      driver: ApolloDriver,
      formatError: (error: GraphQLError) => {
        const NODE_ENV = process.env.NODE_ENV;
        if (error.extensions.code === 'GRAPHQL_VALIDATION_FAILED') {
          return NODE_ENV === 'local'
            ? {
                ...error,
                message:
                  "Your query doesn't match the schema. Try double-checking it!",
              }
            : {
                message:
                  "Your query doesn't match the schema. Try double-checking it!",
              };
        }
        return error;

        // const graphQLFormattedError: GraphQLFormattedError = error;
        // return graphQLFormattedError;
      },
    }),
  ],
})
export class AppGraphQLModule {}
