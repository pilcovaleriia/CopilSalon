import re

filepath = "c:/Users/Lenovo/OneDrive/Escritorio/Documentos/Codigos/Estetica/index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove the completely the hero-badge
content = re.sub(r'[ \t]*<div class="hero-badge">Bienvenida a tu espacio de belleza</div>\n?', '', content)

# 2. Service Icons replacements
service_replacements = {
    "💅": '<i class="fas fa-hand-sparkles"></i>',
    "✨": '<i class="fas fa-magic"></i>',
    "🌈": '<i class="fas fa-shield-alt"></i>',
    "💎": '<i class="fas fa-gem"></i>',
    "👑": '<i class="fas fa-crown"></i>',
    "🌟": '<i class="fas fa-star"></i>',
    "🤍": '<i class="fas fa-heart"></i>',
    "🦶": '<i class="fas fa-leaf"></i>',
    "✂️": '<i class="fas fa-cut"></i>',
    "🎨": '<i class="fas fa-palette"></i>',
    "💫": '<i class="fas fa-wind"></i>',
    "💆‍♀️": '<i class="fas fa-spa"></i>',
    "👰": '<i class="fas fa-ring"></i>',
    "👁️": '<i class="fas fa-eye"></i>',
    "👄": '<i class="fas fa-paint-brush"></i>',
    "🧖‍♀️": '<i class="fas fa-spa"></i>',
    "🌿": '<i class="fas fa-leaf"></i>',
    "🌸": '<i class="fas fa-water"></i>'
}

for emoji, icon in service_replacements.items():
    content = content.replace(f'<div class="service-icon">{emoji}</div>', f'<div class="service-icon">{icon}</div>')

# 3. About Features replacements
about_replacements = {
    "🏆": '<i class="fas fa-award"></i>',
    "💎": '<i class="fas fa-gem"></i>',
    "🌸": '<i class="fas fa-spa"></i>',
    "💖": '<i class="fas fa-heart"></i>'
}

for emoji, icon in about_replacements.items():
    content = content.replace(f'<span class="icon">{emoji}</span>', f'<span class="icon">{icon}</span>')

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Replacements completed.")
