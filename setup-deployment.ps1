# Deployment Setup Helper Script
# This script helps prepare your project for deployment

Write-Host "🚀 Portfolio Deployment Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
Write-Host "Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After installing Git, restart PowerShell and run this script again." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create a GitHub account at https://github.com (if you don't have one)" -ForegroundColor White
Write-Host "2. Create a new repository on GitHub" -ForegroundColor White
Write-Host "3. Run these commands in PowerShell:" -ForegroundColor White
Write-Host ""
Write-Host "   git init" -ForegroundColor Green
Write-Host "   git add ." -ForegroundColor Green
Write-Host "   git commit -m 'Initial commit'" -ForegroundColor Green
Write-Host "   git branch -M main" -ForegroundColor Green
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor Green
Write-Host "   git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "4. Then follow the deployment guide in QUICK_START.md" -ForegroundColor White
Write-Host ""

# Check if .env files exist
Write-Host "Checking environment files..." -ForegroundColor Yellow
if (Test-Path "server\.env") {
    Write-Host "✅ server/.env exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  server/.env not found - copy server/env.example to server/.env and fill in your values" -ForegroundColor Yellow
}

if (Test-Path "client\.env") {
    Write-Host "✅ client/.env exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  client/.env not found - copy client/env.example to client/.env and fill in your values" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✨ Setup complete! Read QUICK_START.md for deployment instructions." -ForegroundColor Cyan

