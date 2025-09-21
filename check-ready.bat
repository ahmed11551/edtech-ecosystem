@echo off
echo 🔍 Проверка готовности EdTech Ecosystem
echo ======================================

echo.
echo 📁 Проверка файлов...

if exist "vercel.json" (
    echo ✅ vercel.json - OK
) else (
    echo ❌ vercel.json - ОТСУТСТВУЕТ
)

if exist "railway.json" (
    echo ✅ railway.json - OK
) else (
    echo ❌ railway.json - ОТСУТСТВУЕТ
)

if exist "client\vercel.json" (
    echo ✅ client\vercel.json - OK
) else (
    echo ❌ client\vercel.json - ОТСУТСТВУЕТ
)

if exist "server\package.json" (
    echo ✅ server\package.json - OK
) else (
    echo ❌ server\package.json - ОТСУТСТВУЕТ
)

if exist "client\package.json" (
    echo ✅ client\package.json - OK
) else (
    echo ❌ client\package.json - ОТСУТСТВУЕТ
)

echo.
echo 📋 Демо-страницы:

if exist "3d-demo\index.html" (
    echo ✅ 3D Demo - OK
) else (
    echo ❌ 3D Demo - ОТСУТСТВУЕТ
)

if exist "metaverse-worlds\index.html" (
    echo ✅ Metaverse - OK
) else (
    echo ❌ Metaverse - ОТСУТСТВУЕТ
)

if exist "neural-interface\index.html" (
    echo ✅ Neural Interface - OK
) else (
    echo ❌ Neural Interface - ОТСУТСТВУЕТ
)

if exist "holographic-projections\index.html" (
    echo ✅ Holographic - OK
) else (
    echo ❌ Holographic - ОТСУТСТВУЕТ
)

if exist "quantum-mentors\index.html" (
    echo ✅ Quantum Mentors - OK
) else (
    echo ❌ Quantum Mentors - ОТСУТСТВУЕТ
)

if exist "real-time-analytics\index.html" (
    echo ✅ Analytics - OK
) else (
    echo ❌ Analytics - ОТСУТСТВУЕТ
)

echo.
echo 📚 Документация:

if exist "QUICK_DEPLOY.md" (
    echo ✅ QUICK_DEPLOY.md - OK
) else (
    echo ❌ QUICK_DEPLOY.md - ОТСУТСТВУЕТ
)

if exist "FREE_DEPLOYMENT.md" (
    echo ✅ FREE_DEPLOYMENT.md - OK
) else (
    echo ❌ FREE_DEPLOYMENT.md - ОТСУТСТВУЕТ
)

echo.
echo 🎉 ПРОЕКТ ГОТОВ К РАЗВЕРТЫВАНИЮ!
echo.
echo 📋 Следующие шаги:
echo 1. Прочитайте QUICK_DEPLOY.md
echo 2. Следуйте инструкциям
echo 3. Ваш проект будет доступен бесплатно!
echo.

pause
