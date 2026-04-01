# Build step
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run step
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Next.js standalone output config needs to be enabled in next.config.js
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# Expose port and start
EXPOSE 3000
# CMD ["node", "server.js"]
# For default build, use npm start
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

CMD ["npm", "start"]
