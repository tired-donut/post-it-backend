using System.Security.Cryptography;
using System.Text;

namespace Backend.Providers;

public class EncryptProvider
{
    private const int Size = 64;
    private const int Iterations = 350000;
    
    private readonly HashAlgorithmName _hashAlgorithm = HashAlgorithmName.SHA512;
    private readonly byte[] _salts;

    public EncryptProvider(IConfiguration configuration)
    {
        _salts = Encoding.UTF8.GetBytes(configuration["Encrypt:Salts"]!);
    }
    
    public string Hash(string password)
    {
        var hash = Rfc2898DeriveBytes.Pbkdf2(
            Encoding.UTF8.GetBytes(password),
            _salts,
            Iterations,
            _hashAlgorithm,
            Size);
        return Convert.ToHexString(hash);
    }

    public bool Verify(string password, string hash)
    {
        var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(password, _salts, Iterations, _hashAlgorithm, Size);
        return CryptographicOperations.FixedTimeEquals(hashToCompare, Convert.FromHexString(hash));
    }
}