# Usa una imagen de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del frontend
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto (React usa 5173 en Vite o 3000 en Create React App)
EXPOSE 5173

# Comando de inicio (para desarrollo usa "dev", para producción usa "build" y "serve")
CMD ["npm", "run", "dev"]
