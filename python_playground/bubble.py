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

count = 1
while count != len(A):
  sorted = True
  for i in range(0, len(A) - count):
    if A[i] > A[i+1]:
      temp = A[i+1]
      A[i+1] = A[i]
      A[i] = temp
    i += 1
    loopcount += 1
  count += 1

print(f"loops: {loopcount}")
print(A)