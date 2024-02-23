i = int(input())
hours = i%(60*60*60)
mins = i%(60*60)
secs = i%60
print(hours+" " + mins + " " + secs)