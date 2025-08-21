import {MikroORM } from "@mikro-orm/mysql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";


export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'club_nautico',
  clientUrl: 'mysql://root:rootpassword@localhost:3306/club_nautico',
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
});

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator();
  /*
  // Uncomment the following lines if you want to drop and recreate the schema
  await generator.dropSchema();
  await generator.createSchema();
  */
  await generator.updateSchema();
}