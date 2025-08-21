import { MikroORM } from "@mikro-orm/core"
import { SqlHighlighter } from "@mikro-orm/sql-highlighter"

export const orm = MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: 'club_nautico',
  clientUrl: 'mysql://root:rootpassword@localhost:3306/club_nautico',
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema:[],
  },
})

export const syncSchema = async () => {
  const generator = orm.getSchemaGenerator()
  await generator.updateSchema()
}