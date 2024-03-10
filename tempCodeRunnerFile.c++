#include <iostream>
#include <vector>
#include <string>
using namespace std;
int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        int len;
        cin >> len;
        string code;
        string res = "";
        cin >> code;
        len --;
        while (len >= 0)
        {
            if (code[len] == '0')
            {
                res = (char)(stoi(code.substr(len - 2,2)) + 96) + res;
                len-=2;
            }else{
                res = code[len] + res;
            }
            len--;
        }
        cout << res;
    }
    return 0;
}