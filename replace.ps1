$content = Get-Content -Raw -Encoding UTF8 "c:\Users\Lenovo\OneDrive\Escritorio\Documentos\Codigos\Estetica\index.html"

# Remove badge
$content = $content -replace '(?m)^\s*<div class="hero-badge">Bienvenida a tu espacio de belleza</div>\s*$', ''

# Service Icons Map
$replacements = @{
    "💅" = '<i class="fas fa-hand-sparkles"></i>'
    "✨" = '<i class="fas fa-magic"></i>'
    "🌈" = '<i class="fas fa-shield-alt"></i>'
    "💎" = '<i class="fas fa-gem"></i>'
    "👑" = '<i class="fas fa-crown"></i>'
    "🌟" = '<i class="fas fa-star"></i>'
    "🤍" = '<i class="fas fa-heart"></i>'
    "🦶" = '<i class="fas fa-leaf"></i>'
    "✂️" = '<i class="fas fa-cut"></i>'
    "🎨" = '<i class="fas fa-palette"></i>'
    "💫" = '<i class="fas fa-wind"></i>'
    "💆‍♀️" = '<i class="fas fa-spa"></i>'
    "👰" = '<i class="fas fa-ring"></i>'
    "👁️" = '<i class="fas fa-eye"></i>'
    "👄" = '<i class="fas fa-paint-brush"></i>'
    "🧖‍♀️" = '<i class="fas fa-spa"></i>'
    "🌿" = '<i class="fas fa-leaf"></i>'
    "🌸" = '<i class="fas fa-water"></i>'
}

foreach ($key in $replacements.Keys) {
    $search = '<div class="service-icon">' + $key + '</div>'
    $replace = '<div class="service-icon">' + $replacements[$key] + '</div>'
    $content = $content.Replace($search, $replace)
}

# About Features Map
$aboutReplacements = @{
    "🏆" = '<i class="fas fa-award"></i>'
    "💎" = '<i class="fas fa-gem"></i>'
    "🌸" = '<i class="fas fa-spa"></i>'
    "💖" = '<i class="fas fa-heart"></i>'
}

foreach ($key in $aboutReplacements.Keys) {
    $search = '<span class="icon">' + $key + '</span>'
    $replace = '<span class="icon">' + $aboutReplacements[$key] + '</span>'
    $content = $content.Replace($search, $replace)
}

Set-Content -Path "c:\Users\Lenovo\OneDrive\Escritorio\Documentos\Codigos\Estetica\index.html" -Value $content -Encoding UTF8
Write-Output "Replacements completed successfully."
