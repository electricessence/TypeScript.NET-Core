@echo off

cd Core/dist
call npm publish --silent
cd ../../

cd Events/dist
call npm publish --silent
cd ../../

cd Observables/dist
call npm publish --silent
cd ../../

cd Threading/dist
call npm publish --silent
cd ../../

cd Promises/dist
call npm publish --silent
cd ../../

cd Web/dist
call npm publish --silent
cd ../../