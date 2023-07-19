cd C:\Websites\Bolinao-Account-Management\backend

@echo off
setlocal

for /f "tokens=1-3 delims=/" %%a in ("%date%") do (
    set "day=%%a"
    set "month=%%b"
    set "year=%%c"
)

set "day=%day:~0,2%"
set "month=%month:~0,2%"

set "file_name=../../%year%-%month%-%day%_backend.log"

yarn start >> "%file_name%" 2>&1

endlocal

