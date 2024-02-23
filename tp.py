l = int(input())
tp = 0
th = 0
for i in range(l):
    t,h = map(str,input().split())
    if t > h:
        tp+=3
    elif t < h:
        th+=3
    else:
        th+=1
        tp+=1
print(f"{tp} {th}")