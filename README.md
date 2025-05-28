# Mergington High School Management System API

Una API sencilla construida con FastAPI para gestionar actividades extracurriculares en la escuela secundaria Mergington.

## Características

- Ver actividades disponibles.
- Inscribirse en actividades.
- Cancelar inscripción en actividades.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   pip3 install fastapi uvicorn
   ```
3. Ejecuta la aplicación:
   ```bash
   uvicorn src.app:app --reload
   ```

## Pruebas

1. Instala dependencias de prueba:
   ```bash
   pip3 install pytest httpx
   ```
2. Ejecuta las pruebas:
   ```bash
   pytest
   ```

## Endpoints principales

- `GET /activities`: Lista todas las actividades.
- `POST /activities/{activity_name}/signup?email=...`: Inscribe a un estudiante.
- `POST /activities/{activity_name}/unregister?email=...`: Da de baja a un estudiante.

---

&copy; 2025 GitHub &bull; [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md) &bull; [MIT License](https://gh.io/mit)

