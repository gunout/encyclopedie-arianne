FROM nginx:alpine
COPY ariane6-complete.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
