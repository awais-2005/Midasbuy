@echo off
echo 🚀 Deploying MidasBuy to Netlify...
echo.

echo 📦 Building application...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo 🌍 Deploying to Netlify...
echo.
echo 1. Login to Netlify CLI if not already: netlify login
echo 2. Deploy with: netlify deploy --prod

echo.
pause
