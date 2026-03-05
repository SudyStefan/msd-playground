import random
import math

loopcount = 0
list_length = 100
A = [i for i in range(list_length)]
random.shuffle(A)
print(f"n^2: {list_length**2}")
print(f"n: {list_length}")
print(f"n log(n): {list_length * math.log(list_length)}")
print(f"log(n): {math.log(list_length)}")

for i in range(0, len(A)):
  key = A[i]
  j = i + 1
  while key > A[j] and j < len(A):
    j += 1
    loopcount += 1
  A[j - 1] = key
  A[i] = A[j]

print(f"loops: {loopcount}")
print(A)