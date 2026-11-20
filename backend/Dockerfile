# ============================================================
# Stage 1: Dependencies — Install production deps
# ============================================================
FROM node:20-alpine AS deps

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ============================================================
# Stage 2: Runner — Minimal production image
# ============================================================
FROM node:20-alpine AS runner

# Security: non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S markmitra -u 1001

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files
COPY --chown=markmitra:nodejs src/ ./src/
COPY --chown=markmitra:nodejs package.json ./

# Create uploads directory
RUN mkdir -p uploads/answer-sheets && chown -R markmitra:nodejs uploads/

USER markmitra

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

CMD ["node", "src/server.js"]
