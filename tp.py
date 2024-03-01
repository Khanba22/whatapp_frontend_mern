r = int(input())
c = int(input())
arr = []
for i in range(r):
    arr[i] = list(map(int,input().split("|")))
print(arr)