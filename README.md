## Ejecutar el Proyecto

```bash
npm start
```

Espera a que ambos servicios inicien:

- JSON Server en http://localhost:3000
- Angular en http://localhost:4200

## Login

en http://localhost:4200

Usa estas credenciales:

### 👨‍💼 Administrador (Acceso Completo)

```
Email: admin@test.com
Password: admin123
```

### 👤 Usuario Normal (Acceso Limitado)

```
Email: user@test.com
Password: user123
```

## Navegación

Después del login, verás el menú lateral con:

- 🏠 **Inicio** - Dashboard principal
- 🎓 **Alumnos** - Gestión de estudiantes
- 📚 **Cursos** - Gestión de cursos
- 📝 **Inscripciones** - Asignación de alumnos a cursos
- 👥 **Usuarios** - Gestión de usuarios (solo visible para admin)

### Como Administrador

1. Ir a **Alumnos** - Ver, crear, editar, eliminar
2. Ir a **Cursos** - Ver, crear, editar, eliminar
3. Ir a **Inscripciones** - Asignar alumnos a cursos
4. Ir a **Usuarios** - Gestionar usuarios del sistema

### Como Usuario Normal

1. Ir a **Alumnos** - Solo ver (sin botones de ABM)
2. Ir a **Cursos** - Solo ver (sin botones de ABM)
3. **Usuarios** - Opción no disponible en el menú
