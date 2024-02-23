#include <iostream>
using namespace std;
#include <cmath>
int main()
{
    while (1)
    {
        int n;
        cin >> n;
        if (n == 0)
        {
            break;
        }
        int s[n];
        int sum = 0;
        for (int i = 0; i < n; i++)
        {
            cin >> s[i];
            sum = sum + s[i];
        }
        float m = sum / n;
        float std = 0;
        for (int i = 0; i < n; i++)
        {
            float dev = (s[i] - m) * (s[i] - m);
            std+=dev;
        }
        std = std / n;
        cout << sqrt(std) << "\n";
    }
    return 0;
}