using Backend.Providers;

namespace Backend.Configurations;

public static class InstanceConfigurations
{
    public static void ConfigureProviderInstances(this IServiceCollection services)
    {
        services.AddSingleton<TokenProvider>();
        services.AddSingleton<EncryptProvider>();
    }
}