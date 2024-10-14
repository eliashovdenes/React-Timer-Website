# Use the official ASP.NET Core SDK image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy the .csproj file and restore the dependencies
COPY ["/MyDotnetBackend.csproj", "./"]
RUN dotnet restore "MyDotnetBackend.csproj"

# Copy the rest of the application files
COPY . .

# Publish the application in Release mode
RUN dotnet publish "MyDotnetBackend.csproj" -c Release -o /app/publish

# Use the runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MyDotnetBackend.dll"]
