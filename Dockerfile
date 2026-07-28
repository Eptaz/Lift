FROM nginx:alpine

# Supprime la page par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copie les fichiers de l'application
COPY . /usr/share/nginx/html

# Expose le port HTTP
EXPOSE 80

# Lance Nginx
CMD ["nginx", "-g", "daemon off;"]