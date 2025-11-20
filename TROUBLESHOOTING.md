# Soluciones a Errores Comunes

## Errores de Compilación TypeScript

### 1. Type 'unknown' is not assignable to type

**Solución:** Agregar tipado explícito en los effects

```typescript
// En cada effect, cambiar:
map((data) => ...)

// Por:
map((data: TipoDato) => ...)
```

### 2. Type 'null' is not assignable to dataSource

**Solución:** Usar operador null-coalescing en templates

```html
<!-- Cambiar: -->
[dataSource]="items$ | async"

<!-- Por: -->
[dataSource]="(items$ | async) || []"
```

### 3. Cannot find module

**Causa:** Rutas de imports incorrectas o archivos no creados

**Verificar:**

- Que los archivos existan en las rutas especificadas
- Contar correctamente los niveles `../` en imports relativos

## Ajustes Rápidos

### Deshabilitar strictNullChecks temporalmente

En `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

### Agregar ! (non-null assertion) donde sea seguro

```typescript
const value = observable$!.pipe(...)
```

## Próximos Pasos

1. Compilar con `npm start`
2. Verificar consola del navegador
3. Probar login con usuarios de prueba
4. Navegar por las diferentes secciones
5. Verificar permisos por rol
