@echo off
rem Gateway PC audio server — double-click to start serving your Hemi-Sync folder to the app.
rem Serves the app itself (gateway/www) and the audio folder given below. Edit AUDIO below.
cd /d "%~dp0.."
set AUDIO=%USERPROFILE%\Music\Hemi-Sync
where python >nul 2>nul || (echo Python bulunamadi — lutfen python.org'dan kurun. & pause & exit /b 1)
python tools\pc-server.py --audio "%AUDIO%" %*
echo.
pause
