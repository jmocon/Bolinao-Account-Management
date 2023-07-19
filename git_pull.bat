
@echo off
setlocal

for /f "tokens=1-3 delims=/" %%a in ("%date%") do (
    set "day=%%a"
    set "month=%%b"
    set "year=%%c"
)

set "day=%day:~0,2%"
set "month=%month:~0,2%"

set "file_name=C:\Websites\%year%-%month%-%day%_git_pull.log"

cd C:\Websites\Bolinao-Account-Management
git pull >> "%file_name%" 2>&1
cd C:\Websites\Bolinao-Account-Management\frontend
yarn install >> "%file_name%" 2>&1
cd C:\Websites\Bolinao-Account-Management\backend
yarn install >> "%file_name%" 2>&1

endlocal
