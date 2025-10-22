# Etapa 1: Build
FROM node:18-alpine AS build
WORKDIR /app

# Instala dependências e builda
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copia build do Vite
COPY --from=build /app/dist .

# Substitui a porta padrão do Nginx pela variável $PORT
# Assim o CapRover injeta a porta automaticamente
RUN sed -i 's/listen 80;/listen ${PORT:-80};/' /etc/nginx/conf.d/default.conf

# Expõe a porta dinamicamente (CapRover ignora esse valor)
EXPOSE ${PORT:-80}

CMD ["sh", "-c", "nginx -g 'daemon off;'"]
