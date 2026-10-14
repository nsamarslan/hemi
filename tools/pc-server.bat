@echo off
rem Gateway PC audio server — double-click to start serving your Hemi-Sync folder to the app.
rem Serves the app itself (www\ at the repo root) and the audio folder given below. Edit AUDIO below.
cd /d "%~dp0.."
set AUDIO=%USERPROFILE%\Music\Hemi-Sync
rem The "py" launcher comes with every python.org install; "python" may be only the Microsoft Store stub.
set PY=python
where py >nul 2>nul && set PY=py -3
echo Telefon baglanamazsa: Wi-Fi ag profilini "Ozel" (Private) yapin ya da Windows Guvenlik Duvari'nda 8700 portuna izin verin.
%PY% tools\pc-server.py --audio "%AUDIO%" %*
if errorlevel 9009 echo Python bulunamadi — python.org'dan kurun (kurulumda "Add python.exe to PATH" secin) ya da Ayarlar ^> Uygulamalar ^> Uygulama yurutme diger adlari'ndan python kisayollarini kapatin.
echo.
pause
