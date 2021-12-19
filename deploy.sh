#!/bin/bash
run_client () {
    cd ./fe
    yarn install
    yarn start
}

dotnet restore
dotnet build
dotnet run & run_client && fg