# Étape 1 : Compilation du projet Angular
FROM node:20-alpine AS builder
WORKDIR /app

# Copie des fichiers de dépendances et installation propre
COPY package*.json ./
RUN npm ci

# Copie du code source et compilation pour la production (Angular SSR)
COPY . .
RUN npm run build

# Étape 2 : Image d'exécution légère de production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Récupération des livrables compilés
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package*.json ./

# Exposition du port du serveur SSR
EXPOSE 4000

# Démarrage du serveur Angular SSR
CMD ["node", "dist/portFolio/server/server.mjs"]
