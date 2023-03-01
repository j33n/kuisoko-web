# 🏪 Kuisoko

🛒 Kuisoko aims to become an easy way for merchants both small(mom-pop shops, artists, freelancers, ...) and large(supermarkets, brands, ...) in Rwanda/Africa to build and deploy online stores.

💭 Imagine Shopify + a Notion-like user interface.

🏗 Still in Early stage development 

🧪 Try it out and give me some feedback on [twitter](https://twitter.com/_j33n)

🚀 Also, I'm looking for founding members so reach out if interested.

## 🤓 Setup

Prerequisites
- Node(v16.18.1)
- Docker(Ensure docker is running)

recommended node version
```bash
nvm use lts/gallium
```

installation
```bash
npm install
```

running type
```bash
npm run typecheck
```

### db migrations

generate migration file
```bash
npx prisma migrate dev
```

update db tables, to be run when the schema.prisma is updates
```bash
npx prisma db push
```

db seed
```bash
npx prisma db push
```
