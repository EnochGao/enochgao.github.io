FROM nginx:latest
WORKDIR /etc/nginx
COPY ./template.conf ./conf.d/
COPY ./dist/enochgao.github.io/browser /var/www/html
EXPOSE 4200
