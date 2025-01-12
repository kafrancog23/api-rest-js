# api-rest-js

Este proyecto, llamado `api-rest-js`, se centra en consumir la API de TheMovieDB y construir una aplicación web dinámica y responsiva. El propósito de este proyecto es explorar y evaluar diversos escenarios que pueden surgir al trabajar con el consumo de APIs en el desarrollo web.

## Descripción del Proyecto

La aplicación permite a los usuarios buscar y explorar películas, ver detalles de películas específicas, y gestionar una lista de películas favoritas. A continuación se describen las principales funcionalidades implementadas:

### Funcionalidades

1. **Vista de Tendencias**:
   - Muestra una lista de películas que están en tendencia.
   - Permite a los usuarios ver más detalles sobre una película específica al hacer clic en ella.

2. **Búsqueda de Películas**:
   - Los usuarios pueden buscar películas por título.
   - Los resultados de búsqueda se muestran en una lista dinámica.

3. **Categorías de Películas**:
   - Muestra una lista de categorías de películas.
   - Los usuarios pueden explorar películas dentro de una categoría específica.

4. **Detalles de Películas**:
   - Muestra información detallada sobre una película seleccionada, incluyendo su título, descripción, puntuación y géneros.
   - Muestra una lista de películas relacionadas.

5. **Películas Favoritas**:
   - Los usuarios pueden agregar o quitar películas de su lista de favoritas.
   - Las películas favoritas se almacenan en el `localStorage` del navegador.

### Tecnologías Utilizadas

- **HTML5**: Para la estructura de la aplicación.
- **CSS3**: Para el diseño y la responsividad.
- **JavaScript (ES6)**: Para la lógica de la aplicación.
- **Axios**: Para realizar las solicitudes HTTP a la API de TheMovieDB.
- **TheMovieDB API**: Para obtener datos sobre películas.

### Estructura del Proyecto

- `index.html`: Archivo principal HTML.
- `src/assets/app.css`: Archivo CSS para los estilos de la aplicación.
- `src/js/main.js`: Contiene la lógica principal para interactuar con la API y manejar la UI.
- `src/js/navigation.js`: Maneja la navegación de la aplicación basada en el hash de la URL.
- `src/js/nodes.js`: Contiene referencias a los elementos del DOM utilizados en la aplicación.
- `src/js/secrets.js`: Contiene la clave de la API de TheMovieDB.

## Instalación y Uso

1. Clona este repositorio:
   ```sh
   git clone https://github.com/tu-usuario/api-rest-js.git
