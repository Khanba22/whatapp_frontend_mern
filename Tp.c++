#include <iostream>
using namespace std;
#include <cmath>
#include <vector>
#include <iomanip>
int main()
{
    int n;
    cin >>n;
    vector <int> V{n};
    for (int i = 0; i < n; i++)
    {
        cin >> V[i];
    }
    int Q;
    cin >> Q;
    while (Q--)
    {
        int s , e;
        long sum = 0;
        cin >> s >> e;
        for (int i = s; i <= e; i++)
        {
            sum+= V[i];
        }
        cout <<sum << endl;
    }
    return 0;
}
