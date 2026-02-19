# Push a GitHub

Si el push falló por `index.lock`, ejecutá en la terminal (en la carpeta del proyecto):

```powershell
cd "c:\Users\ignac\Desktop\portafolio (este va)"

# Si aparece "index.lock", borrarlo (cuando no haya otro git en curso):
Remove-Item .git\index.lock -Force -ErrorAction SilentlyContinue

# Agregar archivos (node_modules y .next quedan fuera por .gitignore)
git add -A

# Primer commit
git commit -m "Initial commit: portfolio Ignacio Ravettini"

# Push (rama main; si el remoto usa master, cambiá a: git push -u origin master)
git branch -M main
git push -u origin main
```

Si el repo en GitHub ya tiene contenido (p. ej. README), puede hacer falta antes:

```powershell
git pull origin main --allow-unrelated-histories
# Resolver conflictos si los hay, luego:
git push -u origin main
```

Remoto configurado: `https://github.com/Ravettini/Portfolio.git`
