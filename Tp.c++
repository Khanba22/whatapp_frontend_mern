#include <iostream>
using namespace std;
#include <cmath>
#include <iomanip>
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
        double sum = 0;
        for (int i = 0; i < n; i++)
        {
            cin >> s[i];
            sum = sum + s[i];
        }
        double m = sum / n;
        double std = 0;
        for (int i = 0; i < n; i++)
        {
            double dev = (s[i] - m) * (s[i] - m);
            std+=dev;
        }
        std = sqrt(std / n);
        cout << setprecision(10);
        cout << std << "\n";
    }
    return 0;
}
