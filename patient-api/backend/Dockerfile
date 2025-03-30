# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el código restante
COPY . .

# Expone el puerto en el que corre la API
EXPOSE 3000

# Si usas TypeScript, compila antes de ejecutar
RUN npm run build

# Comando para ejecutar la API
CMD ["npm", "run", "dev"]

