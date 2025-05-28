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
# Congratulations! :tada:

<img src="https://octodex.github.com/images/welcometocat.png" align="right" height="250px" />

Yay **afmolinaj** you finished the exercise! Nice work :tada:

If you would like to retrace your steps, you can always revisit the exercise.

[![](https://img.shields.io/badge/Return%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/afmolinaj/skills-getting-started-with-github-copilot/issues/1)

> [!TIP]
> Mona won't grade you this time! 😉



### Craving more? :raising_hand:

Did you enjoy this practical style of learning? There's no better way to learn than building things, right?!

Let's keep the momentum going! Head over to [GitHub Skills](https://skills.github.com) catalog to find another hands-on exercise. :rocket:

