@echo off
REM Azure App Service Windows startup script: prefer server.js then server.cjs
if exist "%~dp0\server.js" (
	echo Using ESM entrypoint server.js
	node "%~dp0\server.js"
	goto :EOF
)

if exist "%~dp0\server.cjs" (
	echo Using CommonJS entrypoint server.cjs
	node "%~dp0\server.cjs"
	goto :EOF
)

if exist "%~dp0\simple-server.cjs" (
	echo Using fallback simple-server.cjs
	node "%~dp0\simple-server.cjs"
	goto :EOF
)

echo No server entrypoint found (server.js | server.cjs | simple-server.cjs). Exiting.
exit /B 1