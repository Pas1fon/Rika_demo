@echo off
setlocal
cd /d "%~dp0"
where node.exe >nul 2>nul
if not errorlevel 1 (
  set "RIKA_NODE=node.exe"
) else (
  set "RIKA_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
)
if not exist "%RIKA_NODE%" if not "%RIKA_NODE%"=="node.exe" (
  echo Node.js was not found.
  echo Open dist\index.html directly, or install Node.js 18+ and run this file again.
  echo See README.md for instructions in Russian.
  pause
  exit /b 1
)
echo RIKA frontend prototype
echo Open http://localhost:4173/ in your browser.
echo Leave this window open. Press Ctrl+C to stop.
"%RIKA_NODE%" "%~dp0server.mjs" %*
if errorlevel 1 pause
endlocal
