# Use the official ASP.NET Core SDK image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy the .csproj file and restore the dependencies
COPY ["MyDotnetBackend/MyDotnetBackend.csproj", "./"]
RUN dotnet restore "MyDotnetBackend.csproj"

# Copy the rest of the application files
COPY . .

# Build the application in Release mode
RUN dotnet build "MyDotnetBackend.csproj" -c Release -o /app/build

# Use the runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY --from=build /app/build .
ENTRYPOINT ["dotnet", "MyDotnetBackend.dll"]
